
const { User, Plant } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('plant');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('plant');
    },
    plants: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Plant.find(params).sort({ createdAt: -1 });
    },
    plant: async (parent, { plantId }) => {
      return Plant.findOne({ _id: plantId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('plant');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
// login that is going to create and return a token as part of the authentication protocol
      return { token, user };
    },
    addPlant: async (parent, { name }, context) => {
      if (context.user) {
        const plant = await Plant.create({
          name,
          plantAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { plants: plant._id } }
        );

        return plant;
      }
      throw new Error('You need to be logged in!');
    },
    addComment: async (parent, { plantId, comment_text }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $addToSet: {
              comments: { comment_text, comment_author: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new Error('You need to be logged in!');
    },
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        const plant = await Plant.findOneAndDelete({
          _id: plantId,
          plantAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { plant: plant._id } }
        );

        return plant;
      }
      //Review this part that was returning an error even after being logged in in Anthony's template
      throw new AuthenticationError('You need to be logged in!');
    },

    //Checking for the context to add the user
    /**When we create the token, it identifies the user which creates a context and it is created by the authentication Middleware inside auth.js; once it verifies the user, it will put it as part of the request for the user   */
    removeComment: async (parent, { plantId, commentId }, context) => {
      if (context.user) {
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $pull: {
              comments: {
                _id: commentId,
                comment_author: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new Error('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
