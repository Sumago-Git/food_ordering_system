import React from 'react';
import Card from '../ui/cards/Card';
import MonthlySalesChart from '../charts/bar/MonthlySalesChart';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
     <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <Card title="User Data">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Total App Users" subtitle="Active users today">
            <p className="text-3xl font-bold">1,234</p>
          </Card>

          <Card title="Total Hotels" subtitle="This Month">
            <p className="text-3xl font-bold">12</p>
          </Card>

          <Card title="Total Completed Orders" subtitle="Today">
            <p className="text-3xl font-bold">340</p>
          </Card>

          <Card title="Total Sales" subtitle="Today">
            <p className="text-3xl font-bold">₹34,000</p>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Total Cancelled Orders" subtitle="Today">
            <p className="text-3xl font-bold">1,234</p>
          </Card>

          <Card title="Active QR Codes" subtitle="This Month">
            <p className="text-3xl font-bold">12</p>
          </Card>

          <Card title="Total Feedback Entries" subtitle="Pending/Resolved">
            <p className="text-3xl font-bold">340</p>
          </Card>

          <Card title="Active Users" subtitle="User">
            <p className="text-3xl font-bold">340</p>
          </Card>
        </div>
      </Card>
    </div>

      {/* Monthly Sales Chart */}
      <div className="p-4 sm:p-6 md:p-8 space-y-6 ">
        <Card title="Sales Overview">
          <MonthlySalesChart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
