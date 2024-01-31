import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export default function Item() {
  return (
    <Dropdown className="dark">
      <DropdownTrigger>
        <Button className="w-[80px] h-[80px] bg-stone-900"></Button>
      </DropdownTrigger>
      <DropdownMenu className="dark" aria-label="Static Actions">
        <DropdownItem key="new" className="text-stone-300">
          New file
        </DropdownItem>
        <DropdownItem key="copy" className="text-stone-300">
          Copy link
        </DropdownItem>
        <DropdownItem key="edit" className="text-stone-300">
          Edit file
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
