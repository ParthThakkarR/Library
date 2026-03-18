// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import styles from "./BorrowBooks.module.css";
// import { title } from "process";

// export interface Book {
//   id: string;
//   title: string;
//   author: string;
//   category: string;
//   available: boolean;
// }

// interface BorrowBooksProps {
//   userName: string;
// }

// const BorrowBooks: React.FC<BorrowBooksProps> = ({ userName }) => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [borrowed, setBorrowed] = useState<Book[]>([]);

//   // ✅ Fetch all books
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await fetch("/api/items");
//         const data = await res.json();
//         setBooks(
//           data.map((item: any) => ({
//             id: item.id,
//             title: item.itemTitle,
//             author: item.itemAuthor,
//             category: item.itemType,
//             available: item.quantity > 0,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ✅ Filtered list
//   const filteredBooks = useMemo(() => {
//     return books.filter((book) => {
//       const matchesSearch =
//         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesFilter = filter === "all" || book.category === filter;
//       return matchesSearch && matchesFilter;
//     });
//   }, [books, searchTerm, filter]);

//   // 🔹 Fetch all transactions
//   const fetchBorrowedBooks = async () => {
//     try {
//       const res = await fetch("/api/item-transactions");
//       const data = await res.json();

//       // 🔹 Filter only active ones
//       const activeBorrowed = data.transactions.filter(
//         (tx: any) => tx.isAvailable === false
//       );

//       setBorrowed(
//         activeBorrowed.map((tx: any) => ({
//           id: tx.items.id,
//           title: tx.items.itemTitle,
//           author: tx.items.itemAuthor,
//           category: tx.items.itemType,
//           available: false,
//         }))
//       );
//     } catch (err) {
//       console.error("Error fetching borrowed books:", err);
//     }
//   };

//   // Fetch borrowed books on mount
//   useEffect(() => {
//     fetchBorrowedBooks();
//   }, []);



//   const borrowBook = async (book: Book) => {
//     if (!book.available) return;

//     try {
//       const res = await fetch("/api/item-transactions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ itemId: book.id }),
//       });

//       if (res.ok) {
//         await fetchBorrowedBooks();

//         setBooks((prev) =>
//           prev.map((b) =>
//             b.id === book.id ? { ...b, available: false } : b
//           )
//         );
//       } else {
//         const data = await res.json();
//         alert(data.message || "Failed to borrow book");
//       }
//     } catch (err) {
//       // console.error(err);
//       alert("Error borrowing book");
//     }
//   };


//   return (
//     <div>
//       {/* Header */}
//       <nav className={`navbar navbar-expand-lg ${styles.libraryHeader}`}>
//         <div className="container">
//           <a className="navbar-brand fw-bold text-primary" href="#">
//             <i className="fas fa-book-open me-2"></i>
//             City Library
//           </a>
//           <div className="navbar-nav ms-auto">
//             <span className="navbar-text">
//               <i className="fas fa-user-circle me-2"></i>
//               Welcome, {userName}
//             </span>
//           </div>
//         </div>
//       </nav>

