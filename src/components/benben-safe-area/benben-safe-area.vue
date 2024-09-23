<template>
  <view class="benben-safe-area"></view>
</template>
<script>
export default {
  name: 'benben-safe-area',
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="scss">
.benben-safe-area {
  height: 0;
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
