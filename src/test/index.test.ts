import { topper } from "../app/Utils"

const mockFn = jest.fn();

describe('Utils test suite', () =>{
    it('is to return an uppercase', ()=>{
        const result = topper('abc')
        expect(result).toBe('ABC')
    }),

    it('tries a mock', ()=>{
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    })
})

