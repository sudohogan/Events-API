import { Router } from 'express'
import { joiRegister, joiLogin } from '../../app/middleware/joiUser'
import { signUp, signIn } from '../../app/controllers/userController'
import { userRouter } from "../../app/routes/userRoutes";

jest.mock('express', () => ({
  Router: jest.fn(()=> ({
    post: jest.fn(),
  })),
}))

jest.mock('../../app/controllers/userController', () => ({
    signUp: jest.fn(),
    signIn: jest.fn(),
  }))

jest.mock('../../app/middleware/joiUser', () => ({
  joiRegister: jest.fn(),
  joiLogin: jest.fn(),
}))

describe('Test suite for userRouter', () => {
  it('should create the user /sign-up route with the required middleware functions', () => {
    const routerMock = {
        post: jest.fn(),
      };

    (Router as jest.Mock).mockReturnValue(routerMock)

    expect(Router).toHaveBeenCalled()
    expect(userRouter.post).toHaveBeenCalledWith('/sign-up', joiRegister, signUp)
  })

  it('should create the user /sign-in route with the required middleware functions', () => {
    const routerMock = {
      post: jest.fn(),
    };

    (Router as jest.Mock).mockReturnValue(routerMock )

    expect(Router).toHaveBeenCalled()
    expect(routerMock.post).toHaveBeenCalledWith('/sign-in', joiLogin, signIn)
  })
})

