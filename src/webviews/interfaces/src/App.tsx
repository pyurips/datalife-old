import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import './App.css';

function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="bg-neutral-900 w-[60%] h-[70%] rounded-lg lg:rounded-2xl flex flex-col overflow-hidden transition-all">
        <div className="bg-[red] flex flex-1 overflow-hidden">
          <img
            src="https://cdn.discordapp.com/attachments/1059659527286444153/1178237428910268506/pabloyprado_smartphone_in_gta_v_art_style_808098e3-4c8a-46b6-affd-05c367405624.png?ex=6587df1d&is=65756a1d&hm=edf057b98eab786566af85cbc993fea129d8962302d4b6f5720df9f8005fe699&"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-row gap-5 p-5 items-center"
        >
          <Input
            value={email}
            onValueChange={(e) => setEmail(e)}
            isClearable
            type="email"
            autoComplete="email"
            placeholder="Digite seu e-mail"
            className='max-w-[300px]'
          />

          <Input
            placeholder="Digite sua senha"
            value={password}
            onValueChange={(e) => setPassword(e)}
            autoComplete="current-password"
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
            className='max-w-[300px]'
          />

          <Button variant='flat' color='success' className='h-full'>
            Entrar
          </Button>
        </form>
      </div>
    </main>
  );
}

export default App;
