// "use client";
// import React, { useEffect, useState } from "react";
// import styles from "./Dashboard.module.css";

// interface Stat {
//   id: number;
//   icon: string;
//   value: number;
//   label: string;
// }

// interface DueBook {
//   id: string;
//   code: string;
//   title: string;
//   author: string;
//   dueStatus: string; // e.g. "Due in 2 days"
//   badgeColor: string; // "warning" | "danger"
// }

// interface Notification {
//   id: number;
//   type: "info" | "warning" | "success";
//   message: string;
// }

// const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<Stat[]>([]);
//   const [dueBooks, setDueBooks] = useState<DueBook[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   // Fetch data from APIs
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch("/api/dashboard/stats");
//         const data = await res.json();
//         setStats(data);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     const fetchDueBooks = async () => {
//       try {
//         const res = await fetch("/api/dashboard/due-books");
//         const data = await res.json();
//         setDueBooks(data);
//       } catch (error) {
//         console.error("Error fetching due books:", error);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const res = await fetch("/api/dashboard/notifications");
//         const data = await res.json();
//         setNotifications(data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchStats();
//     fetchDueBooks();
//     fetchNotifications();
//   }, []);

//   return (
//     <div className={styles.dashboard}>
//       {/* Stats Cards */}
//       <div className="row mb-4">
//         {stats.map((stat) => (
//           <div key={stat.id} className="col-md-3 mb-3">
//             <div className={`${styles.statCard} card`}>
//               <div className="card-body text-center">
//                 <i className={`${stat.icon} fs-1 mb-2`}></i>
//                 <h3>{stat.value}</h3>
//                 <p className="mb-0">{stat.label}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Books Due Soon + Notifications */}
//       <div className="row">
//         {/* Books Due Soon */}
//         <div className="col-lg-8 mb-4">
//           <div className={`${styles.cardCustom} card`}>
//             <div className="card-header bg-white">
//               <h5 className="mb-0">
//                 <i className="bi bi-clock me-2"></i>Books Due Soon
//               </h5>
//             </div>
//             <div className="card-body">
//               {dueBooks.length === 0 ? (
//                 <p className="text-muted">No books due soon.</p>
//               ) : (
//                 dueBooks.map((book) => (
//                   <div
//                     key={book.id}
//                     className={`${styles.dueBook} row align-items-center mb-3 p-2 border rounded`}
//                   >
//                     <div className="col-auto">
//                       <div className={styles.bookCover}>{book.code}</div>
//                     </div>
//                     <div className="col">
//                       <h6 className="mb-1">{book.title}</h6>
//                       <small className="text-muted">{book.author}</small>
//                     </div>
//                     <div className="col-auto">
//                       <span className={`badge bg-${book.badgeColor}`}>
//                         {book.dueStatus}
//                       </span>
//                       <button className="btn btn-sm btn-outline-primary ms-2">
//                         Renew
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Notifications */}
//         <div className="col-lg-4 mb-4">
//           <div className={`${styles.cardCustom} card`}>
//             <div className="card-header bg-white">
//               <h5 className="mb-0">
//                 <i className="bi bi-bell me-2"></i>Notifications
//               </h5>
//             </div>
//             <div className="card-body">
//               {notifications.length === 0 ? (
//                 <p className="text-muted">No notifications.</p>
//               ) : (
//                 notifications.map((note) => (
//                   <div
//                     key={note.id}
//                     className={`alert alert-${note.type} py-2`}
//                   >
//                     <small>{note.message}</small>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

interface Stat {
  id: number;
  icon: string;
  value: number;
  label: string;
}

interface DueBook {
  id: string;
  code: string;
  title: string;
  author: string;
  dueStatus: string; // e.g. "Due in 2 days"
  badgeColor: string; // "warning" | "danger"
}

