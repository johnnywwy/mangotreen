import { onMounted } from "vue"
import { useMeStore } from "../store/useMeStore"

export const useAfterMe = (fn: () => void) => {
  const meStore = useMeStore()

  onMounted(async () => {
    await meStore.mePromise
    fn()
  })
}