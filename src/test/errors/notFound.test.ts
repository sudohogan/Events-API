import { NotFoundError } from "../../app/errors";
import { StatusCodes } from 'http-status-codes';

describe('Not Found Error Suite', () => {
  const statusCode = StatusCodes.NOT_FOUND;
  const error = 'Not Found';
  const message = 'Resource not found';
  const notFoundError = new NotFoundError(statusCode, error, message);

  it('returns the correct error message', () => {
    expect(notFoundError.error).toBe(error);
  });

  it('returns the correct http statusCode', () => {
    expect(notFoundError.statusCode).toBe(statusCode);
  });

  it('returns the correct message', () => {
    expect(notFoundError.message).toBe(message);
  });

  it('returns the correct JSON format', () => {
    const resultJSON = {
      statusCode: statusCode,
      error: error,
      message: message,
    };
    expect(notFoundError.toJSON()).toEqual(resultJSON);
  });
});
