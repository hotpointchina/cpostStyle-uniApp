<template>
  <view class="container">
    <!-- 普普通通的导航栏 -->
    <view class="flexBox searchview">
      <!-- <img
        style="height: 20px; width: auto"
        @click="goBack"
        src="static/icon-wechat/arrowleft@2x.png"
        alt=""
      /> -->
      <view class="flexBox search-big">
        <view class="search-city" @click="openAddressSelect">
          <view>{{ AddressSelectResult }}</view>
          <!-- <img src="static/icon-wechat/ic_triangle_down@2x.png" alt="" /> -->
					<uni-icons type="location-filled" size="30" ></uni-icons>
        </view>
        <view class="flexBox search-main">
          <!-- <img src="static/icon-wechat/ic_search@2x.png" alt="" /> -->
					<uni-icons type="search" size="30" ></uni-icons>
					
          <input
            type="text"
            class="search-input"
            v-model="inputStr"
            :placeholder="inputStrShow"
          />
          <!-- <img v-if="!!inputStr" src="static/icon-wechat/close_fill_gray@2x.png" @click="clearInput" /> -->
					<uni-icons 
						v-if="!!inputStr"
						type="clear" size="30"
						@click="clearInput"
					></uni-icons>
        </view>
      </view>
      <view class="query-text" @click="query">{{btnText}}</view>
    </view>

    <!-- 网点类型tab切换 -->
    <view class="tab-content">
      <view class="search-tab">
        <view
          :class="activeTab == index ? 'active-tab' : ''"
          @click="changeTab(item, index)"
          v-for="(item, index) in allTab"
          :key="item.id"
        >
          {{ item.dictdataName }}
        </view>
      </view>
    </view>

    <!-- 腾讯地图 -->
    <view
      class="mapClass"
      :class="$route.params.channel == 'app' || appChannel == 'app' ? 'mapClass-app' : ''"
      id="TMap"
    ></view>

    <!-- 收纸壳子提示 -->
    <view v-if="showFixTips" class="fix-tips">
      <!-- <img
        @click="closeFixTips"
        src="../static/icon-wechat/close_fill@2x.png"
        alt=""
      /> -->
			<uni-icons
				type="clear" size="30"
				@click="closeFixTips"
			></uni-icons>
      <view>
        温馨提示：网点信息仅供参考，如需前往，请您提前电话确认网点营业时间及业务办理范围。中国邮政邀您一起减少一次性塑料制品使用，参与纸箱回收复用，共建美好绿色生活。
      </view>
    </view>

    <!-- 列表swiper -->
		
		<!-- 
    <swiper
      ref="mySwiper"
      :options="swiperOption"
      class="class-main"
      @slidePrevTransitionEnd="slideTransitionEnd"
      @slideNextTransitionEnd="slideTransitionEnd"
    >
      <swiper-slide
        v-for="(item, index) in list"
        data-index="index"
        :key="item.id"
      >
        <view class="add-item" @click="showDotDetail(item)">
          <view class="flexBox add-item-dao">
            <view class="add-dao-org">
              {{ item.orgName || item.servicePointName }}
            </view>
            <view class="add-dao-xian"></view>
            <view class="add-dao-map" @click.stop="openTxMap(item)">
              <view class="add-dao-p1">
                <img src="./imgs/location@2x.png" alt="" />
                <view>{{ item.distance | fixed }}</view>
              </view>
              <view class="add-dao-p2">地图导航</view>
            </view>
          </view>
          <view class="flexBox item-type">
            <view v-if="!!item.orgType" class="item-type-one">
              {{ item.orgType | orgTrans }}
            </view>
            <view v-if="!!serviceStatus" class="item-type-two">{{ serviceStatus }}</view>
            <img
              v-if="item.orgType == '3' || item.orgType == '5'"
              src="static/icon-wechat/img_hsfy.png"
              alt=""
            />
          </view>
          <view class="item-address">
            {{ item.orgAddress }}
          </view>
          <view class="item-time">营业时间：{{ serviceTime }}</view>
        </view>
      </swiper-slide>
    </swiper> -->

    <!-- 搜索选择框 -->
    <view class="search-tips" v-if="showSearchTips">
      <view
        class="searchTips-view"
        v-for="tip in searchTips"
        :key="tip.id"
        @click="fuzzyMatchingItemClick(tip)"
      >
        <view class="searchTips-title">{{ tip.title }}</view>
        <view class="searchTips-text">{{ tip.address }}</view>
      </view>
    </view>
    <!-- 详情弹窗 -->
		
    <view v-if="showOrgFlag" class="detailModal">
			<!-- 
      <mt-popup
        v-model="showOrgFlag"
        popup-transition="popup-fade"
        position="bottom"
      >
        <view class="detail">
          <view class="add-dao-org">
            {{ orgItem.orgName || orgItem.servicePointName }}
          </view>
          <img @click="closeDetail" class="detail-close" src="static/icon-wechat/icon-close_aa@2x.png" alt="">
          <view class="flexBox item-type">
            <view v-if="!!orgItem.orgType" class="item-type-one">
              {{ orgItem.orgType | orgTrans }}
            </view>
            <view v-if="!!serviceStatus" class="item-type-two">{{ serviceStatus }}</view>
            <img
              v-if="orgItem.orgType == '3' || orgItem.orgType == '5'"
              src="static/icon-wechat/img_hsfy.png"
              alt=""
            />
          </view>
          <view class="flexBox detail-item">
            <view class="detail-gray">网点地址</view>
            <view class="detail-duck">{{ orgItem.orgAddress }}</view>
          </view>
          <view class="flexBox detail-item">
            <view class="detail-gray">网点类型</view>
            <view class="detail-duck">{{ orgItem.orgType | orgTrans }}</view>
          </view>
          <view class="flexBox detail-item">
            <view class="detail-gray">营业时间</view>
            <view class="detail-duck">{{ serviceTime }}</view>
            <view class="detail-blue" v-if="wdyysj.length > 0" @click="showTimeTable">
              <view>详细时间表</view>
              <img src="static/img/bluetime.png" alt="" />
            </view>
          </view>
          <view v-if="saleManNum != 0" class="flexBox detail-item">
            <view class="detail-gray">客户经理</view>
            <view class="detail-duck">附近有<view>{{saleManNum}}</view>个客户经理为您服务</view>
            <view class="detail-blue" @click="toSaleManList">
              <img src="static/img/qiwei@2x.png" alt="" />
              <view>联系TA</view>
            </view>
          </view>
          <view class="flexBox detail-item">
            <view class="detail-gray">联系电话</view>
            <view class="detail-duck"
              v-if="!!orgItem.contactPhone && orgItem.contactPhone!='NULL'  && orgItem.contactPhone!='null'">{{
              orgItem.contactPhone
            }}</view>
            <view class="detail-duck"
              v-else-if="!!orgItem.contactMobile && orgItem.contactMobile!='NULL'  && orgItem.contactMobile!='null'">{{
              orgItem.contactMobile
            }}</view>
            <view class="detail-duck" v-else>暂无数据</view>
          </view>
          <view v-if="!!orgItem.handleMailType" class="flexBox detail-item detail-noBorder">
            <view class="detail-gray">经营范围</view>
            <view class="detail-duck">{{ orgItem.handleMailType }}</view>
          </view>
          <view class="flexBox detail-foot">
            <view class="detail-self" v-if="appChannel != 'app'" @click="toSelfDeliv">预约下单</view>
            <view class="detail-open" @click="openTxMap(orgItem)">
              {{ orgItem.distance | fixed }} 地图导航>
            </view>
          </view>
        </view>
      </mt-popup> -->
    </view>
    <!-- 城市选择 -->
    <!-- <address-select
      @hidePanel="closePanel"
      v-show="showChose"
      :showChose="showChose"
    ></address-select> -->
    <!-- 详细营业时间表 -->
    <!-- <business-hours ref="businessHours" :hoursArr="hoursArr"></business-hours> -->
  </view>
