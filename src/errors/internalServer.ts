import {	StatusCodes } from 'http-status-codes';
import { CustomAPIError } from "./custom-api";

export class InternalServer extends CustomAPIError {
  statusCode: StatusCodes
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServer;
