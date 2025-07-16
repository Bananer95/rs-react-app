import { render, screen } from '@testing-library/react';
import MainPage from '../mainPage/MainPage';
import { it, expect } from 'vitest';
import '@testing-library/jest-dom';

it('renders MainPage', () => {
    localStorage.clear();
    render(<MainPage />);
    const inputElemnt = screen.getByRole('textbox');
    expect(inputElemnt).toHaveValue('');

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
})

it('renders MainPage with Localstorage value', () => {
    localStorage.setItem('searchQuery', 'pikachu');

    render(<MainPage />);
    const inputElemnt = screen.getByRole('textbox');
    expect(inputElemnt).toHaveValue('pikachu');

})

