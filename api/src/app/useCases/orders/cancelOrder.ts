import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function cancelOrder(req: Request, res: Response) {
  const { orderId } = req.params;


  try {
    await Order.findByIdAndDelete(orderId);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}
