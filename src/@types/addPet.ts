import { definitions } from './api.definitions';

export namespace addPet {
  export type addPet = {
    url: '/pet';
    method: 'post';

    responses: {
      405: 'Invalid input';
    };
    responseType: 'application/json|application/xml';
  };
}
