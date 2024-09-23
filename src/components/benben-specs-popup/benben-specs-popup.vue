<template>
  <view>
    <benben-popup ref="spec" mode="bottom" v-model="show" :maskClick="true" class="popup">
      <view class="wrap-body">
        <view class="wrap" @tap.stop.prevent @touchmove.stop.prevent>
          <view class="flex justify-between goods_head">
            <image class="block-150 radius bg-gray margin-right goods_head_img" mode="aspectFill" :src="thumb" @click="preview(thumb)"></image>
            <view class="flex-sub flex flex-direction goods_head_body">
              <view class="flex align-center">
                <text class="goods_price">
                  <text class="rmb-tag">{{ $t('￥') }}</text>
                  {{ price }}
                </text>
                <view @click="close" style="margin-left: auto" class="close-box fu-iconfont2">&#xe8e7;</view>
              </view>
              <view class="text-sm text-999 margin-top-xs text-cut-2">
                <text style="padding-right: 20rpx">{{ $t('库存') }} {{ stockNum }}</text>
                <text v-if="skuName">{{ $t('已选择') }}: {{ skuName }}</text>
              </view>
            </view>
          </view>
          <scroll-view class="speclist-max-height" scroll-y="true" @touchmove.stop>
            <view class="margin-top" v-if="speclist.length > 0">
              <block v-for="(item, index) in speclist" :key="index">
                <view>
                  <view class="text-sm text-333 text-bold padding-bottom-sm">{{ item.name }}</view>
                  <view class="item">
                    <template v-for="(item2, index2) in item.spec_value">
                      <template v-if="isDisable(index, item2.id)">
                        <view :key="index2" class="item-tag" :class="{ active: selectSkuId[index] == item2.id }" @tap="selectSpec(index, item2)">
                          {{ item2.item }}
                        </view>
                      </template>
                      <template v-else>
                        <view :key="index2" class="item-tag disable">
                          {{ item2.item }}
                        </view>
                      </template>
                    </template>
                  </view>
                </view>
              </block>
            </view>
          </scroll-view>
          <view class="margin-top">
            <view class="flex justify-between align-center padding-tb-sm">
              <view class="text-333 text-sm text-bold">{{ $t('数量') }}</view>
              <uni-number-box v-if="show" :value="number" :min="minLimit" :max="maxNum" @change="setnumber" :step="1"></uni-number-box>
            </view>
            <view class="text-right text-theme text-sm">
              <text v-if="Number(limit) > 0">{{ $t('此商品限购') }}{{ limit }}{{ $t('件') }}</text>
              <text v-if="Number(minLimit) > 1 && Number(limit) > 0" style="padding: 0 10rpx">|</text>
              <text v-if="Number(minLimit) > 1">{{ $t('该商品') }}{{ limit }}{{ $t('件起售') }}</text>
            </view>
          </view>
          <view class="margin-top flex round overHidden">
            <view v-if="['cart', 'all'].includes(type)" class="flex-sub btn color1" @tap.stop="handleSubmit('addCart')">{{ $t('加入购物车') }}</view>
            <view v-if="['buy', 'all'].includes(type)" class="flex-sub btn color2" @tap.stop="handleSubmit('buyNow')">{{ $t('立即抢购') }}</view>
            <view v-if="type == 'confirm'" class="flex-sub btn color3" @tap.stop="handleSubmit('confirm')">{{ $t('确认') }}</view>
          </view>
          <benben-safe-area />
        </view>
      </view>
    </benben-popup>
    <preview-image ref="previewImage" @close="closePreview"></preview-image>
  </view>
</template>

