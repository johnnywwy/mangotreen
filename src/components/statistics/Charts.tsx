import { computed, defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { FormItem } from "../../shared/Form";
import s from './Charts.module.scss'
import * as echarts from 'echarts';
export const Charts = defineComponent({
  props: {
    startData: {
      type: String as PropType<string>,
      required: true,
    },
    endData: {
      type: String as PropType<string>,
      required: true,
    }
  },
  setup: (props, context) => {
    const refCategory = ref('expenses')
    const refDiv = ref<HTMLDivElement>()
    const refDiv2 = ref<HTMLDivElement>()

    const data3 = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 3000 },
    ])

    const betterData3 = computed(() => {
      const total = data3.reduce((sum, item) => sum + item.amount, 0)
      return data3.map((item) => ({
        ...item,
        percent: Math.round(item.amount / total * 100) + "%"
      }))
    })
    onMounted(() => {
      if (refDiv.value === undefined) return
      var myChart = echarts.init(refDiv.value);
      // 绘制图表
      const option = {
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };
      myChart.setOption(option);
    })
    onMounted(() => {
      if (refDiv2.value === undefined) return
      var myChart = echarts.init(refDiv2.value);
      // 绘制图表
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    })

    return () => <>
      <div class={s.wrapper}>
        <FormItem label="类型" type="select" options={[
          { value: 'expenses', text: "支出" },
          { value: 'income', text: "收入" },
        ]} v-model={refCategory.value}></FormItem>

        <div ref={refDiv} class={s.demo}></div>
        <div ref={refDiv2} class={s.demo2}></div>
        <div class={s.demo3}>
          {betterData3.value.map(({ tag, amount, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {tag.sign}
                </div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span> {tag.name} - {percent} </span>
                    <span> ￥{amount} </span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.bar_inner}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </>
  },
});