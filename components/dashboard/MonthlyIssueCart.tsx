// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// interface MonthlyIssuesChartProps {
//   data: { month: string; issues: number }[];
// }

// const MonthlyIssuesChart: React.FC<MonthlyIssuesChartProps> = ({ data }) => (
//   <div className="card shadow-sm h-100">
//     <div className="card-header">
//       <h5 className="mb-0">Monthly Book Issues</h5>
//     </div>
//     <div className="card-body" style={{ height: '350px' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
//           <XAxis dataKey="month" tick={{ fill: '#495057' }} />
//           <YAxis tick={{ fill: '#495057' }} />
//           <Tooltip
//             contentStyle={{ 
//               backgroundColor: 'rgba(255, 255, 255, 0.9)', 
//               border: '1px solid #dee2e6', 
//               borderRadius: '0.25rem',
//               backdropFilter: 'blur(3px)'
//             }}
//           />
//           <Legend />
//           <Line 
//             type="monotone" 
//             dataKey="issues" 
//             stroke="#0d6efd" 
//             strokeWidth={3} 
//             dot={{ r: 5 }} 
//             activeDot={{ r: 8 }} 
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   </div>
// );

// export default MonthlyIssuesChart;
"use client";
import React from 'react'; // Removed useState and useEffect as they are no longer needed
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// 1. DEFINING PROPS
// We define an interface for the props that this component will now accept.
// It expects to receive an array of objects for the chart data.
interface MonthlyIssuesChartProps {
  data: { month: string; issues: number }[];
}

// The component now accepts `data` as a prop.
const MonthlyIssuesChart: React.FC<MonthlyIssuesChartProps> = ({ data }) => {
  // 2. REMOVED ALL DATA FETCHING LOGIC
  // All the useState, useEffect, and data processing logic has been removed.
  // This makes the component simpler, faster, and reusable, as it only
  // has one job: to display the data it is given.

  // 3. RENDER THE CHART
  // The component now directly uses the 'data' prop to render the chart.
  return (
    <div className="card shadow-sm h-100">
      <div className="card-header">
        <h5 className="mb-0">Monthly Book Issues</h5>
      </div>
      <div className="card-body" style={{ height: '350px' }}>
        {/* We add a check to show a message if there's no data to display */}
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dee2e6" />
              <XAxis dataKey="month" tick={{ fill: '#495057' }} />
              <YAxis tick={{ fill: '#495057' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid #dee2e6', 
                  borderRadius: '0.25rem',
                  backdropFilter: 'blur(3px)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="issues" 
                stroke="#0d6efd" 
                strokeWidth={3} 
                dot={{ r: 5 }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <p className="text-muted">No chart data available for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyIssuesChart;

