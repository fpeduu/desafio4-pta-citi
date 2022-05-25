import { Request, Response } from 'express'
import { Restaurant } from '@models/Restaurant'
import { Citi, Crud } from '../global'

export default class UserController implements Crud {

    async create(request: Request, response: Response) {
        const { name, address, foodType } = request.body

        const isAnyUndefined = Citi.areValuesUndefined(name, address, foodType)
        if (isAnyUndefined) return response.status(400).send()

        const newRestaurant = { name, address, foodType }
        const { httpStatus, message } = await Citi.insertIntoDatabase(Restaurant, newRestaurant)
    
        return response.status(httpStatus).send({ message })
    }

    async get(request: Request, response: Response) {
        const { httpStatus, values } = await Citi.getAll(Restaurant)
        return response.status(httpStatus).send(values)
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params
        const { value: restaurantFound, message } = await Citi.findByID(Restaurant, id)
        
        if (!restaurantFound) return response.status(400).send({ message })

        const { httpStatus, messageFromDelete } = await Citi.deleteValue(Restaurant, restaurantFound)
        return response.status(httpStatus).send({ messageFromDelete })
    }

    async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, address, foodType } = request.body

        const isAnyUndefined = Citi.areValuesUndefined(name, address, foodType)
        if (isAnyUndefined) return response.status(400).send()

        const updatedRestaurant = { name, address, foodType }

        const { httpStatus, messageFromUpdate } = await Citi.updateValue(Restaurant, id, updatedRestaurant)
        return response.status(httpStatus).send({ messageFromUpdate })
}

}