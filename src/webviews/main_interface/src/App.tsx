import CharacterMenu from './pages/character_menu';
import MainHud from './pages/main_hud';
import Signin from './pages/signin';
import { useListener } from './utils/use_listener';
import { ThemeProvider } from './components/theme_provider';
import CharacterCustomization from './pages/character_customization';
import AdminPanel from './pages/admin_panel';

export default function App() {
  const screen = useListener('webView_setScreen');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="h-screen w-screen flex items-center justify-center">
        {screen === 'signin' && <Signin />}
        {screen === 'mainHud' && <MainHud />}
        {screen === 'characterMenu' && <CharacterMenu />}
        {screen === 'characterCustomization' && <CharacterCustomization />}
        {screen === 'adminPanel' && <AdminPanel />}
      </main>
    </ThemeProvider>
  );
}
