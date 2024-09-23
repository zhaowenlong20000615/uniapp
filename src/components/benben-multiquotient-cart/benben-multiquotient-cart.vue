<template>
  <view>
    <!-- 未登录状态  显示空购物车 按钮为去登录 -->
    <view v-if="!isLogin" class="cart-empty">
      <slot name="login">
        <image class="empty-img" :src="benbenImageSrcResolution('cart.png', 'global')" mode="widthFix"></image>
        <view class="empty-text">{{ $t('您的购物车还没有商品，快去挑选吧') }}</view>
        <view class="empty-btn" @tap="toLoginDiy">{{ $t('去登录') }}</view>
      </slot>
    </view>
    <!-- 未登录状态 end-->
    <view v-if="isLogin && cartListArr == 0" class="cart-empty">
      <slot name="empty">
        <image class="empty-img" :src="benbenImageSrcResolution('cart.png', 'global')" mode="widthFix"></image>
        <view class="empty-text">{{ $t('您的购物车还没有商品，快去挑选吧') }}</view>
        <view class="empty-btn" @tap="toHomeDiy">{{ $t('去挑选好货') }}</view>
      </slot>
    </view>
    <!-- 已登录状态 显示空购物车 end-->
    <!-- 购物车商品列表模块 已登录状态 并且购物车列表有值 -->
    <!-- 购物车列表 -->
    <view class="cart-box" :class="type" v-if="isLogin && cartListArr != 0">
      <!-- 当商品不能购买(item.stock == 0 || item.is_sale == 0)时 选中按钮失效 并且添加滤镜效果 -->
      <view v-for="(dataItem, i) in cartListArr" :key="i" class="cart-box-item">
        <!-- 店铺信息 -->
        <view class="flex align-center merchant-info" v-if="dataItem.shop_info && showShop">
          <view style="margin-right: 24rpx" class="check-box" @tap="check(dataItem, i)">
            <text
              :class="{
                checked_icon: true,
                checked_active: isMerchantCheck(dataItem),
              }"
              class="fu-iconfont2"
            >
              {{ isMerchantCheck(dataItem) ? '&#59463;' : '&#59221;' }}
            </text>
          </view>
          <view class="shop_info text-df text-666" @click="goMerchant(dataItem.shop_info)">
            <text class="fu-iconfont2 shop_icon">&#58959;</text>
            <text style="max-width: 200rpx" class="text-cut">{{ dataItem.shop_info.store_name }}</text>
            <text class="fu-iconfont2 shop_right_icon">&#xe78e;</text>
          </view>
        </view>
        <!-- 判断没有绑定商品的商品放在一起 -->
        <view
          class="cart-item"
          v-for="(item, index) in dataItem.cart_list"
          :key="index"
          :class="{
            'not-but-class': item.stock == 0 || item.is_sale == 0 || item.is_check == 0,
          }"
        >
          <view class="check-box" @tap="icheck(item, i, index)">
            <text v-if="isEditor" :class="{ checked_icon: true, checked_active: item.delChecked }" class="fu-iconfont2">
              {{ item.delChecked ? '&#59463;' : '&#59221;' }}
            </text>
            <text v-else :class="{ checked_icon: true, checked_active: item.checked }" class="fu-iconfont2">
              {{ item.checked ? '&#59463;' : '&#59221;' }}
            </text>
          </view>
          <!-- 商品图片 -->
          <view class="img-box">
            <view class="no-stok" v-if="item.is_check == 0">
              <image class="no-stock-img" :src="benbenImageSrcResolution('no.png', 'global')" mode=""></image>
            </view>
            <view class="no-stok" v-if="item.stock == 0">
              <image class="no-stock-img" :src="benbenImageSrcResolution('sellOut.png', 'global')" mode=""></image>
            </view>
            <view class="no-stok" v-if="item.is_sale == 0">
              <image class="no-stock-img" :src="benbenImageSrcResolution('shelf.png', 'global')" mode=""></image>
            </view>
            <view class="img" @tap="toDetail(item, 1)">
              <fu-image :src="item.goods_thumb" mode="aspectFill"></fu-image>
            </view>
          </view>
          <!-- 商品详细信息 -->
          <view class="info-box">
            <view class="info-top">
              <view class="title" @tap="toDetail(item, 1)">{{ item.goods_name }}</view>
              <view class="text-df text-999 sku_name" v-if="item.sku_name" @tap="openPopup(item)">
                <view class="overFlow_text">
                  <text>{{ item.sku_name }}</text>
                </view>
                <view style="flex-shrink: 0">
                  <text style="margin-right: 16rpx">{{ $t('选规格') }}</text>
                  <text class="cuIcon-unfold lg text-gray"></text>
                </view>
              </view>
            </view>
            <view class="price-box">
              <view class="price">
                <text class="small">{{ $t('￥') }}</text>
                {{ filterGoodsPrice(item) }}
              </view>
              <uni-number-box
                class="number"
                :min="1"
                :disabled="item.is_valid == 2"
                :max="Number(item.stock)"
                :value="item.num"
                @change="numberChange($event, i, index)"
              ></uni-number-box>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 购物车列表 end-->
    <!-- 购物车底部操作栏部分 -->
    <view style="height: 90rpx"></view>
    <view class="cart-footer">
      <view class="footer-left" @tap="checkAll">
        <view class="check-box">
          <text :class="{ checked_icon: true, checked_active: allChecked }" class="fu-iconfont2">
            {{ allChecked ? '&#59463;' : '&#59221;' }}
          </text>
        </view>
        <view class="text-box">
          <text class="text1 margin-left-xs">{{ $t('全选') }}</text>
        </view>
      </view>
      <!-- 右边 正常状态 未点击管理时isEditor=false -->
      <view class="footer-right" v-if="!isEditor">
        <view class="all-text">
          <view class="text1">{{ $t('合计：') }}</view>
          <view class="text-price-box">
            <text class="small">{{ $t('￥') }}</text>
            {{ totalPrice }}
          </view>
        </view>
        <view class="jiesuan-btn" @click="createOrder">{{ $t('结算') }} ({{ totalNumber }})</view>
      </view>
      <!-- 右边 编辑状态 已经点击管理时 isEditor=true-->
      <view class="footer-right" v-if="isEditor">
        <view class="footer-btn" @click="delCart(2)">{{ $t('移入收藏') }}</view>
        <view class="footer-btn delect" @click="delCart(1)">{{ $t('删除') }}</view>
      </view>
    </view>
    <!-- 购物车底部操作栏部分 end-->
  </view>
