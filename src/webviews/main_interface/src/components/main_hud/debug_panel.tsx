export default function DebugPanel() {
  return (
    <div className="flex flex-col gap-[0.4vw] p-[1vw] rounded-[1vw] w-fit bg-stone-950 text-[1vw]">
      <p>Coordenadas espaciais</p>
      <p className="text-stone-400">{`114.22 | 102.14 | 320.56`}</p>
      <p>Rotação do personagem</p>
      <p className="text-stone-400">{`114.22 | 102.14 | 320.56`}</p>
      <p>Velocidade do personagem</p>
      <p className="text-stone-400">{`114.22`}</p>
    </div>
  );
}
