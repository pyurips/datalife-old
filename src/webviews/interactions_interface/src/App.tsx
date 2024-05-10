import Loading from './pages/loading';
import Vehicle from './pages/vehicle';
import { getEntityTypeEvent } from './utils/use_listener';

export default function App() {
  const entityType = getEntityTypeEvent();

  return (
    <main className="flex items-center justify-center w-[512px] h-[256px]">
      {!entityType && <Loading />}
      {entityType === 'vehicle' && <Vehicle />}
    </main>
  );
}
