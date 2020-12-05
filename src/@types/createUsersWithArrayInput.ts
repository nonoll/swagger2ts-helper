import { definitions } from './api.definitions';

export namespace createUsersWithArrayInput {
  export type createUsersWithArrayInput = {
    url: '/user/createWithArray';
    method: 'post';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };
}
