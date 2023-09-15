import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { useRouter } from "vue-router";
import { http } from "../../shared/Http";
import { Item, Resource } from "../../type/tags";
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

    const formData = reactive({
      kind: '支出',
      tag_id: [],
      happenAt: new Date().toISOString(),
      amount: 0,

    })

    const onSubmit = async () => {
      console.log('提交', formData);
      const response = await http.post<Resource<Item>>('/tags', formData)

    }
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
                    <Tags kind="expenses" v-model:selected={formData.tag_id} />
                  </Tab>
                  <Tab name="收入">
                    <Tags kind="income" v-model:selected={formData.tag_id} />
                  </Tab>
                </Tabs>
                <div>{JSON.stringify(formData)}</div>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happenAt}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
