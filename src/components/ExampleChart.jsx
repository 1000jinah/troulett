import React, { useEffect, useMemo, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ExampleCompChart = ({
  items,
  probabilities,
  streamerName,
  rouletteTitle,
}) => {
  const [chart, setChart] = useState(null);

  const chartRef = useRef(null);
  const chartData = useMemo(() => {
    if (items.length !== probabilities.length) {
      return null;
    }

    const totalProbability = probabilities.reduce((acc, curr) => acc + curr, 0);
    if (totalProbability !== 100) {
      return null;
    }

    const data = items.map((item, index) => ({
      name: item,
      y: probabilities[index],
    }));

    return data;
  }, [items, probabilities]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "",
        },
        colors: [
          "rgba(255, 0, 0, 0.5)", // 빨강
          "rgba(255, 165, 0, 0.5)", // 주황
          "rgba(255, 255, 0, 0.5)", // 노랑
          "rgba(0, 128, 0, 0.5)", // 초록
          "rgba(0, 0, 255, 0.5)", // 파랑
          "rgba(128, 0, 128, 0.5)", // 보라
        ],
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
            },
            innerSize: "85%",
            borderRadius: 0,
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
              '<span style="display:block; position:absolute; top:7px; width:12px; height:12px; border-radius:50%; background-color:' +
              this.point.color +
              '">' +
              "</span>" +
              '<span style=" margin-left:20px;font-size:18px;">' +
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
          navigation: {
            activeColor: "#3E576F",
            animation: true,
            arrowSize: 12,

            inactiveColor: "#CCC",
            style: {
              fontWeight: "bold",
              color: "#333",
            },
          },
          labelFormat: "{name}: {y}%",
          itemStyle: {
            fontSize: "12px",
          },
        },
        credits: {
          enabled: false,
        },
        navigation: {
          menuItemStyle: {
            fontSize: "12px",
          },
          menuItemHoverStyle: {
            background: "red",
            color: "white",
            fontSize: "12px",
          },
        },
      };

      const newChart = Highcharts.chart(chartRef.current, options);
      setChart(newChart);
    }
  }, [chartData]);

  if (!chartData) {
    return <div>Error: Invalid data</div>;
  }

  return <div ref={chartRef}></div>;
};

export default ExampleCompChart;

