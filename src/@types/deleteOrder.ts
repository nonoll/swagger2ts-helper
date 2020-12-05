import { definitions } from './api.definitions';

export namespace deleteOrder {
  export type deleteOrder = {
    url: '/store/order/{orderId}';
    method: 'delete';

    inPath: {
      orderId: number;
    };

    responses: {
      400: 'Invalid ID supplied';

      404: 'Order not found';
    };
    responseType: 'application/json|application/xml';
  };
}
