import { definitions } from './api.definitions';

export namespace updatePetWithForm {
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
}
