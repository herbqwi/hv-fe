import './day-sales-chart.css';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DaySalesChart = ({ data, daily }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const chartCtx = chartRef.current.getContext('2d');

      const today = new Date();
      const days = daily? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
      const labels = [];
      for (let i = 3; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        labels.push(days[day.getDay()]);
      }

      const values = [];
      for (let i = 0; i < labels.length; i++) {
        const dayData = data.filter((d) => d.day === labels[i]);
        if (dayData.length > 0) {
          values.push(dayData[0].count);
        } else {
          values.push(0);
        }
      }

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Number of Pizzas Sold',
              data: values,
              backgroundColor: 'rgba(255, 193, 99, 0.2)',
              borderColor: 'rgba(255, 193, 99, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value, index, values) {
                    return '$' + value;
                  },
                },
              },
            ],
          },
          plugins: {
            legend: {
              display: false, // hide legend
            },
          },
        },
      });
    }, 0);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DaySalesChart;