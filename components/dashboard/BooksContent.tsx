// "use client"; List Layout
// import React, { useState, useEffect } from "react";
// import BookPopup, { BookData } from "../BookPopUp";

// interface Item {
//   id: string;
//   isbn: string;
//   itemTitle: string;
//   itemAuthor: string;
//   itemType: string;
//   itemPrice: number;
//   itemImage?: string;
//   quantity?: number;
// }

// interface BooksContentProps {
//   onAddBook: () => void;
// }

// const BooksContent: React.FC<BooksContentProps> = ({onAddBook}) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   // Fetch items from DB
//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/items");
//         const data = await res.json();
//         setItems(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItems();
//   }, []);

//   // Handle Add New Book
//   const handleAddBook = async (book: BookData) => {
//     try {
//       // ✅ If you’re uploading an image file, use FormData
//       const formData = new FormData();
//       formData.append("itemTitle", book.itemTitle);
//       formData.append("itemAuthor", book.itemAuthor);
//       formData.append("itemType", book.itemType);
//       formData.append("itemPrice", book.itemPrice);
//       formData.append("isbn", book.isbn);
//       formData.append("quantity", book.quantity)
//       if (book.itemImage) {
//         formData.append("itemImage", book.itemImage); // file upload
//       }

//       const res = await fetch("/api/items", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Failed to add book");
//       }

//       const newBook = await res.json();

//       // Update UI immediately
//       setItems((prev) => [...prev, newBook]);
//     } catch (error) {
//       console.error("Error adding book:", error);
//     }
//   };

//   // Filtered items
//   const filteredItems = items.filter(
//     (item) =>
//       item.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedCategory
//         ? item.itemType.toLowerCase() === selectedCategory.toLowerCase()
//         : true)
//   );

//   const deleteItem = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this book?")) {
//       try {
//         const res = await fetch(`/api/items/${id}`, {
//           method: "DELETE",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to delete book");
//         }

//         setItems((prev) => prev.filter((item) => item.id !== id));
      
//       } catch (error) {
//         console.error("Error deleting book:", error);
//       }
//     }
//   };


//   return (
//     <div className="container-fluid p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>Book Management</h4>
//         <button className="btn btn-primary" onClick={() => setShowPopup(true)}>
//           <i className="fas fa-plus me-2"></i>Add New Book
//         </button>
//       </div>

