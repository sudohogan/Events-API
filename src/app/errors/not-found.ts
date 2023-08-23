import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  statusCode: number;
  error: string;
  message: string;

  constructor(message = 'Not Found') {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.error = 'Not Found';
    this.message = message;
    this.name = this.constructor.name;
  }
} 