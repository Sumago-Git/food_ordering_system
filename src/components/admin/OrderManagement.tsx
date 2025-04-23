import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import DataTable from "../tables/DataTable";
import { MRT_ColumnDef } from "material-react-table";
import SkeletonLoading from "../ui/skeleton/SkeletonLoading";

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
      <Typography
        variant="body1"
        fontWeight={600}
        color="text.secondary"
        fontFamily="system-ui"
      >
        {cell.getValue<string>()}
      </Typography>
    ),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    Cell: ({ cell }) => (
      <Typography
        variant="body2"
        color="text.secondary"
        fontFamily="system-ui"
      >
        ${cell.getValue<number>().toFixed(2)}
      </Typography>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    Cell: ({ cell }) => (
      <Typography
        variant="caption"
        color="text.secondary"
        fontFamily="system-ui"
      >
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
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        color="text.primary"
        fontFamily="system-ui"
      >
        Order Management
      </Typography>

      {loading ? (
        <SkeletonLoading variant="table" count={6} />
      ) : (
        <DataTable data={products} columns={productColumns} />
      )}
    </Box>
  );
};

export default OrderManagement;




