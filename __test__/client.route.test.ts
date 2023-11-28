import {testServer } from '../src/utils/testServer';
import { clientRoutes } from '../src/routes';
import { ClientModel } from '../src/models';

const request = testServer( clientRoutes );

const endpoint = '/api/clients';

const expectedClients = [{
  id: 1,
  names: 'John',
  surnames: 'Doe',
  email: 'jhon@example.co',
  phone: '123456789',
  address: 'Calle 123',
  status: true,
}]

describe('[routes / clients]', () => {
  it('should return a response with status 200', async() => {

    // Arrange
    const expectedStatus = 200;

    jest.spyOn(ClientModel, 'findAll').mockResolvedValue(expectedClients as ClientModel[]);
    // Act
    const { status: responseStatus } = await request.get(endpoint);


    // Assert
    expect(responseStatus).toBe(expectedStatus);

  });

  it('should return all clients', async() => {

    // Arrange

    //? Aquí es donde "mockeas" la función que obtiene los clientes de la base de datos

    jest.spyOn(ClientModel, 'findAll').mockResolvedValue(expectedClients as ClientModel[]);

    // Act
    const { body: responseClients } = await request.get(endpoint);
    // Assert
    expect(responseClients).toEqual(expectedClients);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

});