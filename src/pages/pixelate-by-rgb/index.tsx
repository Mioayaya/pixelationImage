import React, { FC, memo, useRef } from 'react';
import { PixelateByRgbDiv } from './style';

const PixelateByRgb:FC = memo(() => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImage = () => {
    const input:any = inputRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(input.files[0]);

    img.onload = function () {
      // Set canvas dimensions to match image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Apply pixelation effect using pixel data
      const pixelSize = 10;
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      for (let y = 0; y < img.height; y += pixelSize) {
        for (let x = 0; x < img.width; x += pixelSize) {
          const startIndex = (y * img.width + x) * 4;

          const avgR = data[startIndex];
          const avgG = data[startIndex + 1];
          const avgB = data[startIndex + 2];

          for (let blockY = 0; blockY < pixelSize; blockY++) {
            for (let blockX = 0; blockX < pixelSize; blockX++) {
              const currentY = y + blockY;
              const currentX = x + blockX;
              const currentIndex = (currentY * img.width + currentX) * 4;

              data[currentIndex] = avgR;
              data[currentIndex + 1] = avgG;
              data[currentIndex + 2] = avgB;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const dataURL = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'pixelated_image.png';
    a.click();
  };

  return (
    <PixelateByRgbDiv >
      <input type="file" ref={inputRef} accept="image/*" onChange={handleImage} />
      <canvas ref={canvasRef} id="pixelatedCanvas" style={{ border: '1px solid black' }}></canvas>
      <button onClick={handleDownload}>Download Pixelated Image</button>
    </PixelateByRgbDiv>
  );
});

export default PixelateByRgb;