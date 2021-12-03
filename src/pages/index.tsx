import styles from './index.less';
import MapChart from "./map-chart";
import { useEffect,useState } from "react";
export default function IndexPage() {

const moveLines  = [
  {
    toName: '西安',
    fromName: '宁波市',
    coords: [
      [121.550357, 29.874556],
      [108.969, 34.285],
    ],
  },
  {
    toName: '西安市',
    fromName: '总部',
    coords: [
      [116.408, 39.904],
      [108.940174, 34.341568],
    ],
  },
  {
    toName: '西安',
    fromName: '渭南市',
    coords: [
      [109.509786, 34.499995],
      [108.969, 34.285],
    ],
  },
  {
    toName: '台州市',
    fromName: '西安',
    coords: [
      [108.969, 34.285],
      [121.420757, 28.656386],
    ],
  },
  {
    toName: '白城市',
    fromName: '吉林',
    coords: [
      [125.324, 43.871],
      [122.839024, 45.619641],
    ],
  },
  {
    toName: '聊城市',
    fromName: '沈阳',
    coords: [
      [123.418, 41.799],
      [115.985371, 36.456703],
    ],
  },
  {
    toName: '西安',
    fromName: '宁波市江北区',
    coords: [
      [121.555227, 29.886757],
      [108.969, 34.285],
    ],
  },
  {
    toName: '大庆',
    fromName: '玉溪市',
    coords: [
      [102.546543, 24.352036],
      [125.016, 46.593],
    ],
  },
  {
    toName: '贵阳市',
    fromName: '大庆',
    coords: [
      [125.016, 46.593],
      [106.630153, 26.647661],
    ],
  },
]

  const [lines,setlines] = useState(moveLines)


  useEffect(()=>{
    const t = setInterval(()=>{
       setlines(moveLines.slice(0,100))
    },2000)
  },[])


  return ( <div style={{width:'1000px',height:'1000px'}}>
    <MapChart
            allData={{
              citys: [
                {
                  name: '总部',
                  value: [116.408, 39.904, -19],
                  symbolSize: 14,
                  itemStyle: { normal: { color: '#58B3CC' } },
                },
                {
                  name: '大庆',
                  value: [125.016, 46.593, -19],
                  symbolSize: 4,
                  itemStyle: { normal: { color: '#58B3CC' } },
                },
                {
                  name: '沈阳',
                  value: [123.418, 41.799, -19],
                  symbolSize: 2,
                  itemStyle: { normal: { color: '#58B3CC' } },
                },
                {
                  name: '吉林',
                  value: [125.324, 43.871, -19],
                  symbolSize: 2,
                  itemStyle: { normal: { color: '#58B3CC' } },
                },
                {
                  name: '西安',
                  value: [108.969, 34.285, -19],
                  symbolSize: 4,
                  itemStyle: { normal: { color: '#58B3CC' } },
                },
              ],
              moveLines: lines,
            }}
          />
  </div>
  );
}
