import { render, screen } from '@testing-library/react';
import App from './App';

// I ran out of time (silly work) to do further ui testing
test('renders learn react link', () => {
  const tree = render(<App />);
  expect(tree).toMatchSnapshot();
});
