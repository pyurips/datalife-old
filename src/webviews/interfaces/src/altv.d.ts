interface Window {
  alt?: {
    on: (event: string, callback: (data: any) => void) => void;
    emit: (eventName: string, ...args: any[]) => void;
    once: (eventName: string, listener: (...args: any[]) => void) => void;
  };
}
