import { definitions } from './api.definitions';

export namespace getInventory {
  export type getInventory = {
    url: '/store/inventory';
    method: 'get';

    responses: {
      200: 'successful operation';
    };
    responseType: 'application/json';
  };
}
