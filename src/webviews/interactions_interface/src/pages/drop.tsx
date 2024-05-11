import { RequestNames, useRequester } from '@/utils/use_requester';
import Loading from './loading';
import { useEffect } from 'react';
import {
  Request_item_getInteractionDropData,
  Response_item_getInteractionDropData,
} from '@/types/drop';
import { getItem } from '@/utils/items_list';

function getQualityColor(quality: 0 | 1 | 2) {
  if (quality === 1) return 'bg-sky-950';
  if (quality === 2) return 'bg-violet-950';
  return '';
}

export default function Drop() {
  const { data, fetch, loading } = useRequester<
    Request_item_getInteractionDropData,
    Response_item_getInteractionDropData
  >(RequestNames.item_getInteractionDropData, true);

  useEffect(() => {
    fetch(null);
  }, []);

  if (!data || loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-end gap-5 w-[200px] h-full">
      <div className="flex flex-row justify-between rounded-xl overflow-hidden bg-stone-950 w-full p-2 gap-2">
        <div className="flex flex-row gap-1">
          {getQualityColor(data.quality) && (
            <div
              className={`h-full w-[3px] rounded-full ${getQualityColor(
                data.quality
              )}`}
            ></div>
          )}
          <p className="text-xs">{getItem(data.itemId, data.type).name}</p>
        </div>

        <p className="text-xs text-stone-400 self-center">{data.amount || 0}</p>
      </div>

      <div className="flex flex-row items-center gap-2 bg-stone-950 p-2 rounded-xl">
        <div className="flex items-center justify-center bg-stone-200 size-7 rounded-md">
          <p className="text-stone-900 font-bold text-xl">E</p>
        </div>
        <p className="text-xs">para pegar</p>
      </div>
    </div>
  );
}
