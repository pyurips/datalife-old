import { Input, Button, Link } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function VerifyCodeForm({ email }: { email: string }) {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (seconds) setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [seconds]);

  useEffect(() => {
    if (verificationCode) setVerificationCode((prev) => prev.toUpperCase());
  }, [verificationCode]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-neutral-300">
        Enviamos um código de verificação para{' '}
        <span className="font-bold text-neutral-100">{email}</span>. Lembre-se
        de que o código é válido por até 5 minutos.
      </p>

      <div className="flex flex-row gap-5 items-center">
        <Input
          size="sm"
          className="w-fit"
          value={verificationCode}
          onValueChange={(e) => setVerificationCode(e)}
          placeholder="Digite o código aqui"
          maxLength={6}
          startContent={<p className="font-bold tracking-widest text-lg">V-</p>}
        />

        <Button
          onPress={async () => {
            return setSeconds(60);
          }}
          isDisabled={!!seconds}
          //isLoading={ecLoading || signinLoading}
          color="primary"
          variant="light"
          size="md"
        >
          {seconds
            ? `Reenviar e-mail de confirmação (${seconds})`
            : `Reenviar e-mail de confirmação`}
        </Button>
      </div>
    </div>
  );
}
