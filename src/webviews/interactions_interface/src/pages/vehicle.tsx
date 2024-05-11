import { RequestNames, useRequester } from '@/utils/use_requester';
import { IoPersonCircle } from 'react-icons/io5';
import Loading from './loading';
import { useEffect } from 'react';
import {
  Request_vehicle_getInteractionData,
  Response_vehicle_getInteractionData,
} from '@/types/vehicle';

export default function Vehicle() {
  const { data, fetch, loading } = useRequester<
    Request_vehicle_getInteractionData,
    Response_vehicle_getInteractionData
  >(RequestNames.vehicle_getInteractionData, true);

  useEffect(() => {
    fetch(null);
  }, []);

  if (!data || loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-between w-[200px] h-full">
      <div className="flex flex-col rounded-xl overflow-hidden bg-stone-950 w-full">
        <img
          className="w-full object-cover h-[140px]"
          draggable={false}
          src={data.interactionImageUrl}
        />
        <div className="flex flex-row gap-1 items-center p-2">
          <IoPersonCircle className="text-xl" />
          <p className="text-xs">{data.ownerId || 'Sem proprietário'}</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 bg-stone-950 p-2 rounded-xl">
        <div className="flex items-center justify-center bg-stone-200 size-7 rounded-md">
          <p className="text-stone-900 font-bold text-xl">E</p>
        </div>
        <p className="text-xs">para interagir</p>
      </div>
    </div>
  );
}
