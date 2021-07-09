import {Router, Request, Response} from 'express'
import {getCrud, saveNew, getCrudTwo, updateCrud, finnishedNew, remove} from './controller/CrudController'
import {getProduct, getProductTwo,saveNewProduct, updateProducts, finnishedNewProduct, removeProduct  } from './controller/ProductsController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({message:'Hello World'})
})

// ROUTES HOME PEDIDOS

routes.get('/crud', getCrud)
routes.get('/crud/:id', getCrudTwo)
routes.post('/crud', saveNew)
routes.put('/crud/:id', updateCrud)
routes.patch('/crud/:id', finnishedNew)
routes.delete('/crud/:id', remove)
////

// ROUTES PRODUCTS
routes.get('/products', getProduct)
routes.get('/products/:id', getProductTwo)
routes.post('products', saveNewProduct)
routes.put('/products/:id', updateProducts)
routes.patch('/products/:id', finnishedNewProduct)
routes.delete('/products/:id', removeProduct)
//



export default routes;