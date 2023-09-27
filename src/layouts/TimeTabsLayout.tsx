import { Overlay } from "vant";
import { defineComponent, PropType, reactive, ref, Transition, watchEffect } from "vue";
import { Form, FormItem } from "../shared/Form";
import { Icon } from "../shared/Icon";
import { OverLay } from "../shared/OverLay";
import { Tab, Tabs } from "../shared/Tabs";
import { Time } from "../shared/time";
import { MainLayout } from "./MainLayout";
import s from "./TimeTabsLayout.module.scss"

const demo = defineComponent({
  props: {
    startData: {
      type: String as PropType<string>,
      required: false,
    },
    endData: {
      type: String as PropType<string>,
      required: false,
    }
  }
})

export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    },
    title: {
      type: String as PropType<string>
    },
    icon: {
      type: String as PropType<string>
    },
    rerenderOnChange: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, content) => {

    // 默认选中本月
    const refSelected = ref("本月")

    // 获取当前时间
    const time = new Time()

    // 临时时间
    const tempTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })

    // 自定义时间
    const customTime = reactive<{
      start?: string
      end?: string
    }>({})

    // 自定义时间弹出层
    const refOverlayVisible = ref(false)

    // 标签弹出层
    const overLayVisible = ref(false);

    // 本月、上月、今年
    const timeList = [
      {
        start: time.firstDayOfMonth().format(),
        end: time.lastDayOfMonth().format()
      },
      {
        start: time.add(-1, 'month').firstDayOfMonth().format(),
        end: time.add(-1, 'month').lastDayOfMonth().format()
      },
      {
        start: time.firstDayOfYear().format(),
        end: time.lastDayOfYear().format()
      }
    ]

    // 点击确认按钮
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
      console.log('tempTime', tempTime);
      console.log('customTime', customTime);

      Object.assign(customTime, tempTime)
    }

    // 监听自定义时间
    watchEffect(() => {
      if (refSelected.value === '自定义时间') {
        refOverlayVisible.value = true
      }
    })

    // 
    const onSelect = (value: string) => {
      if (value === '自定义时间') {
        refOverlayVisible.value = true
      }
    }

    const onClickMenu = () => {
      overLayVisible.value = !overLayVisible.value;
    };
    return () => (
      <MainLayout>

        {{
          title: () => props.title || "蛋黄记账",
          icon: () => (
            <Icon
              name="menu"
              class={s.navIcon}
              onClick={onClickMenu}
            />
          ),
          default: () => (
            <>
              <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}
                onUpdate:selected={onSelect} rerender={props.rerenderOnChange}
              >
                <Tab name="本月">
                  <props.component
                    startData={timeList[0].start}
                    endData={timeList[0].end}
                  />
                </Tab>
                <Tab name="上月">
                  <props.component
                    startData={timeList[1].start}
                    endData={timeList[1].end}
                  />
                </Tab>
                <Tab name="今年">
                  <props.component
                    startData={timeList[2].start}
                    endData={timeList[2].end}
                  />
                </Tab>
                <Tab name="自定义时间">
                  <props.component
                    startData={customTime.start}
                    endData={customTime.end}
                  />
                </Tab>
              </Tabs>
              <Overlay show={refOverlayVisible.value} class={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>
                    请选择时间
                  </header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem label="开始时间" v-model={tempTime.start} type='date'></FormItem>
                      <FormItem label="结束时间" v-model={tempTime.end} type='date'></FormItem>
                      <FormItem class={s.actions}>
                        <div>
                          <button type="button" onClick={() => refOverlayVisible.value = false}>取消</button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
              {overLayVisible.value && (
                <Transition
                  enterActiveClass={s.fade_enter_active}
                  leaveActiveClass={s.fade_leave_active}
                  enterFromClass={s.fade_enter_from}
                  leaveToClass={s.fade_leave_to}
                >
                  <OverLay
                    class={s.one}
                    onClose={() => (overLayVisible.value = false)}
                  />
                </Transition>
              )}
            </>
          )
        }}
      </MainLayout>
    );
  },
});