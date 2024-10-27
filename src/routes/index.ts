import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Lista di tutti i post');
});

router.post('/', (req: Request, res: Response) => {
    res.send('Creazione di un nuovo post');
});

export { router };
