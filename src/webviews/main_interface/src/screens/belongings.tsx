import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { MdInventory } from "react-icons/md";
import Character from "../components/belongings/character";
import Inventory from "../components/belongings/inventory";

export default function Belongings() {
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);
  const [category, setCategory] = useState<"character" | "inventory">(
    "character"
  );

  useEffect(() => {
    const handleResize = () => {
      setScale((window.innerWidth + 520) / 1886.6);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div
        style={{ transform: `scale(${scale})` }}
        className="bg-stone-950 w-[800px] h-[500px] rounded-2xl flex flex-row overflow-hidden"
      >
        <div className="flex flex-1 p-3">
          {category === "character" && <Character />}
          {category === "inventory" && <Inventory />}
        </div>

        <div className="flex flex-col gap-3 p-3 overflow-auto">
          <Button
            isIconOnly
            size="lg"
            className="min-w-[70px] min-h-[70px] bg-stone-800"
            style={{ opacity: category === "character" ? 1 : 0.5 }}
            onPress={() => setCategory("character")}
          >
            <IoPersonCircle size={30} />
          </Button>
          <Button
            isIconOnly
            size="lg"
            className="min-w-[70px] min-h-[70px] bg-stone-800"
            style={{ opacity: category === "inventory" ? 1 : 0.5 }}
            onPress={() => setCategory("inventory")}
          >
            <MdInventory size={30} />
          </Button>
        </div>
      </div>
    </main>
  );
}
