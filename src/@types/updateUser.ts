import { definitions } from './api.definitions';

export namespace updateUser {
  export type updateUser = {
    url: '/user/{username}';
    method: 'put';

    inPath: {
      username: string;
    };

    responses: {
      400: 'Invalid user supplied';

      404: 'User not found';
    };
    responseType: 'application/json|application/xml';
  };
}
