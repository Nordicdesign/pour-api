import express from 'express'
import Plan from '../controllers/plans/PlansController'
const router = express.Router()

router.post('/', Plan.addPlan)
router.get('/', Plan.getAllPlans)
router.patch('/update/:id', Plan.updatePlanById)
router.delete('/delete/:id', Plan.deletePlanById)

export default router
