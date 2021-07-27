import { getRepository } from 'typeorm'
import { Products } from '../entity/Products'
import { Request, Response } from 'express'


export const getProduct = async (request: Request, response: Response) => {
    const products = await getRepository(Products).find() // retorna todos os dados
    return response.json(products)

}


export const getProductTwo = async (request: Request, response: Response) => {
    const { id } = request.params

    const products = await getRepository(Products).findOne(id) // busca apenas um // id
    return response.json(products)
}


export const saveNewProduct = async (request: Request, response: Response) => {
    const products = await getRepository(Products).save(request.body)
    return response.json(products)
}


export const updateProducts = async (request: Request, response: Response) => {
    const { id } = request.params

    const products = await getRepository(Products).update(id, request.body)
    if(products.affected === 1) {
        const ProductsUpdate = await getRepository(Products).findOne(id)
        return response.json(ProductsUpdate)
    }

    return response.status(404).json({message: 'Não foi possível atender essa solicitação no momento.'})
};



export const finnishedNewProduct = async (request: Request, response: Response) => {
    const { id } = request.params

    const products = await getRepository(Products).update(id, {
        available: true
    })
    if(products.affected === 1) {
        const ProductsUpdate = await getRepository(Products).findOne(id)
        return response.json({message: 'Pedido finalizado!'})
    }

    return response.status(404).json({message: 'Não foi possível atender essa solicitação no momento.'})
}


export const removeProduct = async (request: Request, response: Response) => {
    const { id } = request.params

    const products = await getRepository(Products).delete(id)
    if(products.affected === 1) {
        const ProductsUpdate = await getRepository(Products).findOne(id)
        return response.json({message: 'Deletado'})
    }

    return response.status(404).json({message: 'Não foi possível atender essa solicitação no momento.'})
}