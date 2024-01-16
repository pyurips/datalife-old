import AdminPanel from './screens/admin_panel';
import CharacterCreator from './screens/character_creator';
import Hud from './screens/hud';
import Signin from './screens/signin';
import { useListener } from './utils/use_listener';

export default function App() {
  const { response } = useListener('webView_setScreen');

  return (
    <>
      {/* {!response && <Signin />} */}
      {response === 'characterCreator' && <CharacterCreator />}
      {response === 'adminPanel' && <AdminPanel />}
      {/*response === 'hud'*/true && <Hud />}
    </>
  );
}
