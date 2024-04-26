import express, { Request, Response } from 'express';
import { addWeaponDetails, uploadBanner } from '../controller/weaponController';
const weaponRouter = express.Router();

weaponRouter.post('/', addWeaponDetails);
weaponRouter.get('/:id',)
weaponRouter.post('/s3/banner', uploadBanner);
export default weaponRouter;
