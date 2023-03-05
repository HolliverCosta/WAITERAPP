import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  const { name, price, description, ingredients, category } = req.body;
  const imagePath = req.file?.filename;
  console.log(imagePath);
  try {
    const product = await Product.create({
      name,
      price: Number(price),
      description,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath,
      category,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}
