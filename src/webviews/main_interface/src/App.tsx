import AdminPanel from './screens/admin_panel';
import CharacterCreator from './screens/character_creator';
import DebugHud from './screens/debug_hud';
import Hud from './screens/hud';
import Signin from './screens/signin';
import { useListener } from './utils/use_listener';

export default function App() {
  const { response } = useListener('webView_setScreen');

  return (
    <>
      {!response && <Signin />}
      {response === 'characterCreator' && <CharacterCreator />}
      {response === 'debugHud' && <DebugHud />}
      {response === 'adminPanel' && <AdminPanel />}
      {response === 'hud' && <Hud />}
    </>
  );
}
