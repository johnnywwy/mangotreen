import { onMounted } from "vue"
import { useMeStore } from "../store/useMeStore"

export const useAfterMe = () => {
  const meStore = useMeStore()

  onMounted(async () => {
    await meStore.mePromise
  })
}