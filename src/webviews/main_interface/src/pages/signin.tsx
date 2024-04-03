import { FaDiscord } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { BsDiscord, BsYoutube, BsInstagram } from 'react-icons/bs';
import { VscLoading } from 'react-icons/vsc';
import useRequester from '@/utils/use_requester';
import signinHomeImage from '@/assets/signin_home_image.png';
import { useEffect } from 'react';
import { usePage } from '@/contexts/page';

export default function Signin() {
  const setPage = usePage((state) => state.setPage);

  const {
    data: data_1,
    fetch: fetch_1,
    loading: loading_1,
  } = useRequester('client_auth_getDiscordToken', false);

  const {
    data: data_2,
    fetch: fetch_2,
    loading: loading_2,
  } = useRequester('server_auth_signin', false);

  const {
    data: data_3,
    fetch: fetch_3,
    loading: loading_3,
  } = useRequester('server_account_loadCharacter', false);

  const {
    data: data_4,
    fetch: fetch_4,
    loading: loading_4,
  } = useRequester('server_character_loadIntoWorld', false);

  const {
    data: data_5,
    fetch: fetch_5,
    loading: loading_5,
  } = useRequester('client_customCamera_delete', false);

  useEffect(() => {
    if (data_1?.token) fetch_2({ token: data_1.token });
  }, [data_1]);

  useEffect(() => {
    if (data_2 && !data_2?.error) fetch_3();
  }, data_2);

  useEffect(() => {
    if (data_3 && !data_3?.error) {
      fetch_4();
      fetch_5();
      setPage('mainHud');
    }
  }, [data_3]);

  return (
    <div className="flex flex-col w-[50vw] h-[30vw] bg-stone-950 rounded-[1vw] overflow-hidden gap-[1vw]">
      <div className="flex flex-1 overflow-hidden">
        <img
          src={signinHomeImage}
          alt="Signin image"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex flex-row items-center justify-between px-[1vw]">
        <Button
          variant="secondary"
          disabled={
            loading_1 || loading_2 || loading_3 || loading_4 || loading_5
          }
          className="flex flex-row items-center gap-[0.5vw] px-[1.5vw] py-[1vw] h-min bg-green-800 hover:bg-green-900"
          onClick={() => fetch_1()}
        >
          {!(loading_1 || loading_2 || loading_3 || loading_4 || loading_5) && (
            <FaDiscord className="text-[1.5vw]" />
          )}
          {(loading_1 || loading_2 || loading_3 || loading_4 || loading_5) && (
            <VscLoading className="text-[1.1vw] animate-spin" />
          )}
          <p className="font-normal text-[1.1vw]">Entrar</p>
        </Button>

        <div className="flex flex-row gap-[0.5vw]">
          <Button variant="ghost" className="p-[0.5vw] h-min">
            <BsDiscord className="text-[1.5vw]" />
          </Button>
          <Button variant="ghost" className="p-[0.5vw] h-min">
            <BsYoutube className="text-[1.5vw]" />
          </Button>
          <Button variant="ghost" className="p-[0.5vw] h-min">
            <BsInstagram className="text-[1.5vw]" />
          </Button>
        </div>
      </div>

      {(data_1?.error ||
        data_2?.error ||
        data_3?.error ||
        data_4?.error ||
        data_5?.error) && (
        <p className="text-red-500 text-[0.9vw] px-[1vw]">
          {data_1?.error ||
            data_2?.error ||
            data_3?.error ||
            data_4?.error ||
            data_5?.error}
        </p>
      )}

      <p className="text-stone-400 text-[1vw] px-[1vw] pb-[1vw]">
        Para mais informações sobre o servidor, visite
        <a
          href="https://www.dataliferp.com/"
          target="_blank"
          className="text-stone-100"
        >
          {' '}
          dataliferp.com
        </a>
        .
      </p>
    </div>
  );
}
