import { definitions } from './api.definitions';

export namespace deletePet {
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
}
