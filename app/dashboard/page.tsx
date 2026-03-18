// "use client";
// import React, { useState } from "react";
// import Sidebar from "../../components/dashboard/Sidebar";
// import Navbar from "../../components/dashboard/Navbar";
// import DashboardContent from "../../components/dashboard/DashboardContent";
// import BooksContent from "../../components/dashboard/BooksContent";
// import MembersContent from "../../components/dashboard/MembersContent";
// import TransactionsContent from "../../components/dashboard/TransactionsContent";

// const DashboardPage: React.FC = () => {
//   const [section, setSection] = useState<string>("dashboard");

//   const handleNav = (target: string) => setSection(target);
//   const handleLogout = () => alert("Logout functionality would be implemented here.");
//   const handleViewAll = () => setSection("transactions");
//   const handleAddBook = () => alert("Add Book modal would open here");
//   const handleAddMember = () => alert("Add Member modal would open here");

//   const renderContent = () => {
//     switch (section) {
//       case "dashboard":
//         return <DashboardContent onViewAll={handleViewAll} />;
//       case "books":
//         return <BooksContent onAddBook={handleAddBook} />;
//       case "members":
//         return <MembersContent onAddMember={handleAddMember} />;
//       case "transactions":
//         return <TransactionsContent />;
//       case "reports":
//         return <div className="p-4">Reports & Analytics Placeholder</div>;
//       case "settings":
//         return <div className="p-4">Settings Placeholder</div>;
//       default:
//         return <DashboardContent onViewAll={handleViewAll} />;
//     }
//   };

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sidebar currentSection={section} onNavigate={handleNav} />

//       {/* Main content */}
//       <div className="flex-grow-1 d-flex flex-column">
//         {/* Navbar */}
//         <Navbar onLogout={handleLogout} />

//         {/* Scrollable content area */}
//         <div
//           className="p-4 flex-grow-1"
//           style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}
//         >
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


// Section 2

// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/dashboard/Sidebar";
// import Navbar from "../../components/dashboard/Navbar";
// import DashboardContent from "../../components/dashboard/DashboardContent";
// import BooksContent from "../../components/dashboard/BooksContent";
// import MembersContent from "../../components/dashboard/MembersContent";
// import TransactionsContent from "../../components/dashboard/TransactionsContent";

// // Example: roles = "admin" | "librarian" | "user"
// const DashboardPage: React.FC = () => {
//   const [section, setSection] = useState<string>("dashboard");
//   const [role, setRole] = useState<string>("user"); // default role (change after fetching user)

//   useEffect(() => {
//     // Example: fetch role from API or decode JWT
//     // For now, hardcoded. Replace with real logic.
//     const fetchUserRole = async () => {
//       // const res = await fetch("/api/auth/me");
//       // const data = await res.json();
//       // setRole(data.role);
//       setRole("user"); // change this for testing: "admin" | "librarian" | "user"
//     };

//     fetchUserRole();
//   }, []);

//   const handleNav = (target: string) => setSection(target);
//   const handleLogout = () => alert("Logout functionality would be implemented here.");
//   const handleViewAll = () => setSection("transactions");
//   const handleAddBook = () => alert("Add Book modal would open here");
//   const handleAddMember = () => alert("Add Member modal would open here");

//   // Role-based content
//   const renderContent = () => {
//     switch (section) {
//       case "dashboard":
//         return <DashboardContent onViewAll={handleViewAll} />;
//       case "books":
//         return role !== "user" ? <BooksContent onAddBook={handleAddBook} /> : <div className="p-4">No Access</div>;
//       case "members":
//         return role === "admin" ? <MembersContent onAddMember={handleAddMember} /> : <div className="p-4">No Access</div>;
//       case "transactions":
//         return <TransactionsContent />;
//       case "reports":
//         return role === "admin" ? <div className="p-4">Reports & Analytics Placeholder</div> : <div className="p-4">No Access</div>;
//       case "settings":
//         return <div className="p-4">Settings Placeholder</div>;
//       default:
//         return <DashboardContent onViewAll={handleViewAll} />;
//     }
//   };

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar (filter menu items based on role) */}
//       <Sidebar currentSection={section} onNavigate={handleNav} role={role} />

//       {/* Main content */}
//       <div className="flex-grow-1 d-flex flex-column">
//         {/* Navbar */}
//         <Navbar onLogout={handleLogout} />

//         {/* Scrollable content area */}
//         <div
//           className="p-4 flex-grow-1"
//           style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}
//         >
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


// Section 3



// "use client";
// import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/dashboard/Sidebar";
// import Navbar from "../../components/dashboard/Navbar";
// import DashboardContent from "../../components/dashboard/DashboardContent";
// import BooksContentAdminLibrarian from "../../components/dashboard/BooksContent";
// import BooksContentUser from "../../components/user/BorrowBooks";
// import MembersContent from "../../components/dashboard/MembersContent";
// import TransactionsContent from "../../components/dashboard/TransactionsContent";
// import Dashboard from "@/components/user/Dashboard";

