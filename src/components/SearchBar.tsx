import type { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search Pokémon...",
}: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="search-bar"
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      aria-label="Search Pokémon"
    />
  );
}
