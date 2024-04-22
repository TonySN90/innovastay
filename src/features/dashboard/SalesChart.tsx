import { useState } from "react";
import Chart from "react-apexcharts";

const SalesCharts = () => {
    const [options, setOptions] = useState({
      chart: {
        id: 'basic-bar',
        toolbar: { show: false },
        grid: {
          row: {
            colors: ['#f3f4f6'], // takes an array which will be repeated on columns
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
                return `${value} April`
              },
        }
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
        tickAmount: 5
      },
      colors: ['#6366f1'],
    });
  
    const [series, setSeries] = useState([{
      name: 'series-1',
      data: [800, 4000, 8000, 10000, 6000, 4000]
    }]);
  
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart options={options} series={series} type="area" width={"100%"} height={"300px"} />
          </div>
        </div>
      </div>
    );
  }
  
  
  export default SalesCharts;
