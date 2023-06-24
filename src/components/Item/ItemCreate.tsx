import { defineComponent, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    const selected = ref("支出");
    // const onUpdateSelected = (name: string) => (selected.value = name);

    return () => (
      <MainLayout>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon}></Icon>,
          default: () => (
            <>
              <Tabs
                selected={selected.value}
                // onUpdateSelected={(name) => (selected.value = name)}
                v-model:selected={selected.value}
              >
                <Tab name="支出">icon 列表1</Tab>
                <Tab name="收入">icon 列表2</Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
