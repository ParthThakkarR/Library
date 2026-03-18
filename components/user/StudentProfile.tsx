// "use client";

// import { useEffect, useState } from "react";
// import styles from "./StudentProfile.module.css";

// interface Student {
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   roll: string;
//   enrollment: string;
//   department: string;
//   email: string;
//   semester: string;
//   profilePicture?: string | null;
//   stats: {
//     bookRead: number;
//     currentlyBorrowed: number;
//     overdue: number;
//   };
//   status: string[];
// }

// export default function ProfilePage() {
//   const [student, setStudent] = useState<Student>({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     roll: "",
//     enrollment: "",
//     department: "",
//     email: "",
//     semester: "",
//     profilePicture: null,
//     stats: {
//       bookRead: 0,
//       currentlyBorrowed: 0,
//       overdue: 0,
//     },
//     status: [],
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("/api/profile");
//         if (!res.ok) throw new Error("Failed to fetch profile");
//         const data = await res.json();

//         console.log(data);

//         setStudent({
//           firstName: data.profile?.firstName || "",
//           middleName: data.profile?.middleName || "",
//           lastName: data.profile?.lastName || "",
//           roll: data.profile?.roll || "",
//           enrollment: data.profile?.enrollment || "",
//           department: data.profile?.department || "",
//           email: data.profile?.email || "",
//           semester: data.profile?.semester || "",
//           profilePicture: data.profile?.profilePicture || null,
//           stats: data.stats || { bookRead: 0, currentlyBorrowed: 0, overdue: 0 },
//           status: data.status || [],
//         });

//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-5">Loading profile...</div>;
//   }

//   return (
//     <div className={`container py-5 ${styles.profileContainer}`}>
//       <div className="row justify-content-center">
//         <div className="col-md-10">
//           <div className={`card shadow-lg border-0 rounded-4 ${styles.profileCard}`}>
//             <div className="card-body p-5">
//               <div className="row align-items-center">
//                 {/* Profile Picture */}
//                 <div className="col-md-4 text-center">
//                   {student.profilePicture ? (
//                     <img
//                       src={student.profilePicture}
//                       alt="Profile"
//                       className={`rounded-circle mb-3 shadow ${styles.profileImage}`}
//                     />
//                   ) : (
//                     <div className="d-flex justify-content-center align-items-center mb-3">
//                       <i
//                         className="bi bi-person-circle"
//                         style={{ fontSize: "6rem", color: "#6c757d" }}
//                       ></i>
//                     </div>
//                   )}

//                   <h4 className="fw-bold">
//                     {student.firstName} {student.middleName} {student.lastName}
//                   </h4>
//                   <p className="text-muted">{student.department}</p>

//                   {/* Status badges */}
//                   <div className={styles.statusBadges}>
//                     {student.status?.length ? (
//                       student.status.map((s, idx) => (
//                         <span key={idx} className="badge bg-primary me-1">
//                           {s}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-muted">No status available</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Info Section */}
//                 <div className="col-md-8">
//                   <h5 className="mb-3 text-primary fw-bold">Student Information</h5>
//                   <ul className="list-group list-group-flush">
//                     <li className="list-group-item">
//                       <strong>Roll:</strong> {student.roll}
//                     </li>
//                     <li className="list-group-item">
//                       <strong>Enrollment:</strong> {student.enrollment}
//                     </li>
//                     <li className="list-group-item">
//                       <strong>Email:</strong> {student.email}
//                     </li>
//                     <li className="list-group-item">
//                       <strong>Current Semester:</strong> {student.semester}
//                     </li>
//                   </ul>

//                   {/* Stats Section */}
//                   <div className="mt-4">
//                     <h6 className="fw-bold text-secondary">Library Stats</h6>
//                     <div className="d-flex gap-3">
//                       <div className="card p-3 text-center shadow-sm flex-fill">
//                         <h4 className="text-primary">{student.stats.bookRead}</h4>
//                         <p className="mb-0">Books Read</p>
//                       </div>
//                       <div className="card p-3 text-center shadow-sm flex-fill">
//                         <h4 className="text-warning">{student.stats.currentlyBorrowed}</h4>
//                         <p className="mb-0">Currently Borrowed</p>
//                       </div>
//                       <div className="card p-3 text-center shadow-sm flex-fill">
//                         <h4 className="text-danger">{student.stats.overdue}</h4>
//                         <p className="mb-0">Overdue</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div> {/* row */}
//             </div> {/* card-body */}
//           </div> {/* card */}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from 'react';
import styles from './StudentProfile.module.css';

