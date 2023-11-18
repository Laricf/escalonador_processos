import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Tooltip, Title } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip, Title);

const HorizontalBarChart: React.FC = () => {
  const data = {
    labels: ['Processo 1', 'Processo 2', 'Processo 3', 'Processo 4', 'Processo 5', 'Processo 6'],
    datasets: [
      {
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(168, 57, 233, 0.4)4)',
        borderColor: '#6a4bc0',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        type: 'linear',
        beginAtZero: true,
      },
    },
    animation: {
      duration: 6000, // Define a duração da animação em milissegundos
      easing: 'easeOutQuart', // Define o tipo de animação 
    },
    barThickness: 50, // Defina a largura das barras (valor em pixels)
  };

  return (
    <div>
      <h2>Gráfico de Processos (Horizontal)</h2>
      <Bar data={data} options={options as any} /> 
    </div>
  );
};

export default HorizontalBarChart;






