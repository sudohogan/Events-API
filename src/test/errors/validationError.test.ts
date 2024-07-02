import { ValidationError } from "../../app/errors";
import { StatusCodes } from 'http-status-codes';

describe('Validation Error Test Suite', () => {
    const errors = [
      { resource: 'login', message: 'invalid email' },
    ];
    const validationError = new ValidationError(errors);
  
    it('returns the correct name', () => {
      expect(validationError.name).toBe('ValidationError');
    });
  
    it('returns the correct error message', () => {
      expect(validationError.message).toBe('Validation Error');
    });
  
    it('returns the correct errors array', () => {
      expect(validationError.errors).toEqual(errors);
    });
  
    it('returns the correct JSON representation', () => {
      const resultJSON = {
        type: 'Validation Error',
        errors: errors,
      };
      expect(validationError.toJSON()).toEqual(resultJSON);
    });
  });