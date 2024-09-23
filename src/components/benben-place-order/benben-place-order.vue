<template>
  <view style="padding-top: 20rpx">
    <!--  -->
    <view class="address_box">
      <view @click="handleJumpPage('select-address')" v-if="!address.aid" class="flex flex-wrap align-center justify-center address_null">
        <text class="fu-iconfont2 location_icon">&#xe637;</text>
        <text class="directOrder_fd1_0_c1">{{ $t('添加收货地址') }}</text>
      </view>
      <!-- -->
      <view v-else @click="handleJumpPage('select-address', address.aid)" class="flex flex-wrap align-center address_info">
        <text class="fu-iconfont2 location_icon">&#xe637;</text>
        <view style="padding-left: 20rpx" class="flex-sub">
          <view class="address_row1">
            <text class="address_label">{{ address.label_name }}</text>
            <text class="real_name">{{ address.real_name }}</text>
            <text style="padding: 0 15rpx">({{ address.sex == '1' ? $t('先生') : $t('女士') }})</text>
            <text>{{ address.mobile }}</text>
          </view>
          <view class="directOrder_fd3_0_c0_c1_c1_c0_c0">{{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}</view>
        </view>
        <text style="font-size: 24rpx; color: #aaa" class="fu-iconfont2">&#xe792;</text>
      </view>
      <view class="bottom_line"></view>
    </view>
    <!---购物车结算flex布局结束-->
    <!---结算信息flex布局开始-->
    <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout directOrder_flex_4" v-if="orderList.length != 0">
      <view v-for="(item, key0) in orderList" class="flex flex-direction flex-wrap align-stretch directOrder_fd4_0" :key="key0">
        <view class="flex flex-wrap align-center directOrder_fd4_0_c0">
          <text style="font-size: 28rpx; color: #fa2033; padding-right: 15rpx" class="fu-iconfont2">&#xe662;</text>
          <text class="directOrder_fd4_0_c0_c1">{{ item.shop_info.store_name }}</text>
          <text style="font-size: 24rpx; color: #aaa" class="fu-iconfont2">&#xe792;</text>
        </view>
        <view v-for="(child, key1) in item.goods" class="flex flex-wrap align-center directOrder_fd4_0_c1" :key="key1">
          <image class="directOrder_fd4_0_c1_c0" mode="aspectFit" :src="child.thumb"></image>
          <view class="flex flex-direction flex-wrap align-stretch flex-sub">
            <text class="directOrder_fd4_0_c1_c1_c0">{{ child.name }}</text>
            <text class="directOrder_fd4_0_c1_c1_c1">{{ child.key_name }}</text>
            <view class="flex flex-wrap align-center">
              <view class="c-price directOrder_fd4_0_c1_c1_c2_c1 text-price">
                <text class="f32">{{ child.shop_price | frontPrice }}</text>
                <text class="directOrder_price2_fd4_0_c1_c1_c2_c1">{{ child.shop_price | laterPrice }}</text>
              </view>
              <text class="directOrder_fd4_0_c1_c1_c2_c2">x</text>
              <text class="directOrder_fd4_0_c1_c1_c2_c3">{{ child.number }}</text>
            </view>
          </view>
        </view>
        <view class="flex flex-wrap align-center directOrder_fd4_0_c2">
          <text class="directOrder_fd4_0_c2_c0">{{ $t('商品总额') }}</text>
          <text class="directOrder_fd4_0_c2_c1">{{ $t('¥') }}</text>
          <view class="directOrder_fd4_0_c2_c2">
            <text>{{ item.goods_money | frontPrice }}</text>
            <text>{{ item.goods_money | laterPrice }}</text>
          </view>
        </view>
        <view v-if="isCoupon" class="flex flex-wrap align-center directOrder_fd4_0_c3" @tap.stop="queryCouponFunc(item, 'shop')">
          <text class="flex-sub directOrder_fd4_0_c3_c0">{{ $t('优惠券') }}</text>
          <view class="flex aline-center">
            <text v-if="item.coupon_money != ''" class="directOrder_fd4_0_c3_c1_c1">{{ $t('优惠') }}{{ item.coupon_money }}元</text>
            <text style="color: #999" v-else>{{ item.coupon_usable_num == 0 ? $t('无可用优惠券') : $t('选择优惠券') }}</text>
          </view>
          <text style="font-size: 24rpx; color: #aaa" class="fu-iconfont2">&#xe792;</text>
        </view>
        <view v-if="isInvoice" class="flex flex-wrap align-center directOrder_fd4_0_c4" @tap.stop="openInvoice(item)">
          <text class="flex-sub directOrder_fd4_0_c4_c0">{{ $t('发票') }}</text>
          <text style="color: #999">{{ item.invoiceId ? $t('已选发票') : $t('不开发票') }}</text>
          <text style="font-size: 24rpx; color: #aaa" class="fu-iconfont2">&#xe792;</text>
        </view>
        <view class="flex flex-wrap align-center directOrder_fd4_0_c5" @tap="openFreightExplainShow(item)">
          <text class="directOrder_fd4_0_c5_c0">{{ $t('运费') }}</text>
          <text class="directOrder_fd4_0_c5_c1">{{ item.express_price == 0 ? $t('包邮') : item.express_price }}</text>
          <text style="font-size: 24rpx; color: #aaa" class="fu-iconfont2">&#xe792;</text>
        </view>
        <view class="flex flex-wrap align-center directOrder_fd4_0_c6">
          <text class="directOrder_fd4_0_c6_c0">{{ $t('留言') }}</text>
          <input
            class="flex-sub directOrder_fd4_0_c6_c1"
            type="text"
            :placeholder="$t('建议留言前先与商家沟通确认')"
            confirm-type="done"
            :maxlength="50"
            placeholder-style="color:rgba(191, 191, 191, 1);font-size:28rpx"
            v-model="item.remark"
          />
        </view>
        <view class="flex flex-wrap align-center justify-end directOrder_fd4_0_c7">
          <text class="directOrder_fd4_0_c7_c2">{{ $t('heji', { num: item.goods_num }) }}</text>
          <view class="directOrder_fd4_0_c7_c4 text-price">
            <text class="f32">{{ item.shop_money | frontPrice }}</text>
            <text class="directOrder_price2_fd4_0_c7_c4">{{ item.shop_money | laterPrice }}</text>
          </view>
        </view>
      </view>
    </view>
    <!---结算信息flex布局结束-->
    <!---flex布局flex布局开始-->
    <view v-if="isPlatformCoupon" class="flex flex-direction align-stretch benben-flex-layout directOrder_flex_5">
      <view class="flex flex-wrap align-center directOrder_fd5_0" @tap.stop="queryCouponFunc()">
        <text class="flex-sub directOrder_fd5_0_c0">{{ $t('平台优惠券') }}</text>
        <text v-if="!orderInfo.coupon_money">{{ orderInfo.coupon_usable_num == 0 ? $t('无可用优惠券') : $t('选择优惠券') }}</text>
        <text v-else class="directOrder_fd5_0_c2_c0">{{ $t('优惠') }}{{ orderInfo.coupon_money }}{{ $t('元') }}</text>
        <text style="font-size: 24rpx; color: #aaa" class="fu-iconfont2">&#xe792;</text>
      </view>
      <view v-if="orderInfo.discount_str" class="flex flex-wrap align-center justify-between directOrder_fd5_1">
        <text class="directOrder_fd5_1_c0">{{ $t('会员折扣') }}</text>
        <view class="flex flex-wrap align-center">
          <text class="directOrder_fd5_1_c1_c0">{{ orderInfo.discount_str }}</text>
        </view>
      </view>
    </view>
    <view class="flex benben-position-layout flex flex-wrap align-center directOrder_flex_8">
      <text class="directOrder_fd8_0">{{ $t('总计：') }}</text>
      <view class="c-price directOrder_fd8_2 text-price">
        <text class="f32">{{ orderInfo.payable_money | frontPrice }}</text>
        <text class="directOrder_price2_fd8_2">{{ orderInfo.payable_money | laterPrice }}</text>
      </view>
      <button class="directOrder_fd8_3 bg-main c-f" @tap.stop="tz()">{{ $t('提交订单') }}</button>
    </view>
    <view :style="{ height: '120rpx' }"></view>
    <benben-popup v-model="couponPopupShow" :mask="true" mode="bottom">
      <view class="popup_box">
        <view class="popup_head">
          <text class="left_dian"></text>
          <text class="popup_head_title">{{ $t('优惠') }}</text>
          <text class="right_dian"></text>
          <text @click="couponPopupShow = false" class="popup_head_clean fu-iconfont2">&#xe8e7;</text>
        </view>
        <scroll-view class="fu-drawer-scroll-view" scroll-y="true">
          <view v-for="(item, key0) in couponList" class="coupon_item" @click="handleCoupon(item)">
            <view class="flex flex-wrap align-center directOrder_fd2_0_c1_c1_c0_c0">
              <text class="juan"></text>
              <view class="flex flex-direction flex-wrap align-stretch flex-sub directOrder_fd2_0_c1_c1_c0_c0_c1">
                <text class="directOrder_fd2_0_c1_c1_c0_c0_c1_c0_c0">{{ item.name }}</text>
                <view class="flex flex-wrap align-center directOrder_fd2_0_c1_c1_c0_c0_c1_c1 directOrder_fd2_0_c1_c1_c0_c0_c1_c1_c0">
                  {{ $t('有效期至') }}：{{ item.end_time }}
                </view>
              </view>
              <view class="directOrder_fd2_0_c1_c1_c0_c0_c2_c1">
                <text class="directOrder_price2_fd2_0_c1_c1_c0_c0_c2_c1">￥</text>
                <text class="directOrder_price1_fd2_0_c1_c1_c0_c0_c2_c1">{{ item.money | frontPrice }}</text>
                <text class="directOrder_price2_fd2_0_c1_c1_c0_c0_c2_c1">{{ item.money | laterPrice }}</text>
              </view>
            </view>
            <view class="flex flex-wrap align-center justify-between directOrder_fd2_0_c1_c1_c0_c1">
              <text class="directOrder_fd2_0_c1_c1_c0_c1_c0" v-if="item.content">{{ item.content }}</text>
              <button class="directOrder_fd2_0_c1_c1_c0_c1_c1" v-if="activeShop">
                {{ activeShop.couponId ? $t('已选择') : $t('立即使用') }}
              </button>
              <button class="directOrder_fd2_0_c1_c1_c0_c1_c1" v-else>
                {{ couponId ? $t('已选择') : $t('立即使用') }}
              </button>
            </view>
          </view>
        </scroll-view>
      </view>
    </benben-popup>
    <benben-popup v-model="invoicePopupShow" :mask="true" mode="bottom">
      <view class="popup_box">
        <view class="popup_head">
          <text class="left_dian"></text>
          <text class="popup_head_title">{{ $t('抬头选择') }}</text>
          <text class="right_dian"></text>
          <text @click="invoicePopupShow = false" class="popup_head_clean fu-iconfont2">&#xe8e7;</text>
        </view>
        <view style="padding: 0 24rpx 40rpx">
          <scroll-view v-if="invoiceList.length" class="fu-drawer-scroll-view" scroll-y="true">
            <view @click="handleinvoice(item)" v-for="(item, key0) in invoiceList" class="flex align-center flex directOrder_fd6_1_c0" :key="key0">
              <text v-if="activeShop && activeShop.invoiceId == item.aid" class="select_icon_active fu-iconfont2">&#xe847;</text>
              <text v-else class="select_icon fu-iconfont2">&#xe755;</text>
              <view class="flex flex-direction flex-wrap align-stretch flex-sub directOrder_fd6_1_c0_c1">
                <view class="flex flex-wrap align-center">
                  <text class="directOrder_fd6_1_c0_c1_c0_c0">{{ item.username }}</text>
                  <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c0_c2" v-if="item.type == '1'">
                    <text class="directOrder_fd9_1_c0_c0_c1_c0_c2_c0">{{ item.type_str }}</text>
                  </view>
                  <view class="flex flex-wrap align-center directOrder_fd9_1_c0_c0_c1_c0_c3" v-if="item.type == '2'">
                    <text class="directOrder_fd9_1_c0_c0_c1_c0_c2_c0">{{ item.type_str }}</text>
                  </view>
                </view>
                <view class="flex flex-wrap align-center directOrder_fd6_1_c0_c1_c1">
                  <view class="flex flex-direction flex-wrap align-stretch flex-sub">
                    <view class="flex flex-wrap align-center">
                      <text class="directOrder_fd6_1_c0_c1_c1_c0_c0_c0">{{ $t('联系邮箱') }}</text>
                      <text class="directOrder_fd6_1_c0_c1_c1_c0_c0_c1">{{ item.email }}</text>
                    </view>
                    <view class="flex flex-wrap align-center directOrder_fd6_1_c0_c1_c1_c0_c1">
                      <text class="directOrder_fd6_1_c0_c1_c1_c0_c1_c0">{{ $t('联系电话') }}</text>
                      <text class="directOrder_fd6_1_c0_c1_c1_c0_c1_c1">{{ item.mobile }}</text>
                    </view>
                  </view>
                  <view
                    class="flex flex-wrap align-center justify-center directOrder_fd9_1_c0_c0_c1_c1_c1"
                    @tap.stop="handleJumpPage('add-invoice', item.aid)"
                  >
                    <image class="directOrder_fd9_1_c0_c0_c1_c1_c1_c0" mode="aspectFit"  :src="benbenImageSrcResolution('editIcon.png', 'global')" ></image>
                    <text class="directOrder_fd9_1_c0_c0_c1_c1_c1_c1">{{ $t('编辑') }}</text>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
          <button class="directOrder_fd6_2" @tap.stop="handleJumpPage('add-invoice')">
            {{ $t('添加新的抬头') }}
          </button>
          <button class="directOrder_fd6_3" @tap.stop="closeInvoice">{{ $t('不开发票') }}</button>
        </view>
      </view>
    </benben-popup>
    <benben-popup v-model="freightExplainShow" :mask="true" mode="bottom">
      <view class="popup_box">
        <view class="popup_head">
          <text class="left_dian"></text>
          <text class="popup_head_title">{{ $t('运费说明') }}</text>
          <text class="right_dian"></text>
          <text @click="freightExplainShow = false" class="popup_head_clean fu-iconfont2">&#xe8e7;</text>
        </view>
        <scroll-view class="fu-drawer-scroll-view" scroll-y="true">
          <mp-html style="padding: 24rpx" :content="freight_explain | richTextFormat" />
        </scroll-view>
      </view>
    </benben-popup>
    <!-- 不在配送范围内商品弹框 start -->
    <benben-popup ref="list_fail_goods" mode="center" border-radius="8" :mask-close-able="false" v-model="tipspop">
      <view class="model-notice-box bg-white radius">
        <view class="header text-333 text-bold">{{ $t('抱歉，以下商品不在配送范围') }}</view>
        <view class="content1 coupon-wrap-scroll">
          <view class="goods_fail_list">
            <view class="item flex" v-for="(item, index) in goods_fail_list" style="margin-top: 20rpx">
              <view class="img-box">
                <view class="img">
                  <fu-image :src="item.thumb" mode="aspectFill"></fu-image>
                </view>
              </view>
              <view class="info-box">
                <view class="info-top">
                  <view class="title text-cut">{{ item.name }}</view>
                  <view class="text-sm text-999 key_name" v-if="item.key_name">
                    <view class="overFlow_text text-cut">
                      <text>{{ item.key_name }}</text>
                    </view>
                  </view>
                </view>
                <view class="price-box flex justify-between text-sm">
                  <view class="price">
                    <text class="small">￥</text>
                    {{ item | filterGoodsPrice }}
                  </view>
                  <view class="num">x{{ item.num }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="flex justify-center bottom">
          <view @click="handleJumpPage('select-address', address.aid)" class="bottom_content_1 cu-tag round text-white margin-right">
            {{ $t('更改收货地址') }}
          </view>
          <view
            @tap.stop="handleJumpDiy"
            data-type="back"
            data-url="1"
            class="bottom_content cu-tag round text-white bg-theme"
            style="margin-left: 20rpx"
          >
            {{ $t('返回上一页') }}
          </view>
        </view>
      </view>
    </benben-popup>
  </view>
</template>
<script>
export default {
  name: 'benben-place-order',
  components: {},
  mixins: [],
  // 购物车列表
  props: {
    addressId: {
      type: [String, Number],
      default: '',
    },
    goodsId: {
      type: [String, Number],
      default: '',
    },
    skuId: {
      type: [String, Number],
      default: '',
    },
    num: {
      type: [String, Number],
      default: '',
    },
    orderOn: {
      type: [String, Number],
      default: '',
    },
    cartIds: {
      type: [String, Number],
      default: '',
    },
    isInvoice: {
      //是否显示发票
      type: Boolean,
      default: true,
    },
    isCoupon: {
      //是否显示优惠券
      type: Boolean,
      default: true,
    },
    isPlatformCoupon: {
      //是否显示平台优惠券
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      orderInfo: {},
      orderList: [],
      goods_fail_list: [],
      tipspop: false,
      couponId: '',
      address: {},
      invoiceList: [],
      couponList: [],
      couponPopupShow: false,
      invoicePopupShow: false,
      freightExplainShow: false,
      freight_explain: '',
      activeShop: null,
    }
  },
  computed: {},
  watch: {
    addressId(val) {
      if (val !== this.address.aid) {
        this.initData()
      }
    },
  },
  created() {
    // this.initData()
  },
  beforeDestroy() {},
  methods: {
    handleJumpPage(type, data = '') {
      this.$emit(type, data)
    },
    closeInvoice() {
      this.activeShop.invoiceId = ''
      this.invoicePopupShow = false
    },
    openFreightExplainShow(item) {
      if (item.freight_explain) {
        this.freight_explain = item.freight_explain
        this.freightExplainShow = true
      }
    },
    handleinvoice(item) {
      if (!this.activeShop) return
      this.activeShop.invoiceId = this.activeShop.invoiceId == item.aid ? '' : item.aid
      this.invoicePopupShow = false
    },
    handleCoupon(item) {
      if (this.activeShop) {
        this.activeShop.couponId = item.aid == this.activeShop.couponId ? '' : item.aid
      } else {
        this.couponId = item.aid == this.couponId ? '' : item.aid
      }
      this.couponPopupShow = false
      this.initData()
    },
    openInvoice(item) {
      this.invoicePopupShow = true
      this.activeShop = item
    },
    //获取发票列表
    async getInvoiceList() {
      //请求方法
      //数据验证
      let {
        data: { data, code, msg },
      } = await this.$api.get(global.apiUrls.getInvoiceListApi, {})
      if (code != 1) {
        this.$message.info(msg)
        return
      }
      this.invoiceList = data
    },
    //调用删除购物车方法 并更新购物车列表
    delCartGoods() {
      this.$api
        .post(global.apiUrls.delCartGoodsApi, {
          cart_ids: this.cartid,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$store.dispatch('getCartList')
          } else {
            this.$message.info(res.data.msg)
          }
        })
        .catch((err) => {
          console.log('err: ' + JSON.stringify(err))
        })
    },
    //获取可用优惠券
    async queryCouponFunc(activeData, type) {
      let money = 0
      let shopid = 0
      if (type == 'shop') {
        this.activeShop = activeData
        money = activeData.goods_money
        shopid = activeData.shop_info.aid
      } else {
        this.activeShop = null
        money = Number(this.orderInfo.payable_money) + Number(this.orderInfo.coupon_money)
      }
      let {
        data: { data, code, msg },
      } = await this.$api.post(global.apiUrls.queryCouponApi, {
        money: money,
        partner_id: shopid,
        category_ids: this.orderInfo.coupon_search.category,
        goods_ids: this.orderInfo.coupon_search.goods,
      })
      if (code != 1) {
        this.$message.info(msg)
        return
      }
      this.couponList = data
      if (this.couponList.length == 0) {
        this.$message.info(global.i18n.t('暂无可用优惠券'))
      } else {
        this.couponPopupShow = true
      }
    },
    async initData() {
      let apiUrl = global.apiUrls.getGoodsOrderInfoApi
      let postData = { address_id: this.addressId, coupon_id: this.couponId, shop_coupon_id: {} }
      this.orderList.map((item) => {
        if (item.couponId) {
          postData.shop_coupon_id[item.shop_info.aid] = { coupon_id: item.couponId }
        }
      })
      if (this.cartIds) {
        apiUrl = global.apiUrls.getOrderInfoApi
        postData.cart_ids = this.cartIds
      } else {
        postData.sku_id = this.skuId
        postData.number = this.num
        postData.goods_id = this.goodsId
      }
      let {
        data: { data, code, msg },
      } = await this.$api.post(apiUrl, postData)
      if (code != 1) {
        this.$message.info(msg)
        setTimeout(() => {
          uni.navigateBack()
        }, 1000)
        return
      }
      if (data.list_fail.length > 0) {
        this.tipspop = true
        this.goods_fail_list = data.list_fail
      } else {
        this.tipspop = false
      }
      if (data.address && data.address.aid) {
        this.address = data.address

        if (this.addressId != data.address.aid) this.$emit('update:address-id', data.address.aid)
      } else {
        this.address = {}
        this.$emit('update:address-id', '')
      }
      data.list.forEach((item) => {
        let shopInfo = this.orderList.find((val) => val.shop_info.aid == item.shop_info.aid)
        if (shopInfo) {
          item.couponId = item.coupon_money ? shopInfo.couponId : ''
          item.invoiceId = shopInfo.invoiceId
          item.remark = shopInfo.remark
        } else {
          item.couponId = ''
          item.invoiceId = ''
          item.remark = ''
        }
      })
      this.orderList = data.list
      this.orderInfo = data
      if (data.coupon_money == 0) this.couponId = ''
    },
    //
    tz() {
      if (!this.address.aid) {
        this.$message.info(global.i18n.t('请选择地址'))
        return false
      }
      // 将商品信息传给后端
      let newGoods = []
      let shop_coupon_list = {}
      let invoice_list = {}
      let remark_list = {}
      this.orderList.map((item) => {
        newGoods = [...newGoods, ...item.goods]
        if (item.couponId) shop_coupon_list[item.shop_info.aid] = { coupon_id: item.couponId }
        if (item.invoiceId) invoice_list[item.shop_info.aid] = { invoice_id: item.invoiceId }
        if (item.remark) remark_list[item.shop_info.aid] = { remark: item.remark }
      })
      let postData = {
        coupon_id: this.couponId,
        order_info: JSON.stringify({ goods: newGoods, address: this.address }),
        shop_coupon_list: JSON.stringify(shop_coupon_list),
        invoice_list: JSON.stringify(invoice_list),
        remark_list: JSON.stringify(remark_list),
        address_id: this.address.aid,
      }
      this.$api.dbPost(global.apiUrls.postSubmitOrderApi, postData).then((res) => {
        res = res.data
        if (res.code == 1) {
          this.$emit('update:order-on', res.data.order_sn[0])
          if (Number(this.dataEssayMessage.payable_money) == 0) {
            this.handleJumpPage('jump-payment')
          } else {
            this.handleJumpPage('jump-payment-success')
          }
          if (this.cartIds) {
            this.delCartGoods()
          }
        } else {
          this.$message.info(res.msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.bottom_line {
  height: 6rpx;
  background-size: 110rpx 6rpx;
  background-image: linear-gradient(45deg, #ffffff 10rpx, #617ecc 10rpx 30rpx, #ffffff 30rpx 50rpx, #ea5a68 50rpx 70rpx, #ffffff 70rpx 80rpx);
}
.popup_box {
  background-color: #fff;
  border-radius: 16rpx 16rpx 0 0;

  .popup_head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
    position: relative;
    .popup_head_clean {
      color: #ccc;
      width: 80rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 36rpx;
    }

    .popup_head_title {
      padding: 0 32rpx;
      font-size: 40rpx;
      font-weight: 700;
    }

    .left_dian {
      &::after {
        display: inline-block;
        content: '';
        width: 10rpx;
        height: 10rpx;
        border-radius: 50rpx;
        background: var(--components-theme-bg);
        margin-left: 10rpx;
      }
      &::before {
        display: inline-block;
        content: '';
        width: 10rpx;
        height: 10rpx;
        border-radius: 50rpx;
        background: var(--components-theme-bg);
        opacity: 0.4;
      }
    }
    .right_dian {
      &::before {
        display: inline-block;
        content: '';
        width: 10rpx;
        height: 10rpx;
        border-radius: 50rpx;
        background: var(--components-theme-bg);
        margin-right: 10rpx;
      }
      &::after {
        display: inline-block;
        content: '';
        width: 10rpx;
        height: 10rpx;
        border-radius: 50rpx;
        background: var(--components-theme-bg);
        opacity: 0.4;
      }
    }
  }
}

.address_box {
  background-color: #fff;
  margin-bottom: 20rpx;
  .location_icon {
    width: 45rpx;
    height: 45rpx;
    display: flex;
    align-items: center;
    background: var(--components-theme-bg2);
    border-radius: 50%;
    color: var(--components-theme-color);
    justify-content: center;
    font-size: 24rpx;
  }
  .address_null {
    height: 150rpx;
  }
  .address_info {
    padding: 20rpx 32rpx;
    .address_row1 {
      font-weight: 700;
      color: #333333;
      padding-bottom: 16rpx;
      line-height: 35rpx;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      .address_label {
        background: rgba(105, 139, 255, 0.08);
        border-radius: 8rpx;
        border: 1px solid #698bff;
        padding: 0rpx 16rpx;
        color: #698bff;
        font-weight: 500;
        font-size: 24rpx;
        margin-right: 8rpx;
      }
      .real_name {
        max-width: 200rpx;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .directOrder_fd3_0_c0_c1_c1_c0_c0 {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
    }
  }
}
.coupon_item {
  border: 5px solid #f02325;
  border-radius: 16rpx;
  width: 700rpx;
  margin: 0 auto 15rpx;
  position: relative;
  padding: 20rpx;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    left: -8rpx;
    border-right: 16rpx dotted #f02325;
  }
  .juan {
    width: 100rpx;
    height: 85rpx;
    display: flex;
    align-items: center;
    font-size: 46rpx;
    color: #fff;
    justify-content: center;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      z-index: 0;
      background: linear-gradient(135deg, #fa2332, #fb5f2f);
    }
    &::before {
      content: '券';
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -40%);
    }
  }
}
.fu-drawer-scroll-view {
  max-height: 700rpx;
  min-height: 400rpx;

  .directOrder_fd2_0_c1_c1_c0_c0 {
    border-bottom: 1px dashed rgba(221, 221, 221, 1);
    padding: 0rpx 0rpx 14rpx 0rpx;
  }
}
.directOrder_fd5_0_c2_c0 {
  color: #fa2033;
  font-size: 22rpx;
  font-weight: bold;
  line-height: 36rpx;
  padding: 0 15rpx;
  background: linear-gradient(180deg, #fdd3d3 0%, #ffdede 100%);
  border-radius: 8rpx 8rpx 8rpx 8rpx;
}
.select_icon_active {
  color: var(--components-theme-color);
}
.select_icon {
  color: #eee;
}

.directOrder_fd1_0_c1 {
  line-height: 45rpx;
  font-size: 32rpx;
  font-weight: 700;
  color: #333333;
  max-width: 200rpx;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 0rpx 0rpx 0rpx 24rpx;
}

.directOrder_fd2_0_c1_c1_c0_c1_c1 {
  background: linear-gradient(180deg, #ffa095 0%, #fd513d 100%);
  border-radius: 24rpx 24rpx 24rpx 24rpx;
  font-size: 24rpx;
  color: #fff;
  width: 120rpx;
  height: 48rpx;
  line-height: 48rpx;
}

.directOrder_fd2_0_c1_c1_c0_c1_c0 {
  color: #333333;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 33rpx;
}

.directOrder_fd2_0_c1_c1_c0_c1 {
  margin: 20rpx 0rpx 0rpx 0rpx;
}

.directOrder_price2_fd2_0_c1_c1_c0_c0_c2_c1 {
  font-size: 33rpx;
}

.directOrder_price1_fd2_0_c1_c1_c0_c0_c2_c1 {
  font-size: 49rpx;
}

.directOrder_fd2_0_c1_c1_c0_c0_c2_c1 {
  color: rgba(240, 35, 37, 1);
  font-weight: 600;
}

.directOrder_fd2_0_c1_c1_c0_c0_c1_c1_c0 {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 33rpx;
}

.directOrder_fd2_0_c1_c1_c0_c0_c1_c1 {
  margin: 8rpx 0rpx 0rpx 0rpx;
}

.directOrder_fd2_0_c1_c1_c0_c0_c1_c0_c0 {
  color: #333333;
  font-size: 32rpx;
  font-weight: bold;
  line-height: 45rpx;
}

.directOrder_fd2_0_c1_c1_c0_c0_c1 {
  margin: 0rpx 0rpx 0rpx 16rpx;
}

.directOrder_fd9_1_c0_c0_c1_c0_c3 {
  background: #1a76f2;
  margin: 0rpx 0rpx 0rpx 10rpx;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  padding: 0rpx 8rpx 0rpx 8rpx;
}

.directOrder_fd9_1_c0_c0_c1_c0_c2_c0 {
  color: #fff;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 33rpx;
}

.directOrder_fd9_1_c0_c0_c1_c0_c2 {
  background: #ff9b26;
  margin: 0rpx 0rpx 0rpx 10rpx;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  padding: 0rpx 8rpx 0rpx 8rpx;
}

.directOrder_flex_4 {
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  padding: 0rpx;
}

.directOrder_price2_fd4_0_c7_c4 {
  font-size: 24rpx;
}

.directOrder_fd4_0_c7_c4 {
  color: rgba(250, 32, 51, 1);
  font-weight: bold;
  line-height: 32rpx;
  font-size: 32rpx;
}

.directOrder_fd4_0_c7_c2 {
  line-height: 33rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #666666;
}

.directOrder_fd4_0_c7_c1 {
  line-height: 33rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #666666;
}

.directOrder_fd4_0_c7_c0 {
  line-height: 33rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #666666;
}

.directOrder_fd4_0_c7 {
  margin: 0rpx 0rpx 32rpx 0rpx;
}

.directOrder_fd4_0_c6_c1 {
  margin: 0rpx 0rpx 0rpx 32rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #333;
}

.directOrder_fd4_0_c6_c0 {
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.directOrder_fd4_0_c6 {
  margin: 0rpx 0rpx 40rpx 0rpx;
}

.directOrder_fd4_0_c5_c1 {
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  margin: 0rpx 0rpx 0rpx auto;
}

.directOrder_fd4_0_c5_c0 {
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.directOrder_fd4_0_c5 {
  margin: 0rpx 0rpx 40rpx 0rpx;
}

.directOrder_fd4_0_c4_c0 {
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.directOrder_fd4_0_c4 {
  margin: 0rpx 0rpx 40rpx 0rpx;
}

.directOrder_fd4_0_c3_c1_c1 {
  color: #fa2033;
  font-size: 22rpx;
  font-weight: bold;
  line-height: 30rpx;
}

.directOrder_fd4_0_c3_c0 {
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.directOrder_fd4_0_c3 {
  margin: 0rpx 0rpx 40rpx 0rpx;
}

.directOrder_fd4_0_c2_c2 {
  color: #333333;
  font-weight: 400;
  line-height: 40rpx;
  font-size: 28rpx;
}

.directOrder_fd4_0_c2_c1 {
  margin: 0rpx 0rpx 0rpx auto;
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
}

.directOrder_fd4_0_c2_c0 {
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.directOrder_fd4_0_c2 {
  border-top: 1px solid #eee;
  margin: 0rpx 0rpx 32rpx 0rpx;
  padding: 32rpx 0rpx 0rpx 0rpx;
}

.directOrder_fd4_0_c1_c1_c2_c3 {
  line-height: 33rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
}

.directOrder_fd4_0_c1_c1_c2_c2 {
  margin: 0rpx 0rpx 0rpx auto;
  line-height: 33rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
}

.directOrder_price2_fd4_0_c1_c1_c2_c1 {
  font-size: 24rpx;
}

.directOrder_fd4_0_c1_c1_c2_c1 {
  font-weight: 700;
  line-height: 40rpx;
  font-size: 32rpx;
}

.directOrder_fd4_0_c1_c1_c1 {
  line-height: 33rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
  margin: 8rpx 0rpx 28rpx 0rpx;
}

.directOrder_fd4_0_c1_c1_c0 {
  line-height: 42rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  height: 84rpx;
}

.directOrder_fd4_0_c1_c0 {
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  margin: 0rpx 24rpx 0rpx 0rpx;
}

.directOrder_fd4_0_c1 {
  margin: 0rpx 0rpx 32rpx 0rpx;
}

.directOrder_fd4_0_c0_c1 {
  color: rgba(102, 102, 102, 1);
  font-size: 28rpx;
  font-weight: bold;
  line-height: 40rpx;
  margin: 0rpx 16rpx 0rpx 0rpx;
}

.directOrder_fd4_0_c0 {
  margin: 0rpx 0rpx 32rpx 0rpx;
}

.directOrder_fd4_0 {
  background: #fff;
  padding: 32rpx 24rpx 0rpx 24rpx;
  margin: 0rpx 0rpx 20rpx 0rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.directOrder_flex_5 {
  background: #ffffff;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  padding: 32rpx 32rpx 0rpx 32rpx;
}

.directOrder_fd5_1_c1_c0 {
  color: #333333;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 40rpx;
}

.directOrder_fd5_1_c0 {
  color: #333333;
  font-size: 28rpx;
  font-weight: bold;
  line-height: 40rpx;
}

.directOrder_fd5_1 {
  margin: 0rpx 0rpx 32rpx 0rpx;
  padding-top: 32rpx;
  border-top: 1px solid rgba(238, 238, 238, 1);
}

.directOrder_fd5_0_c0 {
  line-height: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.directOrder_fd5_0 {
  padding: 0rpx 0rpx 32rpx 0rpx;
}

.directOrder_fd6_3 {
  background: #eeeeee;
  border-radius: 44rpx 44rpx 44rpx 44rpx;
  font-size: 32rpx;
  color: rgba(102, 102, 102, 1);
  width: 686rpx;
  height: 80rpx;
  line-height: 80rpx;
  margin: 0rpx 8rpx 0rpx 8rpx;
}

.directOrder_fd6_2 {
  background: var(--components-theme-bg);
  border-radius: 44rpx 44rpx 44rpx 44rpx;
  font-size: 32rpx;
  color: #fff;
  width: 686rpx;
  height: 80rpx;
  line-height: 80rpx;
  margin: 56rpx 8rpx 24rpx 8rpx;
}

.directOrder_fd6_1_c0_c1_c1_c0_c1_c1 {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 33rpx;
  margin: 0rpx 0rpx 0rpx 10rpx;
}

.directOrder_fd6_1_c0_c1_c1_c0_c1_c0 {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 33rpx;
}

.directOrder_fd6_1_c0_c1_c1_c0_c1 {
  margin: 8rpx 0rpx 0rpx 0rpx;
}

.directOrder_fd6_1_c0_c1_c1_c0_c0_c1 {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 33rpx;
  margin: 0rpx 0rpx 0rpx 10rpx;
}

.directOrder_fd6_1_c0_c1_c1_c0_c0_c0 {
  color: #999999;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 33rpx;
}

.directOrder_fd6_1_c0_c1_c1 {
  margin: 16rpx 0rpx 0rpx 0rpx;
}

.directOrder_fd6_1_c0_c1_c0_c0 {
  color: #333333;
  font-size: 28rpx;
  font-weight: bold;
  line-height: 40rpx;
}

.directOrder_fd6_1_c0_c1 {
  margin: 0rpx 0rpx 0rpx 32rpx;
}

.directOrder_fd6_1_c0 {
  background: #f8f8f8;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  padding: 32rpx 32rpx 32rpx 32rpx;
  margin: 32rpx 0rpx 0rpx 0rpx;
}

.directOrder_flex_8 {
  background: #fff;
  width: 750rpx;
  height: 90rpx;
  overflow: hidden;
  z-index: 10;
  bottom: calc(0rpx + var(--window-bottom));
  background-size: 100% auto !important;
}

.directOrder_fd8_3 {
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  font-size: 32rpx;
  margin: 0rpx 0rpx 0rpx auto;
  width: 280rpx;
  height: 90rpx;
  line-height: 90rpx;
  background: var(--components-theme-bg);
  color: #fff;
}

.directOrder_price2_fd8_2 {
  font-size: 24rpx;
}

.directOrder_fd8_2 {
  font-weight: 700;
  line-height: 32rpx;
  font-size: 32rpx;
}

.directOrder_fd8_0 {
  color: #1a1a1a;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 40rpx;
  margin: 0rpx 4rpx 0rpx 32rpx;
}

// 积分弹框 start
.model-notice-box {
  width: 550rpx;

  .header {
    padding: 40rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
  }

  .bottom_content {
    margin: 30rpx 0;
    text-align: center;
    width: 200rpx;
    background: linear-gradient(270deg, rgba(249, 34, 19, 1) 0%, rgba(255, 70, 14, 0.8) 100%);
  }

  .bottom_content_1 {
    margin: 30rpx 0;
    text-align: center;
    width: 200rpx;
    border: 1rpx solid rgba(255, 70, 14, 0.8);
    color: rgba(249, 34, 19, 1);
    background: #fff;
  }
}

// 积分弹框 end

.directOrder_fd9_1_c0_c0_c1_c1_c1_c1 {
  color: var(--components-theme-color);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 28rpx;
  margin: 0rpx 0rpx 0rpx 12rpx;
}

.directOrder_fd9_1_c0_c0_c1_c1_c1_c0 {
  width: 30rpx;
  height: 30rpx;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.directOrder_fd9_1_c0_c0_c1_c1_c1 {
  border: 1px solid rgba(27, 142, 77, 0.4);
  background: rgba(27, 142, 77, 0.1);
  border-radius: 28rpx 28rpx 28rpx 28rpx;
  width: 130rpx;
  height: 48rpx;
}
.goods_fail_list {
  margin: 20rpx 0;
  // 商品图片
  .img-box {
    width: 110rpx;
    height: 110rpx;
    flex-shrink: 0;
    margin-left: 24rpx;
    overflow: hidden;
    border-radius: 16rpx;
    position: relative;

    .img {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      width: 110rpx;
      height: 110rpx;
    }
  }
  .info-box {
    width: 370rpx;
    margin: 0 auto;
    padding: 0 20rpx;
    overflow: hidden;
    margin-bottom: 40rpx;
  }
}
</style>
