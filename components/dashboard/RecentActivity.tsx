// import React from 'react';

// const RecentActivity: React.FC = () => {
//   const activities = [
//     {
//       icon: 'fas fa-plus',
//       color: 'success',
//       title: 'New book added',
//       time: '2 minutes ago'
//     },
//     {
//       icon: 'fas fa-book-open',
//       color: 'primary',
//       title: 'Book issued to John Doe',
//       time: '15 minutes ago'
//     },
//     {
//       icon: 'fas fa-clock',
//       color: 'warning',
//       title: 'Book overdue reminder',
//       time: '1 hour ago'
//     },
//     {
//       icon: 'fas fa-user-plus',
//       color: 'info',
//       title: 'New member registered',
//       time: '3 hours ago'
//     }
//   ];

//   return (
//     <div className="chart-container">
//       <h5 className="mb-4">Recent Activity</h5>
//       <div className="list-group list-group-flush">
//         {activities.map((activity, index) => (
//           <div key={index} className="list-group-item border-0 px-0">
//             <div className="d-flex align-items-center">
//               <div className={`badge bg-${activity.color} me-3`}>
//                 <i className={activity.icon}></i>
//               </div>
//               <div>
//                 <div className="fw-bold">{activity.title}</div>
//                 <small className="text-muted">{activity.time}</small>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <style jsx>{`
//         .badge {
//           border-radius: 20px;
//           padding: 6px 12px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RecentActivity;


import React from "react";
import { ArrowRightLeft, Bell } from "lucide-react";
import { DashboardData } from "../types/Types";

interface RecentActivityProps {
  activity: DashboardData["recentActivity"];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activity }) => {
  const iconMap = {
    issue: <ArrowRightLeft className="text-primary" />,
    return: <ArrowRightLeft className="text-success" />,
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header fw-bold text-dark">Recent Activity</div>
      <div className="card-body p-3">
        {activity.length === 0 ? (
          <p className="text-muted text-center mb-0">No recent activity</p>
        ) : (
          <ul className="list-group list-group-flush">
            {activity.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-start gap-3">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  {iconMap[item.type] ?? <Bell />}
                </div>
                <div>
                  <p className="mb-1 fw-medium text-dark">{item.message}</p>
                  <small className="text-muted">{new Date(item.time).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
