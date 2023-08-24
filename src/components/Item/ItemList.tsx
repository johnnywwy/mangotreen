import { Overlay } from "vant";
import { defineComponent, PropType, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import s from './ItemList.module.scss';
import { ItemSummary } from "./ItemSummary";

export const ItemList = defineComponent({
  setup: (props, content) => {

    // 弹出层
    const refOverlayVisible = ref(false)

    // 默认选中本月
    const refSelected = ref("本月")
    
    // 获取当前时间
    const time = new Time()

    // 自定义时间
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })

    // 本月、上月、今年
    const timeList = [
      {
        start: time.firstDayOfMonth().format(),
        end: time.lastDayOfMonth().format()
      },
      {
        start: time.add(-1,'month').firstDayOfMonth().format(),
        end: time.add(-1,'month').lastDayOfMonth().format()
      },
      {
        start: time.firstDayOfYear().format(),
        end: time.lastDayOfYear().format()
      }
    ]
    return () => (
      <MainLayout>
        {{
          title: () => "蛋黄记账",
          icon: () => (
            <Icon
              name="menu"
              class={s.navIcon}
            />
          ),
          default: () => (
            <>
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value} >
              <Tab name="本月">
                <ItemSummary 
                  startData={timeList[0].start} 
                  endData={timeList[0].end}
                />
              </Tab>
              <Tab name="上月">
                <ItemSummary 
                  startData={timeList[1].start} 
                  endData={timeList[1].end}
                />
              </Tab>
              <Tab name="今年">
                <ItemSummary 
                  startData={timeList[2].start} 
                  endData={timeList[2].end}
                />
              </Tab>
              <Tab name="自定义时间">
                <ItemSummary 
                  startData={customTime.start} 
                  endData={customTime.start}
                />
              </Tab>
            </Tabs>
            <Overlay show={refOverlayVisible.value}>
              <div class={s.overlay_inner}>
                <header>
                  请选择时间
                </header>
                <main>
                  <div>开始时间</div>
                  <div>结束时间</div>
                </main>
              </div>
            </Overlay>
            </>
          )
        }}
      </MainLayout>
    );
  },
});