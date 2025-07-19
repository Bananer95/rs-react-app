import { Component } from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default class Button extends Component<ButtonProps> {
  render() {
    const { label, className = '', ...rest } = this.props;

    return (
      <button
        className={`px-4 py-2 rounded-xl text-white font-semibold shadow-md transition-all duration-200 bg-pink-600 hover:bg-pink-700 hover:cursor-pointer ${className}`}
        {...rest}
      >
        {label}
      </button>
    );
  }
}
