import { getEvent } from '../../app/controllers/eventController'
import { Request, Response } from 'express'
import Event from '../../app/model/Event'

jest.mock('../../app/controllers/eventController', () => ({
    find: jest.fn(),
}))

// jest.mock('./errors', () => ({
//   ValidationError: jest.fn(),
//   NotFoundError: jest.fn(),
// }));

const mockRequest = (body: any) => ({ body }) as Request
const mockResponse = () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    }
    return res as unknown as Response
}

// describe("Create Events", () => {
//   it("Should create a new Event successfully!", () => {
//     const eventMocker = {
//         description: "Good Day",
//         dayOfWeek: "sunday"
//     };
//     const spy = jest.spyOn(Event, "create").mockReturnValueOnce(eventMocker as any);
//     Event.create(eventMocker);
//     const spyCreatedEvent = spy.mock.results[0].value;
//     expect(spy).toHaveBeenCalledTimes(1);
//     expect(spyCreatedEvent.dayOfWeek).toEqual(eventMocker.dayOfWeek);
//     spy.mockReset();
//   });
// })

describe.only('getEvent', () => {
    it('should return events when valid input is provided', async () => {
        const mockReq = mockRequest({
            description: 'Some description',
            dayOfWeek: 'Monday',
        })
        const mockRes = mockResponse()

        Event.find({ description: 'Some description', dayOfWeek: 'Monday' })

        await getEvent(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith({
            description: 'Some description',
            dayOfWeek: 'Monday',
        })
    })
})
