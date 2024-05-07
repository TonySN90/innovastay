import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ISalesData } from "../../types/Dashboard";

const SalesCharts = ({ salesData }: { salesData: ISalesData[] }) => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: { show: false },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [800, 1600, 2400, 3200, 4000],
    },
  ]);

  useEffect(() => {
    // Update chart options when chartData changes
    const chartData = salesData.map((item) => item.sales as number);
    const xData = salesData.map((item) => item.date as string);

    // @ts-expect-error getState xData should actually be an array of numbers
    setOptions(() => ({
      xaxis: {
        categories: xData,
        labels: {
          style: {
            colors: xData.map(() => "var(--text)"),
            fontSize: "16px",
          },
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "16px",
            colors: ["var(--border)"],
          },
          formatter: (value: number) => {
            return `${value} €`;
          },
        },
        min: 0,
        // tickAmount: 4,
      },
      colors: ["#6366f1"],

      grid: {
        borderColor: "var(--border)",
        padding: {
          top: 0,
          right: 20,
          bottom: 0,
          left: 20,
        },
      },

      markers: {
        strokeColor: "var(--text)",
      },

      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              opacity: 0.5,
              color: "var(--active)",
            },
            {
              offset: 100,
              opacity: 0,
              color: "var(--active)",
            },
          ],
        },
      },
      tooltip: {
        enabled: false,
      },
    }));

    setSeries((prevSeries) => [
      {
        ...prevSeries[0],
        data: chartData,
      },
    ]);
  }, [salesData]);

  return (
    <div className="w-full">
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="area"
              width={"100%"}
              height={"350px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCharts;
