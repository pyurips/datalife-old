import { useRequester } from './use_requester';

export function vehicle_getInteractionData(): {
  data: { ownerId: string; interactionImageUrl: string } | undefined;
  fetch: () => void;
  loading: boolean;
} {
  return useRequester('client', 'vehicle_getInteractionData', true);
}
