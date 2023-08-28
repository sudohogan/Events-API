import { UnauthorizedError } from "../../app/errors";
import { StatusCodes } from 'http-status-codes';

describe('Not Found Error Suite', () => {
  const statusCode = StatusCodes.UNAUTHORIZED;
  const error = 'Unauthorized';
  const message = 'You are not authorized to make this request';
  const unauthorizedError = new UnauthorizedError(statusCode, error, message);

  it('returns the correct http statusCode', () => {
    expect(unauthorizedError.statusCode).toBe(statusCode);
  });

  it('returns the correct error message', () => {
    expect(unauthorizedError.error).toBe(error);
  });

  it('returns the correct message', () => {
    expect(unauthorizedError.message).toBe(message);
  });

  it('returns the correct JSON format', () => {
    const resultJSON = {
      statusCode: statusCode,
      error: error,
      message: message,
    };
    expect(unauthorizedError.toJSON()).toEqual(resultJSON);
  });
});
