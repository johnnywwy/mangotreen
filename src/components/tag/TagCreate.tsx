import { defineComponent, PropType, reactive, toRaw } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Rules, validate } from "../../shared/validate";
import { TagForm } from "./TagForm";
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive({
      name: "",
      sign: "",
    });

    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});

    //提交表单
    const onSubmit = (e: Event) => {
      e.preventDefault();

      const rules: Rules<typeof formData> = [
        { key: "name", type: "required", message: "必填" },
        {
          key: "name",
          type: "pattern",
          message: "最多 1 ～ 4 个字符",
          regExp: /^.{1,4}$/,
        },
        {
          key: "sign",
          message: "必填",
          type: "required",
        },
      ];
      // 重置错误信息
      Object.assign(errors, {
        name: [],
        sign: [],
      });

      // 验证表单
      Object.assign(errors, validate(formData, rules));
      console.log(errors);
    };

    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <Icon name="left" onClick={() => {}} />,
          default: () => (
           <TagForm />
          ),
        }}
      </MainLayout>
    );
  },
});
