import { Router } from "express"
import {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
  getDonationByTrackingCode,
} from "../controllers/donation-controller"
import { authenticationToken, authorizeRole } from "../middleware/auth-middleware"

const donationRouter = Router()

//donationRouter.use(authenticationToken)

donationRouter.get("/", getAllDonations)
donationRouter.get("/tracking/:trackingCode", getDonationByTrackingCode)
donationRouter.get("/:id", getDonationById)
donationRouter.post("/",  createDonation)//admin e intermediario
donationRouter.put("/:id", updateDonation)//admin e intermediario
donationRouter.delete("/:id",  deleteDonation)//admin

export default donationRouter
