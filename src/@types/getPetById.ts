import { definitions } from './api.definitions';

export namespace getPetById {
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
}
