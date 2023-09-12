import React from 'react';

interface SearchBarProps {
  filterText: string;
  onFilterChange: (newFilter: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({
  filterText,
  onFilterChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Filter tasks ..."
      value={filterText}
      onChange={(e) => onFilterChange(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 my-2 mt-3"
    />
  );
};

export default SearchBar;
