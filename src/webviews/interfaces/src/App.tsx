import CharacterCreator from './screens/character_creator';
import DebugHud from './screens/debug_hud';
import Signin from './screens/signin';
import { useState, useEffect } from 'react';

export default function App() {
  type IScreens = 'signin' | 'characterCreator' | 'debugHud' | null;
  const [screen, setScreen] = useState<IScreens>('debugHud');

  useEffect(() => {
    if (window.alt)
      window.alt.on('response:webview_setScreen', (screen: IScreens) =>
        setScreen(screen)
      );
  }, []);

  return (
    <>
      {screen === 'signin' && <Signin />}
      {screen === 'characterCreator' && <CharacterCreator />}
      {screen === 'debugHud' && <DebugHud />}
    </>
  );
}
