import Event from '../../app/model/Event'

describe('Create Events', () => {
    it('Should create a new Event successfully!', () => {
        const mockedEvent = {
            description: 'Good Day',
            dayOfWeek: 'sunday',
        }
        const spy = jest
            .spyOn(Event, 'create')
            .mockReturnValueOnce(mockedEvent as any)
        Event.create(mockedEvent)
        const spyCreatedEvent = spy.mock.results[0].value
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyCreatedEvent.dayOfWeek).toEqual(mockedEvent.dayOfWeek)
        spy.mockReset()
    })
})
