
export class CustomAPIError extends Error {
  static UnauthenticatedError: any;
  static BadRequestError: any;
  static UnauthorizedError: any;
  static NotFoundError: any;
  constructor(message: string) {
    super(message);
  }
}