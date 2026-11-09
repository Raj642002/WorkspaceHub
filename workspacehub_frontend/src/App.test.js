import { render, screen } from '@testing-library/react';
import App from './App';

test('renders WorkspaceHub header', () => {
  render(<App />);
  const header = screen.getByText(/WorkspaceHub/i);
  expect(header).toBeInTheDocument();
});
