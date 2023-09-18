import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { useRouter } from "vue-router";
import { Item, ResourceError } from "../../type/tags";
import { Tags } from "./Tags";
import { createItem } from "../../api/account";
import { showToast } from "vant";
import { AxiosError } from "axios";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    const router = useRouter();
    const refKind = ref("支出");

    const formData = reactive<Item>({
      kind: 'expenses',
      tag_ids: 0,
      happen_at: new Date().toISOString(),
      amount: 0,
    })

    const onError = (err: AxiosError<ResourceError>) => {
      if (err.response?.status === 422) {
        showToast({
          message: Object.values(err.response.data.errors).join('\n'),
          icon: 'cross', duration: 800,
        });
      }
    }

    const onSubmit = async () => {
      console.log('提交', formData);
      // getTagsList
      const response = await createItem(formData).catch(onError)
      showToast({ message: '创建成功', icon: 'success', duration: 800 });
      router.push('/item')

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
                    <Tags kind="expenses" v-model:selected={formData.tag_ids} />
                  </Tab>
                  <Tab name="收入">
                    <Tags kind="income" v-model:selected={formData.tag_ids} />
                  </Tab>
                </Tabs>
                <div>{JSON.stringify(formData)}</div>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
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
