export default function DebugPanel() {
  const playerCoords = { x: 0, y: 0, z: 0 };
  const playerRot = { x: 0, y: 0, z: 0 };
  const playerSpeed = { speed: 0 };

  return (
    <div className="flex flex-col gap-[0.4vw] p-[1vw] rounded-[1vw] w-fit h-fit bg-stone-950 text-[1vw]">
      <p>Coordenadas espaciais</p>
      <p className="text-stone-400">{`${playerCoords?.x || 0} | ${
        playerCoords?.y || 0
      } | ${playerCoords?.z || 0}`}</p>
      <p>Rotação do personagem</p>
      <p className="text-stone-400">{`${playerRot?.x || 0} | ${
        playerRot?.y || 0
      } | ${playerRot?.z || 0}`}</p>
      <p>Velocidade do personagem</p>
      <p className="text-stone-400">{`${playerSpeed?.speed || 0}`}</p>
    </div>
  );
}
