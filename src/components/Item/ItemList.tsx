import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import s from './ItemList.module.scss';
import { ItemSummary } from "./ItemSummary";

export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },

  setup: (props, content) => {
    const refSelected = ref("本月")
    const t = new Time(new Date(2000, 0, 31, 0, 0, 0))
    console.log(t.add(1, "month").getRaw());
    
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
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value} >
              <Tab name="本月">
                <ItemSummary startData="2023-8-23" endData="2023-12-31"/>
              </Tab>
              <Tab name="上月">
                <ItemSummary startData="2023-8-23" endData="2023-12-31"/>
              </Tab>
              <Tab name="今年">
                <ItemSummary startData="2023-8-23" endData="2023-12-31"/>
              </Tab>
              <Tab name="自定义时间">
                <ItemSummary startData="2023-8-23" endData="2023-12-31"/>
              </Tab>
            </Tabs>
          )
        }}
      </MainLayout>
    );
  },
});