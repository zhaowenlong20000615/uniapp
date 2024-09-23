export default {
  props: {
    color: {
      type: [Object],
      default: () => ({}),
    },
    size: {
      type: [Number, String],
      default: 130,
    },
  },
  computed: {
    colorConfig() {
      let colorStr = ''
      Object.keys(this.color).map((key) => {
        colorStr += `--${key}:${this.color[key]};`
      })
      return colorStr
    },
  },
}
