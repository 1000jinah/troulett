import React, { useEffect, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ExampleCompChart = ({ items, probabilities, streamerName, rouletteTitle }) => {  // Calculate chart data based on items and probabilities
    const chartRef = useRef(null);
     const chartData = useMemo(() => {
    if (items.length !== probabilities.length) {
      return null; // Ensure both arrays have the same length
    }

    const totalProbability = probabilities.reduce((acc, curr) => acc + curr, 0);
    if (totalProbability !== 100) {
      return null; // Ensure total probability is 100
    }

    const data = items.map((item, index) => ({
      name: item,
      y: probabilities[index],
    }));

    return data;
  }, [items, probabilities]);

  useEffect(() => {
    // Customize the chart options if needed
    Highcharts.setOptions({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "",
      },
      // Add any other chart options here
    });
    if (chartData && chartRef.current) {
        const chart = chartRef.current.chart;
  
        chart.legend.group.onwheel = function (e) {
          e.preventDefault();
  
          if (e.deltaY > 0) {
            chart.legend.scroll(-20);
          } else {
            chart.legend.scroll(20);
          }
        };
      }
  }, []);

  if (!chartData) {
    return <div>Error: Invalid data</div>;
  }
  const options = {
    series: [
      {
        name: "룰렛 상품",
        colorByPoint: true,
        data: chartData,
      },
    ],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        showInLegend: true,
        dataLabels: {
          enabled: false,
          // format: "{point.name}: {point.y} %",
        },
        innerSize: "85%",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      borderColor: "#000",
      backgroundColor: "#fff",
      xDateFormat: "%b %e, %Y",
      useHTML: true,
      formatter: function () {
        return (
        
          '<span style="font-size:18px; color:' +
          this.point.color +
          '">' +
          this.point.name +
          "</span>" +
          '<span style="border:0px; height:20px;"><span style="font-size:18px; font-weight:bold; padding-left:100px;">' +
          this.y +
          "%</span>"
        );
      },
      valueDecimals: 2,
    },

    legend: {
        align: "left",
        verticalAlign: "middle",
        layout: "vertical",
        itemMarginTop: 7,
        itemMarginBottom: 7,
        labelFormat: "{name}: {y}%",
        itemStyle: {
          fontSize: "12px",
        },
        maxHeight: 200, // Set a maximum height for the legend
        scrolling: 'vertical', // Enable vertical scrolling
      },
    credits: {
      enabled: false, // Disable Highcharts credits
    },
  };

  return  <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
};

export default ExampleCompChart;
