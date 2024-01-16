type IClientError = {
  message?: string;
  internalCode: number;
};

export class ClientError extends Error {
  internalCode: number;

  constructor({
    message = 'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.',
    internalCode,
  }: IClientError) {
    super(message);
    this.internalCode = internalCode;
  }
}