</template>
<script>
	
// import { MessageBox } from "mint-ui";
// import AddressSelect from "@/components/common/CommonAddressSelect";
// import businessHours from "@/components/common/businessHours";
export default {
  name: "DotQuery",
  components: {
    // AddressSelect,
    // businessHours,
  },
  data() {
    return {
      AddressSelectResult: "",
      inputStr: "",
      inputStrShow: "请输入网点名称、区域或者街道",
      showChose: false,
      branchesType: "", //默认邮政网点
      list: [],
      locationVO: {
        // transPlace: sessionStorage.getItem("transPlace") || "",distance: 2000,
        transPlace: uni.getStorageSync('transPlace') || "",distance: 2000,
      },
      allTab: [],
      activeTab: 0,
      searchTips: [],
      showSearchTips: false,
      txMap: "",
      nowPoint: {},
      myLoc: {},
      marker: null,
      circle: null,
      circle2: null,
      hoursArr: [],
      swiperOption: {
        loop: false, //循环
        autoplay: false, //{ delay: 3000, disableOnInteraction: false }, //自动播放
        observer: true,
        observeParents: true,
      },
      showFixTips: true,
      serviceStatus: "",
      serviceTime: "",
      lastEvt: null,
      orgItem: null,
      showOrgFlag: false,
      btnText: "搜索",
      wdyysj: [],
      saleManNum: 0, //缸垫营销员个数
      appChannel: process.env.CHANNEL,
    };
  },
  watch: {
    inputStr(newVal, oldVal) {
      this.showOrgFlag = false;
      if (!!newVal) {
        this.btnText = "取消"; 
      }else {
        this.btnText = "搜索";
      }
      this.fuzzyFromQQ(this.AddressSelectResult, false, newVal).then((res) => {
        this.searchTips = res;
        if (this.searchTips.length > 0) {
          this.showSearchTips = true;
        } else {
          this.showSearchTips = false;
        }
      });
    },
  },
  filters: {
    fixed(value) {
      if (value != null && value > 0 && value < 1000) {
        return value.toFixed(0) + "m";
      }
      if (value != null && value >= 1000) {
        value = value / 1000;
        return value.toFixed(2) + "km";
      }
      return value.toFixed(2);
    },
    orgTrans(val) {
      let obj = {
        1: "邮储网点",
        3: "速递网点",
        4: "集邮网厅",
        5: "邮政网点",
        11: "快递柜",
        12: "自提点",
      };
      return obj[val];
    },
  },
  created() {
    this.queryServicePoint();
  },
  mounted: function () {
    this.$wxUtil.wxLocation().then((res) => {
      this.callback(res);
    });
  },
  methods: {
    // 页面定位成功，画出附近网点
    callback(loc) {
      this.myLoc = loc.location;
      this.AddressSelectResult = loc.city;
      this.initTxMap(loc.location);
    },
    // 腾讯地图初始化
    initTxMap(_point) {
      var center = new TMap.LatLng(_point.lat, _point.lng); //设置中心点坐标
      //初始化地图
      this.txMap = new TMap.Map("TMap", {
        center: center,
        offset: {
          // 中心点偏移
          x: 0,
          y: 0,
        },
      });
      // 以用户为中心画一个圆
      this.createCircle(this.txMap, center);

      // 设置缩放再右下角
      let control = this.txMap.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
      control.setPosition(TMap.constants.CONTROL_POSITION.BOTTOM_RIGHT);

      this.queryDotListNew(this.txMap, _point);
    },
    // 切换tab，请求数据，重绘地图
    changeTab(item, index) {
      this.branchesType = item.dictdataValue;
      this.queryDotListNew();
      this.activeTab = index;
    },
    // 腾讯地图，查询附近网点并画到地图上
    queryDotListNew(m, _p) {
      let map, _point;
      if (!!m && !!_p) {
        map = m;
        _point = _p;
        this.nowPoint = _p;
      }else {
        map = this.txMap;
        _point = this.nowPoint;
      }
      let url =
        this.$ZxptRestDeyWECHATURL + "dey/wechat/findNetPointByLocation";
      this.locationVO.longitude = _point.lng;
      this.locationVO.latitude = _point.lat;
      this.locationVO.orgType = !this.branchesType ? "1,3,4,5,11,12" : this.branchesType;
      this.$axios.post(url, JSON.stringify(this.locationVO)).then((res) => {
        if (res.data.retCode === "1") {
          this.list = res.data.data.orgInfo;
          if (this.list.length > 0) {
            let markerList = [];
            for (let index = 0; index < this.list.length; index++) {
              var element = this.list[index];
              let styleId = this.getStyleId(element.orgType);
              markerList.push({
                id: "marker" + index,
                styleId: styleId,
                position: new TMap.LatLng(element.latitude, element.longitude),
                properties: {
                  title: "marker" + index,
                },
                textObj: element,
                textIndex: index,
              });
            }
            this.createMarker(map, _point, markerList);
            this.queryyyztcx(this.list[0]);
            this.$refs.mySwiper.$swiper.slideTo(0, 1000, false);
          } else {
            if (!!this.marker) {
              this.marker.setMap(null);
              this.marker = null;
            }
            this.showToast("未查询到匹配网点！");
          }
        }
      });
    },
    // 创建标记
    createMarker(map, _point, markerList) {
      if (!!this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
      var marker = (this.marker = new TMap.MultiMarker({
        id: "marker-layer",
        map: map,
        styles: {
          markeryzwd: new TMap.MarkerStyle({
            width: 32,
            height: 34,
            src: "static/icon-wechat/label_recycle.png",
          }),
          markerycwd: new TMap.MarkerStyle({
            width: 32,
            height: 34,
            src: "static/icon-wechat/label_ycwd.png",
          }),
          markerkdg: new TMap.MarkerStyle({
            width: 32,
            height: 34,
            src: "static/icon-wechat/label_kdg.png",
          }),
          markerztd: new TMap.MarkerStyle({
            width: 32,
            height: 34,
            src: "static/icon-wechat/label_ztd.png",
          }),
          markersdwd: new TMap.MarkerStyle({
            width: 32,
            height: 34,
            src: "static/icon-wechat/label_sdwd.png",
          }),
          markerjywt: new TMap.MarkerStyle({
            width: 32,
            height: 34,
            src: "static/icon-wechat/label_jywt.png",
          }),
          markeryzwdBig: new TMap.MarkerStyle({
            width: 48,
            height: 51,
            src: "static/icon-wechat/label_recycle.png",
          }),
          markerycwdBig: new TMap.MarkerStyle({
            width: 48,
            height: 51,
            src: "static/icon-wechat/label_ycwd.png",
          }),
          markerkdgBig: new TMap.MarkerStyle({
            width: 48,
            height: 51,
            src: "static/icon-wechat/label_kdg.png",
          }),
          markerztdBig: new TMap.MarkerStyle({
            width: 48,
            height: 51,
            src: "static/icon-wechat/label_ztd.png",
          }),
          markersdwdBig: new TMap.MarkerStyle({
            width: 48,
            height: 51,
            src: "static/icon-wechat/label_sdwd.png",
          }),
          markerjywtBig: new TMap.MarkerStyle({
            width: 48,
            height: 51,
            src: "static/icon-wechat/label_jywt.png",
          }),
        },
        geometries: markerList,
      }));
      var center = new TMap.LatLng(_point.lat, _point.lng);
      this.createCircle(map, center);

      //设置自适应显示marker
      var bounds = new TMap.LatLngBounds();
      markerList.forEach((item) => {
        //若坐标点不在范围内，扩大bounds范围
        if (bounds.isEmpty() || !bounds.contains(item.position)) {
          bounds.extend(item.position);
        }
      });
      //设置地图可视范围
      map.fitBounds(bounds, {
        padding: 10, // 自适应边距
      });

      // 创建完marker之后，最近一个marker变大
      this.lastEvt = null;
      this.bigGeometrie(markerList[0]);
      // 设置中心点为当前网点
      map.setCenter(
        new TMap.LatLng(markerList[0].position.lat, markerList[0].position.lng)
      );

      // 添加点击事件
      marker.on("click", (evt) => {
        this.$set(this, 'orgItem', evt.geometry.textObj);
        this.queryyyztcx(evt.geometry.textObj);
        this.$refs.mySwiper.$swiper.slideTo(
          evt.geometry.textIndex,
          1000,
          false
        );

        this.bigGeometrie(evt.geometry);

        // 设置中心点为当前网点
        map.setCenter(
          new TMap.LatLng(evt.geometry.position.lat, evt.geometry.position.lng)
        );
      });
    },
    // 已选中地址为中心画圈
    createCircle(map, center) {
      if (this.circle) {
        this.circle.setMap(null);
        this.circle = null;
        this.circle2.setMap(null);
        this.circle2 = null;
      }
      this.circle = new TMap.MultiCircle({
        map,
        styles: {
          // 设置圆形样式
          circle: new TMap.CircleStyle({
            color: "rgba(41,91,255,0.16)",
            showBorder: false,
            borderColor: "rgba(41,91,255,1)",
            borderWidth: 1,
          }),
        },
        geometries: [
          {
            styleId: "circle",
            center: center,
            radius: 650,
          },
        ],
      });
      this.circle2 = new TMap.MultiCircle({
        map,
        styles: {
          // 设置圆形样式
          circle: new TMap.CircleStyle({
            color: "rgba(41,91,255,0.8)",
            showBorder: false,
          }),
        },
        geometries: [
          {
            styleId: "circle",
            center: center,
            radius: 65,
          },
        ],
      });
    },
    async queryyyztcx(item) {
      this.serviceTime = "";
      this.serviceStatus = "";
      this.saleManNum = 0;
      this.wdyysj = [];
      if (item.orgType == "11") {
        this.serviceTime = "00:01-24:00";
      } else if (item.orgType != "5" && item.orgType != "4") {
        this.serviceTime = !!item.serviceTime ? item.serviceTime : "暂无数据";
      } else {
        let url =
          this.$ZxptRestDeyWECHATURL +
          "dey/wechat/queryyyztcx?netPointId=" +
          item.orgCode;
        let res = await this.$axios.get(url);
        if (
          res.status == 200 &&
          res.data.success &&
          res.data.success == "success" &&
          res.data.content &&
          res.data.content.length > 0
        ) {
          this.serviceStatus =
            res.data.content[0].N_SFYY == 1 ? "营业中" : "休息中";
          this.serviceTime = !!res.data.content[0].V_YYSJ
            ? res.data.content[0].V_YYSJ
            : "暂无数据";
          this.wdyysj = res.data.content[0].wdyysj;
        }
      }
      if (item.orgType == "5" && this.$route.params.channel != 'app' && this.appChannel != 'app') {
        this.querySaleMans(item.orgCode);
      }
    },

    // 查询该网点的营销员个数
    querySaleMans(orgCd) {
      let url = this.$ZxptRestMbcWECHAT + "mbc/wechat/querySalesmanTotal";
      let params = {
        orgCd
      }
      this.$axios.post(url, params).then(res => {
        if (res.data.retCode == '1' && res.data.data > 0) {
          this.saleManNum = res.data.data;
        }
      });
    },

    // 跳转营销员页面
    toSaleManList() {
      if (!!this.nowPoint.lat && !!this.nowPoint.lng && this.myLoc.lat != this.nowPoint.lat) {
        window.location.href = `${this.$grayMallUrl}#/nearSales?orgCd=${this.orgItem.orgCode}&lat=${this.nowPoint.lat}&lng=${this.nowPoint.lng}`; 
      }else {
        window.location.href = `${this.$grayMallUrl}#/nearSales?orgCd=${this.orgItem.orgCode}`; 
      }
    },

    // 请求网点类型列表
    queryServicePoint() {
      if (
        !!this.$dictionaryList.dev_service_point &&
        this.$dictionaryList.dev_service_point.length > 0
      ) {
        this.allTab = [{ dictdataName: "全部", dictdataValue: "" }].concat(
          this.$dictionaryList.dev_service_point
        );
      } else {
        let url =
          this.$baseURL +
          "common/finddictionarycode?paramString=dev_service_point";
        this.$axios.get(url).then((res) => {
          if (!!res.data && res.data.length > 0) {
            this.$dictionaryList.dev_service_point = res.data;
            this.allTab = [{ dictdataName: "全部", dictdataValue: "" }].concat(
              res.data
            );
          }
        });
      }
    },
    // 根据orgType，获取对应的styleId
    getStyleId(id, flag) {
      let styleId = "marker";
      if (id == "1") {
        styleId = "markerycwd";
      } else if (id == "11") {
        styleId = "markerkdg";
      } else if (id == "12") {
        styleId = "markerztd";
      } else if (id == "4") {
        styleId = "markerjywt";
      } else if (id == "3") {
        styleId = "markersdwd";
      } else if (id == "5") {
        styleId = "markeryzwd";
      }
      if (flag) {
        return styleId + "Big";
      }
      return styleId;
    },
    // 变大变小变快乐
    bigGeometrie(obj) {
      if (this.lastEvt) {
        this.lastEvt.styleId = this.getStyleId(this.lastEvt.textObj.orgType);
        this.marker.updateGeometries([this.lastEvt]);
      }
      this.lastEvt = obj;
      obj.styleId = this.getStyleId(obj.textObj.orgType, true);
      this.marker.updateGeometries([obj]);
    },

    // 打开关闭城市选择弹窗
    openAddressSelect() {
      if (!this.showChose) {
        this.showChose = true;
      }
    },
    closePanel(returndata) {
      this.showChose = false;
      if (!!returndata && returndata.length > 0) {
        for (let index = 0; index < returndata.length; index++) {
          const element = returndata[index];
          if (element.id == "city") {
            this.cityName = element.areaName;
          }
          if (element.id == "district") {
            this.districtName = element.areaName;
          }
        }
        this.AddressSelectResult = this.cityName;
        this.inputStrShow = this.inputStr = this.districtName;
      }
    },

    // 点击匹配到的地址，重绘地图
    fuzzyMatchingItemClick(item) {
      this.inputStr = "";
      this.inputStrShow = item.title;
      this.searchTips = [];
      this.showSearchTips = false;
      this.queryDotListNew(this.txMap, item.location);
    },
    // 返回按钮
    goBack() {
      if (this.$route.params.channel === "app" || this.appChannel == 'app') {
        Emp.execute("$M.page.goBack()");
      } else {
        this.$router.go(-1);
      }
    },
    query() {
      if (this.btnText == "搜索") {
        this.queryDotListNew();
      }else {
        this.clearInput();
        this.showSearchTips = false;
      }
    },
    // 清空输入框
    clearInput() {
      this.inputStr = "";
      this.nowPoint = this.myLoc;
    },
    // 关闭温馨提示
    closeFixTips() {
      this.showFixTips = false;
    },
    // 打开关闭详情弹窗
    showDotDetail(itemVO) {
      this.$set(this, 'orgItem', itemVO);
      this.showOrgFlag = true;
    },
    closeDetail() {
      this.showOrgFlag = false;
    },
    // 打开详细营业时间表
    showTimeTable() {
      this.hoursArr = this.wdyysj;
      this.$nextTick(() => {
        this.$refs.businessHours.showHours(true);
      });
    },
    // 跳转到去预约
    toSelfDeliv() {
      if (this.$route.params.channel === "app") {
        Emp.execute("toSelfDelivery()");
      } else {
        this.checkUserType();
      }
    },
    // 微信环境校验是否游客
    checkUserType() {
      var url = this.$gccURL + "commonFunc/getLoginUserInfo";
      this.$axios.post(url, {}).then(async (res) => {
        if (
          (this.$isWxClient() &&
            res.data.data.userInfo &&
            res.data.data.userInfo.openId) ||
          (!this.$isWxClient() && res.data.data.userInfo)
        ) {
          this.closeDetail();
          this.$router.push({
            name: "selfDelivery",
          });
        } else {
          // if (this.$isWxClient() && !sessionStorage.getItem('hasClick')) {
          if (this.$isWxClient() && !uni.getStorageSync('hasClick')) {
            var re = await this.$util.wechatLogin();
            if (re.data.retCode === '1') {
              uni.setStorageSync("wechatToken", re.data.data);
              this.closeDetail();
              this.$router.push({ name: "authPage", query: { redirectUrl: window.location.href } });
            } else if (re.data.retCode === '2') {
              //未登录，调用老崔获取openId接口，拿到openId存到缓存进入游客模式
              let r = await this.$util.queryOpenId();
              uni.removeStorageSync('token');
              uni.removeStorageSync('wechatToken');
              uni.setStorageSync('openId', r.data.data);
              uni.setStorageSync('openIdToken', this.$util.getCookie("openIdToken"));
              // MessageBox.confirm("", {
              //   confirmButtonText: "注册/登录",
              //   cancelButtonText: "快速下单",
              //   message: "<view style='text-align:left'><view style='font-size:12px;color:#f29700'>&nbsp;&nbsp;&nbsp;&nbsp;亲爱的用户，选择“注册/登录”成为我们的会员，您可使用地址簿信息轻松下单，实时查看物流详情，享受更便捷服务。</view></view>",
              //   closeOnClickModal: false,
              //   title: "",
              // })
              // .then((action) => {
              //   sessionStorage.setItem("hasClick", "true");
              //   this.closeDetail();
              //   if (action === "confirm") {
              //     this.$router.push({ name: "regist", query: { redirectUrl: sessionStorage.getItem("curPath") } });
              //     return;
              //   }
              // })
              // .catch((err) => {
              //   sessionStorage.setItem("hasClick", "true");
              //   this.closeDetail();
              //   this.$router.push({
              //     name: "selfDelivery",
              //   });
              // });
            }
          }else {
            this.closeDetail();
            this.$router.push({
              name: "selfDelivery",
            });
          }
        }
      });
    },
    // 打开腾讯地图
    openTxMap(item) {
      if(this.$route.params.channel == 'app' || this.appChannel == 'app') {
        let gcj02tobd09 = this.$util.gcj02tobd09(item.longitude, item.latitude);
        let obj = {
          lat: gcj02tobd09[1],
          lng: gcj02tobd09[0]
        }
        this.openBaiduMap(obj);
      }else {
        this.$wxUtil.wxInit().then(() => {
          wx.openLocation({
            latitude: parseFloat(item.latitude), // 纬度，浮点数，范围为90 ~ -90
            longitude: parseFloat(item.longitude), // 经度，浮点数，范围为180 ~ -180。
            scale: 14, // 地图缩放级别,整型值,范围从1~28。默认为最大
            infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
            name: item.orgName, // 位置名
            address: item.orgAddress, // 地址详情说明
          });
        });
      }
    },
    openBaiduMap(urlObject) {
      let wapLink = "http://api.map.baidu.com/geocoder?location=" + urlObject.lat + "," + urlObject.lng + "&zoom=13" + "&output=html&src=webapp.baidu.openAPIdemo";
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
        window.location.href = "baidumap://map/geocoder?location=" + urlObject.lat + "," + urlObject.lng + "&src=ios.baidu.openAPIdemo";
        setTimeout(function() {
          window.location.href = wapLink;
        }, 2000);
      } else if (navigator.userAgent.match(/android/i)){
        window.location.href = "baidumap://map/geocoder?location=" + urlObject.lat + "," + urlObject.lng + "&src=andr.baidu.openAPIdemo";
      } else {
        window.location.href = wapLink;
      }
    },
    // swiper监听切换
    slideTransitionEnd() {
      let realIndex = this.$refs.mySwiper.$swiper.realIndex;
      this.queryyyztcx(this.list[realIndex]);
      this.bigGeometrie(this.marker.geometries[realIndex]);
      // 设置中心点为当前网点
      this.txMap.setCenter(
        new TMap.LatLng(
          this.list[realIndex].latitude,
          this.list[realIndex].longitude
        )
      );
    },
  },
};
</script>
<style lang="scss" scoped>
// * {
//   font-family: SourceHanSansSC-Regular;
// }

