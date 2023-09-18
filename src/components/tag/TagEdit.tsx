import { defineComponent } from "vue";
import s from "./Tag.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { TagForm } from "./TagForm";
import { useRoute } from "vue-router";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => { <div>id 不存在</div> }
    }
    return () => (
      <MainLayout>
        {{
          title: () => "编辑标签",
          icon: () => <Icon name="left" class={s.icon} onClick={() => { }} />,
          default: () => (
            <>
              <TagForm id={numberId} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTag} onClick={() => { }}>删除标签</Button>
                <Button level="danger" class={s.removeTagAndItem} onClick={() => { }}>删除标签和记账</Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
