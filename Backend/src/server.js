import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './Config/db.js';
import transactionsRoute from './Routes/transactionsRoute.js'; // fixed path ✅
import job from './Config/cron.js'; // import cron job

dotenv.config();

export const app = express();
// Start the cron job
if(process.env.NODE_ENV === "production" )job.start(); // Start the cron job to send GET requests every 14 minutes

// Middleware to parse JSON requests
app.use(express.json());
export const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
})

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT:", PORT);
    });
});
