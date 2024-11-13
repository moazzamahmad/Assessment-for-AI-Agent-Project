import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { Bot, Database } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { SearchConfig } from './components/SearchConfig';
import { ResultsTable } from './components/ResultsTable';
import type { ProcessedData, SearchConfig as SearchConfigType } from './types';

function App() {
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<ProcessedData[]>([]);
  const [searchConfig, setSearchConfig] = useState<SearchConfigType>({
    columnName: '',
    searchQuery: ''
  });

  const handleFileUpload = useCallback((file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        if (results.data.length > 0) {
          const headers = Object.keys(results.data[0]);
          setColumns(headers);
          setData(results.data.map((row) => ({
            originalRow: row as Record<string, string>,
            status: 'pending'
          })));
        }
      },
      header: true,
      skipEmptyLines: true
    });
  }, []);

  const processData = useCallback(async () => {
    if (!searchConfig.columnName || !searchConfig.searchQuery) {
      alert('Please configure search parameters first');
      return;
    }

    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        status: 'processing'
      }))
    );

    // Simulate API calls with setTimeout
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData((prevData) => {
        const newData = [...prevData];
        newData[i] = {
          ...row,
          enrichedData: `Enriched data for ${row.originalRow[searchConfig.columnName]}`,
          status: 'completed'
        };
        return newData;
      });
    }
  }, [data, searchConfig]);

  const handleDownload = useCallback(() => {
    const csv = Papa.unparse(
      data.map((row) => ({
        ...row.originalRow,
        enrichedData: row.enrichedData || '',
        status: row.status
      }))
    );
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enriched-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">AI Data Enrichment</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {data.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Upload Your Dataset
                  </h2>
                  <p className="text-gray-500">
                    Start by uploading a CSV file containing the data you want to enrich
                  </p>
                </div>
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <SearchConfig
                  columns={columns}
                  config={searchConfig}
                  onConfigChange={setSearchConfig}
                />
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Summary</h2>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Total Records: <span className="font-medium">{data.length}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Processed:{' '}
                      <span className="font-medium">
                        {data.filter((row) => row.status === 'completed').length}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Pending:{' '}
                      <span className="font-medium">
                        {data.filter((row) => row.status === 'pending').length}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={processData}
                    disabled={!searchConfig.columnName || !searchConfig.searchQuery}
                    className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    Start Processing
                  </button>
                </div>
              </div>
              <ResultsTable data={data} onDownload={handleDownload} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;