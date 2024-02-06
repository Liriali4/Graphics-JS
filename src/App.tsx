import { useEffect, useRef } from 'react';
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Chart from 'chart.js/auto';

export function App(): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"bar", number[], string> | undefined>();
  const chartDonutRef = useRef<HTMLCanvasElement>(null);
  const chartDonutInstance = useRef<Chart<"doughnut", number[], string> | undefined>();

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx as CanvasRenderingContext2D, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
          label: 'Exemplo de Gráfico de Barras',
          data: [10, 20, 15],
          backgroundColor: ['red', 'blue', 'green'],

        }],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 0,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const ctx = chartDonutRef.current?.getContext('2d');

    if (chartDonutInstance.current) {
      chartDonutInstance.current.destroy();
    }

    chartDonutInstance.current = new Chart(ctx as CanvasRenderingContext2D, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        }],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    return () => {
      if (chartDonutInstance.current) {
        chartDonutInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Box w={'100%'} h={'vh'}>
      <Box
        w={'100%'}
        textAlign={'center'}
        p={'10px'}
      >
        <Heading
          as={'h1'}
          fontWeight={'bold'}>
          Gráficos no Java Script</Heading>
      </Box>
      <Flex
        flexDir={'row'}
        justify={'space-around'}
      >
        <Box
          bg={'white'}
          w={'650px'}
          h={'400px'}
          boxShadow={'4px 2px 6px 4px rgba(0, 0, 0, 0.5)'}
          p={'6'}
          m={'6'}
        >
          {/*<Text textAlign={'center'} fontSize={'12px'} color={'#807c7c'}>Exemplo de Gráfico de Barras</Text>*/}
          <canvas ref={chartRef} />
        </Box>
        <Box
          bg={'white'}
          w={'650px'}
          h={'400px'}
          boxShadow={'4px 2px 6px 4px rgba(0, 0, 0, 0.5)'}
          p={'6'}
          m={'6'}
        >
          {/*<Text textAlign={'center'} fontSize={'12px'} color={'#807c7c'}>Exemplo de Gráfico de Doughnut</Text>*/}
          <canvas ref={chartDonutRef} />
        </Box>
      </Flex>
    </Box>
  );
}
