import { Router } from 'express'
import { joiEvent } from '../../app/middleware/joiEvent'
import { getEvent, getEventById, deleteEventById, deleteEvents, createEvent} from '../../app/controllers/eventController'
import { eventRouter } from "../../app/routes/eventRoutes";

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

describe('Test suite for event route', () => {
  it('creates an event with these routes', () => {
    const routerMock = {
        post: jest.fn(),
      };

    (Router as jest.Mock).mockReturnValue(routerMock)

    expect(Router).toHaveBeenCalled()
    expect(eventRouter.post).toHaveBeenCalledWith('/', joiEvent, createEvent)
  })

  it('gets an event via these routes', () => {
    const routerMock = {
      post: jest.fn(),
    };

    (Router as jest.Mock).mockReturnValue(routerMock )

    expect(Router).toHaveBeenCalled()
    expect(eventRouter.get).toHaveBeenCalledWith('/', joiEvent, getEvent)
  })

  it('deletes an event via these routes', () => {
    const routerMock = {
      post: jest.fn(),
    };

    (Router as jest.Mock).mockReturnValue(routerMock )

    expect(Router).toHaveBeenCalled()
    expect(eventRouter.delete).toHaveBeenCalledWith('/', deleteEvents)
  })

  it('deletes an event by id via these routes', () => {
    const routerMock = {
      post: jest.fn(),
    };

    (Router as jest.Mock).mockReturnValue(routerMock )

    expect(Router).toHaveBeenCalled()
    expect(eventRouter.delete).toHaveBeenCalledWith('/:id', deleteEventById)
   })

   it('gets an event by id via these routes', () => {
    const routerMock = {
      post: jest.fn(),
    };

    (Router as jest.Mock).mockReturnValue(routerMock )

    expect(Router).toHaveBeenCalled()
    expect(eventRouter.get).toHaveBeenCalledWith('/:id', getEventById)
   })
})
