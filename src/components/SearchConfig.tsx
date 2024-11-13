import React from 'react';
import { Search } from 'lucide-react';
import type { SearchConfig } from '../types';

interface SearchConfigProps {
  columns: string[];
  config: SearchConfig;
  onConfigChange: (config: SearchConfig) => void;
}

export function SearchConfig({ columns, config, onConfigChange }: SearchConfigProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-gray-700">
        <Search className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Search Configuration</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Column to Enrich
          </label>
          <select
            value={config.columnName}
            onChange={(e) => onConfigChange({ ...config, columnName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a column...</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Query Template
          </label>
          <textarea
            value={config.searchQuery}
            onChange={(e) => onConfigChange({ ...config, searchQuery: e.target.value })}
            placeholder="Enter your search query template. Use {value} to reference the column value."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24"
          />
          <p className="mt-1 text-sm text-gray-500">
            Example: "company value revenue 2023" for company revenue lookup
          </p>
        </div>
      </div>
    </div>
  );
}