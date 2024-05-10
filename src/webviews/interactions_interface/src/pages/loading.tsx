import { VscLoading } from 'react-icons/vsc';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-[512px] h-[256px]">
      <VscLoading className="text-[40px] animate-spin text-stone-500" />
    </div>
  );
}