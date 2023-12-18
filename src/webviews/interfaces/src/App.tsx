import Signin from './screens/signin';
import { useState, useEffect } from 'react';

export default function App() {
  const [screen, setScreen] = useState<'signin' | ''>('signin');

  useEffect(() => {
    // @ts-ignore
    //if (window.alt)
  }, []);

  return <>{screen === 'signin' && <Signin />}</>;
}
