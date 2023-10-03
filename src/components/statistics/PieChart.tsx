import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from './PieChart.module.scss';
import * as echarts from 'echarts';
import { getMoney } from "../../shared/Money";

// formatter 参数类型
type Item = {
  name: string, value: number, percent: string
}


const defaultOption = {
  tooltip: {
    trigger: 'item',
    formatter: (item: Item) => {
      const { name, value, percent } = item
      return ` 
        <b>${name}</b>: (${percent}%) <br/>
        ￥${getMoney(value)}
      `
    },
    textStyle: {
      fontSize: 14, // 控制 tooltip 文字的字体大小
    }
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  grid: [
    { left: 0, top: 0, right: 0, bottom: 0 }
  ],
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        label: {
          show: true,
          fontSize: 16, // 设置强调状态下的标签字体大小
          fontWeight: 'bold',
        }
      }
    }
  ]
}
export const PieChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ name: string, value: number }[]>,
      required: true
    },
  },
  setup: (props, content) => {
    const refDiv = ref<HTMLDivElement>()
    let chart: echarts.ECharts | undefined = undefined
    onMounted(() => {
      if (refDiv.value === undefined) return
      chart = echarts.init(refDiv.value);
      // 绘制图表
      chart.setOption(defaultOption);
    })

    watch(() => props.data, () => {
      chart?.setOption({ series: [{ data: props.data }] });

    })
    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    );
  },
});