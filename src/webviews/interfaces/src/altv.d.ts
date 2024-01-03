interface Window {
  alt?: {
    on: (event: string, callback: (data: any) => void) => void;
    // Você pode adicionar outros métodos e propriedades conforme necessário
  };
}