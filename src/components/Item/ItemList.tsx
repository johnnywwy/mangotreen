import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import s from './ItemList.module.scss';

export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },

  setup: (props, content) => {
    const refSelected = ref("本月")
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
              <Tab name="本月">本月</Tab>
              <Tab name="上月">上月</Tab>
              <Tab name="今年">今年</Tab>
              <Tab name="自定义时间">自定义时间</Tab>
            </Tabs>
          )
        }}
      </MainLayout>
    );
  },
});