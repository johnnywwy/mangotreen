import { defineComponent, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { useRouter } from "vue-router";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, content) => {
    const refKind = ref("支出");

    // 支出标签
    const refExpensesTags = ref([
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
      {
        id: 1,
        name: "餐饮",
        sign: "🍔",
        category: "expenses",
      },
      {
        id: 2,
        name: "交通",
        sign: "🚗",
        category: "expenses",
      },
      {
        id: 3,
        name: "购物",
        sign: "🛍️",
        category: "expenses",
      },
    ]);

    // 收入标签
    const refIncomeTags = ref([
      {
        id: 4,
        name: "工资",
        sign: "💰",
        category: "income",
      },
      {
        id: 5,
        name: "兼职",
        sign: "💰",
        category: "income",
      },
      {
        id: 6,
        name: "理财",
        sign: "💰",
        category: "income",
      },
    ]);

    const router = useRouter();
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
                  <Tab name="支出" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refExpensesTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refIncomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
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
