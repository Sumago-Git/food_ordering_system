import React from 'react';
import Card from '../ui/cards/Card';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div>
        <div><p className='font-bold'>User Data</p></div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <p className="text-3xl font-bold">34000 rs</p>
          </Card>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Total Cancelled Orders" subtitle="Active users today">
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
      </div>
    </div>
  );
};

export default Dashboard;
