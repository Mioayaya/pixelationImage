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
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const pixelSize = 10;
      outCtx.imageSmoothingEnabled = false;
      outCtx.drawImage(canvas, 0, 0, img.width, img.height, 0, 0, img.width / pixelSize, img.height / pixelSize);
    
    };

  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const dataURL = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'pixelated_image.png';
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