// import React from 'react';
// import DataTable from '../tables/DataTable';

// const AppFeedbackManagement: React.FC = () => {
//   return (
//     <div>
//       <h1>App Feedback Management</h1>
//       <DataTable/>
//     </div>
//   );
// };

// export default AppFeedbackManagement;




import { Box, Typography, Avatar } from '@mui/material';
import DataTable from '../tables/DataTable';
import { MRT_ColumnDef } from 'material-react-table';

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

const userData: Person[] = [
  {
    name: { firstName: 'Alice', lastName: 'Smith' },
    address: '123 Main St',
    city: 'Springfield',
    state: 'Ohio',
  },
  {
    name: { firstName: 'Bob', lastName: 'Johnson' },
    address: '456 Elm St',
    city: 'Denver',
    state: 'Colorado',
  },
];

const userColumns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'name.firstName',
    header: 'User',
    Cell: ({ row }) => (
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          alt={`${row.original.name.firstName} ${row.original.name.lastName}`}
          src={`/images/user/user-${row.index + 17}.jpg`}
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {row.original.name.firstName} {row.original.name.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.original.state}
          </Typography>
        </Box>
      </Box>
    ),
    size: 250,
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
];

const AppUserFeedback = () => {
  
  return <DataTable data={userData} columns={userColumns} />;
};

export default AppUserFeedback;
