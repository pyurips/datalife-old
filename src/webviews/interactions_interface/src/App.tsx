import Drop from './pages/drop';
import Loading from './pages/loading';
import Vehicle from './pages/vehicle';
import { Event_item_getEntityType } from './types/entity';
import { EventNames, useListener } from './utils/use_listener';

export default function App() {
  const entityType = useListener<Event_item_getEntityType>(
    EventNames.interaction_getEntityType
  );

  return (
    <main className="flex items-center justify-center w-[512px] h-[256px]">
      {!entityType && <Loading />}
      {entityType === 'vehicle' && <Vehicle />}
      {entityType === 'drop' && <Drop />}
    </main>
  );
}
