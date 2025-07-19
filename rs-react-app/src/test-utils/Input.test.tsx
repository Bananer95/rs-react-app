import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../common/ui/Input';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';

it('renders MainPage', async () => {
  render(<Input />);

  const inputElemnt = screen.getByRole('textbox');

  expect(inputElemnt).toHaveValue('');

  await userEvent.type(inputElemnt, 'pikachu');

  expect(inputElemnt).toHaveValue('pikachu');
});