// interface ProfileData {
//   role: string;
//   profile: {
//     firstName: string;
//     middleName: string | null;
//     lastName: string;
//     fullName: string;
//     roll: string;
//     enrollment: string;
//     department: string;
//     email: string;
//     phone: string;
//     semester: string;
//     profilePicture: string | null;
//     memberSince: Date | string;
//     membershipExpires: Date | string;
//   };
//   stats: {
//     bookRead: number;
//     currentlyBorrowed: number;
//     overdue: number;
//     fines: number;
//     reservedBooks: number;
//     avgRating: number;
//   };
//   borrowedBooks: Array<{
//     id: number;
//     title: string;
//     author: string;
//     dueDate: Date | null;
//     coverType: string;
//   }>;
//   status: string[];
//   libraryId: string;
//   studentId: string;
// }
interface ProfileData {
  role: string;
  profile: {
    firstName: string;
    middleName: string | null;
    lastName: string;
    fullName: string;
    roll: string;
    enrollment: string;
    department: string;
    email: string;
    semester: string;
    profilePicture: string | null;
    memberSince: Date | string;
    membershipExpires: Date | string;
  };
  stats: {
    bookRead: number;
    currentlyBorrowed: number;
    overdue: number;
    fines: number;
    reservedBooks: number,
    avgRating: number
    // Removed: reservedBooks, avgRating
  };
  borrowedBooks: Array<{
    id: number;
    title: string;
    author: string;
    dueDate: Date | null;
    coverType: string;
  }>;
  status: string[];
  libraryId: string;
  studentId: string;
}

