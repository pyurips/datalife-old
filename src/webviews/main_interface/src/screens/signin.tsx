import { useEffect, useState } from 'react';
import { Button, Link } from '@nextui-org/react';
import { BsDiscord, BsYoutube, BsInstagram } from 'react-icons/bs';
import datalifeLogoLight from '../assets/signin/datalife_logo_light.svg';
import useRequester from '../utils/useRequester';

export default function Signin() {
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);

  const { responseData, fetchData, loading } = useRequester(
    'auth_discordSignin',
    false
  );

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
        className="bg-stone-950 w-[800px] h-[500px] rounded-2xl flex flex-col overflow-hidden"
      >
        <div className="flex flex-1 overflow-hidden">
          <img
            src="https://cdn.discordapp.com/attachments/1059659527286444153/1185677825668284548/pabloyprado_badass_night_man_riding_bike_gta_v_art_style_ab28e7ff-e8d5-48d8-b80a-a35661f727ce.png?ex=65907b86&is=657e0686&hm=cfda0d28ffe5be3f2dd03a882af22e202b64be9a0efe4cb605b4b4510aa09dbe&"
            alt="DATALIFE signin photo"
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute p-3 flex flex-1">
            <img
              src={datalifeLogoLight}
              alt="DATALIFE logo"
              className="w-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-row gap-5 items-center">
            <Button
              onPress={() => fetchData()}
              variant="flat"
              color="success"
              startContent={!loading && <BsDiscord size={20} />}
              isLoading={loading}
            >
              Entrar com o Discord
            </Button>
          </div>

          {responseData?.internalCode && (
            <p className="text-xs text-red-600">{responseData?.message}</p>
          )}

          <div className="flex flex-row items-center justify-between">
            <p className="text-xs text-neutral-500">
              Para criar uma conta ou recuperar sua senha, visite{' '}
              <Link
                isExternal
                size="sm"
                color="foreground"
                href="https://www.dataliferp.com/"
              >
                dataliferp.com
              </Link>
              {'.'}
            </p>

            <div className="flex gap-1">
              <Link href="https://discord.gg/fvYjbYrMBx" isExternal>
                <Button
                  size="sm"
                  isIconOnly
                  color="default"
                  variant="light"
                  aria-label="Like"
                >
                  <BsDiscord size={20} />
                </Button>
              </Link>

              <Link
                href="https://youtube.com/@dataliferp?si=9TacnrF2zC07l0Zm"
                isExternal
              >
                <Button
                  size="sm"
                  isIconOnly
                  color="default"
                  variant="light"
                  aria-label="Like"
                >
                  <BsYoutube size={20} />
                </Button>
              </Link>

              <Link href="https://www.instagram.com/dataliferp/" isExternal>
                <Button
                  size="sm"
                  isIconOnly
                  color="default"
                  variant="light"
                  aria-label="Like"
                >
                  <BsInstagram size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
