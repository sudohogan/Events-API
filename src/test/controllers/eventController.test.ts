import { Request, Response } from 'express'
import { getEvent, createEvent } from '../../app/controllers/eventController'
import * as EventModule from '../../app/model/Event';
import { UnauthorizedError } from '../../app/errors/index';

jest.mock('../../app/model/Event');
jest.mock('../../app/errors/index');

describe('Test Suite for getEvent', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
  })

  it('should return the event when valid input is provided', async () => {
    req.body = {
      description: 'Sample Description',
      dayOfWeek: 'monday',
    }
    await getEvent(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expect.any(Array))
  })

  it('should return a 400 error when invalid input is provided', async () => {
    req.body = {
      description: '',
      dayOfWeek: 'monday',
    }
    await getEvent(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      statusCode: 400,
      message: 'invalid input',
    }))
  })

  it('should return a 404 error when no events are found', async () => {
    req.body = {
      description: 'Nonexistent Description',
      dayOfWeek: 'Monday',
    }
    await getEvent(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      statusCode: 404,
      message: 'Events Not Found',
    }))
  })

  it('return a 500, internal server error, something went wrong', async () => {
    req.body = {
      description: 'Description',
      dayOfWeek: 'sunday',
    }
    await getEvent(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      statusCode: 500,
      message: 'Something went wrong',
    }))
  })
})

describe('Test Suite for createEvent', () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
        user: {
          _id: 'user_id',
        },
        body: {
          description: 'Test Event',
          dayOfWeek: 'Monday',
        },
    } as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
  })

  afterEach(()=>{
    jest.clearAllMocks()
  })

  it('should return the event when valid input is provided', async () => {
    const eventMock = {
      _id: 'event_id',
      description: 'Test Event',
      dayOfWeek: 'Monday',
      userId: 'user_id',
    };
    const createEventMock = jest.spyOn(EventModule.default, 'create').mockResolvedValue(eventMock as any);
    await createEvent(req, res)
    expect(EventModule.default.findOne).toHaveBeenCalledWith({ description: 'Test Event' });
    expect(createEventMock).toHaveBeenCalledWith({
      description: 'Test Event',
      dayOfWeek: 'Monday',
      userId: 'user_id',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(eventMock);
  })
})
