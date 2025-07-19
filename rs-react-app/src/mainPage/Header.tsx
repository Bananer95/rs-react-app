import { Component, type ChangeEvent } from 'react';
import Input from '../common/ui/Input';
import Button from '../common/ui/Button';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
}

export default class Header extends Component<HeaderProps> {
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onSearchChange(e.target.value);
  };

  render() {
    const { searchValue, onSearchClick } = this.props;
    return (
      <div className="w-full px-4 py-2 flex justify-center gap-4 mb-4">
        <Input
          value={searchValue}
          placeholder="Search"
          onChange={this.handleInputChange}
        />
        <Button label="Search" onClick={onSearchClick} />
      </div>
    );
  }
}
