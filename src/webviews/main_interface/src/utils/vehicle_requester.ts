import { useRequester } from './use_requester';

export function vehicle_createToMeByStaff(): {
  data: { error: string } | undefined;
  fetch: (data: { vehicleHash: number }) => void;
  loading: boolean;
} {
  return useRequester('server', 'vehicle_createToMeByStaff', false);
}
