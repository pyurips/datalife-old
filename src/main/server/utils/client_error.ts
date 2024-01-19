function sendClientError(
  internalCode: number,
  showInternalCode = true,
  message?: string
) {
  const clientError = new Error(
    (message ||
      'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.') +
      `${showInternalCode && ` (${internalCode})`}`
  );
  clientError.name = 'DATALIFEClientError';
  return clientError;
}

export default sendClientError;
