import AdminPanel from "./screens/admin_panel";
import CharacterCreator from "./screens/character_creator";
import Hud from "./screens/hud";
import Signin from "./screens/signin";
import { useListener } from "./utils/use_listener";

export default function App() {
  const screen = useListener("webView_setScreen");

  return (
    <>
      {!screen && <Signin />}
      {screen === "characterCreator" && <CharacterCreator />}
      {screen === "adminPanel" && <AdminPanel />}
      {screen === "hud" && <Hud />}
    </>
  );
}
