import { defineComponent,PropType } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import s from "./SignInPage.module.scss";
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
        <MainLayout>
           {{
            title: () => "登录",
           }}

        </MainLayout>
    );
  },
});