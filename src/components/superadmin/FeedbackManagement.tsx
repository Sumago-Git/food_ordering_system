// import React from 'react';

// const FeedbackManagement: React.FC = () => {
//   return (
//     <div>
//       <h1>Feedback Management</h1>
//     </div>
//   );
// };

// export default FeedbackManagement;

// pages/AlertDemo.tsx
import React, { useState } from 'react';
import Alert from '../ui/alert/Alert';
import SweetAlert from '../ui/alert/SweetAlert';
import Button from '../ui/button/Button';

const FeedbackManagement: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      {showAlert && (
        <Alert
          type="info"
          title="Heads up!"
          message="This is a basic inline alert."
          onClose={() => setShowAlert(false)}
        />
      )}

      <Button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Show Modal Alert
      </Button>

      <SweetAlert
        show={showModal}
        type="warning"
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        onConfirm={() => {
          alert('Confirmed!');
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default FeedbackManagement;
