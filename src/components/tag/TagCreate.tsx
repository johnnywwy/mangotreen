import { defineComponent, PropType } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { TagForm } from "./TagForm";
import s from "./Tag.module.scss";
import { useRouter } from "vue-router";

export const TagCreate = defineComponent({
  setup: () => {
    const router = useRouter()
    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <Icon name="left" class={s.icon}
            onClick={() => { router.back(); }}
          />,
          default: () => <TagForm />,
        }}
      </MainLayout>
    );
  },
});
