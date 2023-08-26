import User from '../../app/model/User'

describe('Create users', () => {
    it('Should create a new user successfully!', () => {
        const userMock = {
            firstName: 'fries',
            lastName: 'fries',
            birthDate: '2023-08-24',
            city: 'string city',
            country: 'Nigeria',
            email: 'fries@email.com',
            password: 'password',
            confirmPassword: 'stpasswordring',
        }
        const spy = jest
            .spyOn(User, 'create')
            .mockReturnValueOnce(userMock as any)
        User.create(userMock)
        const spyCreatedUser = spy.mock.results[0].value
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyCreatedUser.firstName).toEqual(userMock.firstName)
        spy.mockReset()
    })
})
