
// #ifdef APP-NVUE
// #endif
import { benbenImageSrcResolution } from '@/common/utils/utils.js';
import fuPopup from '@/components/fu-popup/fu-popup.vue'
export default {
  components: {fuPopup},
  props: {
    goodsList: {
      type: [Array],
      default: () => [],
    },
  },
  data() {
    return {
      show: false,
    }
  },
  created() {
  },
  methods: {
    benbenImageSrcResolution,
    handleItem(item) {
      this.$emit('handleItem', item)
    },
    openPopup() {
      this.show = true
    },
    closePopup() {
      this.show = false
    }
  },
}