//       <div className="container py-4">
//         {/* Search */}
//         <div className={styles.searchContainer}>
//           <h2 className="text-center mb-4">
//             <i className="fas fa-search me-2"></i>
//             Find Your Next Great Read
//           </h2>
//           <div className="row">
//             <div className="col-md-8 mx-auto">
//               <div className="input-group mb-3">
//                 <input
//                   type="text"
//                   className={`form-control ${styles.searchInput}`}
//                   placeholder="Search by title, author, or ISBN..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && setSearchTerm(searchTerm)}
//                 />
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={() => setSearchTerm(searchTerm)}
//                 >
//                   <i className="fas fa-search"></i>
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="text-center">
//             {["all", "fiction", "non-fiction", "science", "history"].map((cat) => (
//               <button
//                 key={cat}
//                 className={`btn ${styles.filterBtn} ${
//                   filter === cat ? "active" : ""
//                 }`}
//                 onClick={() => setFilter(cat)}
//               >
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="row">
//           {/* Available Books */}
//           <div className="col-lg-8">
//             <h3 className="text-white mb-4">
//               <i className="fas fa-books me-2"></i>
//               Available Books
//             </h3>
//             <div className="row">
//               {filteredBooks.map((book) => (
//                 <div key={book.id} className="col-md-6 mb-4">
//                   <div className={`card ${styles.bookCard}`}>
//                     <div className={styles.bookCover}>
//                       <i className="fas fa-book"></i>
//                     </div>
//                     <div className={styles.bookInfo}>
//                       <h5 className={styles.bookTitle}>{book.title}</h5>
//                       <p className={styles.bookAuthor}>by {book.author}</p>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span
//                           className={`${styles.availabilityBadge} ${
//                             book.available
//                               ? styles.available
//                               : styles.unavailable
//                           }`}
//                         >
//                           {book.available ? "Available" : "Checked Out"}
//                         </span>
//                         <button
//                           className={`btn btn-primary ${styles.borrowBtn}`}
//                           disabled={!book.available}
//                           onClick={() => borrowBook(book)}
//                         >
//                           {book.available ? (
//                             <>
//                               <i className="fas fa-plus me-2"></i>Borrow
//                             </>
//                           ) : (
//                             <>
//                               <i className="fas fa-clock me-2"></i>Unavailable
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {filteredBooks.length === 0 && (
//                 <p className="text-white">No books found.</p>
//               )}
//             </div>
//           </div>

//           {/* Borrowed Books */}
//           <div className="col-lg-4">
//             <div className={styles.borrowedBooks}>
//               <h4 className="mb-3">
//                 <i className="fas fa-bookmark me-2"></i>
//                 Currently Borrowed
//               </h4>
//               {borrowed.length === 0 ? (
//                 <p>No borrowed books yet.</p>
//               ) : (
//                 borrowed.map((book) => (
//                   <div key={book.id} className={styles.borrowedItem}>
//                     <h6 className="mb-1">{book.title}</h6>
//                     <small className="text-muted">by {book.author}</small>
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

// export default BorrowBooks;

"use client";

import React, { useState, useMemo, useEffect } from "react";
import styles from "./BorrowBooks.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
  reserved: boolean;
}

export interface Reservation {
  transactionId: string;
  itemId: string;
  bookTitle: string;
  author: string;
  reservedUntil: string;
}

interface BorrowBooksProps {
  userName: string;
}

const BorrowBooks: React.FC<BorrowBooksProps> = ({ userName }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [borrowed, setBorrowed] = useState<Book[]>([]);
  const [myReservation, setMyReservation] = useState<Reservation | null>(null);
  const [reserveBookId, setReserveBookId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);

  // Fetch all books & transactions
  const fetchInitialData = async () => {
    try {
      setError(null);

      const [resBooks, resTransactions] = await Promise.all([
        fetch("/api/items"),
        fetch("/api/item-transactions"),
      ]);

      const booksData = await resBooks.json();
      const txData = await resTransactions.json();

      const itemsArray = Array.isArray(booksData) ? booksData : booksData.items || [];
      const transactionsArray = Array.isArray(txData) ? txData : txData.transactions || [];

      // User's reservation
      const reservationTx = transactionsArray.find((tx: any) => tx.isReserved && tx.reservedBy);
      if (reservationTx && reservationTx.items) {
        setMyReservation({
          transactionId: reservationTx.id,
          itemId: reservationTx.itemId,
          bookTitle: reservationTx.items.itemTitle,
          author: reservationTx.items.itemAuthor,
          reservedUntil: new Date(reservationTx.reservedUntil).toLocaleDateString(),
        });
      } else setMyReservation(null);

      // Borrowed books
      const activeBorrowed = transactionsArray
        .filter((tx: any) => !tx.isAvailable && tx.itemAssignedTo && tx.items)
        .map((tx: any) => ({
          id: tx.items.id,
          title: tx.items.itemTitle,
          author: tx.items.itemAuthor,
          category: tx.items.itemType,
          available: false,
          reserved: false,
        }));
      setBorrowed(activeBorrowed);

      // All books with reserved status
      setBooks(
        itemsArray.map((item: any) => ({
          id: item.id,
          title: item.itemTitle,
          author: item.itemAuthor,
          category: item.itemType,
          available: item.quantity > 0,
          reserved: reservationTx?.itemId === item.id,
        }))
      );
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "An unknown error occurred.");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || book.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [books, searchTerm, filter]);

  // Borrow book
  const borrowBook = async (book: Book) => {
    if (!book.available) return;
    try {
      const res = await fetch("/api/item-transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: book.id }),
      });
      if (res.ok) fetchInitialData();
      else {
        const data = await res.json();
        alert(data.message || "Failed to borrow book");
      }
    } catch {
      alert("Error borrowing book");
    }
  };

  // Reserve book
  const reserveBook = async () => {
    if (!reserveBookId || !selectedDate) return;
    try {
      const res = await fetch("/api/item-transactions/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: reserveBookId, reservationDate: selectedDate }),
      });
      if (res.ok) {
        alert("Book reserved successfully!");
        fetchInitialData();
        setReserveBookId(null);
        setSelectedDate(null);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to reserve book");
      }
    } catch {
      alert("Error reserving book");
    }
  };

  // Cancel reservation
  const cancelReservation = async () => {
    if (!myReservation) return;
    try {
      const res = await fetch(`/api/item-transactions/${myReservation.transactionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Reservation cancelled successfully!");
        fetchInitialData();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to cancel reservation.");
      }
    } catch {
      alert("Error cancelling reservation.");
    }
  };

  return (
    <div className={styles.body}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${styles.libraryHeader}`}>
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">
            <i className="fas fa-book-open me-2"></i> City Library
          </a>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text">
              <i className="fas fa-user-circle me-2"></i> Welcome, {userName}
            </span>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Search & Filter */}
        <div className={styles.searchContainer}>
          <h2 className="text-center mb-4">
            <i className="fas fa-search me-2"></i> Find Your Next Great Read
          </h2>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={`form-control ${styles.searchInput}`}
                  placeholder="Search by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            {["all", "fiction", "non-fiction", "science", "history"].map((cat) => (
              <button
                key={cat}
                className={`btn ${styles.filterBtn} ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          {/* Available Books */}
          <div className="col-lg-8">
            <h3 className="text-white mb-4">Available Books</h3>
            <div className="row">
              {filteredBooks.map((book) => (
                <div key={book.id} className="col-md-6 mb-4">
                  <div className={`card ${styles.bookCard}`}>
                    <div className={styles.bookCover}>
                      <i className="fas fa-book"></i>
                    </div>
                    <div className={styles.bookInfo}>
                      <h5 className={styles.bookTitle}>{book.title}</h5>
                      <p className={styles.bookAuthor}>by {book.author}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span
                          className={`${styles.availabilityBadge} ${
                            book.available ? styles.available : styles.unavailable
                          }`}
                        >
                          {book.available ? "Available" : "Checked Out"}
                        </span>
                        <div className="d-flex gap-2">
                          <button
                            className={styles.borrowBtn}
                            disabled={!book.available}
                            onClick={() => borrowBook(book)}
                          >
                            Borrow
                          </button>

                          {/* Reserve / Cancel */}
                          {book.reserved && myReservation?.itemId === book.id ? (
                            <button
                              className={styles.borrowBtn}
                              onClick={cancelReservation}
                            >
                              Cancel Reservation
                            </button>
                          ) : (
                            <button
                              className={styles.borrowBtn}
                              disabled={!book.available || !!myReservation}
                              onClick={() => setReserveBookId(book.id)}
                            >
                              {book.reserved ? "Reserved" : "Reserve"}
                            </button>
                          )}
                        </div>
                      </div>

                      {reserveBookId === book.id && (
                        <div className="mt-2">
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={today}
                            maxDate={maxDate}
                            placeholderText="Select reservation date"
                          />
                          <div className="d-flex gap-2 mt-2">
                            <button
                              className={styles.borrowBtn}
                              onClick={reserveBook}
                              disabled={!selectedDate}
                            >
                              Confirm Reservation
                            </button>
                            <button
                              className={styles.borrowBtn}
                              onClick={() => setReserveBookId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredBooks.length === 0 && <p className="text-white">No books found.</p>}
            </div>
          </div>

          {/* Borrowed Books Sidebar */}
          <div className="col-lg-4">
            <div className={styles.borrowedBooks}>
              {myReservation && (
                <div className="mb-4">
                  <h4 className="mb-3">
                    <i className="fas fa-calendar-check me-2"></i> Your Reservation
                  </h4>
                  <div className="mb-2">
                    <h6 className="mb-0">{myReservation.bookTitle}</h6>
                    <small className="text-muted">by {myReservation.author}</small>
                    <p className="mb-0">
                      <small>Reserved until: {myReservation.reservedUntil}</small>
                    </p>
                  </div>
                  <button className={styles.borrowBtn} onClick={cancelReservation}>
                    Cancel Reservation
                  </button>
                </div>
              )}

              <h4 className="mb-3">Currently Borrowed</h4>
              {borrowed.length === 0 ? (
                <p>No borrowed books yet.</p>
              ) : (
                borrowed.map((book) => (
                  <div key={book.id} className={styles.borrowedItem}>
                    <h6 className="mb-1">{book.title}</h6>
                    <small className="text-muted">by {book.author}</small>
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

export default BorrowBooks;
