import { useEffect } from 'react';
import { ThemeProvider } from './components/theme_provider';

import CharacterMenu from './pages/character_menu';
import MainHud from './pages/main_hud';
import Signin from './pages/signin';
import { useGetCharacterData, useGetPage } from './utils/use_listener';
import { useCharacterData } from './contexts/player';
// import CharacterCustomization from './pages/character_customization';
import AdminPanel from './pages/admin_panel';
import VehicleInteraction from './pages/vehicle_interaction';

export default function App() {
  const page = useGetPage();
  const characterData = useGetCharacterData();
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
        {/* {page === 'characterCustomization' && <CharacterCustomization />} */}
        {page === 'adminPanel' && <AdminPanel />}
        {page === 'vehicleInteraction' && <VehicleInteraction />}
      </main>
    </ThemeProvider>
  );
}
