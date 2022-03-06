import { apiResponse } from '../../helpers/createResponse'
// import { sendError } from '../../helpers/sendError'
// import { Recipe } from '../../database/models/recipes'

const Recipes = {
  async getAllRecipes(req, res) {
    res.send(
      apiResponse({
        statusCode: 200,
        message: 'recipes',
      })
    )
  },
}

export default Recipes
