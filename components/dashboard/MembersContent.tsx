// "use client";
// import React, { useState, useEffect } from "react";
// import EditProfilePopup from "../EditProfilePopup";

// // --- INTERFACES (No changes here) ---
// interface MembersContentProps {
//   onAddMember: () => void;
// }

// interface Patron {
//   id: string; // This is the Patron's unique ID
//   patronFirstName: string;
//   patronMiddleName: string;
//   patronLastName: string;
//   patronDepartment: string;
//   patronSemester: number;
//   patronRollNo: number;
//   patronEnrollmentNumber: number;
//   userId: string; // This is the User's ID (for login)
//   users: {
//     userName: string;
//     userEmail: string;
//     user_type: {
//       userTypeName: string;
//     };
//   };
// }

// // NEW: Define a type for the studentCounts object from the API
// interface StudentCounts {
//   [patronId: string]: {
//     count: number;
//     name: string;
//   };
// }


// const MembersContent: React.FC<MembersContentProps> = ({ onAddMember }) => {
//   const [patrons, setPatrons] = useState<Patron[]>([]);
//   // CHANGED: We no longer need to store all transactions. We'll store the counts instead.
//   const [studentCounts, setStudentCounts] = useState<StudentCounts>({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // CHANGED: Rewrote the data fetching to be cleaner and use the new API response.
//     const fetchAllData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch both sets of data at the same time for speed
//         const [patronRes, countsRes] = await Promise.all([
//           fetch("/api/patron/get-all"),
//           fetch("/api/item-transactions"),
//         ]);

//         if (!patronRes.ok || !countsRes.ok) {
//           throw new Error("Failed to fetch necessary data from the server.");
//         }

//         const patronData = await patronRes.json();
//         const countsData = await countsRes.json(); // This object now contains `studentCounts`

//         setPatrons(Array.isArray(patronData) ? patronData : []);
//         // Store the pre-calculated counts directly from the API
//         setStudentCounts(countsData.studentCounts || {});

//       } catch (err) {
//         console.error(err);
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   // REMOVED: The old getIssuedBooksCount function is no longer needed
//   // because the API does the counting for us.

//   // --- ACTIONS & FILTERING (No changes here) ---
//   const editPatron = (id: string) => alert(`Edit patron with ID: ${id}`);
//   const viewPatron = (id: string) => alert(`View patron details for ID: ${id}`);

//   const deletePatron = async (id: string) => {
//   if (window.confirm("Are you sure you want to delete this patron?")) {
//     try {
//       const res = await fetch(`/api/patron/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to delete patron ❌");
//         return;
//       }

//       alert(data.message || "Patron deleted successfully ✅");

//       // optional: refresh UI or remove patron from local state
//       setPatrons(prev => prev.filter(p => p.id !== id));

//     } catch (err) {
//       console.error("Error deleting patron:", err);
//       alert("Something went wrong while deleting patron ❌");
//     }
//   }
// };


    

//   const filteredPatrons = patrons.filter((patron) => {
//     const fullName = `${patron.patronFirstName} ${patron.patronMiddleName} ${patron.patronLastName}`.toLowerCase();
//     const rollNo = patron.patronRollNo?.toString() || "";
//     const enrollmentNo = patron.patronEnrollmentNumber?.toString() || "";
//     const department = patron.patronDepartment?.toLowerCase() || "";
//     const query = searchQuery.toLowerCase();
//     return fullName.includes(query) || rollNo.includes(query) || enrollmentNo.includes(query) || department.includes(query);
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
//       {/* ... (Your header and search bar JSX is unchanged) ... */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>Patron Management</h4>
//         <button className="btn btn-primary" onClick={onAddMember}>
//           <i className="fas fa-user-plus me-2"></i>Add New Patron
//         </button>
//       </div>

//       {error && (
//         <div className="alert alert-danger mb-4" role="alert">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="table-container">
//         <div className="row mb-3">
//           <div className="col-md-8">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by name, roll number, enrollment number, or department..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="col-md-4 text-end">
//             <small className="text-muted">
//               {filteredPatrons.length} patron{filteredPatrons.length !== 1 ? 's' : ''} found
//             </small>
//           </div>
//         </div>

