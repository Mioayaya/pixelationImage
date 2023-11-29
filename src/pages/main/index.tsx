import React, { FC, memo, useRef } from 'react';
import { PixelateImageDiv } from './style';

const PixelateImage:FC = memo(() => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const outRef = useRef<HTMLCanvasElement | null>(null);

  const handleImage = () => {
    const input:any = inputRef.current;
    const canvas = canvasRef.current;
    const outCanvas = outRef.current;
    const ctx:any = canvas?.getContext('2d');
    if (!canvas || !ctx || !outCanvas) {
      return;
    }

    const outCtx:any = outCanvas.getContext('2d');
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
      // ctx.imageSmoothingEnabled = false;
      // ctx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, img.width / pixelSize, img.height / pixelSize);
      outCtx.imageSmoothingEnabled = false;
      outCtx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, img.width / pixelSize, img.height / pixelSize);
    
    };

  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'pixelated_image.png'; // Set the filename for the download
    a.click();
  };

  return (
    <PixelateImageDiv >
      <input type="file" ref={inputRef} accept="image/*" onChange={handleImage} />
      <canvas ref={canvasRef} id="pixelatedCanvas" style={{ border: '1px solid black' }}></canvas>
      <canvas ref={outRef} id='outimg'></canvas>
      <button onClick={handleDownload}>Download Pixelated Image</button>
    </PixelateImageDiv>
  );
});

export default PixelateImage;