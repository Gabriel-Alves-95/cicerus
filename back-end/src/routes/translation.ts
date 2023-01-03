import { Router, Request, Response } from 'express';
import TranslationController from '../controllers/TranslationController';
const translation = Router();

const translationCtrl = new TranslationController();

translation.post("/criar-traducao", async (req: Request, res: Response) => {
    const result = await translationCtrl.createTranslation(req.body);
    res.statusCode = result.status;
    res.json(result);
});

translation.patch("/editar-traducao/:id", async (req: Request, res: Response) => {
    const result = await translationCtrl.updateTranslation(req.params.id, req.body);
    res.statusCode = result.status;
    res.json(result);
});

translation.delete("/deletar-traducao/:id", async (req: Request, res: Response) => {
    const result = await translationCtrl.deleteTranslation(req.params.id);
    res.statusCode = result.status;
    res.json(result);
});

translation.get("/:id", async (req: Request, res: Response) => {
    const result = await translationCtrl.getTranslation(req.params.id);
    res.statusCode = result.status;
    res.json(result);
});

translation.get("/", async (req: Request, res: Response) => {
    const result = await translationCtrl.getTranslations(req.query);
    res.statusCode = result.status;
    res.json(result);
});

export default translation;