import React, { useState, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { error } from "console";
import Link from "next/link";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const [role,setRole]=useState<string | null>(null);
    const [name,setName]=useState<string | null>(null);

  // Optional: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const res=await fetch("api/auth/me");
        const data=await res.json();
        if (res.ok) {
          setRole(data.user.role);
          setName(data.user.name);
        }
        else{
          console.log(data.error);
        }
      } 
      catch(err){
        console.log("Failed to Fetch data",err);
      }
      console.log(role);
    }
    fetchUser();
  },[])

  return (
    <nav className="navbar navbar-light bg-white shadow-sm p-3">
      <div className="container-fluid justify-content-end">
        <button type="button" className="btn position-relative me-3">
          <Bell size={24} />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>
        </button>

        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <User size={24} className="me-1" /> {role? role.toUpperCase() : "User"} {name? name.toUpperCase(): "Demo"}
          </button>
          <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? "show" : ""}`}>
            <li>
              <Link className="dropdown-item" href="/profile">
                <User size={16} className="me-2" /> Profile
              </Link>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={onLogout}>
                <LogOut size={16} className="me-2" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

