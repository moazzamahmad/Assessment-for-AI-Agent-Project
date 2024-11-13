export interface ProcessedData {
  originalRow: Record<string, string>;
  enrichedData?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface SearchConfig {
  columnName: string;
  searchQuery: string;
}