.fix-tips {
  padding: 6px 14px;
  font-size: 10px;
  color: #e63c2e;
  background-color: rgba(255, 255, 255, 0.8);
  line-height: 16px;
  width: calc(100% - 48px);
  position: absolute;
  top: 104px;
  left: 10px;
  border-radius: 8px;
  z-index: 1009;

  img {
    width: 18px;
    height: 18px;
    position: absolute;
    right: -5px;
    top: -5px;
  }
}

.flexBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.searchview {
  height: 40px;
  border-radius: 8px;
  padding: 5px 10px;
  background-color: #ffffff;

  img {
    width: 26px;
  }
  .search-input {
    outline: none;
    height: 36px;
    flex: 1;
    margin: 0;
    border: none;
    font-size: 12px;
    color: #33333f;
    background-color: #f6f6fa;
  }
}
.search-big {
  background-color: #f6f6fa;
  flex: 1;
  border-radius: 18px;
  margin: 0 15px;
  padding: 0 10px;
}
.query-text {
  font-size: 14px;
  color: #33333f;
}
.search-city {
  text-align: center;
  line-height: 16px;
  margin-right: 8px;

  span {
    color: #33333f;
    font-size: 13px;
  }
  img {
    width: 12px;
    vertical-align: middle;
    margin-left: -3px;
  }
}
.search-main {
  flex: 1;
  border-radius: 18px;
  height: 36px;

  img {
    width: 20px;
    height: 20px;
  }
}

