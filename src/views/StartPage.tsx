import { Transition, defineComponent, ref, onMounted } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import s from "./startPage.module.scss";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layouts/MainLayout";
import { OverLay } from "../shared/OverLay";

export const StartPage = defineComponent({
  setup: (props, content) => {
    const overLayVisible = ref(false);


    const onClickMenu = () => {
      console.log("click");

      overLayVisible.value = !overLayVisible.value;
    };

    return () => (
      <MainLayout>
        {{
          title: () => "蛋黄记账",
          icon: () => (
            <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
          ),
          default: () => (
            <>
              <Center class={s.logo_wrapper}>
                <Icon name="logo" class={s.logo}></Icon>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to={"/item/create"}>
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to={"/item/create"}>
                <FloatButton></FloatButton>
              </RouterLink>
              {overLayVisible.value && (
                <Transition
                  enterActiveClass={s.fade_enter_active}
                  leaveActiveClass={s.fade_leave_active}
                  enterFromClass={s.fade_enter_from}
                  leaveToClass={s.fade_leave_to}
                >
                  <OverLay
                    class={s.one}
                    onClose={() => (overLayVisible.value = false)}
                  />
                </Transition>
              )}
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
