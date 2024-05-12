import { useEffect } from 'react';
import { ThemeProvider } from './components/theme_provider';

import CharacterMenu from './pages/character_menu';
import MainHud from './pages/main_hud';
import Signin from './pages/signin';
import { EventNames, useListener } from './utils/use_listener';
import { useCharacterData } from './contexts/player';
import AdminPanel from './pages/admin_panel';
import VehicleInteraction from './pages/vehicle_interaction';
import { Event_webView_setPage } from './types/webView';
import { Event_player_getCharacterData } from './types/player';

export default function App() {
  const page = useListener<Event_webView_setPage>(EventNames.webView_setPage);
  const characterData = useListener<Event_player_getCharacterData>(
    EventNames.player_getCharacterData
  );
  const setCharacterData = useCharacterData((state) => state.setCharacterData);

  useEffect(() => {
    if (characterData) setCharacterData(characterData);
  }, [characterData]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="h-screen w-screen flex items-center justify-center">
        {page === 'signIn' && <Signin />}
        {page === 'mainHud' && <MainHud />}
        {page === 'characterMenu' && <CharacterMenu />}
        {page === 'adminPanel' && <AdminPanel />}
        {page === 'vehicleInteraction' && <VehicleInteraction />}
        <MainHud />
      </main>
    </ThemeProvider>
  );
}
