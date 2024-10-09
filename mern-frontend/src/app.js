"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
);

interface Transaction {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  sold: boolean;
}

interface Statistics {
  totalSalesAmount: number;
  totalSold: number;
  totalNotSold: number;
}

interface BarChartData {
  _id: string;
  count: number;
}

interface PieChartData {
  _id: string;
  count: number;
}

export default function TransactionDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState("March");
  const [statistics, setStatistics] = useState<Statistics>({
    totalSalesAmount: 0,
    totalSold: 0,
    totalNotSold: 0,
  });
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCombinedData();
  }, [month, searchText, currentPage]);

  const fetchCombinedData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/combined", {
        params: { month, searchText, page: currentPage },
      });
      const { transactions, statistics, barChart } = response.data;

      setTransactions(transactions);
      setStatistics(statistics);
      setBarChartData(barChart);
      setTotalPages(Math.ceil(transactions.length / 10)); // Assuming 10 items per page
      setPieChartData(await fetchPieChartData(month));
    } catch (error) {
      console.error("Error fetching combined data:", error);
    }
  };

  const fetchPieChartData = async (month: string) => {
    try {
      const response = await axios.get("http://localhost:3000/category-chart", {
        params: { month },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      return [];
    }
  };

  const barData = {
    labels: barChartData.map((item) => item._id),
    datasets: [
      {
        label: "Number of Items",
        data: barChartData.map((item) => item.count),
        backgroundColor: "hsl(var(--primary))",
      },
    ],
  };

  const pieData = {
    labels: pieChartData.map((item) => item._id),
    datasets: [
      {
        label: "Category Distribution",
        data: pieChartData.map((item) => item.count),
        backgroundColor: [
          "hsl(var(--primary))",
          "hsl(var(--secondary))",
          "hsl(var(--accent))",
          "hsl(var(--muted))",
          "hsl(var(--card))",
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Transactions Dashboard</h1>

      <div className="flex justify-between items-center mb-4">
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Search transactions"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${statistics.totalSalesAmount.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Sold Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statistics.totalSold}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Not Sold Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statistics.totalNotSold}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    ${transaction.price.toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    {transaction.sold ? "Sold" : "Not Sold"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Range Distribution</CardTitle>
            <CardDescription>
              Number of items in each price range for {month}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={barData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>
              Distribution of items by category for {month}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Pie
                data={pieData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
