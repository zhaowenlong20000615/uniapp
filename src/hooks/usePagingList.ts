import { PAGE_SIZE } from '@/config'
import { onLoad, onPullDownRefresh, onReachBottom, onUnload } from '@dcloudio/uni-app'
import { computed, getCurrentInstance, ref, unref, watchEffect } from 'vue'

import type { IRes } from '@/utils/http/type'
import type { ComputedRef, Ref } from 'vue'
import { EventBusKey, HttpCode } from '@/constant'

export type RequireIf<T, Keys extends keyof T, B> = Pick<T, Exclude<keyof T, Keys>> &
  (B extends undefined
    ? Partial<Pick<T, Extract<Keys, keyof T>>>
    : Required<Pick<T, Extract<Keys, keyof T>>>)

export interface IPagingListRes<T> {
  total: number
  per_page: number
  current_page: number
  last_page: number
  data: T
}

export interface IUsePagingListOtions<R, P> {
  allowOnloadGetList?: boolean
  minixPagingListsApi: R extends undefined ? any : (params: P) => Promise<IRes<IPagingListRes<R>>>
  pagingListPage?: number | string
  pagingListBeforeResponseData?: (res: any) => any
  pagingListResponseData?: (item: any) => any
  pagingListPostData: () => P
  formatDataFn?: () => void
}

export interface IUsePagingListReturnData<R> {
  pagingListAllowLoadMore: Ref<boolean>
  pagingListLoadedAll: Ref<boolean>
  pagingListNoListData: Ref<boolean>
  isOrder: Ref<boolean>
  isLoadInit: Ref<boolean>
  listData: Ref<R>
  listDataLength: ComputedRef<any>
  pagingListToggle: (fn?: () => void) => void
  setMinixPagingListsApi?: (fn: (params?: any | undefined) => Promise<IRes<any>>) => void
}

export interface IBaseApiParams {
  page: string | number
  pagesize: string | number
  list_rows: string | number
  size: string | number
}

export const usePagingList: <R = any, P = any>(
  options: RequireIf<IUsePagingListOtions<R, P>, 'pagingListPostData', P>
) => IUsePagingListReturnData<R> = (options) => {
  let {
    pagingListPostData,
    pagingListBeforeResponseData,
    pagingListResponseData,
    minixPagingListsApi,
    allowOnloadGetList = true,
    formatDataFn
  } = options
  const allowOnloadGetListRef = ref(true) // 是否允许页面onload生命周期进入后立马执行getlist
  const pagingListPage = ref(1) // 分页
  const pagingListAllowLoadMore = ref(true) // 允许加载更多
  const pagingListLoadedAll = ref(false) // 已加载全部数据
  const pagingListNoListData = ref(false) // 没有列表数据
  const isOrder = ref(false) // 订单页面
  const listData = ref<any>([]) // 没有列表数据
  const isLoadInit = ref(false) // 初始化数据之后，若无数据再显示无数据图标

  const listDataLength = computed(() => listData.value.length)

  onPullDownRefresh(() => {
    pagingListToggle()
  })

  onLoad(() => {
    if (allowOnloadGetListRef.value && allowOnloadGetList)
      setTimeout(() => pagingListGetLists(), 10)
  })

  watchEffect((onCleanup) => {
    uni.$on(EventBusKey.REFRESH, () => pagingListToggle())
    onCleanup(() => uni.$off(EventBusKey.REFRESH))
  })

  onUnload(() => {})

  onReachBottom(() => {
    pagingListGetLists()
  })

  function setMinixPagingListsApi<P, R>(fn: (params?: P) => Promise<IRes<R>>) {
    minixPagingListsApi = fn as any
  }

  function pagingListToggle(fn?: () => void) {
    pagingListPage.value = 1
    pagingListAllowLoadMore.value = true
    pagingListLoadedAll.value = false
    pagingListNoListData.value = false
    listData.value.splice(0, listData.value.length)
    if (fn) pagingListGetLists(fn)
    else pagingListGetLists()
  }

  async function pagingListGetLists(fn?: () => void) {
    // if (!this.$api[this.pageingListApiMethod]) return;
    if (!pagingListAllowLoadMore.value || pagingListLoadedAll.value || pagingListNoListData.value)
      return
    pagingListAllowLoadMore.value = false
    let postData = {
      page: pagingListPage.value,
      pagesize: PAGE_SIZE,
      list_rows: PAGE_SIZE,
      size: PAGE_SIZE
    }
    if (pagingListPostData) {
      postData = Object.assign({}, postData, pagingListPostData())
    }

    try {
      let { data, code }: any = await unref(minixPagingListsApi)(postData as any)

      if (Number(code) === HttpCode.DATA_SUCCESS_CODE) {
        if (pagingListBeforeResponseData) data = pagingListBeforeResponseData(data)
        let tempLists = (data.data || data.list || data) as any,
          totalPage = data.last_page || Math.ceil(data.total / PAGE_SIZE) || 1
        if (pagingListResponseData) tempLists = pagingListResponseData(tempLists)
        listData.value.push(...tempLists)
        pagingListAllowLoadMore.value = true
        if (pagingListPage.value >= totalPage) pagingListLoadedAll.value = true
        if (pagingListPage.value == 1 && listData.value.length == 0)
          pagingListNoListData.value = true
        pagingListPage.value = pagingListPage.value + 1
      } else {
        pagingListAllowLoadMore.value = true
        pagingListLoadedAll.value = true
        if (pagingListPage.value == 1 && listData.value.length == 0)
          pagingListNoListData.value = true
      }
      isLoadInit.value = true

      if (fn) fn()
      if (formatDataFn) formatDataFn()
    } catch (error) {
      pagingListAllowLoadMore.value = true
      isLoadInit.value = true
    } finally {
      uni.stopPullDownRefresh()
    }
  }

  return {
    pagingListAllowLoadMore,
    pagingListLoadedAll,
    pagingListNoListData,
    isOrder,
    isLoadInit,
    listData,
    listDataLength,
    pagingListToggle,
    setMinixPagingListsApi
  }
}