// const DashboardPage: React.FC = () => {
//   const [section, setSection] = useState<string>("dashboard");
//   const [role, setRole] = useState<string>("user"); // "admin" | "librarian" | "user"

//   useEffect(() => {
//     // Later fetch this from API or JWT
//     setRole("user"); // change for testing
//   }, []);

//   const handleNav = (target: string) => setSection(target);
//   const handleLogout = () => alert("Logout functionality would be implemented here.");
//   const handleViewAll = () => setSection("transactions");
//   const handleAddBook = () => alert("Add Book modal would open here");
//   const handleAddMember = () => alert("Add Member modal would open here");

//   const renderContent = () => {
//     switch (section) {
//       case "dashboard":
//         if(role==="admin" || role==="librarian"){
//           return <DashboardContent onViewAll={handleViewAll} />;
//         }
//         else if(role==="user"){
//           return <Dashboard></Dashboard>
//         }

//       case "books":
//         if (role === "admin" || role === "librarian") {
//           return <BooksContentAdminLibrarian onAddBook={handleAddBook} />;
//         } else if (role === "user") {
//           return <BooksContentUser userName=""/>;
//         }
//         break;

//       case "members":
//         if (role === "admin") {
//           return <MembersContent onAddMember={handleAddMember} />;
//         } else {
//           return <div className="p-4">No Access</div>;
//         }

//       case "transactions":
//         return <TransactionsContent />;

//       case "reports":
//         if (role === "admin") {
//           return <div className="p-4">Reports & Analytics Placeholder</div>;
//         } else {
//           return <div className="p-4">No Access</div>;
//         }

//       case "settings":
//         return <div className="p-4">Settings Placeholder</div>;

//       default:
//         return <DashboardContent onViewAll={handleViewAll} />;
//     }
//   };

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sidebar currentSection={section} onNavigate={handleNav} role={role} />

//       {/* Main content */}
//       <div className="flex-grow-1 d-flex flex-column">
//         <Navbar onLogout={handleLogout} />
//         <div
//           className="p-4 flex-grow-1"
//           style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}
//         >
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


// Section 4

"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import DashboardContent from "../../components/dashboard/DashboardContent";
import BooksContentAdminLibrarian from "../../components/dashboard/BooksContent";
import BooksContentUser from "../../components/user/BorrowBooks";
import MembersContent from "../../components/dashboard/MembersContent";
import TransactionsContent from "../../components/dashboard/TransactionsContent";
import Dashboard from "@/components/user/Dashboard";

const DashboardPage: React.FC = () => {
  const [section, setSection] = useState<string>("dashboard");
  const [role, setRole] = useState<string | null>(null); // null until loaded

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          setRole("user"); // fallback if not logged in
          return;
        }
        const data = await res.json();
        setRole(data.user.role); // "admin" | "librarian" | "user"
      } catch (err) {
        console.error("Failed to fetch user role:", err);
        setRole("user");
      }
    };

    fetchUserRole();
  }, []);

  const handleNav = (target: string) => setSection(target);
  const handleLogout = async() =>{
    try{
      const res=await fetch("api/auth/logout",{
        method: "POST",
        credentials: "include"
      });

      if(res.ok){
        window.location.href="/login";
      }
      else{
        console.error("Logout Failed");
      }
    }
    catch(err){
      console.log("Logout Error", err);
    }
  }
    
  const handleViewAll = () => setSection("transactions");
  const handleAddBook = () => alert("Add Book modal would open here");
  const handleAddMember = () => alert("Add Member modal would open here");

  const renderContent = () => {
    if (!role) {
      return <div className="p-4">Loading...</div>;
    }

    switch (section) {
      case "dashboard":
        if (role === "admin" || role === "librarian") {
          return <DashboardContent onViewAll={handleViewAll} />;
        } else {
          return <Dashboard />;
        }

      case "books":
        if (role === "admin" || role === "librarian") {
          return <BooksContentAdminLibrarian onAddBook={handleAddBook} />;
        } else {
          return <BooksContentUser userName="" />;
        }

      case "members":
        return role === "admin" ? (
          <MembersContent onAddMember={handleAddMember} />
        ) : (
          <div className="p-4">No Access</div>
        );

      case "transactions":
        return <TransactionsContent />;

      case "reports":
        return role === "admin" ? (
          <div className="p-4">Reports & Analytics Placeholder</div>
        ) : (
          <div className="p-4">No Access</div>
        );

      case "settings":
        return <div className="p-4">Settings Placeholder</div>;

      default:
        return <DashboardContent onViewAll={handleViewAll} />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar currentSection={section} onNavigate={handleNav} role={role ?? "user"} />

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar onLogout={handleLogout} />
        <div
          className="p-4 flex-grow-1"
          style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
