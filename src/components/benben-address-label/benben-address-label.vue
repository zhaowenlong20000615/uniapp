<template>
  <view class="benben-address-label">
    <view @click="handleLable(item.name)" v-for="(item, i) in labels" :key="i" :class="{ label_box: true, label_avtive: item.name == value }">
      {{ item.name }}
    </view>
    <view v-if="isEdit" class="label_box edit_box">
      <input :focus="true" maxlength="5" v-model.trim="editLabel" :placeholder="$t('请输入标签名称,最多5个字')" />
      <view v-if="editLabel" class="confirm_btn" @click="editConfirm">{{ $t('确定') }}</view>
      <view v-else class="cancel_btn" @click="editCancel">{{ $t('取消') }}</view>
    </view>
    <view v-else-if="!customLabel" @click="handlerEdit" class="label_box add_icon"></view>
    <view v-else @click="handleLable(customLabel)" :class="{ label_box: true, label_avtive: customLabel == value, custom_label: true }">
      {{ customLabel }}
      <view class="edit-btn" @click.stop="handlerEdit">{{ $t('编辑') }}</view>
    </view>
  </view>
</template>
<script>
import { API_VERSION } from '@/config'
export default {
  name: 'benben-address-label',
  props: {
    api: {
      type: String,
      default: '5ff6859e3c4fd',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return { labels: [], customLabel: '', isEdit: false, editLabel: '' }
  },
  computed: {
    labelApi() {
      return `/${API_VERSION}/${this.api}`
    },
    isShowAdd() {
      if (!this.value) true
      return !this.labels.includes(this.value) ? true : false
    },
  },
  created() {
    this.getLabels()
  },
  watch: {
    value: {
      handler(val) {
        if (!val) return
        if (!this.labels.length) return
        if (!this.labels.find((item) => item.name === val)) {
          this.customLabel = val
        }
      },
      immediate: true,
    },
    'labels.length': {
      handler(val) {
        if (!val) return
        if (!this.value) return
        if (!this.labels.find((item) => item.name === this.value)) {
          this.customLabel = this.value
        }
      },
    },
  },
  mounted() {},
  methods: {
    editCancel() {
      this.isEdit = false
    },
    editConfirm() {
      if (!this.editLabel.length) return this.$message.info(global.i18n.t('请输入标签名称'))
      if (this.editLabel.length > 5) return this.$message.info(global.i18n.t('标签名称最多5个字'))
      this.$emit('input', this.editLabel)
      this.$emit('change', this.editLabel)
      this.isEdit = false
    },
    handlerEdit() {
      this.isEdit = true
      this.editLabel = this.customLabel
    },
    handleLable(name) {
      this.isEdit = false
      this.$emit('input', name)
      this.$emit('change', name)
    },
    async getLabels() {
      try {
        let {
          data: { code, data, msg },
        } = await this.$api.post(this.labelApi)
        if (code != 1) return this.$message.info(msg)
        this.labels = data
      } catch (error) {
        console.log('error--------', error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.benben-address-label {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.label_box {
  flex-shrink: 0;
  border: 1px solid #e5e5e5;
  background: rgba(255, 255, 255, 0.39);
  border-radius: 8rpx;
  padding: 0 12rpx;
  font-size: 24rpx;
  color: #333;
  margin-right: 16rpx;
  margin-top: 8rpx;
  margin-bottom: 8rpx;
  line-height: 42rpx;
  &.label_avtive {
    background: var(--label-avtive-bg);
    color: var(--label-avtive-color);
  }
  &.custom_label {
    display: flex;
    padding-right: 0;
  }
  .edit-btn {
    margin-left: 15rpx;
    width: 60rpx;
    color: var(--edit-color);
    font-size: 20rpx;
    text-align: center;
    background: var(--edit-bg);
  }
  &.edit_box {
    display: flex;
    padding: 0;
    input {
      width: 300rpx;
      font-size: 20rpx;
      height: 42rpx;
      padding-left: 15rpx;
    }
    .cancel_btn {
      width: 80rpx;
      color: var(--cancel-color);
      font-size: 20rpx;
      text-align: center;
      background: var(--cancel-bg);
    }
    .confirm_btn {
      width: 80rpx;
      color: var(--confirm-color);
      font-size: 20rpx;
      text-align: center;
      background: var(--confirm-bg);
    }
  }
}
.add_icon {
  width: 58rpx;
  height: 42rpx;
  position: relative;
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 8px;
    height: 1px;
    background-color: #666;
  }
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    height: 8px;
    width: 1px;
    background-color: #666;
  }
}
</style>
