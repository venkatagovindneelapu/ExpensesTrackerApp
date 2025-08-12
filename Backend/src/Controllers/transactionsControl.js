import { sql } from "../Config/db.js";


export async function getTransactionsbyUserId(req, res) {
    try {
        const { userId } = req.params;
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error Getting transactions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createTransaction(req, res) {
    try {
        const { title, amount, category, user_id } = req.body;

        if (!title || amount === undefined || !category || !user_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;

        console.log("Transaction created:", transaction);
        res.status(201).json(transaction[0]);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } 
}

export async function deleteTransaction(req, res) {
    try {
            const { id } = req.params;
            if (isNaN(id)) {
                return res.status(400).json({ error: "Invalid transaction ID" });
            }
            const result = await sql`
                DELETE FROM transactions WHERE id = ${id}
                RETURNING *
            `;
            if (result.length === 0) {
                return res.status(404).json({ error: "Transaction not found" });
            }
            res.status(200).json({ message: "Transaction deleted successfully", transaction: result[0] });
        } catch (error) {
            console.error("Error Deleting transactions:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
}

export async function getSummaryByUserId(req, res) {
    try {
        const { userId } = req.params;
        const balanceResult = await sql`
            SELECT COALESCE(SUM(AMOUNT),0) AS balance FROM transactions
            WHERE user_id = ${userId}
        `;
        const incomeResult = await sql`
            SELECT COALESCE(SUM(AMOUNT),0) AS income FROM transactions 
            WHERE user_id = ${userId} AND amount > 0
        `;
        const expenseResult = await sql`
            SELECT COALESCE(SUM(AMOUNT),0) AS expense FROM transactions 
            WHERE user_id = ${userId} AND amount < 0
        `;
        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        })
    } catch (error) {
        console.error("Error Getting the summary:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}