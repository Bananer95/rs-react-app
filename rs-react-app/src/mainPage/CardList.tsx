import { Component } from 'react';
import type { Pokemon } from './MainPage';
import Button from '../common/ui/Button';

interface CardListProps {
  items: Pokemon[];
}

interface classState {
  throwError: boolean;
}

export default class CardList extends Component<CardListProps> {
  state: classState = {
    throwError: false,
  };
  render() {
    const { items } = this.props;
    if (this.state.throwError) {
      throw new Error('Check Error Bounder');
    }

    return (
      <>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-600">
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          className="mt-4"
          onClick={() => this.setState({ throwError: true })}
          label="Throw Error"
        />
      </>
    );
  }
}
