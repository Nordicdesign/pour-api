/* eslint-disable camelcase */
import { Plan } from '../../database/models/plan'
import { Recipe } from '../../database/models/recipes'
import { sendError } from '../../helpers/sendError'
import { createRecipe, findRecipe } from '../recipes/helpers/recipesHelpers'
import { createPlan, findOrder, findPlan } from './helpers/planHelpers'

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
      const { recipe_name, date, slot } = req.body
      const userId = req.user
      // check recipe does not exist for the user
      const recipeExists = await findRecipe(recipe_name, userId)
      // if it exists, check it's not alreayd on that slot
      if (recipeExists) {
        const planExists = await findPlan(recipeExists.id, userId, slot, date)
        // it's there already, can't add twice
        if (planExists) {
          res.status(200).send({
            message: 'plan already exists',
            plan: planExists,
          })
        } else {
          const order = await findOrder(userId, slot, date)
          const newPlan = await createPlan(
            recipeExists.id,
            date,
            slot,
            order,
            userId
          )
          newPlan.dataValues.recipe = recipeExists
          res.status(201).send({
            message: 'Plan created',
            plan: newPlan,
          })
        }
      } else {
        // new recipe
        const order = await findOrder(userId, slot, date)
        const newRecipe = await createRecipe(recipe_name, userId)
        // create the plan
        const newPlan = await createPlan(
          newRecipe.id,
          date,
          slot,
          order,
          userId
        )
        newPlan.dataValues.recipe = newRecipe
        res.status(201).send({
          message: 'Plan created',
          plan: newPlan,
        })
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
