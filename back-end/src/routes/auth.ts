import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
const auth = Router();

const userCtrl = new UserController();

auth.get("/login", async (req: Request, res: Response) => {
    const result = await userCtrl.login(req.body);
    res.statusCode = result.status;
    res.json(result.data);
});

auth.post("/cadastrar", async (req: Request, res: Response) => {    
    const result = await userCtrl.register(req.body);
    res.statusCode = result.status;
    res.json(result.data);
});

auth.patch("/configuracoes", async (req: Request, res: Response) => {
    const result = await userCtrl.editProfile(req.body);
    res.statusCode = result.status;
    res.json(result.data);
});

auth.post("/confirmar-email", async (req: Request, res: Response) => {
    const result = await userCtrl.confirmEmail( { "id": req.body.id, "url_token": req.query.token, "input_token": req.body.token } );
    res.statusCode = result.status;
    res.json(result);
});

auth.get("/reiniciar-senha", async (req: Request, res: Response) => {
    const result = await userCtrl.resetPassword( { "id": req.body.id, "url_token": req.query.token, "input_token": req.body.token } );
    res.statusCode = result.status;
    res.json(result);
}); 

export default auth;