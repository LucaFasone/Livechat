import { Router } from "express";
import passport from "passport";
import { handleAuthenticatedError } from "../middleware/handleError";

const router = Router();

router.use(router.use(passport.authenticate('bearer', { session: false })))

router.post("/add", (req,res)=>{
    const {body:{userToId}} = req
    

})




router.use(handleAuthenticatedError)

export default Router
