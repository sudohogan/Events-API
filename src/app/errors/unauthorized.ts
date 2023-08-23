import { StatusCodes } from 'http-status-codes';

export class UnauthorizedError extends Error {
  statusCode: number;
  error: string;
  message: string;

  constructor(message = 'Unauthorized') {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.error = 'Unauthorized';
    this.message = message;
    this.name = this.constructor.name;
  }
}