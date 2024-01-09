import AdminPanel from './screens/admin_panel';
import CharacterCreator from './screens/character_creator';
import DebugHud from './screens/debug_hud';
import Signin from './screens/signin';
import { useState, useEffect } from 'react';

export default function App() {
  const [screen, setScreen] = useState('signin');

  useEffect(() => {
    if (window.alt)
      window.alt.on('response:webview_setScreen', (response) => {
        if (typeof response.data === 'string') return setScreen(response.data);
        return console.error(
          'Não foi possível encontrar a tela chamada ' + response.data
        );
      });
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
