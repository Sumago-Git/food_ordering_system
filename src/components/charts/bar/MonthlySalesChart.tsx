import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../../icons";
import { useState } from "react";

export default function MonthlySalesChart() {
  const [isOpen, setIsOpen] = useState(false);
  const [chartType, setChartType] = useState<"monthly" | "weekly">("monthly");

  const foodNames = [
    "Pizza", "Burger", "Pasta", "Sushi", "Tacos",
    "Salad", "Noodles", "Ice Cream", "Steak", "Sandwich",
    "Fries", "Donuts", "Hot Dog", "Curry", "Kebab"
  ];

  const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const monthlyData = [130, 250, 180, 90, 210, 160, 120, 190, 230, 175, 145, 100, 135, 155, 165];
  const weeklyData = [120, 140, 110, 170, 150, 180, 200]; // Mock weekly data

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartType === "monthly" ? foodNames : weekLabels,
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: "Sales",
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: chartType === "monthly" ? monthlyData : weeklyData,
    },
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function handleChartTypeChange(type: "monthly" | "weekly") {
    setChartType(type);
    closeDropdown();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {chartType === "monthly" ? "Monthly" : "Weekly"} Food Product Sales
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem onItemClick={() => handleChartTypeChange("weekly")}>
              Weekly
            </DropdownItem>
            <DropdownItem onItemClick={() => handleChartTypeChange("monthly")}>
              Monthly
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown}>
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[850px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
