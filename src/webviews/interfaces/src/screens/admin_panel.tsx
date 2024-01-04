import { Switch, Button, ScrollShadow } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import adminCategories from '../utils/admin_categories';

export default function AdminPanel() {
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);
  const [category, setCategory] = useState<{
    category: string;
    options: string[];
  }>(adminCategories[0]);
  const [option, setOption] = useState<string>(category.options[0]);

  useEffect(() => {
    const handleResize = () => {
      setScale((window.innerWidth + 520) / 1886.6);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div
        style={{ transform: `scale(${scale})` }}
        className="bg-neutral-900 w-[800px] h-[500px] rounded-2xl flex flex-col overflow-hidden"
      >
        <header className="flex flex-row w-full p-4 items-center justify-between">
          <div className="flex flex-row gap-3 items-center">
            <p className="text-lg">pabloyuri</p>
            <p className="text-sm text-neutral-500">Administrador</p>
          </div>

          <div>
            <Switch size="sm">Modo debug</Switch>
          </div>
        </header>

        <div className="flex flex-row gap-4 w-full p-4 overflow-x-auto">
          {adminCategories.map((e, i) => (
            <Button
              onPress={() => setCategory(e)}
              style={{
                opacity: category === e ? '1' : '0.5',
              }}
              key={i}
            >
              {e.category}
            </Button>
          ))}
        </div>

        <div className="flex flex-row flex-1 p-3 overflow-y-auto">
          <ScrollShadow hideScrollBar={true}>
            <div className="flex flex-col gap-2">
              {category.options.map((e, i) => (
                <Button key={i} variant="light">
                  <p className="text-neutral-300">{e}</p>
                </Button>
              ))}
            </div>
          </ScrollShadow>

          <div className="flex flex-1 w-full p-3">asdads</div>
        </div>
      </div>
    </main>
  );
}
