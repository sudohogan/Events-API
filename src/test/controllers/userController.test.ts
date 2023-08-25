import User from '../../app/model/User'

describe.skip('Create users', () => {
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

    it('retruns an error when the email is missing', () => {
        const userMock = {
            email: 'user@gmail.com',
        }
        const spy = jest
            .spyOn(User, 'create')
            .mockReturnValueOnce('email is required' as any)
        User.create(userMock)
        const spyCreatedUser = spy.mock.results[0].value
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyCreatedUser).toEqual('email is required')

        spy.mockReset()
    })
})

describe.skip('Sign in Users', () => {
    it('Signs in an already created user', () => {
        const userMocker = {
            email: 'fries@email.com',
            password: 'password',
        }
        const spy = jest
            .spyOn(User, 'collection')
            .mockReturnValueOnce(userMocker as any)
        User.create(userMocker)
        const spyCreatedUser = spy.mock.results[0].value
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyCreatedUser.email).toEqual(userMocker.email)
        spy.mockReset()
    })

    it('retruns an error when the email is missing', () => {
        const userMock = {
            email: 'user@gmail.com',
        }
        const spy = jest
            .spyOn(User, 'create')
            .mockReturnValueOnce('email is required' as any)
        User.create(userMock)
        const spyCreatedUser = spy.mock.results[0].value
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spyCreatedUser).toEqual('email is required')

        spy.mockReset()
    })
})