//         <div className="table-responsive">
//           <table className="table table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Name</th>
//                 <th>Roll No.</th>
//                 <th>Enrollment No.</th>
//                 <th>Department</th>
//                 <th>Semester</th>
//                 <th>User Type</th>
//                 <th>Books Issued</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPatrons.map((patron) => (
//                 <tr key={patron.id}>
//                   <td>
//                     <strong>{`${patron.patronFirstName} ${patron.patronMiddleName} ${patron.patronLastName}`.trim()}</strong>
//                     <br />
//                     <small className="text-muted">{patron.users?.userEmail || 'No email'}</small>
//                   </td>
//                   <td><code className="text-primary">{patron.patronRollNo}</code></td>
//                   <td><code className="text-info">{patron.patronEnrollmentNumber}</code></td>
//                   <td><span className="badge bg-secondary">{patron.patronDepartment}</span></td>
//                   <td><span className="badge bg-info">Sem {patron.patronSemester}</span></td>
//                   <td><span className="badge bg-success">{patron.users?.user_type?.userTypeName || 'Unknown'}</span></td>
//                   <td>
//                     {/* THE FIX: We now look up the count directly from the state object */}
//                     {/* using the patron's unique ID. It's instant and correct. */}
//                     <span className="badge bg-warning text-dark">
//                       {studentCounts[patron.id]?.count || 0}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="btn-group" role="group">
//                       <button className="btn btn-sm btn-outline-primary" onClick={() => editPatron(patron.id)} title="Edit Patron">
//                         <i className="fas fa-edit"></i>
//                       </button>
//                       <button className="btn btn-sm btn-outline-info" onClick={() => viewPatron(patron.id)} title="View Patron Details">
//                         <i className="fas fa-eye"></i>
//                       </button>
//                       <button className="btn btn-sm btn-outline-danger" onClick={() => deletePatron(patron.id)} title="Delete Patron">
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {filteredPatrons.length === 0 && (
//                 <tr>
//                   <td colSpan={8} className="text-center text-muted py-4">
//                     No patrons found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MembersContent;


// Section 2

// "use client";
// import React, { useState, useEffect } from "react";
// import EditProfilePopup from "../EditProfilePopup";
// import { Patron } from "../types/Types";

// interface MembersContentProps {
//   onAddMember: () => void;
// }


// interface StudentCounts {
//   [patronId: string]: {
//     count: number;
//     name: string;
//   };
// }

// const MembersContent: React.FC<MembersContentProps> = ({ onAddMember }) => {
//   const [patrons, setPatrons] = useState<Patron[]>([]);
//   const [studentCounts, setStudentCounts] = useState<StudentCounts>({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // NEW: State for popup
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [selectedPatron, setSelectedPatron] = useState<Patron | null>(null);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [patronRes, countsRes] = await Promise.all([
//           fetch("/api/patron/get-all"),
//           fetch("/api/item-transactions"),
//         ]);

//         if (!patronRes.ok || !countsRes.ok) {
//           throw new Error("Failed to fetch necessary data from the server.");
//         }

//         const patronData = await patronRes.json();
//         const countsData = await countsRes.json();

//         setPatrons(Array.isArray(patronData) ? patronData : []);
//         setStudentCounts(countsData.studentCounts || {});
//       } catch (err) {
//         console.error(err);
//         setError(err instanceof Error ? err.message : "An unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   // --- Actions ---
//   const editPatron = (patron: Patron) => {
//     setSelectedPatron(patron);
//     setShowEditPopup(true);
//   };

//   const closeEditPopup = () => {
//     setSelectedPatron(null);
//     setShowEditPopup(false);
//   };

//   const viewPatron = (id: string) => alert(`View patron details for ID: ${id}`);

//   const deletePatron = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this patron?")) {
//       try {
//         const res = await fetch(`/api/patron/${id}`, {
//           method: "DELETE",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//         });

//         const data = await res.json();
//         if (!res.ok) {
//           alert(data.message || "Failed to delete patron ❌");
//           return;
//         }

//         alert(data.message || "Patron deleted successfully ✅");
//         setPatrons(prev => prev.filter(p => p.id !== id));
//       } catch (err) {
//         console.error("Error deleting patron:", err);
//         alert("Something went wrong while deleting patron ❌");
//       }
//     }
//   };

//   const filteredPatrons = patrons.filter((patron) => {
//     const fullName = `${patron.patronFirstName} ${patron.patronMiddleName} ${patron.patronLastName}`.toLowerCase();
//     const rollNo = patron.patronRollNo?.toString() || "";
//     const enrollmentNo = patron.patronEnrollmentNumber?.toString() || "";
//     const department = patron.patronDepartment?.toLowerCase() || "";
//     const query = searchQuery.toLowerCase();
//     return fullName.includes(query) || rollNo.includes(query) || enrollmentNo.includes(query) || department.includes(query);
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
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4>Patron Management</h4>
//         <button className="btn btn-primary" onClick={onAddMember}>
//           <i className="fas fa-user-plus me-2"></i>Add New Patron
//         </button>
//       </div>

//       {error && (
//         <div className="alert alert-danger mb-4" role="alert">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {/* Search */}
//       <div className="table-container">
//         <div className="row mb-3">
//           <div className="col-md-8">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by name, roll number, enrollment number, or department..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="col-md-4 text-end">
//             <small className="text-muted">
//               {filteredPatrons.length} patron{filteredPatrons.length !== 1 ? 's' : ''} found
//             </small>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-responsive">
//           <table className="table table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Name</th>
//                 <th>Roll No.</th>
//                 <th>Enrollment No.</th>
//                 <th>Department</th>
//                 <th>Semester</th>
//                 <th>User Type</th>
//                 <th>Books Issued</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPatrons.map((patron) => (
//                 <tr key={patron.id}>
//                   <td>
//                     <strong>{`${patron.patronFirstName} ${patron.patronMiddleName} ${patron.patronLastName}`.trim()}</strong>
//                     <br />
//                     <small className="text-muted">{patron.users?.userEmail || 'No email'}</small>
//                   </td>
//                   <td><code className="text-primary">{patron.patronRollNo}</code></td>
//                   <td><code className="text-info">{patron.patronEnrollmentNumber}</code></td>
//                   <td><span className="badge bg-secondary">{patron.patronDepartment}</span></td>
//                   <td><span className="badge bg-info">Sem {patron.patronSemester}</span></td>
//                   <td><span className="badge bg-success">{patron.users?.user_type?.userTypeName || 'Unknown'}</span></td>
//                   <td>
//                     <span className="badge bg-warning text-dark">
//                       {studentCounts[patron.id]?.count || 0}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="btn-group" role="group">
//                       <button
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => editPatron(patron)}
//                         title="Edit Patron"
//                       >
//                         <i className="fas fa-edit"></i>
//                       </button>
//                       <button className="btn btn-sm btn-outline-info" onClick={() => viewPatron(patron.id)} title="View Patron Details">
//                         <i className="fas fa-eye"></i>
//                       </button>
//                       <button className="btn btn-sm btn-outline-danger" onClick={() => deletePatron(patron.id)} title="Delete Patron">
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {filteredPatrons.length === 0 && (
//                 <tr>
//                   <td colSpan={8} className="text-center text-muted py-4">
//                     No patrons found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Popup Integration */}
//       {showEditPopup && selectedPatron && (
//         <EditProfilePopup
//           patron={selectedPatron}
//           onClose={closeEditPopup}
//           onSave={(updated: Patron) => {
//             setPatrons((prev) =>
//               prev.map((p) => (p.id === updated.id ? updated : p))
//             );
//             closeEditPopup();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default MembersContent;


// Section 3

"use client";
import React, { useState, useEffect } from "react";
import EditProfilePopup from "../EditProfilePopup";
import UserProfilePopup from "./UserProfilePopup";
import { Patron } from "../types/Types";

interface MembersContentProps {
  onAddMember: () => void;
}

interface StudentCounts {
  [patronId: string]: {
    count: number;
    name: string;
  };
}

const MembersContent: React.FC<MembersContentProps> = ({ onAddMember }) => {
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [studentCounts, setStudentCounts] = useState<StudentCounts>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State for popups ---
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedPatron, setSelectedPatron] = useState<Patron | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [patronRes, countsRes] = await Promise.all([
          fetch("/api/patron/get-all"),
          fetch("/api/item-transactions"),
        ]);

        if (!patronRes.ok || !countsRes.ok) {
          throw new Error("Failed to fetch necessary data from the server.");
        }

        const patronData = await patronRes.json();
        const countsData = await countsRes.json();

        setPatrons(Array.isArray(patronData) ? patronData : []);
        setStudentCounts(countsData.studentCounts || {});
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // --- Actions ---
  const editPatron = (patron: Patron) => {
    setSelectedPatron(patron);
    setShowEditPopup(true);
  };

const viewPatron = async (patron: Patron) => {
  try {
    const res = await fetch(`/api/patron/${patron.id}`);
    if (!res.ok) throw new Error("Failed to fetch patron details");
    const fullPatron = await res.json();

    setSelectedPatron(fullPatron);
    setShowViewPopup(true);
  } catch (err) {
    console.error("Error fetching patron details:", err);
    alert("Failed to load patron details ❌");
  }
};

  const closeEditPopup = () => {
    setSelectedPatron(null);
    setShowEditPopup(false);
  };

  const closeViewPopup = () => {
    setSelectedPatron(null);
    setShowViewPopup(false);
  };

  const deletePatron = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this patron?")) {
      try {
        const res = await fetch(`/api/patron/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Failed to delete patron ❌");
          return;
        }

        alert(data.message || "Patron deleted successfully ✅");
        setPatrons(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error("Error deleting patron:", err);
        alert("Something went wrong while deleting patron ❌");
      }
    }
  };

  // --- Search filter ---
  const filteredPatrons = patrons.filter((patron) => {
    const fullName = `${patron.patronFirstName} ${patron.patronMiddleName} ${patron.patronLastName}`.toLowerCase();
    const rollNo = patron.patronRollNo?.toString() || "";
    const enrollmentNo = patron.patronEnrollmentNumber?.toString() || "";
    const department = patron.patronDepartment?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || rollNo.includes(query) || enrollmentNo.includes(query) || department.includes(query);
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Patron Management</h4>
        <button className="btn btn-primary" onClick={onAddMember}>
          <i className="fas fa-user-plus me-2"></i>Add New Patron
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Search */}
      <div className="table-container">
        <div className="row mb-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, roll number, enrollment number, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-4 text-end">
            <small className="text-muted">
              {filteredPatrons.length} patron{filteredPatrons.length !== 1 ? 's' : ''} found
            </small>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Enrollment No.</th>
                <th>Department</th>
                <th>Semester</th>
                <th>User Type</th>
                <th>Books Issued</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatrons.map((patron) => (
                <tr key={patron.id}>
                  <td>
                    <strong>{`${patron.patronFirstName} ${patron.patronMiddleName} ${patron.patronLastName}`.trim()}</strong>
                    <br />
                    <small className="text-muted">{patron.users?.userEmail || 'No email'}</small>
                  </td>
                  <td><code className="text-primary">{patron.patronRollNo}</code></td>
                  <td><code className="text-info">{patron.patronEnrollmentNumber}</code></td>
                  <td><span className="badge bg-secondary">{patron.patronDepartment}</span></td>
                  <td><span className="badge bg-info">Sem {patron.patronSemester}</span></td>
                  <td><span className="badge bg-success">{patron.users?.user_type?.userTypeName || 'Unknown'}</span></td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {patron.activeBorrow}
                      {/* {studentCounts[patron.id]?.count || 0} */}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => editPatron(patron)}
                        title="Edit Patron"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => viewPatron(patron)}
                        title="View Patron Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deletePatron(patron.id)}
                        title="Delete Patron"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPatrons.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    No patrons found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Popup */}
      {showEditPopup && selectedPatron && (
        <EditProfilePopup
          patron={selectedPatron}
          onClose={closeEditPopup}
          onSave={(updated: Patron) => {
            setPatrons((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
            closeEditPopup();
          }}
        />
      )}

      {/* View Popup */}
      {showViewPopup && selectedPatron && (
        <UserProfilePopup
          patron={selectedPatron}
          onClose={closeViewPopup}
        />
      )}
    </>
  );
};

export default MembersContent;
