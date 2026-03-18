// "use client";
// import React, { useState, useEffect } from 'react';

// // --- INTERFACES ---
// // Defines the shape of a single transaction object coming from your API
// interface Transaction {
//   id: string;
//   items: {
//     itemTitle: string;
//   } | null;
//   patron: {
//     patronFirstName: string;
//     patronLastName: string;
//   } | null;
//   isAvailable: boolean; // false = Issued, true = Returned
//   issueDate: string;
//   dueDate?: string; // Optional due date
// }

// const TransactionsContent: React.FC = () => {
//   // State is now simplified: only what's needed for displaying the history
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // State for search and filter controls
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState(""); // "issue" or "return"
//   const [filterStatus, setFilterStatus] = useState(""); // "active", "overdue", "completed"

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Now we ONLY fetch transactions. No more call to the failing /api/items/get-all
//         const res = await fetch('/api/item-transactions');
//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData.message || 'Failed to fetch transactions');
//         }
//         const data = await res.json();
//         setTransactions(data.transactions || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []); // useEffect will run once on component mount

//   // --- HELPER FUNCTIONS ---
  
//   // Determines the status of a transaction based on its data
//   const getStatus = (tx: Transaction): { text: string; color: string } => {
//     if (tx.isAvailable) {
//       return { text: 'Completed', color: 'success' }; // Book has been returned
//     }
//     if (tx.dueDate && new Date(tx.dueDate) < new Date()) {
//       return { text: 'Overdue', color: 'warning' }; // Book is issued and past due date
//     }
//     return { text: 'Active', color: 'primary' }; // Book is currently issued
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString();
//   };

//   // --- FILTERING LOGIC ---

//   const filteredTransactions = transactions.filter(tx => {
//     const status = getStatus(tx).text.toLowerCase();
//     const type = tx.isAvailable ? 'return' : 'issue';
    
//     const matchesSearch = 
//       (tx.patron ? `${tx.patron.patronFirstName} ${tx.patron.patronLastName}` : 'N/A').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (tx.items?.itemTitle || 'N/A').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       tx.id.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesType = !filterType || type === filterType;
//     const matchesStatus = !filterStatus || status === filterStatus;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h4>Transaction Management</h4>
//       <p className="text-muted">A history of all book issues and returns.</p>
      
//       {error && (
//         <div className="alert alert-danger mb-4" role="alert">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="table-container">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5 className="mb-0">All Transactions</h5>
//           {/* "New Transaction" button has been removed */}
//         </div>
        
//         <div className="row mb-3">
//           <div className="col-md-4">
//             <input 
//               type="text" 
//               className="form-control" 
//               placeholder="Search by book, member, or ID..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="col-md-4">
//             <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//               <option value="">All Types</option>
//               <option value="issue">Issue</option>
//               <option value="return">Return</option>
//             </select>
//           </div>
//           <div className="col-md-4">
//             <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//               <option value="">All Statuses</option>
//               <option value="active">Active</option>
//               <option value="completed">Completed</option>
//               <option value="overdue">Overdue</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="table-responsive">
//           <table className="table table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Transaction ID</th>
//                 <th>Member</th>
//                 <th>Book</th>
//                 <th>Type</th>
//                 <th>Issue Date</th>
//                 <th>Due Date</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTransactions.length > 0 ? (
//                 filteredTransactions.map(tx => {
//                   const status = getStatus(tx);
//                   const type = tx.isAvailable ? { text: 'Return', color: 'info' } : { text: 'Issue', color: 'success' };
//                   const patronName = tx.patron ? `${tx.patron.patronFirstName} ${tx.patron.patronLastName}` : 'N/A';
                  
//                   return (
//                     <tr key={tx.id}>
//                       <td><code className="text-muted">...{tx.id.slice(-6)}</code></td>
//                       <td>{patronName}</td>
//                       <td>{tx.items?.itemTitle || 'Unknown Book'}</td>
//                       <td><span className={`badge bg-${type.color}`}>{type.text}</span></td>
//                       <td>{formatDate(tx.issueDate)}</td>
//                       <td>{formatDate(tx.dueDate)}</td>
//                       <td><span className={`badge bg-${status.color}`}>{status.text}</span></td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-info me-1" title="View Details">
//                           <i className="fas fa-eye"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   )
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={8} className="text-center text-muted py-4">No transactions found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       <style jsx>{`
//         .table-container {
//           background: #fff;
//           border-radius: 15px;
//           padding: 25px;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.08);
//           margin-bottom: 20px;
//         }
//         .badge {
//           border-radius: 20px;
//           padding: 6px 12px;
//           font-weight: 500;
//         }
//         code {
//           font-family: 'SF Mono', 'Fira Code', 'Menlo', monospace;
//         }
//       `}</style>
//     </>
//   );
// };

// export default TransactionsContent;



// Section 2

// "use client";
// import React, { useState, useEffect } from "react";

