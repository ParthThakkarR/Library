// import React from 'react';

// interface StatCardProps {
//   title: string;
//   value: string;
//   icon: string;
//   gradient: string;
// }

// const StatCard: React.FC<StatCardProps> = ({ title, value, icon, gradient }) => {
//   return (
//     <div className="stat-card d-flex align-items-center">
//       <div className="stat-icon" style={{ background: gradient }}>
//         <i className={icon}></i>
//       </div>
//       <div className="ms-3">
//         <div className="text-muted small">{title}</div>
//         <div className="h4 mb-0">{value}</div>
//       </div>
      
//       <style jsx>{`
//         .stat-card {
//           background: #fff;
//           border-radius: 15px;
//           padding: 25px;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.08);
//           border: none;
//           transition: transform 0.3s, box-shadow 0.3s;
//         }
//         .stat-card:hover { 
//           transform: translateY(-5px); 
//           box-shadow: 0 10px 25px rgba(0,0,0,0.15);
//         }
//         .stat-icon {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           color: #fff;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default StatCard;


import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string; // Bootstrap bg color class, e.g., 'bg-primary', 'bg-success'
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className="card shadow-sm mb-3" style={{ transition: 'transform 0.3s', cursor: 'pointer' }}>
    <div className="card-body d-flex align-items-center">
      <div className={`rounded-circle d-flex justify-content-center align-items-center ${color}`} style={{ width: '50px', height: '50px', color: 'white', fontSize: '1.25rem' }}>
        {icon}
      </div>
      <div className="ms-3">
        <p className="mb-1 text-muted">{title}</p>
        <h4 className="mb-0">{value.toLocaleString()}</h4>
      </div>
    </div>
  </div>
);

export default StatCard;
