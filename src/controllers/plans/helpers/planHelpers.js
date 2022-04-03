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

export const findPlan = async (recipeId, userId, slot, date) => {
  return await Plan.findOne({
    where: {
      recipe_id: recipeId,
      user_id: userId,
      slot: slot,
      date: date,
    },
  })
}

export const findOrder = async (userId, slot, date) => {
  let order
  const checkOrder = await Plan.findAll({
    attributes: ['order'],
    where: {
      user_id: userId,
      slot: slot,
      date: date,
    },
  })
  const currentOrder = checkOrder.map((order) => order.order)
  if (checkOrder.length > 1) {
    order = Math.max(...currentOrder) + 10
  } else {
    order = 0
  }

  return order
}
