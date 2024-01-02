import datalifeLogoDark from '../assets/signin/datalife_logo_dark.svg';

export default function DebugHud() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <header className="flex flex-row w-full p-2 items-end gap-2">
        <img
          src={datalifeLogoDark}
          alt="DATALIFE logo dark"
          className="w-[100px]"
        />
        <p className="text-sm text-neutral-400">v0.01</p>
      </header>
    </main>
  );
}
