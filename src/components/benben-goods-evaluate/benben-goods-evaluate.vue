<template>
  <view>
    <template v-for="(item, itemIndex) in goodsList">
      <view v-if="item.refund_id <= 0" class="flex flex-direction flex-wrap align-stretch benben-flex-layout evaluate_flex_1" :key="itemIndex">
        <view class="flex flex-direction flex-wrap align-stretch evaluate_fd1_0">
          <view class="flex flex-wrap align-stretch evaluate_fd1_0_c0">
            <image class="evaluate_fd1_0_c0_c0" mode="aspectFit" :src="item.goods_thumb"></image>
            <view class="flex flex-direction flex-wrap align-stretch flex-sub evaluate_fd1_0_c0_c1">
              <text class="evaluate_fd1_0_c0_c1_c0">{{ item.goods_name }}</text>
              <text class="evaluate_fd1_0_c0_c1_c1">{{ item.sku_name }}</text>
              <view class="flex flex-wrap align-center justify-between" style="margin-top: auto">
                <view class="flex flex-wrap align-center">
                  <text class="evaluate_fd1_0_c0_c1_c2_c0_c0">{{ beforeText }}</text>
                  <view class="evaluate_fd1_0_c0_c1_c2_c0_c1">
                    <text class="evaluate_price1_fd1_0_c0_c1_c2_c0_c1">{{ item.shop_price | frontPrice }}</text>
                    <text class="evaluate_price2_fd1_0_c0_c1_c2_c0_c1">{{ item.shop_price | laterPrice }}</text>
                  </view>
                  <text class="evaluate_fd1_0_c0_c1_c2_c0_c0">{{ afterText }}</text>
                </view>
                <view class="flex flex-wrap align-center evaluate_fd1_0_c0_c1_c2_c1">
                  <text>x</text>
                  <text>{{ item.num }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="flex flex-wrap align-center justify-between evaluate_fd1_0_c1">
            <text class="evaluate_fd1_0_c1_c0">{{ $t('商品评价') }}</text>
            <view class="flex flex-wrap align-center">
              <text
                @click="submitData[itemIndex].star = starNum"
                :class="{ 'fu-iconfont2': true, 'star-icon': true, 'active-star': submitData[itemIndex].star >= starNum }"
                v-for="starNum in [1, 2, 3, 4, 5]"
                :key="starNum"
              >
                &#xe841;
              </text>
            </view>
          </view>
          <view class="flex flex-wrap align-center">
            <view class="flex flex-wrap evaluate_fd1_0_c2_c0">
              <textarea
                class="flex evaluate_input_fd1_0_c2_c0"
                confirm-type="done"
                :placeholder="$t('请输入您的评价')"
                :maxlength="contentMaxlength"
                placeholder-style="color:#999;font-size:28rpx"
                v-model="submitData[itemIndex].content"
              />
            </view>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch">
            <view class="evaluate_fd1_0_c3_c0">
              <text class="evaluate_fd1_0_c3_c0_c0">{{ $t('添加照片') }}</text>
              <text class="evaluate_fd1_0_c3_c0_c1">{{ $t('最多可上传') }}{{ maxlength }}{{ $t('s张') }}</text>
            </view>
            <view class="flex flex-wrap align-start flex evaluate_fd1_0_c3_c1">
              <view v-for="(image, index) in submitData[itemIndex].images" :key="index" class="flex position-relative evaluate_fd1_0_c3_c10">
                <text
                  class="fu-iconfont2 position-absolute evaluate_fd1_0_c3_c100"
                  @tap.stop="delImage(submitData[itemIndex], index, 'thumb', 'images')"
                >
                  &#xE8E7;
                </text>
                <image
                  mode="aspectFill"
                  class="evaluate_fd1_0_c3_c101"
                  @tap.stop="previewImage(submitData[itemIndex].images, index)"
                  :src="image"
                ></image>
              </view>
              <image
                class="evaluate_fd1_0_c3_c11"
                @tap.stop="manyChooseImage(submitData[itemIndex], 'thumb', 'images')"
                v-if="submitData[itemIndex].images.length < maxlength"
                mode="aspectFit"
                :src="benbenImageSrcResolution('119.jpg', 'global')"
              ></image>
            </view>
          </view>
          <view class="flex flex-wrap align-center" @tap.stop="submitData[itemIndex].is_anonymous = !submitData[itemIndex].is_anonymous">
            <text :class="{ 'fu-iconfont2': true, 'checked-icon': true, 'active-checked': !submitData[itemIndex].is_anonymous }">
              {{ submitData[itemIndex].is_anonymous ? '&#59221;' : '&#xe8e4;' }}
            </text>
            <text class="evaluate_fd1_0_c4_c1">{{ $t('匿名评价') }}</text>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { UploadImage } from '@/common/utils/index'
import { SERVER_TYPE } from '@/config'
export default {
  name: 'benben-goods-evaluate',
  props: {
    // 商品列表
    goodsList: {
      type: Array,
      default: () => [],
    },
    // 提交数据
    value: {
      type: [String],
      default: '',
    },
    contentMaxlength: {
      type: [String, Number],
      default: 200,
    },
    afterText: {
      type: [String, Number],
      default: '',
    },
    beforeText: {
      type: [String, Number],
      default: global.i18n.t('￥'),
    },
  },
  data() {
    return {
      submitData: [],
      maxlength: 9,
    }
  },
  computed: {
    selectSpecStr() {
      return ''
    },
  },
  watch: {
    goodsList: {
      handler(value) {
        let submitData = []
        value.map((item) => {
          let info = this.submitData.find((val) => val.goods_id == item.goods_id && val.sku_id == item.sku_id)
          if (info) {
            submitData.push(info)
          } else {
            submitData.push({
              refund_id: item.refund_id,
              sku_id: item.sku_id,
              goods_id: item.goods_id,
              star: 5,
              content: '',
              thumb: '',
              images: [],
              is_anonymous: false,
            })
          }
        })
        this.submitData = submitData
      },
      deep: true,
      immediate: true,
    },
    submitData: {
      handler(value) {
        let goods_comment = []
        for (let index = 0; index < value.length; index++) {
          const element = value[index]
          if (element.refund_id <= 0) {
            goods_comment.push({
              goods_id: element.goods_id,
              sku_id: element.sku_id,
              star: element.star,
              content: element.content ? element.content : global.i18n.t('这家伙太懒什么都没有留下'),
              thumb: SERVER_TYPE ? element.thumb : element.images,
              star: element.star,
              type: element.is_anonymous ? 1 : 0,
            })
          }
        }
        this.$emit('input', JSON.stringify(goods_comment))
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    //点击删除
    delImage(item, index, idsName, imgsName) {
      let imgIdArr = item[idsName] ? (item[idsName] + '').split(',') : []
      let imgList = JSON.parse(JSON.stringify(item[imgsName]))
      imgIdArr.splice(index, 1)
      imgList.splice(index, 1)
      this.$set(item, idsName, imgIdArr.join(','))
      this.$set(item, imgsName, imgList)
    },
    //点击预览
    previewImage(imgList, index) {
      uni.previewImage({
        current: imgList[index],
        urls: imgList,
      })
    },
    //点击上传
    manyChooseImage(item, idsName, imgsName) {
      let self = this
      let imgIdArr = item[idsName] ? (item[idsName] + '').split(',') : []
      let imgList = JSON.parse(JSON.stringify(item[imgsName]))
      if (self.uploading) return
      if (self.maxlength - imgList.length < 1) return
      // 从相册中选择图片
      uni.chooseImage({
        count: self.maxlength - imgList.length, // 默认3
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        success: function (res) {
          self.uploading = true
          // 开始上传
          new UploadImage(res.tempFiles, {
            complete: function (res) {
              self.uploading = false
              res.map((item) => {
                imgIdArr.push(item.id)
                imgList.push(item.path)
              })
              self.$set(item, idsName, imgIdArr.join(','))
              self.$set(item, imgsName, imgList)
            },
          })
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.star-icon {
  padding: 0 5rpx;
  font-size: var(--star-size);
  color: var(--star-color);
  &.active-star {
    color: var(--active-star-color);
  }
}
.checked-icon {
  padding: 0 5rpx;
  font-size: var(--checked-size);
  color: #ccc;
  &.active-checked {
    color: var(--checked-activer-color);
  }
}
.evaluate_fd1_0 {
  background: #fff;
  background-size: 100%;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  padding: 32rpx 24rpx 32rpx 24rpx;
  background-size: 100% auto;
  margin: 12rpx 0rpx 12rpx 0rpx;
}

.evaluate_fd1_0_c0 {
  border-bottom: 1px solid #eee;
  padding: 0rpx 0rpx 32rpx 0rpx;
}

.evaluate_fd1_0_c0_c0 {
  width: 200rpx;
  height: 200rpx;
}

.evaluate_fd1_0_c0_c1 {
  margin: 0rpx 0rpx 0rpx 34rpx;
}

.evaluate_fd1_0_c0_c1_c0 {
  font-size: 28rpx;
  font-weight: 500;
  color: #333333;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.evaluate_fd1_0_c0_c1_c1 {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
  margin: 10rpx 0rpx 36rpx 0rpx;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.evaluate_fd1_0_c0_c1_c2_c0_c0 {
  font-size: 20rpx;
  font-weight: 700;
  color: #ff4133;
}

.evaluate_fd1_0_c0_c1_c2_c0_c1 {
  margin-top: auto;
  color: #ff5536;
  font-weight: 600;
}

.evaluate_price1_fd1_0_c0_c1_c2_c0_c1 {
  font-size: 32rpx;
}

.evaluate_price2_fd1_0_c0_c1_c2_c0_c1 {
  font-size: 22rpx;
}

.evaluate_fd1_0_c0_c1_c2_c1 {
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
}

.evaluate_fd1_0_c1 {
  border-bottom: 1px solid #eee;
  padding: 32rpx 0rpx 32rpx 0rpx;
}

.evaluate_fd1_0_c1_c0 {
  font-size: 32rpx;
  font-weight: 400;
  color: #333333;
}

.evaluate_fd1_0_c2_c0 {
  background: rgba(248, 248, 248, 1);
  background-size: 100%;
  width: 654rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  height: 272rpx;
  margin: 32rpx 0rpx 0rpx 0rpx;
  padding: 20rpx 20rpx 20rpx 20rpx;
}

.evaluate_input_fd1_0_c2_c0 {
  width: 100%;
  height: 100%;
  font-size: 28rpx;
  font-weight: 400;
  color: #333;
}

.evaluate_fd1_0_c3_c0 {
  margin: 32rpx 0rpx 0rpx 0rpx;
}

.evaluate_fd1_0_c3_c0_c0 {
  font-size: 32rpx;
  font-weight: 400;
  color: #333333;
}

.evaluate_fd1_0_c3_c0_c1 {
  font-size: 24rpx;
  font-weight: 400;
  color: #bfbfbf;
  margin: 0rpx 0rpx 0rpx 16rpx;
}

.evaluate_fd1_0_c3_c1 {
  width: 100%;
  padding: 32rpx 24rpx 0;
}

.evaluate_fd1_0_c3_c10 {
  margin: 0rpx 24rpx 24rpx 0rpx;

  &:nth-child(3n) {
    margin-right: 0;
  }
}

.evaluate_fd1_0_c3_c100 {
  top: 0rpx;
  right: 0rpx;
  z-index: 10;
  color: #ff5536;
}

.evaluate_fd1_0_c3_c101 {
  width: 186rpx;
  height: 186rpx;
}

.evaluate_fd1_0_c3_c11 {
  width: 186rpx;
  height: 186rpx;
  margin-bottom: 24rpx;
}

.evaluate_fd1_0_c4_c1 {
  font-size: 24rpx;
  font-weight: 400;
  color: #666666;
}

.evaluate_flex_1 {
  padding: 5rpx 24rpx 0rpx 24rpx;
}
</style>
