import products from '../../db/seed/products.json'
import { Router } from 'express'
import { ProductController } from './product.controller';

const router = Router(); 

const productController = new ProductController() //instance

router.get('/', productController.getProducts)

router.delete('/:id', productController.removeProduct)

router.patch('/', productController.addProduct)

router.get('/:id', productController.getProductById)

export default router;
//need to export 
