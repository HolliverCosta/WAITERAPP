import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
    return res.status(400).json({ error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE' });
  }

  try {
    await Order.findByIdAndUpdate(orderId, { status });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}
