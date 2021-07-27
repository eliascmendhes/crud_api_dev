import { getRepository } from 'typeorm'
import { Crud } from '../entity/Crud'
import { Request, Response } from 'express'


export const getCrud = async (request: Request, response: Response) => {
    const crud = await getRepository(Crud).find() // retorna todos os dados
    return response.json(crud)

}


export const getCrudTwo = async (request: Request, response: Response) => {
    const { id } = request.params

    const crud = await getRepository(Crud).findOne(id) // busca apenas um // id
    return response.json(crud)
}


export const saveNew = async (request: Request, response: Response) => {
    const crud = await getRepository(Crud).save(request.body)
    return response.json(crud)
}


export const updateCrud = async (request: Request, response: Response) => {
    const { id } = request.params

    const crud = await getRepository(Crud).update(id, request.body)
    if(crud.affected === 1) {
        const CrudUpdate = await getRepository(Crud).findOne(id)
        return response.json(CrudUpdate)
    }

    return response.status(404).json({message: 'Não foi possível atender essa solicitação no momento.'})
};



export const finnishedNew = async (request: Request, response: Response) => {
    const { id } = request.params

    const crud = await getRepository(Crud).update(id, {
        finished: true
    })
    if(crud.affected === 1) {
        const CrudUpdate = await getRepository(Crud).findOne(id)
        return response.json({message: 'Pedido finalizado!'})
    }

    return response.status(404).json({message: 'Não foi possível atender essa solicitação no momento.'})
}


export const remove = async (request: Request, response: Response) => {
    const { id } = request.params

    const crud = await getRepository(Crud).delete(id)
    if(crud.affected === 1) {
        const CrudUpdate = await getRepository(Crud).findOne(id)
        return response.json({message: 'Deletado'})
    }

    return response.status(404).json({message: 'Não foi possível atender essa solicitação no momento.'})
}