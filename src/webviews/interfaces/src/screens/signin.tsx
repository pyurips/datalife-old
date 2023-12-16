import { useEffect, useState } from 'react';
import { Input, Button, Link } from '@nextui-org/react';
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsDiscord,
  BsYoutube,
  BsInstagram,
} from 'react-icons/bs';
import useFetcher from '../utils/use_fetcher';
import useEvents from '../utils/use_events';

export default function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);

  const {
    loading: signinLoading,
    error: signinError,
    fetchData: doSignin,
    loadingHandler: loadingSigninHandler,
  } = useFetcher({
    resource: '/accounts/signin',
    method: 'post',
    body: {
      email,
      password,
    },
  });

  const { fetchData, responseData } = useEvents('server', 'testando');

  useEffect(() => {
    fetchData({
      message: 'Olá do cliente!',
    });

    const handleResize = () => {
      setScale((window.innerWidth + 520) / 1886.6);
    };

    loadingSigninHandler(false);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (responseData) console.log(responseData.content);
  }, [responseData]);

  useEffect(() => {
    if (signinError) setErrorMessage(signinError.message);
  }, [signinError]);

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div
        style={{ transform: `scale(${scale})` }}
        className="bg-neutral-900 w-[800px] h-[500px] rounded-2xl flex flex-col overflow-hidden"
      >
        <div className="flex flex-1 overflow-hidden">
          <img
            src="https://cdn.discordapp.com/attachments/1059659527286444153/1185677825668284548/pabloyprado_badass_night_man_riding_bike_gta_v_art_style_ab28e7ff-e8d5-48d8-b80a-a35661f727ce.png?ex=65907b86&is=657e0686&hm=cfda0d28ffe5be3f2dd03a882af22e202b64be9a0efe4cb605b4b4510aa09dbe&"
            alt="DATALIFE signin photo"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 p-5"
        >
          <div className="flex flex-row gap-5 items-center">
            <Input
              value={email}
              onValueChange={(e) => setEmail(e)}
              isClearable
              type="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
              className="max-w-[300px]"
              isInvalid={!!signinError?.message}
              maxLength={256}
              spellCheck={false}
              size="sm"
            />

            <Input
              placeholder="Digite sua senha"
              value={password}
              onValueChange={(e) => setPassword(e)}
              autoComplete="current-password"
              maxLength={256}
              spellCheck={false}
              size="sm"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={passwordVisible ? 'text' : 'password'}
              className="max-w-[300px]"
            />

            <Button
              onPress={() => {
                setErrorMessage('');
                doSignin();
              }}
              variant="flat"
              color="success"
              className="h-full"
              isLoading={signinLoading}
            >
              Entrar
            </Button>
          </div>
          {!!errorMessage && (
            <p className="text-xs text-[#f31260]">{errorMessage}</p>
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
        </form>
      </div>
    </main>
  );
}
