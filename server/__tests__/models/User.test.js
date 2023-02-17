const { userSchema, hashPassword, hashAllPasswords } = require('../../models/User.js');
const bcrypt = require('bcrypt');

describe('User Schema', () => {
  describe('Properties should be defined and validated', () => {
    it('should have username', () => {
      expect(userSchema.paths).toHaveProperty('username');
      const col = userSchema.paths.username;
      expect(col.instance).toEqual('String');
      expect(col.options.required).toEqual(true);
      expect(col.options.unique).toEqual(true);
      expect(col.options.trim).toEqual(true);
    });
  });
  describe('Passwords should be hashed', () => {

    it('should have async pre hooks for save and insertMany to hash passwords', () => {
      // a little difficult to explain, but mongoose has all hooks listed
      // console.log(userSchema.s.hooks._pres); // will display all hooks
      // I'm looking for hooks that say hashPassword or are anonymous
      expect(typeof hashPassword).toBe('function');
      expect(hashPassword.constructor.name === 'AsyncFunction').toBe(true)
      expect(typeof hashAllPasswords).toBe('function');
      expect(hashAllPasswords.constructor.name === 'AsyncFunction').toBe(true)
    });

    it('should not change a password that already exists for hashPassword save', async () => {
      const hashFunc = jest.spyOn(bcrypt, "hash");
      hashFunc.mockImplementation((password, salt) => {
        return new Promise( (resolve, reject) => {
          resolve("hashed");
        });
      });

      const next = jest.fn();

      // user that doesn't have password modified
      const user = {
        password: "original",
        isNew: false,
        isModified: () => false
      }

      await hashPassword.apply(user, [next]);

      expect(user.password).toEqual("original");
      expect(hashFunc).toHaveBeenCalledTimes(0);

      hashFunc.mockRestore();
    });

    // i was getting lazy - need to break this into multiple tests
    it('should hash a password for new users and users that have modifed', async () => {
      const hashFunc = jest.spyOn(bcrypt, "hash");
      hashFunc.mockImplementation((password, salt) => {
        return new Promise( (resolve, reject) => {
          resolve("hashed");
        });
      });

      const next = jest.fn();

      // user that doesn't have password modified
      const user = {
        password: "original",
        isNew: false,
        isModified: () => true
      }

      const userCreated = {
        password: "original",
        isNew: true,
        isModified: () => true
      }

      const userDoc = {
        password: "original",
        isNew: true,
        isModified: () => true
      }

      const docs = [userDoc];

      await hashPassword.apply(user, [next]);

      expect(user.password).toEqual("hashed");
      expect(hashFunc).toHaveBeenCalledTimes(1);

      await hashPassword.apply(userCreated, [next]);

      expect(userCreated.password).toEqual("hashed");
      expect(hashFunc).toHaveBeenCalledTimes(2);


      await hashAllPasswords.apply(null, [next, docs]);

      expect(docs[0].password).toEqual("hashed");
      expect(hashFunc).toHaveBeenCalledTimes(3);

      hashFunc.mockRestore();
    });
  });
});