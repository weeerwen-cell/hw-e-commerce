import { Query } from 'pg';
import products from '../../db/seed/products.json'
import type {Product} from './types'

export class ProdcutServer{
    products: Product[] = products;


    getAll(query:any){

    let result = [...products] //shallow copy firstt 
    
    const {page =1, limit = 10, category, search} = query

    if(category){
        result = result.filter(
    (p)=> p.category.toLocaleLowerCase() === category.toLocaleLowerCase())
    }

    if(search){
        result = result.filter(
    (p)=> p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
    
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const start = (pageNum-1)* limitNum;
    const end = start + limitNum;
    const paginateDate = result.slice(start, end)
        
    return {
           data: paginateDate,
           total: result.length,
           page: pageNum,
           limit: limitNum,
           totalPage: Math.ceil(result.length/ limitNum) 
        }
    }

    getById(id:number){
        return this.products.find((p)=> p.id === id)
    }

    add(data:Omit<Product, "id">){

        const newProduct = {
            id:Date.now(),
            ...data
        }

        this.products.push(newProduct);
        return newProduct
    }

    delete(id:number){
        const exists = this.products.find(p=> p.id===id);
        if(!exists) throw new Error("product not found");

        this.products = this.products.filter(p=>p.id !== id)
        return true
    }
}