export default function StudentProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // const createModal = (title: string, content: string, iconClass: string, gradientClass: string) => {
  //   // Modal implementation would go here
  //   console.log(`Modal: ${title}`);
  // };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!profileData) return <div className={styles.error}>No profile data found</div>;

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysUntilDue = (dueDate: Date | null) => {
    if (!dueDate) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getCoverIcon = (coverType: string) => {
    switch (coverType) {
      case 'code': return 'fas fa-code';
      case 'brain': return 'fas fa-brain';
      case 'database': return 'fas fa-database';
      default: return 'fas fa-book';
    }
  };

  const getCoverGradient = (coverType: string) => {
    switch (coverType) {
      case 'code': return { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' };
      case 'brain': return { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' };
      case 'database': return { background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' };
      default: return { background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' };
    }
  };

  return (
    <div className={styles.body}>
      {/* Floating Books Background */}
      <div className={styles.floatingBooks}>
        <i className={`fas fa-book ${styles.bookIcon}`}></i>
        <i className={`fas fa-book-open ${styles.bookIcon}`}></i>
        <i className={`fas fa-bookmark ${styles.bookIcon}`}></i>
      </div>

      <div className={styles.container}>
        <div className={`${styles.profileCard} ${styles.fadeIn}`}>
          {/* Library Header */}
          <div className={styles.profileHeader}>
            <div className={styles.headerPattern}></div>
            <div className={styles.libraryLogo}>
              <i className="fas fa-university"></i>
              University Library System
            </div>
          </div>
          
          {/* Profile Picture */}
          <div className={styles.profilePictureContainer}>
            <div className={styles.profilePicture}>
              {profileData.profile.profilePicture ? (
                <img 
                  src={profileData.profile.profilePicture} 
                  alt="Profile" 
                  className={styles.profileImage}
                />
              ) : (
                <i className="fas fa-user-graduate"></i>
              )}
              <div className={styles.memberStatus}></div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className={styles.profileContent}>
            {/* Student Information */}
            <div className={styles.studentInfo}>
              <h1>{profileData.profile.fullName}</h1>
              <div className={styles.memberId}>
                Library ID: {profileData.libraryId} | Student ID: {profileData.studentId}
              </div>
              <div className={styles.statusBadges}>
                {profileData.status.map((status, index) => (
                  <span 
                    key={index} 
                    className={status === 'Active' ? styles.badgeActive : styles.badgePremium}
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>

            {/* Library Statistics */}
            <div className={styles.libraryStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{profileData.stats.bookRead}</span>
                <span className={styles.statLabel}>Books Read</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{profileData.stats.currentlyBorrowed}</span>
                <span className={styles.statLabel}>Currently Borrowed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{profileData.stats.overdue}</span>
                <span className={styles.statLabel}>Overdue Books</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>${profileData.stats.fines}</span>
                <span className={styles.statLabel}>Outstanding Fines</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{profileData.stats.reservedBooks}</span>
                <span className={styles.statLabel}>Reserved Books</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{profileData.stats.avgRating}</span>
                <span className={styles.statLabel}>Avg Rating Given</span>
              </div>
            </div>
            
            {/* Information Sections */}
            <div className={styles.infoSections}>
              {/* Personal Information */}
              <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div className={styles.sectionTitle}>Personal Information</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-user"></i>Full Name
                  </div>
                  <div className={styles.infoValue}>{profileData.profile.fullName}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-envelope"></i>Email
                  </div>
                  <div className={styles.infoValue}>{profileData.profile.email}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-graduation-cap"></i>Department
                  </div>
                  <div className={styles.infoValue}>{profileData.profile.department}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-calendar"></i>Member Since
                  </div>
                  <div className={styles.infoValue}>{formatDate(profileData.profile.memberSince)}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-clock"></i>Membership Expires
                  </div>
                  <div className={styles.infoValue}>{formatDate(profileData.profile.membershipExpires)}</div>
                </div>
              </div>

              {/* Currently Borrowed Books */}
              <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>
                    <i className="fas fa-book-reader"></i>
                  </div>
                  <div className={styles.sectionTitle}>Currently Borrowed</div>
                </div>
                {profileData.borrowedBooks.map(book => {
                  const daysUntilDue = getDaysUntilDue(book.dueDate);
                  const isSafe = daysUntilDue > 3;
                  
                  return (
                    <div key={book.id} className={styles.bookItem}>
                      <div className={styles.bookCover} style={getCoverGradient(book.coverType)}>
                        <i className={getCoverIcon(book.coverType)}></i>
                      </div>
                      <div className={styles.bookInfo}>
                        <div className={styles.bookTitle}>{book.title}</div>
                        <div className={styles.bookAuthor}>{book.author}</div>
                      </div>
                      <div className={`${styles.dueDate} ${isSafe ? styles.safe : ''}`}>
                        Due: {book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reading Preferences */}
              {/* <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className={styles.sectionTitle}>Reading Preferences</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-star"></i>Favorite Genres
                  </div>
                  <div className={styles.genreTags}>
                    {profileData.preferences.favoriteGenres.map((genre, index) => (
                      <span key={index} className={styles.genreTag}>{genre}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-bookmark"></i>Reading Goal ({new Date().getFullYear()})
                  </div>
                  <div className={styles.infoValue}>
                    {profileData.preferences.readingGoal} books ({profileData.preferences.completedBooks} completed)
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-clock"></i>Avg. Reading Time
                  </div>
                  <div className={styles.infoValue}>{profileData.preferences.avgReadingTime}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-trophy"></i>Reading Streak
                  </div>
                  <div className={styles.infoValue}>{profileData.preferences.readingStreak} days</div>
                </div>
              </div> */}

              {/* Library Privileges */}
              {/* <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>
                    <i className="fas fa-key"></i>
                  </div>
                  <div className={styles.sectionTitle}>Library Privileges</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-books"></i>Borrowing Limit
                  </div>
                  <div className={styles.infoValue}>{profileData.privileges.borrowingLimit} books</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-calendar-alt"></i>Loan Period
                  </div>
                  <div className={styles.infoValue}>{profileData.privileges.loanPeriod} days</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-redo"></i>Renewal Limit
                  </div>
                  <div className={styles.infoValue}>{profileData.privileges.renewalLimit} times</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-bookmark"></i>Reservation Limit
                  </div>
                  <div className={styles.infoValue}>{profileData.privileges.reservationLimit} books</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-laptop"></i>Digital Access
                  </div>
                  <div className={styles.infoValue}>{profileData.privileges.digitalAccess}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <i className="fas fa-door-open"></i>Study Room Access
                  </div>
                  <div className={styles.infoValue}>{profileData.privileges.studyRoomAccess}</div>
                </div>
              </div>
            </div> */}
            
            {/* Action Buttons
            <div className={styles.actionButtons}>
              <button className={styles.btnLibrary} onClick={searchBooks}>
                <i className="fas fa-search me-2"></i>Search Books
              </button>
              <button className={styles.btnSecondary} onClick={viewHistory}>
                <i className="fas fa-history me-2"></i>Borrowing History
              </button>
              <button className={styles.btnWarning} onClick={renewBooks}>
                <i className="fas fa-sync-alt me-2"></i>Renew Books
              </button>
              <button className={styles.btnLibrary} onClick={editProfile}>
                <i className="fas fa-user-edit me-2"></i>Edit Profile
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}