import { definitions } from './api.definitions';

export namespace ISwaggerRequest {
  export type uploadFile = {
    url: '/pet/{petId}/uploadImage';
    method: 'post';

    inPath: {
      petId: number;
    };

    responses: {
      200: definitions['ApiResponse'];
    };
    responseType: 'application/json';
  };

  export type addPet = {
    url: '/pet';
    method: 'post';

    responses: {
      405: 'Invalid input';
    };
    responseType: 'application/json|application/xml';
  };

  export type updatePet = {
    url: '/pet';
    method: 'put';

    responses: {
      400: 'Invalid ID supplied';

      404: 'Pet not found';

      405: 'Validation exception';
    };
    responseType: 'application/json|application/xml';
  };

  export type findPetsByStatus = {
    url: '/pet/findByStatus';
    method: 'get';

    params: {
      status: unknown;
    };

    responses: {
      200: 'successful operation';

      400: 'Invalid status value';
    };
    responseType: 'application/json|application/xml';
  };

  export type findPetsByTags = {
    url: '/pet/findByTags';
    method: 'get';

    params: {
      tags: unknown;
    };

    responses: {
      200: 'successful operation';

      400: 'Invalid tag value';
    };
    responseType: 'application/json|application/xml';
  };

  export type getPetById = {
    url: '/pet/{petId}';
    method: 'get';

    inPath: {
      petId: number;
    };

    responses: {
      200: definitions['Pet'];

      400: 'Invalid ID supplied';

      404: 'Pet not found';
    };
    responseType: 'application/json|application/xml';
  };

  export type updatePetWithForm = {
    url: '/pet/{petId}';
    method: 'post';

    inPath: {
      petId: number;
    };

    responses: {
      405: 'Invalid input';
    };
    responseType: 'application/json|application/xml';
  };

  export type deletePet = {
    url: '/pet/{petId}';
    method: 'delete';

    inPath: {
      petId: number;
    };

    responses: {
      400: 'Invalid ID supplied';

      404: 'Pet not found';
    };
    responseType: 'application/json|application/xml';
  };

  export type placeOrder = {
    url: '/store/order';
    method: 'post';

    responses: {
      200: definitions['Order'];

      400: 'Invalid Order';
    };
    responseType: 'application/json|application/xml';
  };

  export type getOrderById = {
    url: '/store/order/{orderId}';
    method: 'get';

    inPath: {
      orderId: number;
    };

    responses: {
      200: definitions['Order'];

      400: 'Invalid ID supplied';

      404: 'Order not found';
    };
    responseType: 'application/json|application/xml';
  };

  export type deleteOrder = {
    url: '/store/order/{orderId}';
    method: 'delete';

    inPath: {
      orderId: number;
    };

    responses: {
      400: 'Invalid ID supplied';

      404: 'Order not found';
    };
    responseType: 'application/json|application/xml';
  };

  export type getInventory = {
    url: '/store/inventory';
    method: 'get';

    responses: {
      200: 'successful operation';
    };
    responseType: 'application/json';
  };

  export type createUsersWithArrayInput = {
    url: '/user/createWithArray';
    method: 'post';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };

  export type createUsersWithListInput = {
    url: '/user/createWithList';
    method: 'post';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };

  export type getUserByName = {
    url: '/user/{username}';
    method: 'get';

    inPath: {
      username: string;
    };

    responses: {
      200: definitions['User'];

      400: 'Invalid username supplied';

      404: 'User not found';
    };
    responseType: 'application/json|application/xml';
  };

  export type updateUser = {
    url: '/user/{username}';
    method: 'put';

    inPath: {
      username: string;
    };

    responses: {
      400: 'Invalid user supplied';

      404: 'User not found';
    };
    responseType: 'application/json|application/xml';
  };

  export type deleteUser = {
    url: '/user/{username}';
    method: 'delete';

    inPath: {
      username: string;
    };

    responses: {
      400: 'Invalid username supplied';

      404: 'User not found';
    };
    responseType: 'application/json|application/xml';
  };

  export type loginUser = {
    url: '/user/login';
    method: 'get';

    params: {
      username: string;

      password: string;
    };

    responses: {
      200: 'successful operation';

      400: 'Invalid username/password supplied';
    };
    responseType: 'application/json|application/xml';
  };

  export type logoutUser = {
    url: '/user/logout';
    method: 'get';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };

  export type createUser = {
    url: '/user';
    method: 'post';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };
}
