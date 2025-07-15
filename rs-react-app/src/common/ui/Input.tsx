import { Component, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default class Input extends Component<InputProps> {
  render() {
    const { label, className = '', ...rest } = this.props;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-white-700">{label}</label>
        )}
        <input
          className={`px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${className}`}
          {...rest}
        />
      </div>
    );
  }
}
