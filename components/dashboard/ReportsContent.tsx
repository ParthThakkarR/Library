import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ChartOptions
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const ReportsContent: React.FC = () => {
  const [reportType, setReportType] = useState('monthly');
  
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Books Issued',
      data: [120, 190, 300, 500, 200, 300],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };
  
  const categoryData = {
    labels: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography'],
    datasets: [{
      label: 'Books by Category',
      data: [350, 200, 150, 100, 75],
      backgroundColor: [
        'rgba(102, 126, 234, 0.7)',
        'rgba(240, 147, 251, 0.7)',
        'rgba(79, 172, 254, 0.7)',
        'rgba(250, 112, 154, 0.7)',
        'rgba(255, 193, 7, 0.7)'
      ],
      borderWidth: 1
    }]
  };
  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Reports & Analytics</h4>
        <div>
          <button className="btn btn-outline-primary me-2">
            <i className="fas fa-download me-2"></i>Export PDF
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-print me-2"></i>Print Report
          </button>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="chart-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Library Statistics</h5>
              <select 
                className="form-select w-auto"
                value={reportType}
                onChange={e => setReportType(e.target.value)}
              >
                <option value="monthly">Monthly Overview</option>
                <option value="category">By Category</option>
                <option value="members">Member Activity</option>
              </select>
            </div>
            
            {reportType === 'monthly' && (
              <Line data={monthlyData} options={chartOptions} height={100} />
            )}
            
            {reportType === 'category' && (
              <div className="text-center">
                <p className="text-muted">Category distribution chart would appear here</p>
              </div>
            )}
            
            {reportType === 'members' && (
              <div className="text-center">
                <p className="text-muted">Member activity chart would appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="chart-container">
            <h5 className="mb-4">Popular Books</h5>
            <div className="list-group list-group-flush">
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>The Great Gatsby</div>
                <span className="badge bg-primary">45 issues</span>
              </div>
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>To Kill a Mockingbird</div>
                <span className="badge bg-primary">38 issues</span>
              </div>
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>1984</div>
                <span className="badge bg-primary">32 issues</span>
              </div>
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>Pride and Prejudice</div>
                <span className="badge bg-primary">28 issues</span>
              </div>
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>The Catcher in the Rye</div>
                <span className="badge bg-primary">25 issues</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="chart-container">
            <h5 className="mb-4">Overdue Analysis</h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-muted">Total Overdue Books</div>
              <div className="h4 mb-0 text-warning">89</div>
            </div>
            <div className="progress mb-3" style={{ height: '10px' }}>
              <div 
                className="progress-bar bg-warning" 
                role="progressbar" 
                style={{ width: '15%' }}
                aria-valuenow={15} 
                aria-valuemin={0} 
                aria-valuemax={100}
              ></div>
            </div>
            <small className="text-muted">15% of issued books are overdue</small>
            
            <hr className="my-4" />
            
            <h6>Overdue by Category</h6>
            <div className="list-group list-group-flush">
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>Fiction</div>
                <span className="badge bg-warning">42 books</span>
              </div>
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>Non-Fiction</div>
                <span className="badge bg-warning">25 books</span>
              </div>
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>Science</div>
                <span className="badge bg-warning">12 books</span>
              </div>
              <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                <div>History</div>
                <span className="badge bg-warning">10 books</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .chart-container {
          background: #fff;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
          transform: translateY(-2px);
        }
        .badge {
          border-radius: 20px;
          padding: 6px 12px;
        }
      `}</style>
    </>
  );
};

export default ReportsContent;