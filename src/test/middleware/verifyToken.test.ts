import { verifyToken, blacklistedTokens } from "../../app/middleware/verifyToken";  

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn((token, secret) => {
      // Custom logic for mock verification
      // Return the decoded token or throw an error
    }),
  }));
  
  // Mocking the verifyToken middleware
  
  describe('verifyToken', () => {
    beforeEach(() => {
      blacklistedTokens.length = 0;
    });
  
    it('should call next() if token is valid', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer 9000',
        },
        user: undefined,
      };
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Create a mock next function
      const mockNext = jest.fn();
        verifyToken(mockRequest as any, mockResponse as any, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });

     it('returns an error if there is no token', () => {
      const mockRequest = {
        headers: {},
      };
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
      const mockNext = jest.fn();
  
      verifyToken(mockRequest as any, mockResponse as any, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.send).toHaveBeenCalledWith('A token is required for authentication');
    });
  
    it('returns an error if token is invalid', () => {
      blacklistedTokens.push('invalid_token');
        
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRequest = {
        headers: {
          authorization: 'Bearer invalid_token',
        },
      };
  
      const mockNext = jest.fn();
        verifyToken(mockRequest as any, mockResponse as any, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Token has been invalidated' });
    });
  
   
  });
  