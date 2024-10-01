import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    PointElement,
    BarController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
// Register components
ChartJS.register(
    BarElement,
    PointElement,
    BarController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const createChart = (list, month) => {

    const labels = [];
    const datasets = [];

    if (!list) {
        return {
            labels: labels, // x-axis labels (could be different)
            datasets: [
                {
                    label: 'Numbers',
                    data: datasets, // y-axis data points
                    backgroundColor: 'rgba(51,65,85)',
                    borderColor: 'rgba(51,65,85)',
                    borderWidth: 1,
                },
            ],
        }
    }

    const now = new Date();
    const date = new Date(Date.UTC(now.getFullYear(), month, 1, 1, 0, 0));
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    let max = 0

    while (date.getMonth() !== nextMonth.getMonth()) {
        const iso = date.getDate();
        labels.push(iso);

        const users = list.filter((item) => { return item.dayUTC === iso });

        datasets.push(users.length);
        
        if (users.length > max) max = users.length;

        date.setDate(date.getDate() + 1);
    }

    return {
        graph: {
            labels: labels, // x-axis labels (could be different)
            datasets: [
                {
                    label: 'Users',
                    data: datasets, // y-axis data points
                    borderColor: 'rgba(51,65,85)',
                    backgroundColor: 'rgba(51,65,85)',
                },
            ],
        },
        maximum: max
    }
}

const options = {
    layout: {
      padding: {
        left: 10,
        right: 10 // Adjust this value to leave more space at the top
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            return Number.isInteger(value) ? value+1 : null; // Show only integers
          },
        },
      },
      y: {
        min: 0, 
        ticks: {
          callback: function(value) {
            return Number.isInteger(value) ? value : null; // Show only integers
          },
        },
      },
    },
};

function Graph({ data, month }) {

    const { graph, maximum } = createChart(data, month);
    options.scales.y.max = parseInt(maximum/5)*5+5;

    if (graph) {
        return <Bar data={graph} options={options}/>;
    } else {
        return <></>
    }
}

export default Graph;