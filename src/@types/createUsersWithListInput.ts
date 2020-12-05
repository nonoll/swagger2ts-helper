import { definitions } from './api.definitions';

export namespace createUsersWithListInput {
  export type createUsersWithListInput = {
    url: '/user/createWithList';
    method: 'post';

    responses: {
      default: 'successful operation';
    };
    responseType: 'application/json|application/xml';
  };
}
