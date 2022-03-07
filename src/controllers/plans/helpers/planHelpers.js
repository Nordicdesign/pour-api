import { v4 as uuidv4 } from 'uuid'
import { Plan } from '../../../database/models/plan'

export const createPlan = async (recipeId, date, slot, order, userId) => {
  const id = uuidv4()
  return await Plan.create({
    id: id,
    user_id: userId,
    recipe_id: recipeId,
    date: date,
    slot: slot,
    order: order,
  })
}
