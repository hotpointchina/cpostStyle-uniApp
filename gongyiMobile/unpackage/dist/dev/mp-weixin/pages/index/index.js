"use strict";
var common_vendor = require("../../common/vendor.js");
var stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  (_easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_calendar2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_row + _easycom_uni_calendar)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const counter = stores_counter.useCounterStore();
    const downCounter = () => {
      counter.count--;
      counter.downCount();
    };
    const upCounter = () => {
      counter.count++;
      counter.increment();
    };
    const data = common_vendor.reactive({
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500
    });
    const {
      indicatorDots,
      autoplay,
      interval,
      duration
    } = common_vendor.toRefs(data);
    const info = common_vendor.reactive({
      lunar: true,
      range: true,
      insert: false,
      selected: []
    });
    const change = (e) => {
      console.log("change \u8FD4\u56DE:", e);
      if (this.info.selected.length > 5)
        return;
      this.info.selected.push({
        date: e.fulldate,
        info: "\u6253\u5361"
      });
    };
    const monthSwitch = (e) => {
      console.log("monthSwitchs \u8FD4\u56DE:", e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(downCounter),
        b: common_vendor.p({
          span: 3
        }),
        c: common_vendor.t(common_vendor.unref(counter).count),
        d: common_vendor.p({
          span: 3
        }),
        e: common_vendor.o(upCounter),
        f: common_vendor.p({
          span: 3
        }),
        g: common_vendor.p({
          width: 750
        }),
        h: common_vendor.unref(indicatorDots),
        i: common_vendor.unref(autoplay),
        j: common_vendor.unref(interval),
        k: common_vendor.unref(duration),
        l: common_vendor.o(change),
        m: common_vendor.o(monthSwitch),
        n: common_vendor.p({
          selected: info.selected,
          showMonth: false
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WorkRoom/\u90AE\u79D1/\u4E2D\u56FD\u90AE\u653F\u516C\u76CA\u670D\u52A1\u5E73\u53F0\u7CFB\u7EDF/Project/\u79FB\u52A8\u7AEF\u67B6\u6784/gyMobile/gongyiMobile-DEV/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
