import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Arbitrum API");
});

app.get(
  "/transactions/latest/:address",
  async (req: Request, res: Response) => {
    try {
      const address = req.params.address;
      const apiUrl = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=1&sort=asc&apikey=${process.env.ARBISCAN_API_KEY}`;

      const response = await axios.get(apiUrl);
      const transactions = response.data.result;
      const transaction = transactions[0];

      res.json({ latestTransaction: transaction });
    } catch (error) {
      console.error("Error fetching latest transaction:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get("/transactions/:address", async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    const apiUrl = `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=10&sort=asc&apikey=${process.env.ARBISCAN_API_KEY}`;

    const response = await axios.get(apiUrl);
    const transactions = response.data.result;

    res.json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
