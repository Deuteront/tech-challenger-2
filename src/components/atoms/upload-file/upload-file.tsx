import React, { useState } from 'react';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadFile({ onChange }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
    onChange(event);
  };

  const handleRemoveFile = () => {
    setFileName(null);
    const inputElement = document.querySelector(
      '.visuallyHiddenInput'
    ) as HTMLInputElement;
    if (inputElement) inputElement.value = '';
  };

  return (
    <div className="upload-file-container">
      <label className="upload-file">
        Upload files
        <input
          className="visuallyHiddenInput"
          type="file"
          onChange={handleFileChange}
        />
      </label>
      {fileName && (
        <div className="file-info">
          <span className="file-name">
            {fileName}
            <span className="remove-file" onClick={handleRemoveFile}>
              ×
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
