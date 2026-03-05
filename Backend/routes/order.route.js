import { Router } from 'express';
import { createOrder,displayUsers,payout } from '../controller/order.controller.js';

const orderrouter = Router();

orderrouter.post('/create-order', createOrder);

orderrouter.post('/payout', payout);

orderrouter.get('/display-users', displayUsers);

export default orderrouter;