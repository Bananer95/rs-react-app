import { Component } from 'react';
import Header from './Header';
import CardList from './CardList';
import Spinner from '../common/ui/Spinner';
import ErrorBoundary from '../common/ui/ErrorBounday';

interface MainPageState {
  searchValue: string;
  isLoading: boolean;
  resault: Pokemon[] | null;
  fetchError: string | null;
  throwError: boolean;
}

const apiUrl = 'https://pokeapi.deno.dev/pokemon';
export interface Pokemon {
  id: number;
  name: string;
  description: string;
}

export default class MainPage extends Component {
  state: MainPageState = {
    searchValue: '',
    isLoading: false,
    resault: null,
    fetchError: null,
    throwError: false,
  };

  fetchData = async (query: string) => {
    this.setState({ isLoading: true, fetchError: null });

    try {
      if (query.trim()) {
        const response = await fetch(`${apiUrl}/${query.trim().toLowerCase()}`);
        if (!response.ok) throw new Error('Not Found');

        const data = await response.json();
        this.setState({
          resault: Array.isArray(data) ? data : [data],
        });
        localStorage.setItem('searchQuery', query);
      } else {
        const response = await fetch(`${apiUrl}?limit=50`);
        if (!response.ok) throw new Error('Fetch failed');

        const data = await response.json();
        this.setState({ resault: data });
        localStorage.removeItem('searchQuery');
      }
    } catch (error: unknown) {
      this.setState({
        resault: [],
        fetchError: error instanceof Error ? error.message : '',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleInputChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  handlerSearchClick = () => {
    this.fetchData(this.state.searchValue);
  };

  componentDidMount(): void {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.setState({ searchValue: savedQuery }, () => {
      this.fetchData(savedQuery);
    });
  }

  render() {
    const { searchValue, resault, isLoading } = this.state;

    return (
      <>
        <Header
          onSearchChange={this.handleInputChange}
          onSearchClick={this.handlerSearchClick}
          searchValue={searchValue}
        />
        <ErrorBoundary>
          {isLoading ? (
            <Spinner />
          ) : resault && resault.length > 0 ? (
            <CardList items={resault} />
          ) : this.state.fetchError ? (
            <div> Error: {this.state.fetchError}</div>
          ) : (
            <div className="text-center text-gray-400">No Results</div>
          )}
        </ErrorBoundary>
      </>
    );
  }
}
