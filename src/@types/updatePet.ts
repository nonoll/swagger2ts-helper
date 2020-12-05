import { definitions } from './api.definitions';

export namespace updatePet {
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
}
