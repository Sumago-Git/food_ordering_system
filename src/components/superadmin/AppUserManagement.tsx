import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Switch,
  Dialog,
  DialogContent,
  DialogTitle,
  
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from '../../components/tables/DataTable';
import { useState } from 'react';
import TextField from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';
import ToggleSwitch from '../../components/ui/toggleswitch/ToggleSwitch';
import SweetAlert from '../../components/ui/alert/SweetAlert';


type Person = {
  user_name: {
    firstName: string;
    lastName: string;
  };
  mobile_no: string;
  email: string;
  status: string;
  registration_date: string;
  last_login_timestamp: string;
};

const initialUserData: Person[] = [
  {
    user_name: { firstName: 'Shankar', lastName: 'Tile' },
    mobile_no: '1111111111',
    email: 'shankartile@gmail.com',
    status: 'Active',
    registration_date: '2025-03-04',
    last_login_timestamp: '11:22',
  },
  {
    user_name: { firstName: 'Shubham', lastName: 'Kothawade' },
    mobile_no: '2222222222',
    email: 'shubham@gmail.com',
    status: 'Inactive',
    registration_date: '2025-03-04',
    last_login_timestamp: '11:22',
  },
];

const AppUserManagement = () => {
  // const [users, setUsers] = useState(initialUserData);
  const [users, setUsers] = useState<Person[]>(initialUserData);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState<Person>({
    user_name: { firstName: '', lastName: '' },
    mobile_no: '',
    email: '',
    status: 'Active',
    registration_date: '',
    last_login_timestamp: '',
  });
  const [selectedUser, setSelectedUser] = useState<Person | null>(null);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    mobile_no: '',
    email: '',
    registration_date: '',
    last_login_timestamp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'user_name') {
        setNewUser((prev) => ({
          ...prev,
          user_name: {
            ...prev.user_name,
            [child]: value,
          },
        }));
      }
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setTimeout(validateForm, 0);
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      mobile_no: '',
      email: '',
      registration_date: '',
      last_login_timestamp: '',
    };
  
    // Validate First Name - Required and No spaces
    if (!newUser.user_name.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(newUser.user_name.firstName)) {
      newErrors.firstName = 'First name must contain only letters';
      isValid = false;
    }
  
    // Validate Last Name - Required and No spaces
    if (!newUser.user_name.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(newUser.user_name.lastName)) {
      newErrors.lastName = 'Last name must contain only letters';
      isValid = false;
    }
  
    // Validate Mobile Number (exactly 10 digits)
    if (!/^\d{10}$/.test(newUser.mobile_no)) {
      if (newUser.mobile_no.trim() === '') {
        newErrors.mobile_no = 'Mobile number is required';
      } else if (/\D/.test(newUser.mobile_no)) {
        newErrors.mobile_no = 'Mobile number must contain only digits';
      } else {
        newErrors.mobile_no = 'Mobile number must be exactly 10 digits';
      }
      isValid = false;
    }
  
    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
  
    // Validate Registration Date
    if (!newUser.registration_date) {
      newErrors.registration_date = 'Registration date is required';
      isValid = false;
    }
  
    // Validate Last Login Timestamp (HH:mm format)
    if (!/^\d{2}:\d{2}$/.test(newUser.last_login_timestamp)) {
      newErrors.last_login_timestamp = 'Invalid time format (expected HH:mm)';
      isValid = false;
    }
  
    // Set errors
    setErrors(newErrors);
    setIsFormValid(isValid); // 🔥 Update the form validity state
  
    // Return the final validity status
    return isValid;
  };
  

  const handleAddUser = () => {
    if (!validateForm()) {
      return;
    }

    setUsers([
      ...users,
      {
        ...newUser,
        registration_date: newUser.registration_date,
        last_login_timestamp: newUser.last_login_timestamp,
      },
    ]);
    setNewUser({
      user_name: { firstName: '', lastName: '' },
      mobile_no: '',
      email: '',
      status: 'Active',
      registration_date: '',
      last_login_timestamp: '',
    });
    setShowForm(false);
  };

  // const handleDelete = (index: number) => {
  //   const updatedUsers = [...users];
  //   updatedUsers.splice(index, 1);
  //   setUsers(updatedUsers);
  // };

  
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  
  const requestDelete = (index: number) => {
    setDeleteIndex(index);
    setShowModal(true);
  };
  
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers.splice(deleteIndex, 1);
      setUsers(updatedUsers);
    }
    setShowModal(false);
    setDeleteIndex(null);
  };
  
  const cancelDelete = () => {
    setShowModal(false);
    setDeleteIndex(null);
  };
  


  

  

  const handleView = (user: Person) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const userColumns: MRT_ColumnDef<Person>[] = [
    {
      accessorKey: 'user_name.firstName',
      header: 'User Name',
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            alt={`${row.original.user_name.firstName} ${row.original.user_name.lastName}`}
            src={`/images/user/user-${row.index + 17}.jpg`}
            sx={{ width: 40, height: 40 }}
          />
          <Typography fontWeight={600}>
            {row.original.user_name.firstName} {row.original.user_name.lastName}
          </Typography>
        </Box>
      ),
    },
    {
      accessorKey: 'mobile_no',
      header: 'Mobile No',
    },
    {
      accessorKey: 'email',
      header: 'Email ID',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ row }) => {
        const isActive = row.original.status === 'Active';
        return (
          <Switch
            checked={isActive}
            onChange={() => {
             
            }}
            disabled
            color="primary"
            sx={{
              '&.Mui-disabled .MuiSwitch-switchBase.Mui-checked': {
                color: 'primary.main',
              },
              '&.Mui-disabled .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'primary.main',
              },
            }}
          />
          
        );
      },
    },
    {
      accessorKey: 'registration_date',
      header: 'Registration Date',
    },
    {
      accessorKey: 'last_login_timestamp',
      header: 'Last Login Time',
      Cell: ({ row }) => {
        const time24 = row.original.last_login_timestamp;
        const [hours, minutes] = time24.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        const formattedTime = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return formattedTime;
      },
    },
    {
      header: 'Actions',
      Cell: ({ row }) => (
        <Box display="flex" gap={1}>
          <IconButton color="primary" onClick={() => handleView(row.original)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="error" onClick={() => requestDelete(row.index)}>
    <DeleteIcon />
  </IconButton>


          
        </Box>
      ),
      size: 100,
    },
  ];

  return (
    <>
      <SweetAlert
           show={showModal}
           type="warning"
           title="Confirm Deletion"
           message="Are you sure you want to delete this user?"
           onConfirm={confirmDelete}
           onCancel={cancelDelete}
           confirmText="Yes"
           cancelText="No"
      />
      {!showForm ? (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
            <Typography variant="h6" fontWeight={600} fontFamily="system-ui">
              App User Management
            </Typography>
            <Button onClick={() => setShowForm(true)}>
              <PersonAddIcon />Add User
            </Button>
          </Box>
          <DataTable data={users} columns={userColumns} />
        </>
      ) : (
        <Dialog
open={showForm}
onClose={() => setShowForm(false)}
maxWidth="md"
fullWidth 
PaperProps={{
  sx: {
    borderRadius: '35px',
  },
}}


>
<Box
  sx={{
    background: 'linear-gradient(270deg, #ffe91b 8.66%, #063f1f 103.05%)',
    height:25,
    p: 4,
    position: 'relative', // Needed for positioning the close button
  }}
>
  <DialogTitle sx={{ color: 'white',position:'absolute', top:5}}>Add New User</DialogTitle>

  <IconButton
    sx={{ position: 'absolute', top: 12, right: 12}}
    onClick={() => setShowForm(false)}
  >
    <CloseIcon />
  </IconButton>
</Box>


<DialogContent>
  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <TextField
      label="First Name"
      name="user_name.firstName"
      placeholder="First Name"
      value={newUser.user_name.firstName}
      type="text"
      onChange={handleChange}
      onFocus={() => setErrors((prev) => ({ ...prev, firstName: '' }))}
      error={!!errors.firstName}
      helperText={errors.firstName}
    />
    <TextField
      label="Last Name"
      name="user_name.lastName"
      placeholder="Last Name"
      value={newUser.user_name.lastName}
      type="text"
      onChange={handleChange}
      onFocus={() => setErrors((prev) => ({ ...prev, lastName: '' }))}
      error={!!errors.lastName}
      helperText={errors.lastName}
    />
    <TextField
      label="Mobile No"
      name="mobile_no"
       placeholder="Mobile No"
      value={newUser.mobile_no}
      type="number"
      onChange={handleChange}
      onFocus={() => setErrors((prev) => ({ ...prev, mobile_no: '' }))}
      error={!!errors.mobile_no}
      helperText={errors.mobile_no}
    />
    <TextField
      label="Email"
      name="email"
       placeholder="Email"
      value={newUser.email}
      type="email"
      onChange={handleChange}
      onFocus={() => setErrors((prev) => ({ ...prev, email: '' }))}
      error={!!errors.email}
      helperText={errors.email}
    />
    <TextField
      label="Registration Date"
      name="registration_date"
      type="date"
      value={newUser.registration_date}
      onChange={handleChange}
      onFocus={() => setErrors((prev) => ({ ...prev, registration_date: '' }))}
      error={!!errors.registration_date}
      helperText={errors.registration_date}
    />
    <TextField
      label="Last Login Time"
      name="last_login_timestamp"
      type="time"
      value={newUser.last_login_timestamp}
      onChange={handleChange}
      onFocus={() => setErrors((prev) => ({ ...prev, last_login_timestamp: '' }))}
      error={!!errors.last_login_timestamp}
      helperText={errors.last_login_timestamp}
    />
    <div className="md:col-span-2 flex items-center gap-3">
      <ToggleSwitch
  checked={newUser.status === 'Active'}
  onChange={() =>
    setNewUser((prev) => ({
      ...prev,
      status: prev.status === 'Active' ? 'Inactive' : 'Active',
    }))
  }
 
  label="Status:"
  id="user-status"
/>
      <Typography>{newUser.status}</Typography>
    </div>
  </div>

  <Box display="flex" justifyContent="center" gap={6} mt={4}>
  <Button
  variant="gradient"
  onClick={handleAddUser}
  className="rounded-[25px]"
  disabled={!isFormValid} // 🔥 Disable if form is not valid
>
  Submit
</Button>
    <Button variant="gradient" onClick={() => setShowForm(false)} className="rounded-[25px]">
      Cancel
    </Button>
  </Box>
</DialogContent>
</Dialog>
      )}

<Dialog open={!!selectedUser} onClose={handleCloseModal} maxWidth="sm" fullWidth>
  <Box sx={{ position: 'relative', p: 2 ,border:'1px solid #ccc' , borderRadius:'12px'}}>
    {/* Close Button */}
    <IconButton
      onClick={handleCloseModal}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>

    <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, mt: 2, fontFamily:'system-ui' }}>
      User Details
    </DialogTitle>

    <DialogContent sx={{ pb: 4 }}>
      {selectedUser && (
        <Box
          display="flex"
          flexDirection="column"
          fontFamily="system-ui"
          alignItems="center"
          gap={2}
          sx={{
            border: '1px solid #ddd',
            borderRadius: 3,
            p: 3,
            boxShadow: 2,
            mt: 2,
          }}
        >
          {/* Avatar + Name */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              alt={`${selectedUser.user_name.firstName} ${selectedUser.user_name.lastName}`}
              src={`/images/user/user-${users.indexOf(selectedUser) + 17}.jpg`}
              sx={{ width: 72, height: 72 }}
            />
            <Typography variant="h6" fontWeight={600}>
              {selectedUser.user_name.firstName} {selectedUser.user_name.lastName}
            </Typography>
          </Box>

          {/* Info Grid */}
          <Box
            width="100%"
            display="grid"
            gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
            gap={2}
            mt={3}
          >
            <Typography>
              <strong>Email:</strong> {selectedUser.email}
            </Typography>
            <Typography>
              <strong>Mobile No:</strong> {selectedUser.mobile_no}
            </Typography>
            <Typography>
              <strong>Status:</strong> {selectedUser.status}
            </Typography>
            <Typography>
              <strong>Registration Date:</strong> {selectedUser.registration_date}
            </Typography>
            <Typography>
              <strong>Last Login Time:</strong> {selectedUser.last_login_timestamp}
            </Typography>
          </Box>
        </Box>
      )}
    </DialogContent>
  </Box>
</Dialog>

    </>
  );
};

export default AppUserManagement;


  