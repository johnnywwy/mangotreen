import { defineComponent } from "vue";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import s from "./start.module.scss";
export const Start = defineComponent({
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
          <Button class={s.button} onClick={onClick}>
            123456
          </Button>
        </div>
        <FloatButton></FloatButton>
      </div>
    );
  },
});
