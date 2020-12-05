import { definitions } from './api.definitions';

export namespace uploadFile {
  export type uploadFile = {
    url: '/pet/{petId}/uploadImage';
    method: 'post';

    inPath: {
      petId: number;
    };

    responses: {
      200: definitions['ApiResponse'];
    };
    responseType: 'application/json';
  };
}
