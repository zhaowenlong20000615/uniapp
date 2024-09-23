<template>
  <web-view v-if="webPath" :src="webPath"></web-view>
</template>

<script>
export default {
  data() {
    return {
      webPath: '',
    }
  },
  onUnload() {},

  onLoad({ webPath }) {
    if (webPath !== undefined) this.webPath = decodeURIComponent(webPath)
  },
  methods: {},
}
</script>

<style scoped></style>
