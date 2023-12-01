import './App.css'
import PixelateImage from './pages/main'
import PixelateByRgb from './pages/pixelate-by-rgb'
import "@arco-design/web-react/dist/css/arco.css";

function App() {

  return (
    <div className="app">
      {/* <PixelateImage /> */}
      <PixelateByRgb />
    </div>
  )
}

export default App
