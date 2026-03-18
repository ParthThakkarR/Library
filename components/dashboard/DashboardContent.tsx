
"use client";
import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import MonthlyIssuesChart from "./MonthlyIssueCart";
import RecentActivity from "./RecentActivity";
import { DashboardData } from "../types/Types";
import { Book, Users, ArrowRightLeft, TriangleAlert } from "lucide-react";
import { GiConsoleController } from "react-icons/gi";

interface DashboardContentProps {
  onViewAll: () => void;
}

// Interface for transactions within this dashboard component
interface Transaction {
  id: string;
  bookTitle: string;
  memberName: string;
  date: string;
  status: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ onViewAll }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);

  // 📌 Fetch dashboard stats
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch dashboard data");
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 📌 Fetch recent transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTx(true);
      try {
        const res = await fetch("/api/item-transactions");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to fetch transactions");
        
        const txArray = json.transactions || [];
        const latest3 = txArray.slice(0, 3);

        // Map API data to the component's 'Transaction' interface
        const formattedTransactions = latest3.map((apiTxn: any) => ({
          id: apiTxn.id,
          bookTitle: apiTxn.items?.itemTitle || 'N/A',
          memberName: `${apiTxn.patron?.patronFirstName || ''} ${apiTxn.patron?.patronLastName || ''}`.trim(),
          date: new Date(apiTxn.issueDate).toLocaleDateString(),
          status: apiTxn.returnDate ? 'Returned' : 'Issued',
        }));

        setTransactions(formattedTransactions);

      } catch (err: any) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoadingTx(false);
      }
    };

    fetchTransactions();
  }, []);


  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (error) return <div className="p-5 text-danger text-center">{error}</div>;
  if (!data) return null;

  const statCards = [
    { title: "Total Books", value: data.totalBooks, icon: <Book />, color: "bg-primary" },
    { title: "Active Members", value: data.activeMembers, icon: <Users />, color: "bg-success" },
    { title: "Books Issued", value: data.booksIssued, icon: <ArrowRightLeft />, color: "bg-info" },
    { title: "Overdue", value: data.overdue, icon: <TriangleAlert />, color: "bg-warning" },
  ];

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Library Dashboard</h1>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {statCards.map((card) => (
          <div className="col-12 col-md-6 col-lg-3" key={card.title}>
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="row g-3 mb-4">
        <div className="col-lg-8">
          <MonthlyIssuesChart data={data.monthlyData} />
        </div>
        <div className="col-lg-4">
          <RecentActivity activity={data.recentActivity} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Transactions</h5>
          <button className="btn btn-link p-0" onClick={onViewAll}>View All</button>
        </div>
        <div className="card-body">
          {loadingTx ? (
            <p className="text-center text-muted">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-muted">No recent transactions found.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {transactions.map((txn) => (
                <li key={txn.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{txn.bookTitle}</strong> borrowed by {txn.memberName}
                    <br />
                    <small className="text-muted">{txn.date}</small>
                  </div>
                  <span className={`badge rounded-pill ${txn.status === "Returned" ? "bg-success" : "bg-warning"}`}>
                    {txn.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;

