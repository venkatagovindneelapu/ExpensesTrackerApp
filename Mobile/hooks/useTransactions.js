// React Custom Hook to fetch transactions
import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api"; // Ensure this points to your backend API

// NOTE: If you test on a real device/emulator, replace localhost with your machine IP.
// Example: const API_URL = "http://192.168.1.10:5001/api"
//const API_URL = "https://expensetracker-r7pb.onrender.com/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    // Backend returns 'expense' (singular). Keep keys consistent.
    expense: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transactions for a user
  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  // Fetch summary (balance/income/expense)
  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await res.json();
      // Defensive defaults
      setSummary({
        balance: Number(data?.balance ?? 0),
        income: Number(data?.income ?? 0),
        expense: Number(data?.expense ?? 0),
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  // Load both in parallel
  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  // Delete a transaction by id
  const deleteTransaction = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete transaction");

      await loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message || "Failed to delete transaction");
    }
  }, [loadData]);

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};
