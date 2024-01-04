import AdminPanel from './screens/admin_panel';
import CharacterCreator from './screens/character_creator';
import DebugHud from './screens/debug_hud';
import Signin from './screens/signin';
import { useState, useEffect } from 'react';

export default function App() {
  type IScreens =
    | 'signin'
    | 'characterCreator'
    | 'debugHud'
    | 'adminPanel'
    | null;
  const [screen, setScreen] = useState<IScreens>('signin');

  useEffect(() => {
    if (window.alt)
      window.alt.on('response:webview_setScreen', (screenReceived: IScreens) =>
        setScreen(screenReceived)
      );
  }, []);

  return (
    <>
      {screen === 'signin' && <Signin />}
      {screen === 'characterCreator' && <CharacterCreator />}
      {screen === 'debugHud' && <DebugHud />}
      {screen === 'adminPanel' && <AdminPanel />}
    </>
  );
}
