import { Request, Response, Router } from "express";

export const router = Router();
router.get('/mensajes',(req:Request,res:Response) => {
    res.json({
        ok:true,
        message : 'Todo está bien !'
    });
});

router.post('/mensajes',(req:Request,res:Response) => {
    // Valores que se están enviando del postman
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        ok:true,
        cuerpo,
        de
        // message : 'POST Todo listo!'
    });
});

router.post('/mensajes/:id',(req:Request,res:Response) => {
    // Valores que se están enviando del postman
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id
    res.json({
        ok:true,
        cuerpo,
        de,
        id
        // message : 'POST Todo listo!'
    });
});

export default router;