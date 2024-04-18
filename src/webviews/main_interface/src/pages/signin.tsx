import { FaDiscord } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { BsDiscord, BsYoutube, BsInstagram } from 'react-icons/bs';
import { VscLoading } from 'react-icons/vsc';
import signinHomeImage from '@/assets/signin_home_image.png';
import { auth_signInTest } from '@/utils/use_requester';

export default function Signin() {
  const { data, fetch, loading } = auth_signInTest();

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
          disabled={loading}
          className="flex flex-row items-center gap-[0.5vw] px-[1.5vw] py-[1vw] h-min bg-green-800 hover:bg-green-900"
          onClick={() => fetch()}
        >
          {!loading && <FaDiscord className="text-[1.5vw]" />}
          {loading && <VscLoading className="text-[1.1vw] animate-spin" />}
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

      {data?.error && (
        <p className="text-red-500 text-[0.9vw] px-[1vw]">{data.error}</p>
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