.mapClass {
  height: calc(100vh - 98px);
  background: #f8f8f8;
}
.mapClass-app {
  height: calc(100vh - 138px);
  background: #f8f8f8;
}

.tab-content {
  height: 44px;
  background: #ffffff;
  overflow-x: scroll;
  padding: 0 10px;
}
.search-tab {
  width: auto;
  height: 44px;
  line-height: 38px;
  white-space: nowrap;
  span {
    font-size: 14px;
    padding: 4px 7px;
    margin-right: 5px;
    color: #8e8e92;
  }
  .active-tab {
    font-size: 16px;
    color: #2e2e30;
    position: relative;
  }
  .active-tab::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 4px;
    background-color: #18ae66;
    border-radius: 2px;
    bottom: -3px;
    left: calc(50% - 10px);
  }
}

.search-tips {
  height: calc(100vh - 50px);
  width: calc(100% - 30px);
  position: absolute;
  left: 0;
  top: 50px;
  background: #ffffff;
  overflow: scroll;
  padding: 0 15px;
  z-index: 1100;
}
.searchTips-view {
  padding: 20px 0 15px;
  border-bottom: 1px solid #f1f1f1;
}
.searchTips-title {
  color: #333333;
  font-size: 15px;
}
.searchTips-text {
  font-size: 13px;
  color: #666666;
}

