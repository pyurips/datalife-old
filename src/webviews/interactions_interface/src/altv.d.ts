interface Window {
  alt?: {
    on: (
      event: string,
      callback: (response: {
        data: unknown;
        status: number;
        error: { message: string; internalCode: number };
      }) => void
    ) => void;
    emit: (eventName: string, ...args: any[]) => void;
    once: (eventName: string, listener: (...args: any[]) => void) => void;
    off: (eventName: string, listener: (...args: any[]) => void) => void;
  };
}