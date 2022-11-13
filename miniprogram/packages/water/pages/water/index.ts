import { request } from "../../../../utils/http";
import dayjs from "dayjs";
import { Drink } from "../../types/drink.type";
import { drinkList } from "../../common/api";
// packageWater/pages/water/index.ts
Page({
  data: {
    drinks: [] as Drink[],
    total: 0,
    now: 0,
    precent: 0,
  },
  refreshData() {
    request<Drink[]>(drinkList, "GET", {
      date: dayjs().format("YYYY-MM-DD"),
    })
      .then((data) => {
        const latest = data[data.length - 1];
        const now =
          Math.ceil((latest["finish"] * latest["water"]) / 100) +
          latest["wateryield"];
        this.setData({
          drinks: data,
          total: latest["water"],
          precent: (now / latest["water"]) * 100,
          now,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  onLoad() {
    this.refreshData();
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
});
