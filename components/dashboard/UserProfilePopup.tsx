// "use client";
// import { useState, useEffect } from "react";
// import styles from "./UserProfilePopup.module.css";

// export default function UserProfilePopup() {
//   const [isOpen, setIsOpen] = useState(false);

//   const openProfile = () => {
//     setIsOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeProfile = () => {
//     setIsOpen(false);
//     document.body.style.overflow = "auto";
//   };

//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") closeProfile();
//     };
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, []);

//   return (
//     <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
//       {/* Trigger Button */}
//       <button className={styles.triggerBtn} onClick={openProfile}>
//         View Profile
//       </button>

//       {/* Popup Overlay */}
//       {isOpen && (
//         <div
//           className={styles.popupOverlay}
//           onClick={(e) => e.target === e.currentTarget && closeProfile()}
//         >
//           <div className={styles.popupContent}>
//             <div className="card border-0 shadow-lg">
//               {/* Header */}
//               <div className={`${styles.profileHeader} text-white`}>
//                 <button className={styles.closeBtn} onClick={closeProfile}>
//                   <span>&times;</span>
//                 </button>

//                 <div className="d-flex align-items-center">
//                   <div className={`${styles.profileImage} me-3`}>AS</div>
//                   <div>
//                     <h2 className="mb-1 fw-bold">Alex Smith</h2>
//                     <p className="mb-0 opacity-75">Computer Science Student</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Content */}
//               <div className="card-body p-4">
//                 {/* Basic Information */}
//                 <div className="row g-3 mb-4">
//                   <div className="col-md-6">
//                     <div className={styles.infoCard}>
//                       <div className={styles.infoLabel}>Full Name</div>
//                       <p className={styles.infoValue}>Alexander Smith</p>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className={styles.infoCard}>
//                       <div className={styles.infoLabel}>Department</div>
//                       <p className={styles.infoValue}>Computer Science</p>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className={styles.infoCard}>
//                       <div className={styles.infoLabel}>Roll Number</div>
//                       <p className={styles.infoValue}>CS2024001</p>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className={styles.infoCard}>
//                       <div className={styles.infoLabel}>Enrollment ID</div>
//                       <p className={styles.infoValue}>EN202400123</p>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className={styles.infoCard}>
//                       <div className={styles.infoLabel}>Semester</div>
//                       <p className={styles.infoValue}>6th Semester</p>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className={styles.infoCard}>
//                       <div className={styles.infoLabel}>Academic Year</div>
//                       <p className={styles.infoValue}>2023-2024</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className={styles.sectionDivider}>
//                   <h5 className="fw-semibold mb-3">Contact Information</h5>
//                   <div className="row g-3 mb-4">
//                     <div className="col-md-6">
//                       <div className={styles.infoCard}>
//                         <div className={styles.infoLabel}>Email</div>
//                         <p className={styles.infoValue}>
//                           alex.smith@university.edu
//                         </p>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className={styles.infoCard}>
//                         <div className={styles.infoLabel}>Phone</div>
//                         <p className={styles.infoValue}>+1 (555) 123-4567</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Borrowed Books */}
//                 <div className={styles.sectionDivider}>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h5 className="fw-semibold mb-0">Borrowed Books</h5>
//                     <span className={styles.statusCount}>3 Active</span>
//                   </div>

//                   <div className={styles.bookItem}>
//                     <div className="d-flex justify-content-between align-items-start">
//                       <div className="flex-grow-1">
//                         <div className={styles.bookTitle}>
//                           Data Structures and Algorithms
//                         </div>
//                         <div className={styles.bookAuthor}>
//                           by Thomas H. Cormen
//                         </div>
//                         <div className={styles.bookIsbn}>
//                           ISBN: 978-0262033848
//                         </div>
//                       </div>
//                       <span className={`${styles.statusBadge} ${styles.statusDue}`}>
//                         Due: Mar 15
//                       </span>
//                     </div>
//                   </div>

//                   <div className={styles.bookItem}>
//                     <div className="d-flex justify-content-between align-items-start">
//                       <div className="flex-grow-1">
//                         <div className={styles.bookTitle}>Clean Code</div>
//                         <div className={styles.bookAuthor}>by Robert C. Martin</div>
//                         <div className={styles.bookIsbn}>ISBN: 978-0132350884</div>
//                       </div>
//                       <span
//                         className={`${styles.statusBadge} ${styles.statusWarning}`}
//                       >
//                         Due: Mar 20
//                       </span>
//                     </div>
//                   </div>

//                   <div className={styles.bookItem}>
//                     <div className="d-flex justify-content-between align-items-start">
//                       <div className="flex-grow-1">
//                         <div className={styles.bookTitle}>Design Patterns</div>
//                         <div className={styles.bookAuthor}>by Gang of Four</div>
//                         <div className={styles.bookIsbn}>ISBN: 978-0201633610</div>
//                       </div>
//                       <span
//                         className={`${styles.statusBadge} ${styles.statusOverdue}`}
//                       >
//                         Overdue
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className={styles.sectionDivider}>
//                   <div className="row g-2">
//                     <div className="col-6">
//                       <button className="btn btn-primary w-100 fw-medium">
//                         Edit Profile
//                       </button>
//                     </div>
//                     <div className="col-6">
//                       <button className="btn btn-outline-secondary w-100 fw-medium">
//                         View History
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";
// import { useEffect } from "react";
// import styles from "./UserProfilePopup.module.css";
// import { Patron } from "../types/Types";

