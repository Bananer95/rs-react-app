import { render, screen } from '@testing-library/react';
import CardList from '../mainPage/CardList';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom';
import mockData from '../utils/testMockData';

describe('CardList Component', () => {
  it('renders MainPage', async () => {
    render(<CardList items={mockData} />);

    const table = await screen.findAllByRole('table');
    expect(table).toHaveLength(1);

    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(6);

    const cells = await screen.findAllByRole('cell');
    expect(cells).toHaveLength(10);

    mockData.forEach((pokemon, i) => {
      expect(cells[i * 2]).toHaveTextContent(pokemon.name);
      expect(cells[i * 2 + 1]).toHaveTextContent(pokemon.description);
    });
  });
});