// // --- INTERFACES ---
// interface Transaction {
//   id: string;
//   items: {
//     itemTitle: string;
//   } | null;
//   patron: {
//     patronFirstName: string;
//     patronLastName: string;
//   } | null;
//   isAvailable: boolean; // false = Issued, true = Returned
//   isReserved: boolean; // true = Reserved
//   reservedDate?: string; // When reservation was made
//   issueDate?: string; // When book was issued
//   dueDate?: string; // Optional due date
// }

// const TransactionsContent: React.FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Search + Filters
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState(""); // "reservation" | "issue" | "return"
//   const [filterStatus, setFilterStatus] = useState(""); // reserved, active, overdue, completed

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch("/api/item-transactions");
//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData.message || "Failed to fetch transactions");
//         }
//         const data = await res.json();
//         setTransactions(data.transactions || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // --- HELPERS ---

//   const getStatus = (tx: Transaction): { text: string; color: string } => {
//     if (tx.isReserved) return { text: "Reserved", color: "secondary" };
//     if (tx.isAvailable) return { text: "Completed", color: "success" }; // returned
//     if (tx.dueDate && new Date(tx.dueDate) < new Date())
//       return { text: "Overdue", color: "warning" };
//     return { text: "Active", color: "primary" };
//   };

//   const getType = (tx: Transaction): { text: string; color: string } => {
//     if (tx.isReserved) return { text: "Reservation", color: "secondary" };
//     if (tx.isAvailable) return { text: "Return", color: "info" };
//     return { text: "Issue", color: "success" };
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString();
//   };

//   // --- FILTERING ---
//   const filteredTransactions = transactions.filter((tx) => {
//     const status = getStatus(tx).text.toLowerCase();
//     const type = getType(tx).text.toLowerCase();

//     const matchesSearch =
//       (tx.patron
//         ? `${tx.patron.patronFirstName} ${tx.patron.patronLastName}`
//         : "N/A"
//       )
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       (tx.items?.itemTitle || "N/A")
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       tx.id.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesType = !filterType || type === filterType;
//     const matchesStatus = !filterStatus || status === filterStatus;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   // --- RENDER ---
//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ minHeight: "400px" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h4>Transaction Management</h4>
//       <p className="text-muted">A history of all reservations, issues, and returns.</p>

//       {error && (
//         <div className="alert alert-danger mb-4" role="alert">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="table-container">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5 className="mb-0">All Transactions</h5>
//         </div>

//         {/* Filters */}
//         <div className="row mb-3">
//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by book, member, or ID..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="col-md-4">
//             <select
//               className="form-select"
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//             >
//               <option value="">All Types</option>
//               <option value="reservation">Reservation</option>
//               <option value="issue">Issue</option>
//               <option value="return">Return</option>
//             </select>
//           </div>
//           <div className="col-md-4">
//             <select
//               className="form-select"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="">All Statuses</option>
//               <option value="reserved">Reserved</option>
//               <option value="active">Active</option>
//               <option value="completed">Completed</option>
//               <option value="overdue">Overdue</option>
//             </select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-responsive">
//           <table className="table table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Transaction ID</th>
//                 <th>Member</th>
//                 <th>Book</th>
//                 <th>Type</th>
//                 {/* <th>Reservation Date</th> */}
//                 <th>Issue Date</th>
//                 <th>Due Date</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTransactions.length > 0 ? (
//                 filteredTransactions.map((tx) => {
//                   const status = getStatus(tx);
//                   const type = getType(tx);
//                   const patronName = tx.patron
//                     ? `${tx.patron.patronFirstName} ${tx.patron.patronLastName}`
//                     : "N/A";

//                   return (
//                     <tr key={tx.id}>
//                       <td>
//                         <code className="text-muted">...{tx.id.slice(-6)}</code>
//                       </td>
//                       <td>{patronName}</td>
//                       <td>{tx.items?.itemTitle || "Unknown Book"}</td>
//                       <td>
//                         <span className={`badge bg-${type.color}`}>
//                           {type.text}
//                         </span>
//                       </td>
//                       {/* <td>{formatDate(tx.reservedDate)}</td> */}
//                       <td>{formatDate(tx.issueDate)}</td>
//                       <td>{formatDate(tx.dueDate)}</td>
//                       <td>
//                         <span className={`badge bg-${status.color}`}>
//                           {status.text}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-outline-info me-1"
//                           title="View Details"
//                         >
//                           <i className="fas fa-eye"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={9} className="text-center text-muted py-4">
//                     No transactions found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <style jsx>{`
//         .table-container {
//           background: #fff;
//           border-radius: 15px;
//           padding: 25px;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//           margin-bottom: 20px;
//         }
//         .badge {
//           border-radius: 20px;
//           padding: 6px 12px;
//           font-weight: 500;
//         }
//         code {
//           font-family: "SF Mono", "Fira Code", "Menlo", monospace;
//         }
//       `}</style>
//     </>
//   );
// };

// export default TransactionsContent;

// Section 3
"use client";
import React, { useState, useEffect } from "react";

