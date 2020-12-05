import { definitions } from './api.definitions';

export namespace createUser {
  export type createUser = {
    url: '/user';
    method: 'post';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };
}
