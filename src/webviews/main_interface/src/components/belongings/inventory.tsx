import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import Item from "./item";

export default function Inventory() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Input size="sm" variant="underlined" startContent={<FaSearch size={20} />} />

      <div className="flex flex-row gap-4 flex-wrap overflow-auto">
        {new Array(50).fill(0).map((_) => (
          <Item />
        ))}
      </div>
    </div>
  );
}
