import React from 'react';

function App() {
  const generatePDF = async () => {
    try {
      // Make a request to your Node.js backend to generate the PDF
      const response = await fetch('http://localhost:8080/generate-pdf');
      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();

        // Create a download link and trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Error generating PDF:', response.status);
      }
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
