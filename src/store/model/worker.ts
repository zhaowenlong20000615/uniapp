import type { IGetWorkerListRes } from '@/api/home/type'
import { defineStore } from 'pinia'

interface IState {
  chooseWorkerData: IGetWorkerListRes[]
  whether_to_rectify_or_not: Map<number, string>
}

export const useWorkerStore = defineStore('worker', {
  state: (): IState => ({
    chooseWorkerData: [],
    whether_to_rectify_or_not: new Map()
  }),

  actions: {
    setChooseWorkerData(data: IGetWorkerListRes[]) {
      this.chooseWorkerData = data
    },
    setWhetherToRectifyOrNot(key: number, value: string) {
      this.whether_to_rectify_or_not.set(key, value)
    }
  }
})
