const faceFeatures = {
  Nariz: [
    { id: 0, label: 'Largura do nariz', min: -1, max: 1, default: 0 },
    { id: 1, label: 'Pico do nariz', min: -1, max: 1, default: 0 },
    { id: 2, label: 'Comprimento do nariz', min: -1, max: 1, default: 0 },
    { id: 3, label: 'Curvatura do osso do nariz', min: -1, max: 1, default: 0 },
    { id: 4, label: 'Ponta do nariz', min: -1, max: 1, default: 0 },
    { id: 5, label: 'Torção do osso do nariz', min: -1, max: 1, default: 0 },
  ],
  Sobrancelha: [
    { id: 6, label: 'Sobrancelha (altura)', min: -1, max: 1, default: 0 },
    { id: 7, label: 'Sobrancelha (distância)', min: -1, max: 1, default: 0 },
  ],
  Bochecha: [
    {
      id: 8,
      label: 'Altura dos ossos da bochecha',
      min: -1,
      max: 1,
      default: 0,
    },
    {
      id: 9,
      label: 'Tamanho lateral dos ossos da bochecha',
      min: -1,
      max: 1,
      default: 0,
    },
    {
      id: 10,
      label: 'Largura dos ossos da bochecha',
      min: -1,
      max: 1,
      default: 0,
    },
  ],
  Olhos: [{ id: 11, label: 'Abertura dos olhos', min: -1, max: 1, default: 0 }],
  Lábios: [
    { id: 12, label: 'Espessura dos lábios', min: -1, max: 1, default: 0 },
  ],
  Mandíbula: [
    {
      id: 13,
      label: 'Largura do osso da mandíbula',
      min: -1,
      max: 1,
      default: 0,
    },
    {
      id: 14,
      label: 'Formato do osso da mandíbula',
      min: -1,
      max: 1,
      default: 0,
    },
  ],
  Queixo: [
    { id: 15, label: 'Osso do queixo', min: -1, max: 1, default: 0 },
    {
      id: 16,
      label: 'Comprimento do osso do queixo',
      min: -1,
      max: 1,
      default: 0,
    },
    { id: 17, label: 'Formato do osso do queixo', min: -1, max: 1, default: 0 },
    { id: 18, label: 'Cova do queixo', min: -1, max: 1, default: 0 },
  ],
  Pescoço: [
    { id: 19, label: 'Espessura do pescoço', min: -1, max: 1, default: 0 },
  ],
};

export default faceFeatures;
