import { ThemeProvider } from './components/theme_provider';
import { usePage } from './contexts/page';
import useRequester from './utils/use_requester';

import CharacterMenu from './pages/character_menu';
import MainHud from './pages/main_hud';
import Signin from './pages/signin';
import CharacterCustomization from './pages/character_customization';
import AdminPanel from './pages/admin_panel';
import { useEffect, useState } from 'react';

export default function App() {
  const page = usePage((state) => state.page);
  const setPage = usePage((state) => state.setPage);
  const [pressedKey, setPressedKey] = useState('');
  const { fetch } = useRequester('client_utils_setPageMode', false);

  function listenerHandler(event: KeyboardEvent) {
    setPressedKey(event.key);
  }

  useEffect(() => {
    window.addEventListener('keyup', listenerHandler);
    return () => {
      window.removeEventListener('keyup', listenerHandler);
    };
  }, []);

  useEffect(() => {
    if (pressedKey.toLowerCase() === 'b')
      page === 'characterMenu' ? setPage('mainHud') : setPage('characterMenu');
    if (pressedKey === 'F2')
      page === 'adminPanel' ? setPage('mainHud') : setPage('adminPanel');
    setPressedKey('');
  }, [pressedKey]);

  useEffect(() => {
    if (page === 'mainHud') return fetch(false);
    return fetch(true);
  }, [page]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="h-screen w-screen flex items-center justify-center">
        {page === 'signin' && <Signin />}
        {page === 'mainHud' && <MainHud />}
        {page === 'characterMenu' && <CharacterMenu />}
        {page === 'characterCustomization' && <CharacterCustomization />}
        {page === 'adminPanel' && <AdminPanel />}
      </main>
    </ThemeProvider>
  );
}
