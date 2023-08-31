import User from '../../app/model/User'

describe('Create users', () => {
    it('Creates a new user', () => {
        const mockedUser = {
            firstName: 'fries',
            lastName: 'fries',
            birthDate: '2023-08-24',
            city: 'string city',
            country: 'Nigeria',
            email: 'fries@email.com',
            password: 'password',
            confirmPassword: 'password',
        }
        const spy = jest
            .spyOn(User, 'create')
            .mockReturnValueOnce(mockedUser as any)
        User.create(mockedUser)
        const spyCreatedUser = spy.mock.results[0].value
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyCreatedUser.firstName).toEqual(mockedUser.firstName)
        spy.mockReset()
    })
})
