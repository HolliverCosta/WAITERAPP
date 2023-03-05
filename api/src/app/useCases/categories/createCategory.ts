import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
  const { name, icon } = req.body;


  try {
    const category = await Category.create({
      name,
      icon
    });

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}
