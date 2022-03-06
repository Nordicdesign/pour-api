import express from 'express'
import Recipes from '../controllers/recipes/RecipesController'
const router = express.Router()

router.get('/', Recipes.getAllRecipes)

export default router
