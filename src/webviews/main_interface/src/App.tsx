import AdminPanel from './screens/admin_panel';
import CharacterCreator from './screens/character_creator';
import DebugHud from './screens/debug_hud';
import Hud from './screens/hud';
import Signin from './screens/signin';
import { useListener } from './utils/use_listener';

export default function App() {
  const response = useListener('webview_setScreen');

  return (
    <>
      {!response?.data && <Signin />}
      {response?.data === 'characterCreator' && <CharacterCreator />}
      {response?.data === 'debugHud' && <DebugHud />}
      {response?.data === 'adminPanel' && <AdminPanel />}
      {response?.data === 'hud' && <Hud />}
    </>
  );
}