</template>
<script>
// 商品是否禁止选中
function isDisabled(ele) {
  return (
    (ele.hasOwnProperty('stock') && ele.stock == 0) ||
    (ele.hasOwnProperty('is_valid') && ele.is_valid != 0) ||
    (ele.hasOwnProperty('is_check') && ele.is_check == 0) ||
    (ele.hasOwnProperty('is_sale') && ele.is_sale == 0)
  )
}
export default {
  name: 'benben-multiquotient-cart',
  components: {},
  mixins: [],
  // 购物车列表
  props: {
    cartList: {
      type: [Array, Object],
      default: () => [],
    },
    // 管理 or 完成
    isEditor: {
      type: Boolean,
      default: false,
    },
    // 是否显示店铺信息
    showShop: {
      type: Boolean,
      default: true,
    },
    //显示类型  card or tiling
    type: {
      type: String,
      default: 'tiling',
    },
  },
  onLoad(options) {},

  data() {
    return {
      cartListArr: [],
      checkedCache: uni.getStorageSync('cart_checked_cache') || [], // 上一次缓存的选中状态
      setTimeoutFn: null,
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.token == '' ? false : true
    },
    // // 选择的商品总价
    totalPrice() {
      if (this.cartListArr == undefined) return 0
      let list = this.cartListArr
      let total = 0
      list.forEach((item) => {
        item.cart_list.forEach((j) => {
          if (j.checked == true) {
            // 价格区分会员用户
            let _price = this.filterGoodsPrice(j)
            total += Number(_price) * Number(j.num)
          }
        })
      })
      return Number(total.toFixed(2))
    },
    // 正常状态选择的商品数量
    totalNumber() {
      let list = this.cartListArr
      let total = 0
      if (list == undefined) return
      list.forEach((item) => {
        item.cart_list.forEach((j) => {
          if (j.checked == true) {
            total += Number(j.num)
          }
        })
      })
      return total
    },
    // 删除时选择的商品数量
    totalNumberDel() {
      let list = this.cartListArr
      let total = 0
      if (list == undefined) return
      list.forEach((item) => {
        item.cart_list.forEach((j) => {
          if (j.delChecked == true) {
            total += Number(j.num)
          }
        })
      })
      return total
    },
    // 购物车内的商品数量
    allNumber() {
      let list = this.cartListArr
      let total = 0
      if (list == undefined) return
      list.forEach((item) => {
        total += Number(item.num)
      })
      return total
    },
    allChecked() {
      if (this.cartListArr == undefined || !this.cartListArr.length) return false
      return this.cartListArr.findIndex((item) => !this.isMerchantCheck(item)) === -1
    },
  },
  watch: {
    cartList: {
      handler(value) {
        if (value.length == 0) {
          this.$emit('update:is-editor', false)
        }
        value.forEach((item) => {
          item.cart_list.forEach((ele) => {
            ele.delChecked = false
            ele.checked = isDisabled(ele) || !this.checkedCache.includes(ele.aid) ? false : true
          })
        })
        this.cartListArr = JSON.parse(JSON.stringify(value))
      },
      deep: true,
      immediate: true,
    },
    cartListArr: {
      handler(value) {
        if (value.length == 0) return
        let arr = []
        value.forEach((item) => {
          item.cart_list.forEach((ele) => {
            if (ele.checked) {
              arr.push(ele.aid)
            }
          })
        })
        this.checkedCache = arr
      },
      deep: true,
      immediate: true,
    },
  },

  created() {},
  beforeDestroy() {
    uni.setStorageSync('cart_checked_cache', this.checkedCache)
  },
  methods: {
    openPopup(item) {
      this.$emit('update:cart-id', item.aid)
      this.$emit('update:sku-id', item.sku_id)
      this.$emit('update:cart-num', item.num)
      this.$emit('update:goods-id', item.goods_id)
      this.$emit('changeSku')
    },
    // 判断是否为会员价，活动价和商品价
    filterGoodsPrice(value) {
      if (!value) return ''
      let isMember = this.$store.getters.isMember // 是否是会员
      let isActivity = value.activity_type == undefined || value.activity_type == 0 ? false : true // 是否是活动
      let member_activity_price = value.member_activity_price ? value.member_activity_price : value.activity_price //会员活动价
      let activity_price = value.activity_price // 活动价
      let member_price = value.member_price ? value.member_price : value.shop_price // 会员价
      let shop_price = value.shop_price // 售卖价
      if (isActivity) {
        return isMember ? member_activity_price : activity_price
      } else {
        return isMember ? member_price : shop_price
      }
    },
    // 去店铺
    goMerchant(item) {
      this.$emit('update:merchant-id', item.aid)
      this.$emit('goMerchant')
    },
    // 判断店铺是否全选
    isMerchantCheck(item) {
      let bool = false
      if (this.isEditor && item.cart_list.findIndex((val) => !val.delChecked) == -1) {
        bool = true
      }
      if (!this.isEditor && item.cart_list.findIndex((val) => !val.checked) == -1) {
        bool = true
      }
      return bool
    },
    // 店铺选中状态处理
    check(item, i) {
      let isChecked = !this.isMerchantCheck(item)
      item.cart_list.forEach((j) => {
        if (this.isEditor) {
          j.delChecked = isChecked
        } else {
          j.checked = isChecked
        }
      })
    },
    // 商品选中处理状态
    icheck(item) {
      if (!this.isEditor && !isDisabled(item)) {
        if (item?.is_check == 0) return this.$message.info(global.i18n.t('该商品已下架'))
        if (item?.stock == 0) return this.$message.info(global.i18n.t('该商品已售完,正在采购中'))
        if (item?.is_sale == 0) return this.$message.info(global.i18n.t('该商品已下架'))
        this.$set(item, 'checked', !item.checked)
      }
      if (this.isEditor) {
        this.$set(item, 'delChecked', !item.delChecked)
      }
    },
    //全选|取消全选
    checkAll() {
      const bool = !this.allChecked
      this.cartListArr.forEach((item) => item.cart_list.forEach((j) => (this.isEditor ? (j.delChecked = bool) : (j.checked = bool))))
    },
    /** @description 数量改变
     * @param {Object} e
     * @param {string} index
     */
    numberChange(e, i, index) {
      this.setTimeoutFn && clearTimeout(this.setTimeoutFn)
      this.setTimeoutFn = setTimeout(() => {
        let list = this.cartListArr[i].cart_list
        if (e != list[index].num) {
          if (list[index].stock < e) {
            e = list[index].stock
          }
          this.$set(list[index], 'num', e)
          this.$emit('update:cart-id', list[index].aid)
          this.$emit('update:sku-id', list[index].sku_id)
          this.$emit('update:cart-num', e)
          this.$emit('numberChange')
        }
      }, 500)
    },

    /**
     * @method 移入收藏卡
     * @param {Number} type 1: 删除, 2: 移入收藏
     */
    delCart(type) {
      let ids = []
      this.cartListArr.forEach((item) => {
        item.cart_list.map((val) => {
          if (val.delChecked) {
            ids.push(val.aid)
          }
        })
      })
      if (ids.length == 0) return this.$message.info(type == 1 ? global.i18n.t('请选择要删除的商品') : global.i18n.t('请选择要移动的商品'))
      this.$util.showModal({
        title: global.i18n.t('提示'),
        content: type == 1 ? global.i18n.t('确认删除吗?') : global.i18n.t('确认移入收藏夹吗?'),
        success: (res) => {
          if (res.confirm) {
            if (type == 1) {
              this.$emit('update:cart-ids', ids.join(','))
              this.$emit('delCart')
            } else {
              this.$emit('update:cart-ids', ids.join(','))
              this.$emit('transCartGoods')
            }
          }
        },
      })
    },
    // 创建订单
    createOrder() {
      const list = this.cartListArr
      let ids = []
      let cartXia = false
      let is_sale = false
      let is_check = false
      list.forEach((item) => {
        item.cart_list.forEach((j) => {
          if (j.checked && j.stock != 0 && j.is_sale != 0 && j.is_check != 0) {
            ids.push(j.aid)
          } else if (j.checked && j.stock == 0) {
            cartXia = true
          } else if (j.checked && j.is_sale == 0) {
            is_sale = true
          } else if (j.checked && j.is_check == 0) {
            is_check = true
          }
        })
      })
      console.log(ids, 'ids')
      if (cartXia) return this.$message.info(global.i18n.t('该商品已售完,正在采购中'))
      if (is_sale) return this.$message.info(global.i18n.t('该商品已下架'))
      if (is_check) return this.$message.info(global.i18n.t('该商品已下架'))
      const cart_ids = ids.join(',')
      if (cart_ids == '') return this.$message.info(global.i18n.t('请选择商品'))
      this.$emit('update:cart-ids', cart_ids)
      this.$emit('createOrder')
    },
    toDetail(item, type) {
      if (item.is_valid == 2) return
      this.$emit('update:goods-id', item.goods_id)
      this.$emit('toGoods')
    },
  },
}
</script>
<style lang="scss" scoped>
.shop_info {
  display: flex;
  align-items: center;
}
.shop_icon {
  color: var(--shop-icon-color);
  font-weight: 600;
  font-size: 28rpx;
  padding-right: 15rpx;
}
.shop_right_icon {
  color: #999;
  font-size: 22rpx;
}
.cart-empty {
  width: 750rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  .empty-img {
    display: block;
    margin-top: 64rpx;
    width: 440rpx;
    height: 220rpx;
  }

  .empty-text {
    margin-top: 28rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 33rpx;
    color: #999999;
  }

  .empty-btn {
    margin-top: 27rpx;
    margin-bottom: 64rpx;
    width: 280rpx;
    background: var(--nav-btn-bg);
    border-radius: 38rpx;
    text-align: center;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 70rpx;
    color: #ffffff;
  }
}
.check-box {
  width: 48rpx;
  height: 48rpx;
  line-height: 48rpx;
  flex-shrink: 0;
  display: inline-block;
  text-align: center;
  text-align: center;
  .checked_icon {
    color: #999;
  }
  .checked_active {
    color: var(--checked-active);
  }
}
// 购物车商品列表模块
.cart-box {
  width: 750rpx;
  padding-top: 24rpx;
  overflow: hidden;
  &.card {
    padding: 24rpx 24rpx 0;
    .cart-box-item {
      border-radius: 24rpx;
    }
  }
  .cart-box-item {
    background: #ffffff;
    margin-bottom: 20rpx;
    padding: 24rpx;
    &:last-child {
      margin-bottom: 0;
    }
    .merchant-info {
      height: 60rpx;
    }
    .cart-item {
      display: flex;
      align-items: center;
      padding: 16rpx 0;
      border-bottom: 1px solid #eee;
      &.not-but-class {
        filter: grayscale(100%);
      }
      &:nth-last-of-type(1) {
        border-bottom: none;
      }
      // checkbox部分
      // 商品图片
      .img-box {
        margin-left: 5rpx;
        width: 180rpx;
        height: 180rpx;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: 16rpx;
        position: relative;
        .no-stok {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 148rpx;
          height: 148rpx;
          z-index: 2;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 74rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .no-stock-img {
            display: block;
            width: 95rpx;
            height: 95rpx;
          }
        }
        .img {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          width: 180rpx;
          height: 180rpx;
        }
      }
      // 商品详细信息
      .info-box {
        flex: 1;
        // min-height: 0;
        min-width: 0;
        height: 180rpx;
        margin-left: 24rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .info-top {
          display: flex;
          flex-direction: column;

          .title {
            //两行溢出隐藏
            white-space: nowrap;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 500;
            line-height: 40rpx;
            color: #333333;
          }
        }

        .price-box {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 25rpx;

          .price {
            font-size: 32rpx;
            font-weight: 600;
            line-height: 36rpx;
            color: #fe5014;
            opacity: 1;

            .small {
              font-size: 28rpx;
            }
          }
          .number {
            width: 200rpx;
          }
        }
      }
    }
  }

  // padding-bottom: 24rpx;
}

