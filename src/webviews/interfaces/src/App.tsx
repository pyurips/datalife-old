import CharacterCreator from './screens/character_creator';
import DebugHud from './screens/debug_hud';
import Signin from './screens/signin';
import { useState, useEffect } from 'react';

export default function App() {
  const [screen, setScreen] = useState<
    'signin' | 'characterCreator' | 'debugHud' | null
  >('debugHud');

  useEffect(() => {
    // @ts-ignore
    if (window.alt)
      // @ts-ignore
      window.alt.on('response:webview_setScreen', (screen: string) => setScreen(screen));
  }, []);

  return (
    <>
      {screen === 'signin' && <Signin />}
      {screen === 'characterCreator' && <CharacterCreator />}
      {screen === 'debugHud' && <DebugHud />}
    </>
  );
}