.class-main {
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 1011;
  width: 100%;

  :deep(.swiper-wrapper)  {
    padding: 0 20px;
  }
  :deep(.swiper-slide-active) {
    width: calc(100vw - 40px) !important;
  }
  .add-item {
    background-color: #ffffff;
    border-radius: 8px;
    height: 126px;
    padding: 10px;
    color: #33333f;
    margin: 0 5px;
  }
  .add-item-dao {
    align-items: flex-start;
    height: 44px;
  }
  .add-dao-xian {
    width: 1px;
    background-color: #d8d8d8;
    height: 40px;
  }
  .add-dao-map {
    width: 66px;
  }
  .add-dao-p1 {
    line-height: 16px;
    text-align: right;
    margin-bottom: 4px;

    img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    span {
      font-size: 12px;
    }
  }
  .add-dao-p2 {
    font-size: 10px;
    line-height: 16px;
    text-align: right;
  }
  .item-address {
    font-size: 12px;
    line-height: 20px;
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-time {
    font-size: 12px;
    line-height: 20px;
  }
}
.add-dao-org {
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  width: calc(100% - 86px);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-type {
  justify-content: flex-start;
  margin-top: 5px;
  font-size: 10px;
  img {
    height: 20px;
    width: auto;
    vertical-align: middle;
  }
}
.item-type-one {
  padding: 2px 4px;
  border-radius: 2px;
  background-color: #18ae66;
  color: #ffffff;
  margin-right: 10px;
}
.item-type-two {
  border: 1px solid #ff933b;
  color: #ff933b;
  padding: 2px 5px;
  border-radius: 20px;
  margin-right: 10px;
}

.detail {
  width: calc(100vw - 44px);
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;

  .add-dao-org {
    width: calc(100% - 60px);
  }
  .item-type {
    margin-bottom: 15px;
  }
  .detail-close {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .detail-item {
    line-height: 32px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 13px;
  }
  .detail-noBorder {
    border-bottom: none;
  }
  .detail-gray {
    color: #99999f;
    padding-right: 15px;
  }
  .detail-duck {
    color: #33333f;
    line-height: 21px;
    padding: 5px 0;
    flex: 1;
  }
  .detail-blue {
    color: #0099e0;
    img {
      width: 16px;
      vertical-align: middle;
    }
  }
  .detail-foot {
    margin-top: 10px;

    view {
      border-radius: 4px;
      padding: 10px 30px;
      font-size: 14px;
      line-height: 20px;
    }
    .detail-self {
      color: #ffffff;
      padding: 10px 40px;
      background-color: #18ae66;
    }
    .detail-open {
      border: 1px solid #18ae66;
      color: #18ae66;
    }
  }
}

.container .rotate-circle,
.container .tmap-zoom-control {
  display: none;
}
.detailModal {
  .mint-popup {
    background: none;
  }
  :deep(.v-modal) {
    display: none;
  }
}
</style>
