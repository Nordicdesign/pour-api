import { Plan } from '../../database/models/plan'
import { Recipe } from '../../database/models/recipes'
import { sendError } from '../../helpers/sendError'
import { createRecipe, findRecipe } from '../recipes/helpers/recipesHelpers'
import { createPlan } from './helpers/planHelpers'

const Plans = {
  async getAllPlans(req, res) {
    try {
      const results = await Plan.findAll({
        where: {
          user_id: req.user,
        },
        include: Recipe,
      })
      res.status(200).send({
        message: 'plans',
        plans: results,
      })
    } catch (err) {
      sendError(res, err)
    }
  },

  async getPlanById(req, res) {
    const id = req.params.id
    try {
      const results = await Plan.findByPk(id)
      res.status(200).send({
        message: 'plan',
        plan: results,
      })
    } catch (err) {
      sendError(res, err)
    }
  },

  async addPlan(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { recipe_name, slot, date } = req.body
      const userId = req.user
      // check recipe does not exist for the user
      const planExists = await Plan.findOne({
        where: {
          // eslint-disable-next-line camelcase
          user_id: userId,
          slot: slot,
          date: date,
        },
      })
      if (planExists) {
        res.status(200).send({
          message: 'plan already exists',
          plan: planExists,
        })
      } else {
        try {
          // find the order
          // check current number of plans to gather order
          let order
          const checkOrder = await Plan.findAll({
            attributes: ['order'],
            where: {
              user_id: 1,
              slot: slot,
              date: date,
            },
          })
          const currentOrder = checkOrder.map((order) => order.order)

          if (checkOrder) {
            order = Math.max(...currentOrder) + 10
          } else {
            order = 0
          }

          // if recipe exists, add to plan in correct oder
          const recipeExists = await findRecipe(recipe_name, userId)
          if (recipeExists) {
            try {
              const newPlan = await createPlan(
                recipeExists.id,
                date,
                slot,
                order,
                userId
              )
              res.status(201).send({
                message: 'Plan created',
                payload: newPlan,
              })
            } catch (err) {
              sendError(res, err)
            }
          } else {
            // if recipe does not exist, create it, then add to plan in correct oder
            try {
              const newRecipe = await createRecipe(recipe_name, userId)
              const newPlan = await createPlan(
                newRecipe.id,
                date,
                slot,
                order,
                userId
              )
              res.status(201).send({
                message: 'Plan created',
                payload: newPlan,
              })
            } catch (err) {
              sendError(res, err)
            }
          }
        } catch (err) {
          sendError(res, err)
        }
      }
    } catch (err) {
      sendError(res, err)
    }
  },

  async deletePlanById(req, res) {
    const id = req.params.id
    const userId = req.user
    try {
      const result = await Plan.findOne({
        where: {
          id: id,
          user_id: userId,
        },
      })
      if (result) {
        await result.destroy()
        res.status(204).send({
          message: 'plan deleted',
        })
      } else {
        res.status(400).send({
          message: 'can not do that Dave',
        })
      }
    } catch (err) {
      sendError(res, err)
    }
  },

  async updatePlanById(req, res) {
    const id = req.params.id
    const { slot, date } = req.body
    try {
      const plan = await Plan.findByPk(id)
      await Plan.update(
        {
          slot: slot,
          date: date,
        },
        {
          where: {
            id: plan.id,
          },
        }
      )
    } catch (error) {
      sendError(res, error)
    }
  },
}

export default Plans
