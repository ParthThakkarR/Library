// import React from 'react';
// import styles from '@/app/dashboard/dashboard.module.css'; // Import the CSS module
// import { Section } from '@/app/dashboard/page';

// interface SidebarProps {
//   currentSection: Section;
//   onNavigate: (section: Section) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ currentSection, onNavigate }) => {
//   const sections = [
//     { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
//     { id: 'books', label: 'Books', icon: 'fas fa-book' },
//     { id: 'members', label: 'Members', icon: 'fas fa-users' },
//     { id: 'transactions', label: 'Transactions', icon: 'fas fa-exchange-alt' },
//     { id: 'reports', label: 'Reports', icon: 'fas fa-chart-bar' },
//     { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
//   ] as const;

//   return (
//     <div className="col-md-3 col-lg-2 px-0">
//       <div className={styles.sidebar}>
//         <div className="p-4">
//           <h4 className={styles.textWhite + " mb-4"}>
//             <i className="fas fa-book-open me-2"></i>
//             LibraryHub
//           </h4>
//           <nav className="nav flex-column">
//             {sections.map((section) => (
//               <a
//                 key={section.id}
//                 className={`${styles.navLink} ${currentSection === section.id ? styles.navLinkActive : ''}`}
//                 onClick={() => onNavigate(section.id as Section)}
//                 href="#"
//               >
//                 <i className={`${section.icon} me-2`}></i>
//                 {section.label}
//               </a>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from "react";
import { LayoutDashboard, Library, UsersRound, ReceiptText, BarChart3, Settings as SettingsIcon, Book } from "lucide-react";
import { error } from "console";

interface SidebarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  role: string
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onNavigate, role }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'books', label: 'Books', icon: <Library size={20} /> },
    { id: 'members', label: 'Members', icon: <UsersRound size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <ReceiptText size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
  ];

  const [roles, setRole]=useState<string | null>(null);
  const [name,setName]= useState<string | null>(null);

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const res=await fetch("api/auth/me");
        const data=await res.json();
        if(res.ok){
          setRole(data.user.role);
          setName(data.user.name);
        }
        else{
          console.log("Error Fetching User");
        }
      }
      catch(err){
        console.log("Error Fetching User",err);
      }
    }
    fetchUser();
  },[])

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', minHeight: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <Book size={32} className="text-primary me-2" />
        <span className="fs-4">LibraryHub</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map(item => (
          <li className="nav-item" key={item.id}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
              className={`nav-link d-flex align-items-center ${currentSection === item.id ? 'active' : 'link-dark'}`}
            >
              {item.icon} <span className="ms-2">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <hr />
      <div className="d-flex align-items-center mt-auto">
        <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=N" className="rounded-circle me-2" alt="Admin" />
        <div>
          <strong>{name? name: "Unknown"}</strong>
          <div className="text-muted small">{role? role: "User"}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
