// import React from 'react';

// const OrderManagement: React.FC = () => {
//   return (
//     <div>
//       <h1>Order Management</h1>
//     </div>
//   );
// };

// export default OrderManagement;




// import {Typography, Chip } from '@mui/material';
// import DataTable from '../tables/DataTable';
// import { MRT_ColumnDef } from 'material-react-table';

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   inStock: boolean;
// };

// const productData: Product[] = [
//   { id: 1, name: 'iPhone 14 Pro', price: 999, category: 'Electronics', inStock: true },
//   { id: 2, name: 'MacBook Air', price: 1299, category: 'Electronics', inStock: false },
//   { id: 3, name: 'Gaming Chair', price: 299, category: 'Furniture', inStock: true },
//   { id: 4, name: 'Desk Lamp', price: 49, category: 'Home Decor', inStock: true },
//   { id: 5, name: 'Bluetooth Speaker', price: 89, category: 'Electronics', inStock: false },
// ];

// const productColumns: MRT_ColumnDef<Product>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Product Name',
//     Cell: ({ cell }) => (
//       <Typography fontWeight={600}>{cell.getValue<string>()}</Typography>
//     ),
//     size: 200,
//   },
//   {
//     accessorKey: 'price',
//     header: 'Price ($)',
//     Cell: ({ cell }) => `$${cell.getValue<number>().toFixed(2)}`,
//     size: 100,
//   },
//   {
//     accessorKey: 'category',
//     header: 'Category',
//     size: 150,
//   },
//   {
//     accessorKey: 'inStock',
//     header: 'Stock Status',
//     Cell: ({ cell }) => {
//       const inStock = cell.getValue<boolean>();
//       return (
//         <Chip
//           label={inStock ? 'In Stock' : 'Out of Stock'}
//           color={inStock ? 'success' : 'error'}
//           size="small"
//         />
//       );
//     },
//     size: 120,
//   },
// ];

// const OrderManagement = () => {
//   return <DataTable data={productData} columns={productColumns} />;
// };

// export default OrderManagement;



import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import DataTable from "../tables/DataTable";
import { MRT_ColumnDef } from "material-react-table";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

const productColumns: MRT_ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
    Cell: ({ cell }) => (
      <Typography variant="body1" fontWeight={600} color="text.secondary" fontFamily="system-ui">
        {cell.getValue<string>()}
      </Typography>
    ),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    Cell: ({ cell }) => (
      <Typography variant="body2" color="text.secondary" fontFamily="system-ui">
        ${cell.getValue<number>().toFixed(2)}
      </Typography>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    Cell: ({ cell }) => (
      <Typography variant="caption" color="text.secondary" fontFamily="system-ui">
        {cell.getValue<string>()}
      </Typography>
    ),
  },
];

const OrderManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const json = await res.json();
        setProducts(json);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Box p={3} className="overflow-hidden rounded-xl bg-white dark:bg-gray-900">
      <Typography variant="h5" fontWeight={700} mb={3} color="text.primary" fontFamily="system-ui">
         Order Management
      </Typography>

      {loading ? (
        <Typography variant="body1" color="text.secondary">
          Loading products...
        </Typography>
      ) : (
        <DataTable data={products} columns={productColumns} />
      )}
    </Box>
  );
};

export default OrderManagement;



