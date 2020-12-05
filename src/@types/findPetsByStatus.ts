import { definitions } from './api.definitions';

export namespace findPetsByStatus {
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
}
