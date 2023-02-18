import { render, screen } from '@testing-library/react';
import App from './App';

//This test is looking for a particular react link. This render test is enough for the project
test('renders learn react link', () => {
  render(<App />);
  //Is testing a react element based on the text
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
