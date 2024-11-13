import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.google-apps.spreadsheet': ['.gsheet']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4 text-gray-600">
        <Upload className="w-12 h-12" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop your file here...</p>
        ) : (
          <>
            <p className="text-lg font-medium">Drag & drop your file here</p>
            <p className="text-sm text-gray-500">or click to select a file</p>
            <p className="text-xs text-gray-400">Supported formats: CSV, Excel, Google Sheets</p>
          </>
        )}
      </div>
    </div>
  );
}