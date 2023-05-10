import { defineComponent, PropType } from "vue";
import { Navbar } from "../shared/Navbar";

export const MainLayout = defineComponent({
  setup: (props, content) => {
    return () => (
      <div>
        <Navbar>
          {{
            default: () => content.slots.title?.(),
            icon: () => content.slots.icon?.(),
          }}
        </Navbar>
        {content.slots.default?.()}
      </div>
    );
  },
});
