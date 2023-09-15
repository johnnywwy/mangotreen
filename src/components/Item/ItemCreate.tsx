import { defineComponent, onMounted, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { useRouter } from "vue-router";
import { http } from "../../shared/Http";
import { Resources, Tag } from "../../type/tags";
import { Button } from "../../shared/Button";
import { useTags } from "../../shared/useTags";
import { Tags } from "./Tags";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    const router = useRouter();
    const refKind = ref("支出");

    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => (
            <Icon
              name="left"
              class={s.navIcon}
              onClick={() => {
                router.back();
              }}
            ></Icon>
          ),
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs
                  v-model:selected={refKind.value}
                  // selected={refKind.value}
                  // onUpdate:selected={() => console.log(2111)}
                  class={s.tabs}
                >
                  <Tab name="支出">
                    <Tags kind="expenses" />
                  </Tab>
                  <Tab name="收入">
                    <Tags kind="income" />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
