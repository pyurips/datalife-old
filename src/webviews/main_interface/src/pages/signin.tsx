import { FaDiscord } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { BsDiscord, BsYoutube, BsInstagram } from 'react-icons/bs';
import { VscLoading } from 'react-icons/vsc';
import useRequester from '@/utils/use_requester';
import signinHomeImage from '@/assets/signin_home_image.png';
import { usePage } from '@/contexts/page';
import { useEffect, useState } from 'react';

export default function Signin() {
  const setPage = usePage((state) => state.setPage);
  const setCanChangePage = usePage((state) => state.setCanChangePage);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: data_1,
    fetch: fetch_1,
    loading: loading_1,
  } = useRequester(['client_auth_getDiscordToken'], false);

  const { fetch: fetch_2, loading: loading_2 } = useRequester(
    [
      'server_auth_signin',
      'server_account_loadCharacter',
      'server_character_loadIntoWorld',
      'client_customCamera_delete',
    ],
    false
  );

  useEffect(() => {
    (async function () {
      try {
        if (data_1[0]) {
          await fetch_2(data_1[0]);
          setPage('mainHud');
          setCanChangePage(true);
        }
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    })();
  }, [data_1]);

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
          disabled={loading_1 || loading_2}
          className="flex flex-row items-center gap-[0.5vw] px-[1.5vw] py-[1vw] h-min bg-green-800 hover:bg-green-900"
          onClick={async () => {
            try {
              await fetch_1();
            } catch (error: any) {
              setErrorMessage(error.message);
            }
          }}
        >
          {!(loading_1 || loading_2) && <FaDiscord className="text-[1.5vw]" />}
          {(loading_1 || loading_2) && (
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

      {errorMessage && (
        <p className="text-red-500 text-[0.9vw] px-[1vw]">{errorMessage}</p>
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
