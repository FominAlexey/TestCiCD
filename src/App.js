import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCreatePdf = async () => {
    if (image) {
      const pdfDoc = new jsPDF();
      const imageBuffer = await image.arrayBuffer();
      const imageBytes = new Uint8Array(imageBuffer);

      // добавляем изображение в PDF-документ
      pdfDoc.addImage(imageBytes, 'JPEG', 15, 40, 180, 180);
      console.log(pdfDoc.output())
      // сохраняем PDF-документ в файл
      const pdfBlob = new Blob([pdfDoc.output()], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = 'image.pdf';
      link.click();
      link.remove();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleCreatePdf}>Создать PDF</button>
        {pdf && (
          <a href={`data:application/pdf;base64,${pdf}`} download="image.pdf">
            Скачать PDF
          </a>
        )}
      </header>
    </div>
  );
}

export default App;