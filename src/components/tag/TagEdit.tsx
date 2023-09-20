import { defineComponent } from "vue";
import s from "./Tag.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { TagForm } from "./TagForm";
import { useRoute, useRouter } from "vue-router";
import { deleteTag } from "../../api/tags";
import { showConfirmDialog, showToast } from 'vant';

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()

    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => { <div>id 不存在</div> }
    }
    // 删除标签
    const onDeleteTag = async () => {
      await showConfirmDialog({
        title: '确认',
        message:
          '删除后无法恢复哦！',
      })
      await deleteTag(numberId).then(() => {
        showToast({
          message: '删除成功', icon: 'success', duration: 800,
          onClose: () => { router.back() }
        });
      })
    }

    // 删除标签和记账
    const onDeleteTagAndItem = async () => {
      // const response = await deleteTag(numberId, {
      //   withItems: "true"
      // })
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
                <Button level="danger"
                  class={s.removeTag} onClick={onDeleteTag}>删除标签</Button>
                <Button level="danger"
                  class={s.removeTagAndItem} onClick={onDeleteTagAndItem}>删除标签和记账</Button>
              </div>
            </>
          ),
        }}
      </MainLayout >
    );
  },
});
