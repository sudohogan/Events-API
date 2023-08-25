// import { start } from "../app";

// const startFn = jest.fn();

// describe.only('Large test suite', () =>{

//     afterEach(() => {
//         jest.restoreAllMocks();
//       });

//       describe('#test mongoDB connect', () => {
//         it('To check if the collection method on the MongoClient instance was invoked', async () => {
//           const client = { db: jest.fn().mockReturnThis(), collection: jest.fn() };
//           const connectSpy = jest.mock(start as any)
//           expect(connectSpy).toBeCalledWith('mongodb://localhost:3000');
//           expect(client.db).toBeCalledWith('Week12DB');
//           expect(client.collection).toBeCalledWith('events');
//         });
// })

// })
