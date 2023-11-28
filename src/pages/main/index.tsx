import React, { useRef } from 'react';

const PixelateImage = () => {
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImage = () => {
    const input = inputRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = URL.createObjectURL(input.files[0]);

    img.onload = function () {
      // Set canvas dimensions to match image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Apply pixelation effect
      const pixelSize = 10;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, img.width / pixelSize, img.height / pixelSize);
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'pixelated_image.png'; // Set the filename for the download
    a.click();
  };

  return (
    <div>
      <input type="file" ref={inputRef} accept="image/*" onChange={handleImage} />
      <canvas ref={canvasRef} id="pixelatedCanvas" style={{ border: '1px solid black' }}></canvas>
      <button onClick={handleDownload}>Download Pixelated Image</button>
    </div>
  );
};

export default PixelateImage;