//       <div className="card shadow-sm">
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-6 mb-2">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search books..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="col-md-6 mb-2">
//               <select
//                 className="form-select"
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 <option value="">All Categories</option>
//                 <option value="fiction">Fiction</option>
//                 <option value="non-fiction">Non-Fiction</option>
//                 <option value="science">Science</option>
//                 <option value="history">History</option>
//                 <option value="biography">Biography</option>
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <div className="text-center py-4">Loading books...</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-hover align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>ISBN</th>
//                     <th>Title</th>
//                     <th>Author</th>
//                     <th>Category</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredItems.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.isbn}</td>
//                       <td>{item.itemTitle}</td>
//                       <td>{item.itemAuthor}</td>
//                       <td>
//                         <span className="badge bg-info">{item.itemType}</span>
//                       </td>
//                       <td>{item.quantity ?? 1}</td>
//                       <td>${item.itemPrice}</td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-primary me-1">
//                           <i className="fas fa-edit"></i>
//                         </button>
//                         <button className="btn btn-sm btn-outline-danger" onClick={()=>deleteItem(item.id)}>
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {filteredItems.length === 0 && (
//                     <tr>
//                       <td colSpan={7} className="text-center text-muted">
//                         No books found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Popup Component */}
//       <BookPopup
//         show={showPopup}
//         onClose={() => setShowPopup(false)}
//         onAdd={handleAddBook}
//       />
//     </div>
//   );
// };

// export default BooksContent;


// Part 2- Grid Layout


// "use client";
// import React, { useState, useEffect } from "react";
// import BookPopup, { BookData } from "../BookPopUp";

// interface Item {
//   id: string;
//   isbn: string;
//   itemTitle: string;
//   itemAuthor: string;
//   itemType: string;
//   itemPrice: number;
//   itemImage?: string;
//   quantity?: number;
// }

// interface BooksContentProps {
//   onAddBook: () => void;
// }

// const BooksContent: React.FC<BooksContentProps> = ({ onAddBook }) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   // Fetch items
//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/items");
//         const data = await res.json();
//         setItems(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItems();
//   }, []);

//   // Add book
//   const handleAddBook = async (book: BookData) => {
//     try {
//       const formData = new FormData();
//       formData.append("itemTitle", book.itemTitle);
//       formData.append("itemAuthor", book.itemAuthor);
//       formData.append("itemType", book.itemType);
//       formData.append("itemPrice", book.itemPrice);
//       formData.append("isbn", book.isbn);
//       formData.append("quantity", book.quantity);
//       if (book.itemImage) {
//         formData.append("itemImage", book.itemImage);
//       }

//       const res = await fetch("/api/items", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to add book");

//       const newBook = await res.json();
//       setItems((prev) => [...prev, newBook]);
//     } catch (error) {
//       console.error("Error adding book:", error);
//     }
//   };

//   // Delete book
//   const deleteItem = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this book?")) {
//       try {
//         const res = await fetch(`/api/items/${id}`, {
//           method: "DELETE",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//         });

//         if (!res.ok) throw new Error("Failed to delete book");

//         setItems((prev) => prev.filter((item) => item.id !== id));
//       } catch (error) {
//         console.error("Error deleting book:", error);
//       }
//     }
//   };

//   // Filter books
//   const filteredItems = items.filter(
//     (item) =>
//       item.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedCategory
//         ? item.itemType.toLowerCase() === selectedCategory.toLowerCase()
//         : true)
//   );

//   return (
//     <div className="container-fluid p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>Book Management</h4>
//         <button className="btn btn-primary" onClick={() => setShowPopup(true)}>
//           <i className="fas fa-plus me-2"></i>Add New Book
//         </button>
//       </div>

//       <div className="card shadow-sm">
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-6 mb-2">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search books..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="col-md-6 mb-2">
//               <select
//                 className="form-select"
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 <option value="">All Categories</option>
//                 <option value="fiction">Fiction</option>
//                 <option value="non-fiction">Non-Fiction</option>
//                 <option value="science">Science</option>
//                 <option value="history">History</option>
//                 <option value="biography">Biography</option>
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <div className="text-center py-4">Loading books...</div>
//           ) : (
//             <div className="row g-3">
//               {filteredItems.map((item) => (
//                 <div key={item.id} className="col-md-3 col-sm-6">
//                   <div className="card h-100 shadow-sm">
//                     {item.itemImage ? (
//                       <img
//                         src={item.itemImage}
//                         className="card-img-top"
//                         alt={item.itemTitle}
//                         style={{ height: "200px", objectFit: "cover" }}
//                       />
//                     ) : (
//                       <div
//                         className="bg-light d-flex align-items-center justify-content-center"
//                         style={{ height: "200px" }}
//                       >
//                         <i className="fas fa-book fa-3x text-muted"></i>
//                       </div>
//                     )}
//                     <div className="card-body d-flex flex-column">
//                       <h6 className="card-title">{item.itemTitle}</h6>
//                       <p className="text-muted mb-1">{item.itemAuthor}</p>
//                       <span className="badge bg-info mb-2">{item.itemType}</span>
//                       <p className="mb-1">
//                         <strong>Qty:</strong> {item.quantity ?? 1}
//                       </p>
//                       <p className="mb-2">
//                         <strong>${item.itemPrice}</strong>
//                       </p>
//                       <div className="mt-auto d-flex justify-content-between">
//                         <button className="btn btn-sm btn-outline-primary">
//                           <i className="fas fa-edit"></i>
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => deleteItem(item.id)}
//                         >
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {filteredItems.length === 0 && (
//                 <div className="text-center text-muted py-4">
//                   No books found
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Popup */}
//       <BookPopup
//         show={showPopup}
//         onClose={() => setShowPopup(false)}
//         onAdd={handleAddBook}
//       />
//     </div>
//   );
// };

// export default BooksContent;


// Part 3

"use client";
import React, { useState, useEffect } from "react";
import BookPopup, { BookData } from "../BookPopUp";

interface Item {
  id: string;
  isbn: string;
  itemTitle: string;
  itemAuthor: string;
  itemType: string;
  itemPrice: number;
  itemImage?: string;
  quantity?: number;
}

interface BooksContentProps {
  onAddBook: () => void;
}

const BooksContent: React.FC<BooksContentProps> = ({ onAddBook }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<BookData | null>(null);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Add book
  const handleAddBook = async (book: BookData) => {
    try {
      const formData = new FormData();
      formData.append("itemTitle", book.itemTitle);
      formData.append("itemAuthor", book.itemAuthor);
      formData.append("itemType", book.itemType);
      formData.append("itemPrice", book.itemPrice);
      formData.append("isbn", book.isbn);
      formData.append("quantity", book.quantity);
      if (book.itemImage) {
        formData.append("itemImage", book.itemImage);
      }

      const res = await fetch("/api/items", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add book");

      const newBook = await res.json();
      setItems((prev) => [...prev, newBook]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update book
  const handleUpdateBook = async (book: BookData) => {
    try {
      if (!book.id) return;

      const formData = new FormData();
      formData.append("itemTitle", book.itemTitle);
      formData.append("itemAuthor", book.itemAuthor);
      formData.append("itemType", book.itemType);
      formData.append("itemPrice", book.itemPrice);
      formData.append("isbn", book.isbn);
      formData.append("quantity", book.quantity);
      if (book.itemImage) {
        formData.append("itemImage", book.itemImage);
      }

      const res = await fetch(`/api/items/${book.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update book");

      const updatedBook = await res.json();
      setItems((prev) =>
        prev.map((i) => (i.id === updatedBook.id ? updatedBook : i))
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete book
  const deleteItem = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const res = await fetch(`/api/items/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to delete book");

        setItems((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  // Filter books
  const filteredItems = items.filter(
    (item) =>
      item.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory
        ? item.itemType.toLowerCase() === selectedCategory.toLowerCase()
        : true)
  );

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Book Management</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setBookToEdit(null); // reset edit state
            setShowPopup(true);
          }}
        >
          <i className="fas fa-plus me-2"></i>Add New Book
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="biography">Biography</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading books...</div>
          ) : (
            <div className="row g-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="col-md-3 col-sm-6">
                  <div className="card h-100 shadow-sm">
                    {item.itemImage ? (
                      <img
                        src={item.itemImage}
                        className="card-img-top"
                        alt={item.itemTitle}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="bg-light d-flex align-items-center justify-content-center"
                        style={{ height: "200px" }}
                      >
                        <i className="fas fa-book fa-3x text-muted"></i>
                      </div>
                    )}
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{item.itemTitle}</h6>
                      <p className="text-muted mb-1">{item.itemAuthor}</p>
                      <span className="badge bg-info mb-2">{item.itemType}</span>
                      <p className="mb-1">
                        <strong>Qty:</strong> {item.quantity ?? 1}
                      </p>
                      <p className="mb-2">
                        <strong>${item.itemPrice}</strong>
                      </p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setBookToEdit({
                              id: item.id,
                              itemTitle: item.itemTitle,
                              itemAuthor: item.itemAuthor,
                              itemType: item.itemType,
                              itemPrice: String(item.itemPrice),
                              itemImage: null, // cannot prefill File, you may show preview separately
                              isbn: item.isbn,
                              quantity: String(item.quantity ?? "1"),
                            });
                            setShowPopup(true);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteItem(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="text-center text-muted py-4">
                  No books found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Popup */}
      <BookPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook}
        bookToEdit={bookToEdit}
      />
    </div>
  );
};

export default BooksContent;
