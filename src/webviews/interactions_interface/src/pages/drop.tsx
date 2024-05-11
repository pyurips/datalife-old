import { RequestNames, useRequester } from '@/utils/use_requester';
import { IoPersonCircle } from 'react-icons/io5';
import Loading from './loading';
import { useEffect } from 'react';
import {
  Request_vehicle_getInteractionData,
  Response_vehicle_getInteractionData,
} from '@/types/vehicle';

export default function Drop() {
  const { data, fetch, loading } = useRequester<
    Request_vehicle_getInteractionData,
    Response_vehicle_getInteractionData
  >(RequestNames.vehicle_getInteractionData, true);

  useEffect(() => {
    fetch(null);
  }, []);

  // if (!data || loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-end gap-5 w-[200px] h-full">
      <div className="flex flex-row justify-between rounded-xl overflow-hidden bg-stone-950 w-full p-2 gap-2">
        <div className="flex flex-row gap-1">
          <div className='h-full w-[3px] bg-[red] rounded-full'></div>
          <p className="text-xs">{'Nome do item'}</p>
        </div>

        <p className='text-xs text-stone-400 self-center'>35000</p>
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
