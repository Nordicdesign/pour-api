import { Recipe } from '../../../database/models/recipes'
import { v4 as uuidv4 } from 'uuid'

export const findRecipe = async (name, userId) => {
  return await Recipe.findOne({
    where: {
      name: name,
      user_id: userId,
    },
  })
}

export const createRecipe = async (name, userId) => {
  const id = uuidv4()
  return await Recipe.create({
    id: id,
    name: name,
    user_id: userId,
  })
}
