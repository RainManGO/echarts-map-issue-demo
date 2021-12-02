/*
 * @Author: yar
 * @Date: 2021-12-01 09:17:03
 * @LastEditTime: 2021-12-02 15:38:57
 * @LastEditors: ZY
 * @Description:
 * @FilePath: /echarts-map/src/pages/map-chart/index.tsx
 */

import React, { useMemo, Fragment } from "react";
import ReactEcharts from "echarts-for-react";
import type { EChartOption } from "echarts";
import "echarts/map/js/china.js";

const MapChart: React.FC<{
  /**
   * @description X轴数据
   */
  allData: {};
}> = (props) => {
  const { allData } = props;

  // const geoCoordMap =
  // [
  //     {
  //         name:'总部',
  //         cord: [116.408, 39.904]
  //     },{
  //         name: '大庆',
  //         cord: [125.016, 46.593],
  //     },
  //     {
  //         name: '沈阳',
  //         cord: [123.418, 41.799],
  //     },{
  //         name: '吉林',
  //         cord: [125.324, 43.871],
  //     },{
  //         name: '西安',
  //         cord: [108.969, 34.285],
  //     }
  // ];
  const geoCoordMap = ["总部", "大庆", "沈阳", "吉林", "西安", "西安市"];
  const moveLinesSR: any[] = [];
  const moveLinesZC: any[] = [];
  const itemObj = {};
  if (allData && allData.moveLines) {
    const { moveLines } = allData;
    console.log("moveLines", moveLines);
    for (let i = 0; i < moveLines.length; i++) {
      const dataItem = moveLines[i];
      if (geoCoordMap.indexOf(dataItem.fromName) > -1) {
        moveLinesZC.push(dataItem);
      } else {
        moveLinesSR.push(dataItem);
      }
    }
  }
  // console.log("moveLinesZC", moveLinesZC);
  // console.log("moveLinesSR", moveLinesSR);

  const MemoMap = useMemo(() => {
    if (!allData.moveLines) {
      return;
    }
    const option: EChartOption = {
      title: {
        text: "",
        subtext: "",
        left: "left",
        textStyle: {
          color: "#fff",
        },
      },
      legend: {
        show: false,
        orient: "vertical",
        top: "bottom",
        left: "right",
        data: ["地点", "线路"],
        textStyle: {
          color: "#fff",
        },
      },
      geo: {
        map: "china",
        zLevel: 1,
        label: {
          emphasis: {
            show: false,
          },
        },
        zoom: 1.1,
        roam: false, // 是否允许缩放
        itemStyle: {
          normal: {
            color: "#203247", // 地图背景色 //rgba(51, 69, 89, .5)
            borderColor: "#516a89", // 省市边界线00fcff 516a89
            borderWidth: 1,
          },
          emphasis: {
            color: "#327c9c", // 悬浮背景 //rgba(37, 43, 61, .5)
          },
        },
      },
      series: [
        {
          name: "地点",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 5,
          symbolSize: 2,
          rippleEffect: {
            // 涟漪特效
            brushType: "stroke", // 波纹绘制方式 stroke，fill
            period: 4, // 动画时间，值越小速度越快
            scale: 4, // 波纹圆环最大显示，值越大波纹越大
            color: "#FFBD3B",
          },
          label: {
            show: true,
            formatter: function (param: any) {
              return param.data.name;
            },
            color: "#FFBD3B", //46bee9
            fontSize: 3,
            position: "right",
            distance: 3,
            emphasis: {
              show: true,
              position: "left",
              formatter: "{b}",
            },
          },
          symbolSize: 2,
          showEffectOn: "render",
          itemStyle: {
            color: "#ffbb3b", //46bee9
          },
          data: allData.citys,
        },
        {
          name: "线路",
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 3,
          large: true,
          effect: {
            show: true,
            period: 1, //箭头指向速度，值越小速度越快
            constantSpeed: 5,
            symbol: "diamond", // 箭头图标，pin 圆点
            symbolSize: 1, // 图标大小
            trailLength: 0.8, // 特效尾迹长度[0,1]值越大，尾迹越长重
            color: "rgba(26,217,255,0.8)",
          },
          lineStyle: {
            normal: {
              color: "rgba(178, 242, 255, 0.5)",
              width: 1, // 尾迹线条宽度
              opacity: 0.05, // 尾迹线条透明度
              curveness: 0.2, // 尾迹线条曲直度
            },
          },
          data: moveLinesSR,
        },
        {
          name: "线路",
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 3,
          large: true,
          effect: {
            show: true,
            period: 1, //箭头指向速度，值越小速度越快
            constantSpeed: 5,
            symbol: "diamond", // 箭头图标，pin 圆点
            symbolSize: 1, // 图标大小
            trailLength: 0.7, // 特效尾迹长度[0,1]值越大，尾迹越长重
            color: "rgba(211, 89, 24, 0.7)",
          },
          lineStyle: {
            normal: {
              color: "rgba(255, 187, 50, 0.5)",
              width: 1, // 尾迹线条宽度
              opacity: 0.05, // 尾迹线条透明度
              curveness: 0.2, // 尾迹线条曲直度
            },
          },
          data: moveLinesZC,
        },
      ],
    };

    return (
      <ReactEcharts
        option={option}
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      />
    );
  }, [allData]);

  return <Fragment>{MemoMap}</Fragment>;
};
export default MapChart;
