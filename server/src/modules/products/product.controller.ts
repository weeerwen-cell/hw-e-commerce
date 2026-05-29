import { Request, Response, NextFunction, response } from 'express'
import products from '../../db/seed/products.json'
import { Product } from './types'
import { asyncHandler } from '../../utils/asyncHandler'
import {ProdcutServer} from './product.service'


const productServer = new ProdcutServer()

export class ProductController {


    // typedProducts: Product[] = products
 /*          postProduct = (

             req: Request,
             res: Response,
             next: NextFunction

         ) => {
             try {
                 res.json({
                     success: true,
                     data: this.typedProducts
                 })
             } catch (error) {
                 next(error)
             }
         }  get all the product

         getProductById = (req:Request, res:Response, next: NextFunction)=>{
             const id = Number(req.params.id);
             this.typedProducts.filter((item)=>(item.id === id),
         )
         return res;
     }


         addProductById = (req:Request, res: Response)=>{
              const id = Number(res.params.id);
              this.typedProducts.map((prev)=>(
              [...prev,{
                  id: Date.now(),
                  title: "",
                  description: "",
                 price: ,
                 discountPercentage: ,
                  rating: ,
                  stock: ,
                  brand: "",
                  category: "",
                  thumbnail: ""  

              }]   

             ))
             res.send(id) 
         }   */

    getProducts = asyncHandler(async (req, res) => {
        const result = productServer.getAll(req.query);
        res.json({
            success: true,
            // data: this.typedProducts
            // data: productServer.getAll()
            ...result
        })
    })

    removeProduct = asyncHandler(async (req, res) => {
        const id = Number(req.params.id)
        // const exits = this.typedProducts.find((p) => p.id === id)
        productServer.delete(id)
        
        //check if product exis
        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "product not found"
        //     })
        // }
        
        // this.typedProducts = this.typedProducts.filter((p) => p.id !== id)
        //remove product 
        res.json({
            success: true,
            message: "prdocut deleted success"
        })
        
    })
    
    
    addProduct = asyncHandler(async (req, res) => {
        // const newProduct: Product = {
        //     id: Date.now(),
        //     title: req.body.title,
        //     description: req.body.description,
        //     price: req.body.price,
        //     discountPercentage: req.body.discountPercentage,
        //     rating: req.body.rating,
        //     stock: req.body.stock,
        //     brand: req.body.brand,
        //     category: req.body.category,
        //     thumbnail: req.body.thumbnail,
        // }
         const newProduct = productServer.add(req.body)

        // this.typedProducts = [...this.typedProducts, newProduct]
        res.status(201).json({
            success: true,
            data: newProduct
        })
    })
    
    
    getProductById = asyncHandler(async (req, res) => {
        const id = Number(req.params.id)
        const product = productServer.getById(id);
        // const product = this.typedProducts.find((p) => p.id === id)
        
        if(!product){
            return res.status(404).json({
                success: false,
                message: "not found"            
            })
        } 

        res.json({
            success: true,
            data: product
        })
    })


}
