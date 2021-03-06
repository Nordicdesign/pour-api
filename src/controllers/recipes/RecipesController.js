import { Recipe } from '../../database/models/recipes'
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
      res.status(200).send({
        message: 'recipes',
        recipes: results,
      })
    } catch (err) {
      sendError(res, err)
    }
  },

  async getRecipeById(req, res) {
    const id = req.params.id
    try {
      const results = await Recipe.findByPk(id)
      res.status(200).send({
        message: 'recipe',
        recipes: results,
      })
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
        res.status(200).send({
          message: 'recipe already exists',
          recipes: exists,
        })
      } else {
        try {
          const newRecipe = await createRecipe(name, userId)
          res.status(201).send({
            message: 'recipe created',
            recipe: newRecipe,
          })
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
        res.status(204).send({
          message: 'recipe deleted',
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
}

export default Recipes
