import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import s from "./startPage.module.scss";
import { RouterLink } from "vue-router";
export const StartPage = defineComponent({
  setup: (props, content) => {
    const onClick = () => {
      console.log("hi");
    };

    return () => (
      <div>
        <nav>
          <Navbar>
            {{
              default: "蛋黄记账",
              icon: <Icon name="menu" class={s.navIcon} />,
            }}
          </Navbar>
        </nav>
        <Center class={s.logo_wrapper}>
          <Icon name="logo" class={s.logo}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <RouterLink to={"/item/create"}>
            <Button class={s.button} onClick={onClick}>
              开始记账
            </Button>
          </RouterLink>
        </div>
        <RouterLink to={"/item/create"}>
          <FloatButton></FloatButton>
        </RouterLink>
      </div>
    );
  },
});
