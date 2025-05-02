import type { NextFunction, Response, Request } from 'express';
import { Router } from 'express';
import passport from 'passport';
import { logout } from '../utils/authUtil';
import { UserWithoutPassword } from '../types';
import { handleAuthenticatedError } from '../middleware/handleError';
import { addUserToReachableUsers } from '../db/query';

const router = Router();

router.use(passport.authenticate('bearer', { session: false }));

router.get('/me', (req: Request, res: Response) => {
    const user = req.user as UserWithoutPassword;
    res.status(200).json(user);
});

router.delete('/logout', async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            throw new Error("User Not Found");
        }
        logout(req.user.id, res);
        res.status(200).json({ message: "Utente disconnesso" });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Errore nel logout" });
    }
});
router.post("/add-user",async (req,res) =>{
    try{
        if(!req.user){
            throw new Error("User Not Found")
        }
        const {recipientId} = req.body
        await addUserToReachableUsers(req.user.id,recipientId)
        res.status(200).json({message:"User added successfully"})
    }catch(e){
        e instanceof Error ? res.status(401) : res.json(500).json("Errore ")
    }
})

router.use(handleAuthenticatedError)

export { router as profileRouter };