import * as UserModel from '../../app/model/User'
import { Request, Response } from 'express'
import { signIn, signUp } from '../../app/controllers/userController'
import { UnauthorizedError } from '../../app/errors/index'

jest.mock('../../app/model/User')
jest.mock('../../app/errors/index')

describe('Test Suite for user signup', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
      req = {
          body: {
            firstName: "firsts",
            lastName: "lasts",
            birthDate: "2023-08-27",
            city: "good City",
            country: "Naija",
            email: "mock@email.com",
            password: "password",
            confirmPassword: "password"
          },
      } as Request
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      } as unknown as Response
  })

  afterEach(() => {
      jest.clearAllMocks()
  })

  it('creayes a user', async () => {
      const userMock = {
        _id: '123',
        firstName: "firsts",
        lastName: "lasts",
        birthDate: "2023-08-27",
        city: "good City",
        country: "Naija",
        email: "mock@email.com",
        password: "password",
        confirmPassword: "password"
      }
      const createuserMock = jest
          .spyOn(UserModel.default, 'create')
          .mockResolvedValue(userMock as any)
      await signUp(req, res)
      expect(UserModel.default.findOne).toHaveBeenCalledWith({
          email: 'mock@email.com',
      })
      expect(createuserMock).toHaveBeenCalledWith({
        _id: '123',
        firstName: "firsts",
        lastName: "lasts",
        birthDate: "2023-08-27",
        city: "good City",
        country: "Naija",
        email: "mock@email.com",
        password: "password",
        confirmPassword: "password"
      })
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(userMock)
  })
})

describe('Test suite for user sign-in', ()=>{
  let req: Request
  let res: Response

  beforeEach(() => {
      req = {
          body: {
            email: "mock@email.com",
            password: "password",
          },
      } as Request
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      } as unknown as Response
  })

  afterEach(() => {
      jest.clearAllMocks()
  })

  it('logs  a user into an account', async () => {
      const userMock = {
        email: "mock@email.com",
        password: "password",
      }
      const createuserMock = jest
          .spyOn(UserModel.default, 'find')
          .mockResolvedValue(userMock as any)
      await signIn(req, res)
      // expect(UserModel.default.findOne).toHaveBeenCalledWith({
      //     email: 'mock@email.com',
      // })
      expect(createuserMock).toHaveBeenCalledWith({
        email: "mock@email.com",
        password: "password",
      })
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(userMock)
  }) 
})