import express from 'express'
import Recipes from '../controllers/recipes/RecipesController'
const router = express.Router()

router.post('/', Recipes.addRecipe)
router.get('/', Recipes.getAllRecipes)
router.get('/:id', Recipes.getRecipeById)
router.delete('/delete/:id', Recipes.deleteRecipeById)

export default router
