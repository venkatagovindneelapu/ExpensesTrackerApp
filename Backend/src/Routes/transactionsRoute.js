import express from 'express';
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsbyUserId } from '../Controllers/transactionsControl.js';

const router = express.Router();

router.get("/:userId", getTransactionsbyUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getSummaryByUserId);


export default router;
