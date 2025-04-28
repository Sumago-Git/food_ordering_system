// src/ui/alert/Alert.tsx
import React from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Props {
  type: AlertType;
  title: string;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<Props> = ({ type, title, message, onClose }) => {
  const colorMap: Record<AlertType, string> = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
  };

  const color = colorMap[type];

  return (
    <div className={`border-l-4 p-4 border-${color}-500 bg-${color}-100 text-${color}-800 rounded relative`}>
      <strong className="font-bold">{title}</strong>
      <span className="block">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
