import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders to-do heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /to-do/i })).toBeInTheDocument();
});

test("logs How's it hanging? when the button is clicked", async () => {
  const log = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /how's it hanging\?/i }));

  expect(log).toHaveBeenCalledWith("How's it hanging?");
  log.mockRestore();
});

test('adds a task and shows it in the list', async () => {
  render(<App />);

  await userEvent.type(screen.getByPlaceholderText(/add a task/i), 'Buy milk');
  await userEvent.click(screen.getByRole('button', { name: /^add$/i }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});
