import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Message, Slider, Spin } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';
import { PixelateByRgbDiv } from './style';

const PixelateByRgb:FC = memo(() => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [value,setValue] = useState<number>(10);
  const [lock,setLoct] = useState<boolean>(false);
  const [realDo,setRealDo] = useState<boolean>(false);

  useEffect(() => {
    if(realDo) {
      handleImage(value);
    }
  },[realDo,value]);

  const handleImage = (_value:number) => {
    const input:any = inputRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }
    if(!input.files[0]) return;
    

    setLoct(true);

    const img = new Image();
    img.src = URL.createObjectURL(input.files[0]);
    

    img.onload = () => {
      // Set canvas dimensions to match image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Apply pixelation effect using pixel data
      const pixelSize = _value;
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
      if(!_value) {
        ctx.putImageData(imageData, 0, 0);
        setLoct(false);
        setRealDo(false);
        return;
      }
      
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
      setLoct(false);
      setRealDo(false);
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
      <Spin loading={lock} size={20} icon={<IconLoading/>} >
        <canvas className='canvas' ref={canvasRef} id="pixelatedCanvas"></canvas>
      </Spin>
      <div>调整像素度</div>
      <Slider
        disabled={lock}
        defaultValue={10}
        max={50}
        step={1}
        value={value}
        onAfterChange={() => setRealDo(true)}
        onChange={e => setValue(e as number)}
        style={{width:'200px',marginTop:'10px'}}
      />
      <input className='input' type="file" ref={inputRef} accept="image/*" onChange={() => handleImage(value)} />
      <button className='download' onClick={handleDownload}>Download Pixelated Image</button>
    </PixelateByRgbDiv>
  );
});

export default PixelateByRgb;