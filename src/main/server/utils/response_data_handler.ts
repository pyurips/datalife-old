const DEFAULT_ERROR_MESSAGE =
  'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.';

type IResponse = {
  data: unknown;
  status: number;
  error: { message?: string; internalCode: number } | null;
};

function setResponseData(response: IResponse) {
  return {
    data: response.data,
    status: response.status,
    error: {
      message: DEFAULT_ERROR_MESSAGE || response.error.message,
      internalCode: response.error.internalCode,
    },
  };
}

export default setResponseData;
