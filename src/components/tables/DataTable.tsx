import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type DataTableProps<T extends Record<string, any>> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
};

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<T>) => {
  const memoizedData = useMemo(() => data, [data]);
  const isMobile = useMediaQuery('(max-width:768px)');

  // Optional: Hide some columns on mobile (customize as needed)
  const memoizedColumns = useMemo(() => {
    if (!isMobile) return columns;
    return columns.filter(
      (col) =>
        !['registration_date', 'last_login_timestamp'].includes(
          col.accessorKey as string
        )
    );
  }, [columns, isMobile]);

  // CSV Download
  const handleDownloadCSV = () => {
    const csvContent =
      [memoizedColumns.map(col => col.header).join(',')].concat(
        memoizedData.map(row =>
          memoizedColumns
            .map(col => {
              const accessorKey = col.accessorKey as string;
              return JSON.stringify(row[accessorKey] ?? '');
            })
            .join(',')
        )
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'table-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = memoizedColumns.map(col => col.header);
    const tableRows = memoizedData.map(row =>
      memoizedColumns.map(col => {
        const accessorKey = col.accessorKey as string;
        return row[accessorKey] ?? '';
      })
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('table-data.pdf');
  };

  // Dropdown for export
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data: memoizedData,
    enableRowSelection: false,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    layoutMode: 'semantic',
    enableFullScreenToggle: false,

    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleClick}
          startIcon={<FileDownloadIcon />}
          sx={{
            fontFamily: 'system-ui',
            color: 'text.secondary',
            height: '40px',
            textTransform: 'none',
            borderColor: 'divider',
          }}
        >
          
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => { handleDownloadCSV(); handleClose(); }}>
            CSV
          </MenuItem>
          <MenuItem onClick={() => { handleDownloadPDF(); handleClose(); }}>
            PDF
          </MenuItem>
        </Menu>
      </Box>
    ),

    muiSearchTextFieldProps: {
      variant: 'outlined',
      sx: { maxWidth: '300px', height: '40px' },
      size: 'small',
    },

    muiTablePaperProps: {
      elevation: 0,
      sx: {
        fontFamily: 'system-ui',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      },
    },

    muiTableContainerProps: {
      sx: {
        overflowX: 'auto',  // Allows scrolling but prevents horizontal overflow
        maxWidth: '100%',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        },
      },
    },

    muiTableHeadCellProps: {
      sx: {
        fontFamily: 'system-ui',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px',
        width: 'auto',
      },
    },

    muiTableBodyCellProps: {
      sx: {
        fontFamily: 'system-ui',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px',
        width: 'auto',
      },
    },

    muiTableFooterCellProps: {
      sx: {
        fontFamily: 'system-ui',
      },
    },

    muiTableBodyRowProps: {
      sx: {
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      },
    },

    muiTableProps: {
      sx: {
        tableLayout: 'fixed',  // Prevents columns from becoming too wide
        width: '100%',
        overflow: 'hidden', // Prevents horizontal overflow
      },
    },
  });

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', padding: 1 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default DataTable;