// 购物车底部操作栏部分
.cart-footer {
  height: 90rpx;
  width: 750rpx;
  left: 0;
  position: fixed;
  bottom: var(--window-bottom);
  width: 100%;
  z-index: 98;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .footer-left {
    display: flex;
    align-items: center;
    padding-left: 24rpx;
    .text-box {
      .text1 {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 40rpx;
        color: #333333;
      }

      .text2 {
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 33rpx;
        color: #999999;
      }
    }
  }

  .footer-right {
    // 右边 正常状态
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .all-text {
      display: flex;
      align-items: center;
      margin-right: 24rpx;

      .text1 {
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 32rpx;
        color: #666666;
        opacity: 1;
      }
      .text-price-box {
        font-size: 32rpx;
        font-family: Oswald;
        font-weight: 500;
        line-height: 36rpx;
        color: #fe5014;

        .small {
          font-size: 28rpx;
        }
      }
    }

    .jiesuan-btn {
      width: 230rpx;
      background: var(--submit-btn-bg);
      opacity: 1;
      text-align: center;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 90rpx;
      color: #ffffff;
    }

    // 右边 编辑状态
    .footer-btn {
      width: 200rpx;
      background: #f8f8f8;
      opacity: 1;
      border-radius: 64rpx;
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 72rpx;
      color: #333333;
      margin-right: 24rpx;
      margin-left: -8rpx;
    }
    .delect {
      background-color: var(--del-btn-bg);
      color: var(--del-btn-color);
    }
  }
}

.sku_name {
  display: flex;
  justify-content: space-between;
  background-color: #f8f8f8;
  height: 48rpx;
  line-height: 48rpx;
  padding: 0 16rpx;
  box-sizing: border-box;
  margin: 8rpx 0;
  border-radius: 8rpx;
}

.overFlow_text {
  width: 250rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
