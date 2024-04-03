import { ThemeProvider } from './components/theme_provider';
import { usePage } from './contexts/page';
import useRequester from './utils/use_requester';

import CharacterMenu from './pages/character_menu';
import MainHud from './pages/main_hud';
import Signin from './pages/signin';
import CharacterCustomization from './pages/character_customization';
import AdminPanel from './pages/admin_panel';
import { useEffect } from 'react';

export default function App() {
  const page = usePage((state) => state.page);
  const { fetch } = useRequester('client_utils_setPageMode', false);
  
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
