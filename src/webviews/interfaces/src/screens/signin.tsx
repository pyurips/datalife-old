import { useEffect, useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import useFetcher from '../utils/use_fetcher';

export default function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scale, setScale] = useState((window.innerWidth + 520) / 1886.6);

  const {
    status: signinStatus,
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

  useEffect(() => {
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
    console.log(signinStatus);
  }, [signinStatus]);

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
            src="https://cdn.discordapp.com/attachments/1059659527286444153/1178237428910268506/pabloyprado_smartphone_in_gta_v_art_style_808098e3-4c8a-46b6-affd-05c367405624.png?ex=6587df1d&is=65756a1d&hm=edf057b98eab786566af85cbc993fea129d8962302d4b6f5720df9f8005fe699&"
            alt=""
            className="w-full h-full object-cover"
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
              size='sm'
            />

            <Input
              placeholder="Digite sua senha"
              value={password}
              onValueChange={(e) => setPassword(e)}
              autoComplete="current-password"
              maxLength={256}
              spellCheck={false}
              size='sm'
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
        </form>
      </div>
    </main>
  );
}
