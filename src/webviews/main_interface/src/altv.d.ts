interface Window {
  alt?: {
    on: (
      event: string,
      callback: (response: any) => void
    ) => void;
    emit: (eventName: string, ...args: any[]) => void;
    once: (eventName: string, listener: (...args: any[]) => void) => void;
    off: (eventName: string, listener: (...args: any[]) => void) => void;
  };
}