<script>
import previewImage from './preview-image.vue'
export default {
  name: 'benben-specs-popup',
  components: { previewImage },
  props: {
    priceName: {
      //商品价格字段
      type: [String, Number],
      default: 'shop_price',
    },
    // spu规格列表
    speclist: {
      type: Array,
      default: () => [],
    },
    // sku列表
    skulist: {
      type: [Array, Object],
      default: () => [],
    },
    limit: {
      type: [String, Number],
      default: 0,
    },
    //最小限购
    minLimit: {
      type: [String, Number],
      default: 1,
    },
    //选中的规格
    skuId: {
      type: [String, Number],
      default: 0,
    },
    skuName: {
      type: [String, Number],
      default: 0,
    },
    price: {
      type: [String, Number],
      default: 0,
    },
    marketPrice: {
      type: [String, Number],
      default: 0,
    },

    memberPrice: {
      type: [String, Number],
      default: 0,
    },
    stock: {
      type: [String, Number],
      default: 0,
    },
    number: {
      type: [String, Number],
      default: 1,
    },
    thumb: {
      type: [String],
      default: '',
    },
    activeSkuTag: {
      type: [String],
      default: '',
    },
    skuTag: {
      type: [String],
      default: '',
    },
  },
  data() {
    return {
      selectSkuId: [],
      selectSkuName: [],
      type: '',
      flag: false,
      show: false,
    }
  },
  computed: {
    maxNum() {
      if (this.limit > 0 && this.stockNum > this.limit) {
        return +this.limit
      }
      return +this.stockNum
    },
    stockNum() {
      let emptyIndex = this.selectSkuId.findIndex((item) => !item)
      return emptyIndex == -1 ? +this.stock : 0
    },
    skulistArr() {
      let skulistArr = []
      if (this.skulist) {
        Object.values(this.skulist).map((item) => {
          if (item.key) {
            skulistArr.push(item.key.split('_'))
          }
        })
      }
      return skulistArr
    },
  },
  watch: {
    skulist: {
      //监听规格改变
      handler(value) {
        this.init()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 初始化
    init() {
      let skuGoods = Object.values(this.skulist).find((item) => item.sku_id == this.skuId)
      if (skuGoods) {
        this.selectSkuId = skuGoods.key.split('_')
      } else {
        this.selectSkuId = new Array(this.speclist.length)
      }
      this.selectSkuId.map((item, index) => {
        if (!item) return
        let is_upload_image = this.speclist[index].is_upload_image || '0'
        if (is_upload_image == '0') return
        let selectItem = this.speclist[index].spec_value.find((val) => val.id == item)
        this.$emit('update:thumb', selectItem.thumb)
      })
      this.getSelectSkuName()
      this.selectGoods()
    },
    getSelectSkuName() {
      let selectSkuName = new Array(this.speclist.length)
      this.selectSkuId.map((item, i) => {
        if (!item) return
        let specitem = this.speclist[i].spec_value.find((val) => val.id == item)
        selectSkuName[i] = (specitem && specitem.item) || ''
      })
      selectSkuName = selectSkuName.filter((item) => item)
      this.$emit('update:sku-name', selectSkuName.join(','))
    },
    // 判断是否禁用
    isDisable(index, id) {
      let isSelecArr = []
      this.selectSkuId.map((item, i) => {
        if (i !== index && item) {
          isSelecArr.push({
            index: i,
            id: item,
          })
        }
      })
      if (!isSelecArr.length) return true
      let skulistArr = this.skulistArr.filter((item) => {
        let isSelec = isSelecArr.every((selecitem) => {
          return item[selecitem.index] == selecitem.id
        })
        return isSelec && item[index] == id
      })
      return skulistArr.length
    },
    // 点击添加购物车
    handleSubmit(type) {
      if (this.limit == -1) return this.$message.info(this.$t('超出最大限购数量'))
      if (this.stock < this.minLimit) return this.$message.info(this.$t('库存不足'))
      if (this.number < this.minLimit) return this.$message.info(this.$t('该商品') + this.minLimit + this.$t('件起售'))
      let emptyIndex = this.selectSkuId.findIndex((item) => !item)
      //判断多规格商品是否选择了规格
      if (this.selectSkuId.length && emptyIndex != -1) return this.$message.info(`${this.$t('请选择')}${this.speclist[emptyIndex].name}`)
      if (this.stock <= 0) return this.$message.info(this.$t('暂无库存'))
      this.$emit(type)
    },
    // 数量改变
    setnumber(e) {
      this.$emit('update:number', e)
    },
    // 点击规格
    selectSpec(index, item) {
      let is_upload_image = this.speclist[index].is_upload_image || '0'
      if (this.selectSkuId[index] == item.id) {
        this.$set(this.selectSkuId, index, '')
      } else {
        this.$set(this.selectSkuId, index, item.id)
      }
      if (is_upload_image == '1') {
        this.$emit('update:thumb', item.thumb)
      }
      this.getSelectSkuName()
      this.selectGoods()
    },
    // 获取选中商品的信息
    selectGoods() {
      let selectSkuId = this.selectSkuId.filter((item) => item)
      if (selectSkuId.length !== Object.keys(this.speclist).length) return
      selectSkuId = selectSkuId.join('_')
      let skuGoods = Object.values(this.skulist).find((item) => item.key == selectSkuId)
      if (skuGoods) {
        this.$emit('update:market-price', skuGoods.market_price)
        this.$emit('update:member-price', skuGoods.member_price)
        this.$emit('update:price', skuGoods[this.priceName])
        this.$emit('update:stock', skuGoods.stock)
        let updateNumber = this.number || this.minLimit
        if (+skuGoods.stock < +this.number) updateNumber = skuGoods.stock
        if (skuGoods.hasOwnProperty('limit') && skuGoods.limit != 0) {
          this.$emit('update:limit', skuGoods.limit)
          if (+skuGoods.limit < +this.number && +skuGoods.stock > +skuGoods.limit && skuGoods.limit > 1) updateNumber = skuGoods.limit
        }
        if (skuGoods.hasOwnProperty('minLimit') && skuGoods.limit != 0) {
          this.$emit('update:min-limit', skuGoods.limit)
          if (+skuGoods.minLimit > +this.number && +skuGoods.stock > +skuGoods.minLimit && skuGoods.minLimit >= 1) updateNumber = skuGoods.minLimit
        }
        this.$emit('update:number', updateNumber)
        this.$emit('update:sku-id', skuGoods.sku_id)
        if (skuGoods.spec_img) {
          this.$emit('update:thumb', skuGoods.spec_img)
        }
      }
    },
    // 打开弹窗
    open(type) {
      this.type = type || 'all'
      this.init()
      this.$refs.spec.open()
    },
    // 关闭弹窗
    close() {
      this.$refs.spec.close()
    },
    closePreview({ data }) {
      if (data && data.key) {
        this.selectSkuId = data.key.split('_')
        this.getSelectSkuName()
        this.selectGoods()
      }
    },
    // 规格预览图片
    preview(url) {
      let skulist = Object.values(this.skulist)
      if (!skulist.length) {
        uni.previewImage({
          current: url,
          urls: [url],
        })
        return
      }
      let current = 0
      if (this.skuId) current = skulist.findIndex((item) => item.sku_id == this.skuId)
      this.$refs.previewImage.open({
        current: current != -1 ? current : 0,
        keyName: 'spec_img',
        urls: skulist,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.goods_price {
  display: flex;
  align-items: end;
  font-size: 36rpx;
  font-weight: 600;
  color: #f02325;
  .rmb-tag {
    font-size: 0.6em;
  }
}
.goods_head {
  height: 120rpx;
  // align-items: end;
  .goods_head_img {
    border-radius: 16rpx;
    align-self: flex-end;
  }
  .goods_head_body {
    height: 100%;
    .text-price {
      font-size: 32rpx;
    }
  }
}
.wrap-body {
  padding-top: 70rpx;
}
.wrap {
  padding: 24rpx;
  background-color: #fff;
  border-radius: 16rpx 16rpx 0 0;

  .close-box {
    width: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    color: #ccc;
    font-size: 36rpx;

    // border-radius: 50%;
    // background-color: rgba(0, 0, 0, 0.1);
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // color: #999999;
    // font-weight: bold;
  }

  .item {
    display: flex;
    flex-wrap: wrap;

    .item-tag {
      display: inline-block;
      font-size: 24rpx;
      color: var(--sku-tag-color);
      background: var(--sku-tag-bg);
      padding: 12rpx 24rpx;
      border-radius: 100rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      border: 1px solid var(--sku-tag-bg);
    }

    .item-tag.active {
      background-color: var(--active-sku-tag-bg);
      color: var(--active-sku-tag-color);
      border-color: var(--active-sku-tag-color);
    }

    .item-tag.disable {
      color: #cccccc !important;
    }
  }

  .btn {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #ffffff;
  }
}

.block-150 {
  width: 200rpx;
  height: 200rpx;
}
.color1 {
  background: var(--buy-btn-bg);
}
.color2 {
  background: var(--cart-btn-bg);
}
.color3 {
  background: var(--confirm-btn-bg);
}

.overHidden {
  overflow: hidden;
}

.speclist-max-height {
  // #ifndef MP-WEIXIN
  max-height: 800rpx;
  // #endif
  // #ifdef MP-WEIXIN
  max-height: 650rpx;
  // #endif
}
</style>
