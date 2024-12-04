import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [htmlPreview, setHtmlPreview] = useState('');

  //rerenders the app component for every change in markdown
  useEffect(() => {}, [markdown]);

  //function to fetch the html from the server
  const handleInputChange = async (e) => {
    const markdownText = e.target.value;
    setMarkdown(markdownText);
    try {
      const response = await fetch('http://localhost:7777/markDown', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ markdown: markdownText }),
      });
      if (!response.ok) {
        console.log('fetching data was unsuccessful');
      }
      const data = await response.json();
      setHtmlPreview(data.html);
    } catch (error) {
      console.error('Error processing Markdown:', error);
    }
  };

  return (
    <div>
      <h1 className="flex justify-center text-2xl p-1 font-bold">
        Real-Time Markdown Editor
      </h1>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Markdown Input */}
        <textarea
          className="w-full md:w-1/2 h-full p-4 border border-gray-300 focus:outline-none"
          placeholder="Type Markdown here..."
          value={markdown}
          onChange={handleInputChange}
        />

        {/* HTML Preview */}
        <div className="w-full md:w-1/2 h-full p-4 bg-gray-100 border-l border-gray-300 overflow-y-auto">
          <iframe
            title="HTML Preview"
            srcDoc={htmlPreview}
            className="w-full h-full border-none"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default App;
