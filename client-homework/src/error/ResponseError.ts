export class ResponseError extends Error {
  constructor(error: string, message: string) {
    super(message);
    this.name = error;
    this.message = message;
  }
}

export type ResponseErrorType = {
  error: string;
  message: string;
};
