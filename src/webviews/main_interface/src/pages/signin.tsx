import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { BsDiscord, BsYoutube, BsInstagram } from "react-icons/bs";

export default function Signin() {
  return (
    <div className="flex flex-col w-[50vw] h-[30vw] bg-stone-950 rounded-[1vw] overflow-hidden gap-[1vw]">
      <div className="flex flex-1 overflow-hidden">
        <img
          src="https://cdn.discordapp.com/attachments/1059659527286444153/1185677825668284548/pabloyprado_badass_night_man_riding_bike_gta_v_art_style_ab28e7ff-e8d5-48d8-b80a-a35661f727ce.png?ex=65c7da86&is=65b56586&hm=35ab68b5b3fd8b12a793128db2c4352cee88733cccdc27debb87aacc1a01ee07&"
          alt="Signin image"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex flex-row items-center justify-between px-[1vw]">
        <Button className="flex flex-row items-center gap-[0.5vw] px-[1.5vw] py-[1vw] h-min bg-green-800">
          <FaDiscord className="text-[1.5vw]" />
          <p className="font-normal text-[1.1vw]">Entrar</p>
        </Button>

        <div className="flex flex-row gap-[0.5vw]">
          <Button
            variant="ghost"
            className="text-stone-300 hover:text-stone-950 p-[0.5vw] h-min"
          >
            <BsDiscord className="text-[1.5vw]" />
          </Button>
          <Button
            variant="ghost"
            className="text-stone-300 hover:text-stone-950 p-[0.5vw] h-min"
          >
            <BsYoutube className="text-[1.5vw]" />
          </Button>
          <Button
            variant="ghost"
            className="text-stone-300 hover:text-stone-950 p-[0.5vw] h-min"
          >
            <BsInstagram className="text-[1.5vw]" />
          </Button>
        </div>
      </div>

      <p className="text-stone-400 text-[1vw] px-[1vw] pb-[1vw]">
        Para mais informações sobre o servidor, visite
        <a
          href="https://www.dataliferp.com/"
          target="_blank"
          className="text-stone-100"
        >
          {" "}
          dataliferp.com
        </a>
        .
      </p>
    </div>
  );
}
