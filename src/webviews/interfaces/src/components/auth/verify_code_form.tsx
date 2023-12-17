import { Input, Button, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import useEvents from '../../utils/use_events';

export default function VerifyCodeForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(60);
  const [errorMessage, setErrorMessage] = useState('');

  const { fetchData, responseData, loading, loadingHandler } = useEvents(
    'server',
    'auth_signinTwoFa'
  );

  useEffect(() => {
    loadingHandler(false);
  }, []);

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
    if (verificationCode.length === 6 && !loading) {
      setErrorMessage('');
      setVerificationCode('');
      fetchData({ email, password, verificationCode });
    }
  }, [verificationCode]);

  useEffect(() => {
    if (responseData.error) setErrorMessage(responseData.error?.message);
  }, [responseData]);

  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner color="success" labelColor="success" size="lg" />
      </div>
    );

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
          isInvalid={!!errorMessage}
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

        <Button
          onPress={async () => {
            window.location.reload();
          }}
          color="danger"
          variant="light"
          size="sm"
        >
          Cancelar
        </Button>
      </div>
      {!!errorMessage && (
        <p className="text-xs text-[#f31260]">{errorMessage}</p>
      )}
    </div>
  );
}
