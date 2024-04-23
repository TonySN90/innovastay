import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const SalesCharts = ({salesData} : {salesData: {date: string, sales: number}})  => {

    const [options, setOptions] = useState({
      chart: {
        id: 'basic-bar',
        toolbar: { show: false },
        grid: {
          row: {
            colors: ['#f3f4f6'],
            opacity: 1
          }
        }
      },
      xaxis: {
        categories: [21, 20, 19, 18, 17, 16, 15],
        labels: {
            style: {
                fontSize: '16px'
            },
            formatter: (value) => {
                return `${value}`
              },
        },
        tickPlacement: 'on',
      },
      yaxis: {
        labels: {
            style: {
                fontSize: '16px'
            },
            formatter: (value) => {
              return `${value} €`
            },
        },
        min: 0,
        tickAmount: 4
      },
      colors: ['#6366f1'],
    });
  
    const [series, setSeries] = useState([{
      name: 'series-1',
      data: [800, 4000, 8000, 10000, 6000, 4000]
    }]);

    useEffect(() => {
      // Update chart options when chartData changes
      const chartData = salesData.map((item) => item.sales);
      const xData = salesData.map((item) => item.date);
  
      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: xData,
        },
      }));
  
      setSeries(prevSeries => ([{
        ...prevSeries[0],
        data: chartData,
      }]));
    }, [salesData]);
  
    return (
      <div className="w-full">
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart options={options} series={series} type="area" width={"100%"} height={"300px"} />
            </div>
          </div>
        </div>
      </div> 
    );
  }
  
  
  export default SalesCharts;
