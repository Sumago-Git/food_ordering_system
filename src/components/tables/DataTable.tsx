import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';
  import { useMemo } from 'react';
  import { Box } from '@mui/material';
  
  type DataTableProps<T extends Record<string, any>> = {
    data: T[];
    columns: MRT_ColumnDef<T>[];
  };
  
  const DataTable = <T extends Record<string, any>>({ data, columns }: DataTableProps<T>) => {
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedData = useMemo(() => data, [data]);
  
    const table = useMaterialReactTable({
      columns: memoizedColumns,
      data: memoizedData,
      enableRowSelection: false,
      enableColumnResizing: true,
      columnResizeMode: 'onChange',
      layoutMode: 'grid',
      enableFullScreenToggle: false,
  
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
          overflowX: 'auto',
        },
      },
      muiTableBodyCellProps: {
        sx: {
          fontFamily: 'system-ui',
        },
      },
      muiTableHeadCellProps: {
        sx: {
          fontFamily: 'system-ui',
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
    });
  
    return (
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <MaterialReactTable table={table} />
      </Box>
    );
  };
  
  export default DataTable;
  
  