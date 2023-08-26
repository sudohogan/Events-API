import Event from '../../app/model/Event'

describe('Create Events', () => {
    it('Should create a new Event successfully!', () => {
        const eventMocker = {
            description: 'Good Day',
            dayOfWeek: 'sunday',
        }
        const spy = jest
            .spyOn(Event, 'create')
            .mockReturnValueOnce(eventMocker as any)
        Event.create(eventMocker)
        const spyCreatedEvent = spy.mock.results[0].value
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyCreatedEvent.dayOfWeek).toEqual(eventMocker.dayOfWeek)
        spy.mockReset()
    })
})