interface Notification {
  id: number;
  type: "info" | "warning" | "success";
  message: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [dueBooks, setDueBooks] = useState<DueBook[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch data from APIs
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch("");
//         const data = await res.json();

//         // Ensure the 4 overview cards exist
//         const defaultStats: Stat[] = [
//           { id: 1, icon: "bi bi-book", value: data.borrowed ?? 1, label: "Books Borrowed" },
//           { id: 2, icon: "bi bi-bookmark-check", value: data.reservations ?? 1, label: "Reservations" },
//           { id: 3, icon: "bi bi-clock-history", value: data.dueSoon ?? 1, label: "Books Due Soon" },
//           { id: 4, icon: "bi bi-journal-check", value: data.read ?? 1, label: "Books Read" },
//         ];

//         setStats(defaultStats);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     const fetchDueBooks = async () => {
//       try {
//         const res = await fetch("");
//         const data = await res.json();
//         setDueBooks(data);
//       } catch (error) {
//         console.error("Error fetching due books:", error);
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const res = await fetch("");
//         const data = await res.json();
//         setNotifications(data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchStats();
//     fetchDueBooks();
//     fetchNotifications();
//   }, []);

    useEffect(() => {
  // mock data for now
  const fakeStats = {
    borrowed: 4,
    reservations: 2,
    dueSoon: 1,
    read: 7,
  };

  const fakeDueBooks = [
    {
      id: "1",
      code: "BK101",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      dueStatus: "Due in 2 days",
      badgeColor: "warning",
    },
    {
      id: "2",
      code: "BK202",
      title: "1984",
      author: "George Orwell",
      dueStatus: "Due tomorrow",
      badgeColor: "danger",
    },
  ];

const fakeNotifications: Notification[] = [
  { id: 1, type: "info", message: "New books have been added!" },
  { id: 2, type: "warning", message: "1 book is due tomorrow." },
  { id: 3, type: "success", message: "Book renewed successfully." },
];

  // simulate async fetch
  setTimeout(() => {
    const defaultStats: Stat[] = [
      { id: 1, icon: "bi bi-book", value: fakeStats.borrowed, label: "Books Borrowed" },
      { id: 2, icon: "bi bi-bookmark-check", value: fakeStats.reservations, label: "Reservations" },
      { id: 3, icon: "bi bi-clock-history", value: fakeStats.dueSoon, label: "Books Due Soon" },
      { id: 4, icon: "bi bi-journal-check", value: fakeStats.read, label: "Books Read" },
    ];
    setStats(defaultStats);
    setDueBooks(fakeDueBooks);
    setNotifications(fakeNotifications);
  }, 500);
}, []);


  return (
    <div className={styles.dashboard}>
      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((stat) => (
          <div key={stat.id} className="col-md-3 mb-3">
            <div className={`${styles.statCard} card`}>
              <div className="card-body text-center">
                <i className={`${stat.icon} fs-1 mb-2`}></i>
                <h3>{stat.value}</h3>
                <p className="mb-0">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Books Due Soon + Notifications */}
      <div className="row">
        {/* Books Due Soon */}
        <div className="col-lg-8 mb-4">
          <div className={`${styles.cardCustom} card`}>
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="bi bi-clock me-2"></i>Books Due Soon
              </h5>
            </div>
            <div className="card-body">
              {dueBooks.length === 0 ? (
                <p className="text-muted">No books due soon.</p>
              ) : (
                dueBooks.map((book) => (
                  <div
                    key={book.id}
                    className={`${styles.dueBook} row align-items-center mb-3 p-2 border rounded`}
                  >
                    <div className="col-auto">
                      <div className={styles.bookCover}>{book.code}</div>
                    </div>
                    <div className="col">
                      <h6 className="mb-1">{book.title}</h6>
                      <small className="text-muted">{book.author}</small>
                    </div>
                    <div className="col-auto">
                      <span className={`badge bg-${book.badgeColor}`}>
                        {book.dueStatus}
                      </span>
                      <button className="btn btn-sm btn-outline-primary ms-2">
                        Renew
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-lg-4 mb-4">
          <div className={`${styles.cardCustom} card`}>
            <div className="card-header bg-white">
              <h5 className="mb-0">
                <i className="bi bi-bell me-2"></i>Notifications
              </h5>
            </div>
            <div className="card-body">
              {notifications.length === 0 ? (
                <p className="text-muted">No notifications.</p>
              ) : (
                notifications.map((note) => (
                  <div
                    key={note.id}
                    className={`alert alert-${note.type} py-2`}
                  >
                    <small>{note.message}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
