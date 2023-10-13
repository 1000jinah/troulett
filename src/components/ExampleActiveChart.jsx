import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import HighchartsReact from "highcharts-react-official";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const ActivityChart = ({
  cancelSpin,
  checkSpin,
  moneySpin,
  rouletteTitle,
  checkStack,
  moneyStack,
  checkItemName,
}) => {
  useEffect(() => {
    // function renderIcons() {
    //   if (!this.series[0].icon) {
    //     this.series[0].icon = this.renderer
    //       .path(["M", -8, 0, "L", 8, 0, "M", 0, -8, "L", 8, 0, 0, 8])
    //       .attr({
    //         stroke: "#303030",
    //         "stroke-linecap": "round",
    //         "stroke-linejoin": "round",
    //         "stroke-width": 2,
    //         zIndex: 10,
    //       })
    //       .add(this.series[2].group);
    //   }
    //   this.series[0].icon.translate(
    //     this.chartWidth / 2 - 10,
    //     this.plotHeight / 2 -
    //       this.series[0].points[0].shapeArgs.innerR -
    //       (this.series[0].points[0].shapeArgs.r -
    //         this.series[0].points[0].shapeArgs.innerR) /
    //         2
    //   );

    //   if (!this.series[1].icon) {
    //     this.series[1].icon = this.renderer
    //       .path([
    //         "M",
    //         -8,
    //         0,
    //         "L",
    //         8,
    //         0,
    //         "M",
    //         0,
    //         -8,
    //         "L",
    //         8,
    //         0,
    //         0,
    //         8,
    //         "M",
    //         8,
    //         -8,
    //         "L",
    //         16,
    //         0,
    //         8,
    //         8,
    //       ])
    //       .attr({
    //         stroke: "#ffffff",
    //         "stroke-linecap": "round",
    //         "stroke-linejoin": "round",
    //         "stroke-width": 2,
    //         zIndex: 10,
    //       })
    //       .add(this.series[2].group);
    //   }
    //   this.series[1].icon.translate(
    //     this.chartWidth / 2 - 10,
    //     this.plotHeight / 2 -
    //       this.series[1].points[0].shapeArgs.innerR -
    //       (this.series[1].points[0].shapeArgs.r -
    //         this.series[1].points[0].shapeArgs.innerR) /
    //         2
    //   );

    //   if (!this.series[2].icon) {
    //     this.series[2].icon = this.renderer
    //       .path(["M", 0, 8, "L", 0, -8, "M", -8, 0, "L", 0, -8, 8, 0])
    //       .attr({
    //         stroke: "#303030",
    //         "stroke-linecap": "round",
    //         "stroke-linejoin": "round",
    //         "stroke-width": 2,
    //         zIndex: 10,
    //       })
    //       .add(this.series[2].group);
    //   }

    //   this.series[2].icon.translate(
    //     this.chartWidth / 2 - 10,
    //     this.plotHeight / 2 -
    //       this.series[2].points[0].shapeArgs.innerR -
    //       (this.series[2].points[0].shapeArgs.r -
    //         this.series[2].points[0].shapeArgs.innerR) /
    //         2
    //   );
    // }
    Highcharts.chart("activity-container", {
      chart: {
        type: "solidgauge",
        height: "90%",
        events: {
          // render: renderIcons,
        },
      },
      title: {
        text: rouletteTitle,
        style: {
          fontSize: 20,
        },
      },
      tooltip: {
        borderWidth: 0,
        backgroundColor: "none",
        shadow: false,
        style: {
          fontSize: 14,
        },
        valueSuffix: "회",
        pointFormat:
          '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner: function (labelWidth) {
          return {
            x: (this.chartWidth - labelWidth) / 2,
            y: this.chart.plotHeight / 2 + 15,
          };
        },
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [
          {
            outerRadius: "112%",
            innerRadius: "88%",
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
              .setOpacity(0.3)
              .get(),
            borderWidth: 0,
          },
          {
            outerRadius: "87%",
            innerRadius: "63%",
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
              .setOpacity(0.3)
              .get(),
            borderWidth: 0,
          },
          {
            outerRadius: "62%",
            innerRadius: "38%",
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
              .setOpacity(0.3)
              .get(),
            borderWidth: 0,
          },
        ],
      },
      yAxis: {
        min: 0,
        max: 500,
        lineWidth: 0,
        tickPositions: [],
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false,
          },
          linecap: "round",
          stickyTracking: false,
          rounded: true,
        },
      },
      series: [
        {
          name: "당첨실패",

          data: [
            {
              color: Highcharts.getOptions().colors[0],
              radius: "112%",
              innerRadius: "88%",
              y: cancelSpin,

            },
          ],
          dataLabels: {
            format:
              "<div style='text-align:center'><span style='font-size:16px;color:black;'>꽝</span></div>",
          },
        },
        {
          name: `${checkItemName} (${checkStack}%)`,
          data: [
            {
              color: Highcharts.getOptions().colors[1],
              radius: "87%",
              innerRadius: "63%",
              y: checkSpin,
            },
          ],
        },
        {
          name: `누적 (${moneyStack}원)`,
          data: [
            {
              color: Highcharts.getOptions().colors[2],
              radius: "62%",
              innerRadius: "38%",
              y: moneySpin,
            },
          ],
        },
      ],
    });
  }, [cancelSpin, checkSpin, moneySpin]);

  return <div id="activity-container" />;
};

export default ActivityChart;
