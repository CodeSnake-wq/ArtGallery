import express from 'express';
import { getSymbols, postSymbol, updateSymbol } from '../controller/symbols.controller.js';

const router = express.Router();

router.get('/', getSymbols);
router.post('/', postSymbol);
router.put('/', updateSymbol);

export default router;
