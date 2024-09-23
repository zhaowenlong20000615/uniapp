import {
  API_VERSION,
} from '@/config';
export default {
  getInvoiceListApi: `/${API_VERSION}/641848d371e2f`, //获取发票列表
  delCartGoodsApi: `/${API_VERSION}/62beb3fca0209`, //调用删除购物车方法 并更新购物车列表
  queryCouponApi: `/${API_VERSION}/5d916c0c775ff`, //获取可用优惠券
  getGoodsOrderInfoApi: `/${API_VERSION}/62c6a51abaf56`, //获取订单信息 直接下单
  getOrderInfoApi: `/${API_VERSION}/62c7980999c75`, //获取订单信息 直接下单
  postSubmitOrderApi: `/${API_VERSION}/62c8038d96dab`, //获取订单信息 直接下单
}
