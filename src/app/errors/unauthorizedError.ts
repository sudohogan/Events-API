import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends Error {
  statusCode: number;
  error: string;
  message: string;

  constructor(statusCode: number, error: string, message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.error = error;
    this.message = message;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
    };
  }
}