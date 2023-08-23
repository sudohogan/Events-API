import { StatusCodes } from 'http-status-codes';

export class InternalServer extends Error {
  statusCode: number;
  error: string;
  message: string;

  constructor(message = 'Not Found') {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.error = 'Internal Server Error';
    this.message = message;
    //this.name = this.constructor.name;
  }
}