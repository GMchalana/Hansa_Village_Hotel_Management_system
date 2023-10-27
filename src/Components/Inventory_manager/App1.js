import React from 'react';
import axios from 'axios';

function App() {
  const generatePDF = async () => {
    try {
      const response = await axios.get('http://localhost:8080/generate-pdf', {
        responseType: 'blob', // Ensure the response is treated as binary data
      });

      // Create a Blob object from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a download URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger a click to download the PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Generation Example</h1>
        <button onClick={generatePDF}>Generate PDF</button>
      </header>
    </div>
  );
}

export default App;
