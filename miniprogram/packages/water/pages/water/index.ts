import { request } from "../../../../utils/util";
import dayjs from 'dayjs';
import { Drink } from "../../types/drink.type";
// packageWater/pages/water/index.ts
Page({
  data: {
      drinks: [] as Drink[],
      total: 0,
      now: 0,
  },
  refreshData(){
    const url = `/drink?date=${dayjs().format('YYYY-MM-DD')}`
    request<Drink[]>(url, "GET").then((data)=>{
        const latest = data[data.length - 1];
        const now = Math.ceil(latest['finish'] * latest['water'] / 100)
        this.setData({
            drinks: data,
            total: latest['water'],
            now
        })
    }).catch((err)=> {
        console.error(err)
    })
  },
  onLoad() {
      this.refreshData()
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
});
