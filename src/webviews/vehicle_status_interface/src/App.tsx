import { useEffect, useState } from 'react';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'gray'
      }}
    >
      <h1 style={{ backgroundColor: 'red' }}>Tamanho da Tela</h1>
      <p style={{ backgroundColor: 'blue' }}>Largura: {windowSize.width}px</p>
      <p style={{ backgroundColor: 'red' }}>Altura: {windowSize.height}px</p>
    </div>
  );
}

export default App;
