import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider
} from "@nextui-org/react";

export default function Item() {
  return (
    <Popover className="dark">
      <PopoverTrigger>
        <Button className="w-[80px] h-[80px] bg-stone-900"></Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3 p-2 max-w-[200px]">
          <div className="text-sm text-stone-300 text-justify">Nome do item dsa da da dasda dasad dasda weerr</div>
          <div className="text-xs text-stone-400 text-justify">Descrição do item das dad as da dadas da da das da dad ad a</div>
          <Divider />
          <Button size="sm" variant="light" className="justify-start">Botão 1</Button>
          <Button size="sm" variant="light" className="justify-start">Botão 1</Button>
          <Button size="sm" variant="light" className="justify-start">Botão 1</Button>
          <Button size="sm" variant="light" className="justify-start">Botão 1</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
