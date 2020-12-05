import { definitions } from './api.definitions';

export namespace findPetsByTags {
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
}