// --- INTERFACES ---
interface Transaction {
  id: string;
  items: {
    itemTitle: string;
  } | null;
  patron: {
    patronFirstName: string;
    patronLastName: string;
  } | null;
  reserve: {
    patronFirstName: string;
    patronLastName: string;
  } | null;
  isAvailable: boolean;
  isReserved: boolean;
  reservedUntil?: string; // Made optional to match all transaction types
  issueDate?: string;
  dueDate?: string;
}

const TransactionsContent: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search + Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/item-transactions");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch transactions");
      }
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- ACTION HANDLERS ---

  // ✅ NEW: Function to handle activating a reservation
  const handleActivateReservation = async (transactionId: string) => {
    if (!confirm("Activate this reservation? This will mark the book as borrowed by the patron.")) {
        return;
    }
    try {
        const res = await fetch(`/api/item-transactions/${transactionId}/activate`, {
            method: 'PUT',
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            fetchTransactions(); // Refresh the list
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Activate reservation error:", error);
        alert("An unexpected error occurred.");
    }
  };

  // ✅ NEW: Function to handle returning a borrowed book
  const handleReturnBook = async (transactionId: string) => {
    if (!confirm("Are you sure you want to mark this book as returned?")) {
        return;
    }
    try {
        const res = await fetch(`/api/item-transactions/${transactionId}/return`, {
            method: 'PUT',
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            fetchTransactions(); // Refresh the list
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Return book error:", error);
        alert("An unexpected error occurred.");
    }
  };


  // --- HELPERS (Your original helper functions are great, no changes needed) ---
  const getStatus = (tx: Transaction): { text: string; color: string } => {
    if (tx.isReserved) return { text: "Reserved", color: "secondary" };
    if (tx.isAvailable) return { text: "Completed", color: "success" };
    if (tx.dueDate && new Date(tx.dueDate) < new Date())
      return { text: "Overdue", color: "warning" };
    return { text: "Active", color: "primary" };
  };

  const getType = (tx: Transaction): { text: string; color: string } => {
    if (tx.isReserved) return { text: "Reservation", color: "secondary" };
    if (tx.isAvailable) return { text: "Return", color: "info" };
    return { text: "Issue", color: "success" };
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getPatronName = (tx: Transaction): string => {
    if (tx.isReserved && tx.reserve) {
      return `${tx.reserve.patronFirstName || ''} ${tx.reserve.patronLastName || ''}`.trim();
    }
    if (tx.patron) {
      return `${tx.patron.patronFirstName || ''} ${tx.patron.patronLastName || ''}`.trim();
    }
    return "N/A";
  };

  // --- FILTERING (No changes needed) ---
  const filteredTransactions = transactions.filter((tx) => {
    const status = getStatus(tx).text.toLowerCase();
    const type = getType(tx).text.toLowerCase();
    const patronName = getPatronName(tx).toLowerCase();
    const matchesSearch =
      patronName.includes(searchQuery.toLowerCase()) ||
      (tx.items?.itemTitle || "N/A").toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || type === filterType;
    const matchesStatus = !filterStatus || status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // --- RENDER ---
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h4>Transaction Management</h4>
      <p className="text-muted">A history of all reservations, issues, and returns.</p>
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">All Transactions</h5>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by book, member, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="reservation">Reservation</option>
              <option value="issue">Issue</option>
              <option value="return">Return</option>
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="reserved">Reserved</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Transaction ID</th>
                <th>Member</th>
                <th>Book</th>
                <th>Type</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => {
                  const status = getStatus(tx);
                  const type = getType(tx);
                  const patronName = getPatronName(tx);

                  return (
                    <tr key={tx.id}>
                      <td>
                        <code className="text-muted">...{tx.id.slice(-6)}</code>
                      </td>
                      <td>{patronName}</td>
                      <td>{tx.items?.itemTitle || "Unknown Book"}</td>
                      <td>
                        <span className={`badge bg-${type.color}`}>
                          {type.text}
                        </span>
                      </td>
                      <td>{formatDate(tx.issueDate)}</td>
                      <td>{formatDate(tx.dueDate)}</td>
                      <td>
                        <span className={`badge bg-${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td>
                        {/* ✨ UPDATED: Logic to show the correct action button */}
                        {tx.isReserved && (
                            <button
                                className="btn btn-sm btn-info"
                                title="Activate Reservation"
                                onClick={() => handleActivateReservation(tx.id)}
                            >
                                Activate
                            </button>
                        )}
                        {!tx.isAvailable && !tx.isReserved && (
                            <button
                                className="btn btn-sm btn-success"
                                title="Return Book"
                                onClick={() => handleReturnBook(tx.id)}
                            >
                                Return
                            </button>
                        )}
                         {tx.isAvailable && (
                             <span className="text-muted">-</span>
                         )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .table-container {
          background: #fff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          margin-bottom: 20px;
        }
        .badge {
          border-radius: 20px;
          padding: 6px 12px;
          font-weight: 500;
        }
        code {
          font-family: "SF Mono", "Fira Code", "Menlo", monospace;
        }
      `}</style>
    </>
  );
};

export default TransactionsContent;

