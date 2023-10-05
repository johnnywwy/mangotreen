import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import s from './BarChart.module.scss';
import * as echarts from 'echarts';
import { Time } from '../../shared/time';
import { getMoney } from "../../shared/Money";


const echartsOption = {
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: ([item]: any) => {
      const [x, y] = item.data
      return `${new Time(new Date(x)).format('YYYY年MM月DD日')} ￥${getMoney(y)}`
    },
  },
  grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
  xAxis: {
    type: 'time',
    boundaryGap: ['3%', '0%'],
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).format('MM-DD'),
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
}

export const BarChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
      required: true
    },
  },
  setup: (props, content) => {
    const refDiv = ref<HTMLDivElement>()
    let refChart: echarts.ECharts | undefined = undefined
    onMounted(() => {
      if (refDiv.value === undefined) return
      refChart = echarts.init(refDiv.value);
      // 绘制图表
      refChart.setOption({
        ...echartsOption,
        series: [{
          data: props.data,
          type: 'bar', // 图表类型为柱状图
          color: '#f9973c'// 设置柱状图颜色为
        }]
      });
    })

    watch(() => props.data, () => {
      refChart?.setOption({
        ...echartsOption,
        series: [{
          data: props.data,
        }]
      });
    })
    return () => (
      <div ref={refDiv} class={s.wrapper}></div>
    );
  },
});