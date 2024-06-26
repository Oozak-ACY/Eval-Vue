<template>
    <div>
      <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
  import { computed, defineComponent } from 'vue';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
  
  export default defineComponent({
    name: 'DonutChart',
    components: {
      Doughnut
    },
    props: {
      totalTTC: {
        type: Number,
        required: true
      },
      totalPaid: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const chartData = computed(() => {
        return {
          labels: ['Montant total facturé', 'Montant total payé'],
          datasets: [
            {
              label: 'Montants',
              backgroundColor: ['#FF6384', '#36A2EB'],
              data: [props.totalTTC, props.totalPaid]
            }
          ]
        };
      });
  
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      };
  
      return {
        chartData,
        chartOptions
      };
    }
  });
  </script>
  
  <style scoped>
  div {
    max-width: 500px;
    margin: 0 auto;
  }
  </style>
  