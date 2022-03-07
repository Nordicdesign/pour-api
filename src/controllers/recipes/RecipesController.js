import { Recipe } from '../../database/models/recipes'
import { apiResponse } from '../../helpers/createResponse'
import { sendError } from '../../helpers/sendError'
import { createRecipe, findRecipe } from './helpers/recipesHelpers'

const Recipes = {
  async getAllRecipes(req, res) {
    console.log(req.user)
    try {
      const results = await Recipe.findAll({
        where: {
          user_id: req.user,
        },
      })
      res.send(
        apiResponse({
          statusCode: 200,
          message: 'recipes',
          payload: {
            recipes: results,
          },
        })
      )
    } catch (err) {
      sendError(res, err)
    }
  },

  async getRecipeById(req, res) {
    const id = req.params.id
    try {
      const results = await Recipe.findByPk(id)
      res.send(
        apiResponse({
          statusCode: 200,
          message: 'recipe',
          payload: {
            recipes: results,
          },
        })
      )
    } catch (err) {
      sendError(res, err)
    }
  },

  async addRecipe(req, res) {
    try {
      const name = req.body.name
      const userId = req.user
      // check recipe does not exist for the user
      const exists = await findRecipe(name, userId)
      if (exists) {
        res.send(
          apiResponse({
            statusCode: 200,
            message: 'recipe already exists',
            payload: {
              recipes: exists,
            },
          })
        )
      } else {
        try {
          const newRecipe = await createRecipe(name, userId)
          res.send(
            apiResponse({
              statusCode: 201,
              message: 'recipe created',
              payload: {
                recipe: newRecipe,
              },
            })
          )
        } catch (err) {
          sendError(res, err)
        }
      }
    } catch (err) {
      sendError(res, err)
    }
  },

  async deleteRecipeById(req, res) {
    const id = req.params.id
    const userId = req.user
    try {
      const result = await Recipe.findOne({
        where: {
          id: id,
          user_id: userId,
        },
      })
      if (result) {
        await result.destroy()
        res.send(
          apiResponse({
            statusCode: 204,
            message: 'recipe deleted',
          })
        )
      } else {
        res.send(
          apiResponse({
            statusCode: 400,
            message: 'can not do that Dave',
          })
        )
      }
    } catch (err) {
      sendError(res, err)
    }
  },
}

export default Recipes