// interface UserProfilePopupProps {
//   patron: Patron | null;
//   onClose: () => void;
// }

// export default function UserProfilePopup({ patron, onClose }: UserProfilePopupProps) {
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleKey);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", handleKey);
//       document.body.style.overflow = "auto";
//     };
//   }, [onClose]);

//   if (!patron) return null;

//   return (
//     <div
//       className={styles.popupOverlay}
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div className={styles.popupContent}>
//         <div className="card border-0 shadow-lg">
//           {/* Header */}
//           <div className={`${styles.profileHeader} text-white`}>
//             <button className={styles.closeBtn} onClick={onClose}>
//               <span>&times;</span>
//             </button>

//             <div className="d-flex align-items-center">
//               <div className={`${styles.profileImage} me-3`}>
//                 {patron.patronFirstName?.[0]}
//                 {patron.patronLastName?.[0]}
//               </div>
//               <div>
//                 <h2 className="mb-1 fw-bold">
//                   {patron.patronFirstName} {patron.patronLastName}
//                 </h2>
//                 <p className="mb-0 opacity-75">
//                   {patron.patronDepartment} Student
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="card-body p-4">
//             {/* Basic Information */}
//             <div className="row g-3 mb-4">
//               <div className="col-md-6">
//                 <div className={styles.infoCard}>
//                   <div className={styles.infoLabel}>Full Name</div>
//                   <p className={styles.infoValue}>
//                     {patron.patronFirstName} {patron.patronMiddleName}{" "}
//                     {patron.patronLastName}
//                   </p>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className={styles.infoCard}>
//                   <div className={styles.infoLabel}>Roll Number</div>
//                   <p className={styles.infoValue}>{patron.patronRollNo}</p>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className={styles.infoCard}>
//                   <div className={styles.infoLabel}>Enrollment ID</div>
//                   <p className={styles.infoValue}>{patron.patronEnrollmentNumber}</p>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className={styles.infoCard}>
//                   <div className={styles.infoLabel}>Semester</div>
//                   <p className={styles.infoValue}>{patron.patronSemester}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className={styles.sectionDivider}>
//               <h5 className="fw-semibold mb-3">Contact Information</h5>
//               <div className="row g-3 mb-4">
//                 <div className="col-md-6">
//                   <div className={styles.infoCard}>
//                     <div className={styles.infoLabel}>Email</div>
//                     <p className={styles.infoValue}>
//                       {patron.users?.userEmail || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className={styles.sectionDivider}>
//               <button className="btn btn-outline-secondary w-100 fw-medium" onClick={onClose}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect } from "react";
import styles from "./UserProfilePopup.module.css";
import { Patron } from "../types/Types";

interface UserProfilePopupProps {
  patron: Patron | null;
  onClose: () => void;
}

export default function UserProfilePopup({ patron, onClose }: UserProfilePopupProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!patron) return null;

  return (
    <div
      className={styles.popupOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.popupContent}>
        <div className="card border-0 shadow-lg">
          {/* Header */}
          <div className={`${styles.profileHeader} text-white`}>
            <button className={styles.closeBtn} onClick={onClose}>
              <span>&times;</span>
            </button>

            <div className="d-flex align-items-center">
              <div className={`${styles.profileImage} me-3`}>
                {patron.patronFirstName?.[0]}
                {patron.patronLastName?.[0]}
              </div>
              <div>
                <h2 className="mb-1 fw-bold">
                  {patron.patronFirstName} {patron.patronLastName}
                </h2>
                <p className="mb-0 opacity-75">
                  {patron.patronDepartment.toUpperCase()} Student
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="card-body p-4">
            {/* Basic Information */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Full Name</div>
                  <p className={styles.infoValue}>
                    {patron.patronFirstName} {patron.patronMiddleName}{" "}
                    {patron.patronLastName}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Roll Number</div>
                  <p className={styles.infoValue}>{patron.patronRollNo}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Enrollment ID</div>
                  <p className={styles.infoValue}>{patron.patronEnrollmentNumber}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Semester</div>
                  <p className={styles.infoValue}>{patron.patronSemester}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className={styles.sectionDivider}>
              <h5 className="fw-semibold mb-3">Contact Information</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className={styles.infoCard}>
                    <div className={styles.infoLabel}>Email</div>
                    <p className={styles.infoValue}>
                      {patron.users?.userEmail || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className={styles.sectionDivider}>
              <h5 className="fw-semibold mb-3">Issued Books</h5>
              {patron.item_transaction && patron.item_transaction.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Type</th>
                        <th>ISBN</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patron.item_transaction.map((tx) => (
                        <tr key={tx.id}>
                          <td>{tx.items?.itemTitle || "N/A"}</td>
                          <td>{tx.items?.itemAuthor || "N/A"}</td>
                          <td>{tx.items?.itemType || "N/A"}</td>
                          <td>{tx.items?.isbn || "N/A"}</td>
                          <td>{new Date(tx.issueDate).toLocaleDateString()}</td>
                          <td>
                            {tx.dueDate
                              ? new Date(tx.dueDate).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td>
                            {tx.isAvailable ? (
                              <span className="badge bg-success">Available</span>
                            ) : (
                              <span className="badge bg-danger">Issued</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No books issued.</p>
              )}
            </div>

            {/* Actions */}
            <div className={styles.sectionDivider}>
              <button
                className="btn btn-outline-secondary w-100 fw-medium"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
