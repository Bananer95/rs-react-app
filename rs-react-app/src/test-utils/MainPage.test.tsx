import { render, screen, cleanup, waitFor } from '@testing-library/react';
import MainPage from '../mainPage/MainPage';
import { it, expect, vi, beforeEach, afterEach, describe } from 'vitest';
import type { MockInstance } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import mockData from '../utils/testMockData';

let inputElement: HTMLInputElement;
let sendButton: HTMLButtonElement;
let mockFetch: MockInstance<
  (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
>;

beforeEach(() => {
  mockFetch = vi.spyOn(window, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => mockData,
  } as Response);
  localStorage.clear();

  render(<MainPage />);
  inputElement = screen.getByRole('textbox');
  sendButton = screen.getByRole('button', { name: /Search/i });
});

afterEach(() => {
  mockFetch.mockRestore();
  cleanup();
});

describe('MainPage', () => {
  it('renders with empty input and button', () => {
    expect(inputElement).toHaveValue('');
    expect(sendButton).toBeInTheDocument();
  });

  it('renders with LocalStorage value', () => {
    localStorage.setItem('searchQuery', 'pikachu');
    cleanup();
    render(<MainPage />);
    const inputElemnt = screen.getByRole('textbox');
    expect(inputElemnt).toHaveValue('pikachu');
  });

  it('sends trimmed input to fetch and saves to localStorage', async () => {
    await userEvent.type(inputElement, mockData[0].name + ' ');
    await userEvent.click(sendButton);

    expect(mockFetch).toHaveBeenCalledTimes(2);

    const fetchUrl = mockFetch.mock.calls[1][0] as string;
    const lastPart = fetchUrl.split('/').pop();
    expect(lastPart).toBe(mockData[0].name);

    await waitFor(() => {
      expect(localStorage.getItem('searchQuery')).toBe(mockData[0].name);
    });
  });

  it('sends second value and updates localStorage', async () => {
    await userEvent.type(inputElement, mockData[0].name);
    await userEvent.click(sendButton);

    expect(mockFetch).toHaveBeenCalledTimes(2);

    const secondCallUrl = mockFetch.mock.calls[1][0] as string;
    const lastPart = secondCallUrl.split('/').pop();
    expect(lastPart).toBe(mockData[0].name);

    await userEvent.clear(inputElement);
    await userEvent.type(inputElement, 'bulbasaur');
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(localStorage.getItem('searchQuery')).toBe('bulbasaur');
    });
  });

  it('calls fetch with default URL when input is empty', async () => {
    await userEvent.clear(inputElement);
    await userEvent.click(sendButton);

    expect(mockFetch).toHaveBeenCalledTimes(2);
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toMatch(/\?limit=50/);

    await waitFor(() => {
      expect(localStorage.getItem('searchQuery')).toBe(null);
    });
  });

  it('displays error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Fetch failed'));
    await userEvent.type(inputElement, 'pikachu');
    await userEvent.click(sendButton);

    const errorMessage = await screen.findByText('Error: Fetch failed');
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays data when fetch is successful', async () => {
    await userEvent.type(inputElement, mockData[0].name);
    await userEvent.click(sendButton);

    const renderedDescription = await screen.findByText(
      mockData[0].description
    );
    const renderedName = await screen.findByText(mockData[0].name);
    expect(renderedDescription).toBeInTheDocument();
    expect(renderedName).toBeInTheDocument();
  });

  it('displays spinner while loading', async () => {
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              })
            );
          }, 3000);
        })
    );
    render(<MainPage />);
    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('display fallback UI', async () => {
    const errorBtn = await screen.findByRole('button', {
      name: /Throw Error/i,
    });
    expect(errorBtn).toBeInTheDocument();

    await userEvent.click(errorBtn);

    const error = await screen.findByRole('heading', {
      level: 2,
      name: /something went wrong/i,
    });
    expect(error).toBeInTheDocument();
  });
});
