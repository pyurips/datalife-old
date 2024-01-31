import { Input, Progress } from "@nextui-org/react";
import { FaSearch, FaWeightHanging } from "react-icons/fa";
import Item from "./item";

export default function Inventory() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Input
        size="sm"
        variant="underlined"
        startContent={<FaSearch size={20} />}
      />

      <div className="flex flex-row gap-4 flex-wrap overflow-auto">
        {new Array(50).fill(0).map((_, i) => (
          <Item key={i}/>
        ))}
      </div>

      <div className="flex flex-row items-center justify-between gap-3">
        <FaWeightHanging />
        <Progress size="sm" color="secondary" aria-label="Loading..." value={70} />
        <div className="flex flex-row gap-1 items-center">
          <p className="text-stone-300 text-sm">112/150</p>
          <p className="text-stone-400 text-xs">kg</p>
        </div>
      </div>
    </div>
  );
}
