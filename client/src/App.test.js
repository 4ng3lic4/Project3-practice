import { render, screen } from '@testing-library/react';
import App from './App';

//This test is looking for a particular react link
test('renders learn react link', () => {
  render(<App />);
  //A react element based on the text
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
