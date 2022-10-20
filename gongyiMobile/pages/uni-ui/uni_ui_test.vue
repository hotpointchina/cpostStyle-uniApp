<template>
	<view class="container">
		
		<!-- Badge 数字角标 -->
		<uni-section title=" Badge 数字角标 " type="line" padding>
			<view class="example-body">
				<uni-badge class="uni-badge-left-margin" text="1" />
				<uni-badge class="uni-badge-left-margin" text="2" type="primary" />
				<uni-badge class="uni-badge-left-margin" text="34" type="success" />
				<uni-badge class="uni-badge-left-margin" text="45" type="warning" />
				<uni-badge class="uni-badge-left-margin" text="123" type="info" />
			</view>
		</uni-section>
		
		<view class="gy-divider"></view>
		
		<!-- calendar 日历 -->
		<uni-section title=" calendar 日历 " type="line" padding>
			<view class="calendar-content">
				<uni-calendar class="uni-calendar--hook" :selected="calendarInfo.selected" :showMonth="false" @change="calendarChange" @monthSwitch="monthSwitch" />
			</view>
		</uni-section>
		
		<view class="gy-divider"></view>
		
		<!-- progress 进度 -->	
		<uni-section title=" progress 进度 " type="line" padding>
			<view class="uni-padding-wrap uni-common-mt">
				<view class="progress-box" v-for="prList in progessList" :key="prList">
					<progress class="progress_class" :percent="prList" show-info stroke-width="3" active />
				</view>
				<view class="progress-control">
					<button type="primary" @click="setProgress">设置进度</button>
					<button type="warn" @click="clearProgress">清除进度</button>
				</view>
			</view>
		</uni-section>
		
		<view class="gy-divider"></view>
		
		<!-- button 按钮 -->
		<uni-section title=" button 按钮 " type="line" padding>
			<view class="columnbox">
				<button type="primary">页面主操作 Normal</button>
				<button type="primary" loading="true">页面主操作 Loading</button>
				<button type="primary" disabled="true">页面主操作 Disabled</button>
				<button type="default">页面次要操作 Normal</button>
				<button type="default" disabled="true">页面次要操作 Disabled</button>
				<button type="warn">警告类操作 Normal</button>
				<button type="warn" disabled="true">警告类操作 Disabled</button>
					
				<button type="primary" plain="true">按钮</button>
				<button type="primary" disabled="true" plain="true">不可点击的按钮</button>
				<button type="default" plain="true">按钮</button>
				<button type="default" disabled="true" plain="true">按钮</button>
				<button class="mini-btn" type="primary" size="mini">按钮</button>
				<button class="mini-btn" type="default" size="mini">按钮</button>
				<button class="mini-btn" type="warn" size="mini">按钮</button>
			</view>
		</uni-section>
		
		
		<!-- checkbox-group 多项 -->
		<view class="gy-divider"></view>
		<uni-section title=" checkbox-group 多项选择器 " type="line" padding>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" />选中
					</label>
					<label>
						<checkbox value="cb" />未选中
					</label>
				</checkbox-group>
			</view>
		</uni-section>
		
		
		<!-- radio 单选 -->
		<view class="gy-divider"></view>
		<uni-section title=" radio 单选 " type="line" padding>
			<radio-group class="uni-list" @change="radioChange">
				<label class="rowbox" v-for="(item,index) in radioItems" :key="index">
					<radio :id="item.name" :value="item.name" :checked="item.checked" :color="'#18AE66'" ></radio>
					<label class="label-2-text" :for="item.name">
						<text>{{item.value}}</text>
					</label>
				</label>
			</radio-group>
			
			<view class="rowbox mt-50">
				<view class="text">单选选中：{{data.radio1}}</view>
				<uni-data-checkbox v-model="data.radio1" :localdata="data.sex"></uni-data-checkbox>
			</view>
			
			<view class="rowbox mt-50">
				<view class="text">多选选中：{{data.checkbox1}}</view>
				<uni-data-checkbox multiple v-model="data.checkbox1" :localdata="data.hobby"></uni-data-checkbox>
			</view>
			<view class="rowbox mt-50">
				<view class="text">单选选中：{{data.radio2}}</view>
				<uni-data-checkbox mode="button" v-model="data.radio2" :localdata="data.sex"></uni-data-checkbox>
			</view>
			<view class="rowbox mt-50">
				<view class="text">多选选中：{{data.checkbox2}}</view>
				<uni-data-checkbox mode="button" multiple v-model="data.checkbox2" :localdata="data.hobby"></uni-data-checkbox>
			</view>
			
		</uni-section>
		
		
		<!-- slider 滑动选择器 -->
		<view class="gy-divider"></view>
		<uni-section title=" slider 滑动选择器 " type="line" padding>
			<slider value="60"  step="5" />
		</uni-section>
			
		<!-- switch 开关选择器 -->
		<view class="gy-divider"></view>
		<uni-section title=" switch 开关选择器 " type="line" padding>
			<switch checked :color="'#18AE66'" />
		</uni-section>
			
		
		<!-- countdown 倒计时组件 -->
		<view class="gy-divider"></view>
		<uni-section title=" countdown 倒计时组件 " type="line" padding>
			<uni-countdown :font-size="30" :day="1" :hour="2" :minute="30" :second="0" color="#FFFFFF" background-color="#18AE66" />
		</uni-section>
		
		
		<!-- data-picker 单列、和多列级联选择 -->
		<view class="gy-divider"></view>
		<uni-section title=" data-picker 单列、和多列级联选择 " type="line" padding>
			<uni-data-picker :localdata="data.dataPickerData" popup-title="请选择班级" @change="dataPickerDataOnchange" @nodeclick="dataPickerDataOnnodeclick"></uni-data-picker>
		</uni-section>
		
		
		<!-- input -->
		<view class="gy-divider"></view>
		<uni-section title=" input " type="line" padding>
			<input class="uni-input" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
		</uni-section>
		
		<!-- easyinput 组件是对原生input组件的增强 ，是专门为配合表单组件uni-forms (opens new window)而设计的，easyinput 内置了边框，图标等，同时包含 input 所有功能 -->
		<view class="gy-divider"></view>
		<uni-section title=" easyinput 组件是对原生input组件的增强 " type="line" padding>
			<uni-easyinput v-model="inputValue" placeholder="请输入内容"></uni-easyinput>
		</uni-section>
		
		
		<!-- fab 悬浮按钮 -->
		<uni-fab 
			:pattern="data.fabPattern" 
			:content="data.fabContent" 
			:horizontal="'right'" 
			:vertical="'bottom'"
			:direction="'horizontal'" 
			@trigger="fabTrigger" 
			@fabClick="fabClick" 
		/>
		
		
		<!-- uni-fav 收藏按钮 -->
		<view class="gy-divider"></view>
		<uni-section title=" easyinput 组件是对原生input组件的增强 " type="line" padding>
			<view class="rowbox">
				<uni-fav :checked="data.favData.checkList[0]" class="favBtn" bg-color-checked="#18AE66" @click="favClick(0)" />
				<uni-fav :checked="data.favData.checkList[1]" :star="false" class="favBtn" bg-color-checked="#18AE66" @click="favClick(1)" />
				<uni-fav :checked="data.favData.checkList[2]" class="favBtn" :circle="true" bg-color="#dd524d"
					bg-color-checked="#18AE66" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick(2)" />
				<uni-fav :checked="data.favData.checkList[3]" class="favBtn" bg-color="#f8f8f8" bg-color-checked="#eeeeee"
					fg-color="#333333" fg-color-checked="#333333" @click="favClick(3)" />
			</view>
		</uni-section>
		
		
		<!-- uni-indexed-list 索引列表 -->
		<uni-section title=" uni-indexed-list 索引列表 " type="line" padding>
			<view class="columnbox">
				<button type="primary" @click="gotoIndexList">查看 uni-indexed-list 索引列表</button>
			</view>
		</uni-section>
		
		
		<!-- link 链接 -->
		<uni-section title=" link 链接 " type="line" padding>
			<uni-link href="https://uniapp.dcloud.io/" text="https://uniapp.dcloud.io/" color="#18AE66"></uni-link>
		</uni-section>
		
		
		<!-- uni-pagination 分页器 -->
		<uni-section title=" uni-pagination 分页器 " type="line" padding>
			<uni-pagination :total="50" />
		</uni-section>
		
		
		<!-- uni-segmented-control 分段器 -->
		<uni-section title="实心标签" type="line">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="data.segmentedData.current" :values="data.segmentedData.items" :style-type="'text'"
					:active-color="'#18AE66'" @clickItem="segmentedDataOnClickItem" />
			</view>
			<view class="content">
				<view v-if="data.segmentedData.current === 0"><text class="content-text">选项卡1的内容</text></view>
				<view v-if="data.segmentedData.current === 1"><text class="content-text">选项卡2的内容</text></view>
				<view v-if="data.segmentedData.current === 2"><text class="content-text">选项卡3的内容</text></view>
			</view>
		</uni-section>
		
		
		<!-- uni-steps 步骤条 -->
		<uni-section title=" uni-steps 步骤条 " type="line" padding>
			<uni-section title="基本用法" type="line" padding>
				<uni-steps :options="data.stepsData.list1" active-color="#18AE66" :active="data.stepsData.active" />
			</uni-section>
			<uni-section title="自定义图标" type="line" padding>
				<uni-steps :options="data.stepsData.list1" active-color="#18AE66" active-icon="checkbox" :active="data.stepsData.active" />
			</uni-section>
			<uni-section title="自定义图标" type="line" padding>
				<uni-steps :options="data.stepsData.list1" active-color="#18AE66" active-icon="medal" :active="data.stepsData.active" />
			</uni-section>
			<uni-section title="纵向排列" type="line" padding>
				<uni-steps :options="data.stepsData.list2" active-color="#18AE66" :active="data.stepsData.active" direction="column" />
			</uni-section>
		</uni-section>
		
		
		<!-- uni-table 表格 -->
		<uni-section title=" uni-table 表格 " type="line" padding>
			<button type="primary" @click="gotoTable">查看 Table</button>
		</uni-section>
		
		
		
		
	</view>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";

	const data = reactive({
		calendarInfo:{
			lunar: true,
			range: true,
			insert: false,
			selected: []
		},
		progessList: [0, 0, 0, 0],
		radioItems: [
			{
				name: 'USA',
				value: '美国'
			},
			{
				name: 'CHN',
				value: '中国',
				checked: 'true'
			}
		],
		radio1: 0,
		radio2: 0,
		radio3: 0,
		radio4: 0,
		radio5: 0,
		radio6: 0,
		checkbox1: [0],
		checkbox2: [0],
		checkbox3: [0],
		checkbox4: [0],
		checkbox5: [0],
		checkbox6: [0],
		sex: [
			{
				text: '男',
				value: 0
			}, {
				text: '女',
				value: 1
			}, {
				text: '未知',
				value: 2
			},
		],
		sex1: [
			{
				text: '男',
				value: 0
			}, {
				text: '女',
				value: 1,
				disable: true
			}, {
				text: '未知',
				value: 2
			},
		],
		hobby: [
			{
				text: '足球',
				value: 0
			}, {
				text: '篮球',
				value: 1
			}, {
				text: '游泳',
				value: 2
			},
		],
		hobby2: [
			{
				text: '足球',
				value: 0,
				disable: true
			}, {
				text: '篮球',
				value: 1,
				disable: true
			}, {
				text: '游泳',
				value: 2
			},
		],
		dataPickerData:[
			{
				text: "一年级",
				value: "1-0",
				children: [
					{
						text: "1.1班",
						value: "1-1"
					},
					{
						text: "1.2班",
						value: "1-2"
					}
				]
			},
			{
				text: "二年级",
				value: "2-0"
			},
			{
				text: "三年级",
				value: "3-0"
			},
		],
		fabPattern:{
			color: '#7A7E83',
			backgroundColor: '#fff',
			selectedColor: '#18AE66',
			buttonColor: '#18AE66',
			iconColor: '#fff'
		},
		fabContent: [
			{
				iconPath: '/static/c1.png',
				selectedIconPath: '/static/c1_b.png',
				text: '选项一',
				active: false
			},
			{
				iconPath: '/static/c2.png',
				selectedIconPath: '/static/c2_b.png',
				text: '选项二',
				active: false
			},
			{
				iconPath: '/static/c3.png',
				selectedIconPath: '/static/c3_b.png',
				text: '选项三',
				active: false
			}
		],
		favData:{
			checkList: [false, false, false, false, false, false],
			contentText: {
				contentDefault: '追番',
				contentFav: '已追番'
			}
		},
		segmentedData:{
			items: ['选项卡1', '选项卡2', '选项卡3'],
			current: 0,
		},
		stepsData:{
			active: 1,
			list1: [{
				title: '事件一'
			}, {
				title: '事件二'
			}, {
				title: '事件三'
			}, {
				title: '事件四'
			}],
			list2: [{
				title: '买家下单',
				desc: '2018-11-11'
			}, {
				title: '卖家发货',
				desc: '2018-11-12'
			}, {
				title: '买家签收',
				desc: '2018-11-13'
			}, {
				title: '交易完成',
				desc: '2018-11-14'
			}]
		},
		tableData:{
			searchVal: '',
			tableData: [],
			// 每页数据量
			pageSize: 10,
			// 当前页
			pageCurrent: 1,
			// 数据总量
			total: 0,
			loading: false
		},
		
	});
	
	
	const calendarChange = (e) =>{
		console.log('change 返回:', e)
		// 模拟动态打卡
		if (data.calendarInfo.selected.length > 5) return
		data.calendarInfo.selected.push({
			date: e.fulldate,
			info: '打卡'
		})
	};
	const setProgress = ()=>{
		data.progessList = [20, 40, 60, 80]
	};
	const clearProgress = ()=>{
		data.progessList = [0, 0, 0, 0]
	};
	
	const dataPickerDataOnchange = (e)=>{
		const value = e.detail.value
	};
	const dataPickerDataOnnodeclick = ()=>{};
	
	const inputValue = ref('');
	
	
	const fabTrigger = (e)=>{
		console.log(e)
		data.fabContent[e.index].active = !e.item.active
		uni.showModal({
			title: '提示',
			content: `您${data.fabContent[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	};
	const fabClick = ()=>{
		uni.showToast({
			title: '点击了悬浮按钮',
			icon: 'none'
		})
	};
	const favClick = (index)=>{
		data.favData.checkList[index] = !data.favData.checkList[index]
		console.log(data.favData.checkList[index]);
		// data.favData.$forceUpdate()
	}
	
	
	const gotoIndexList = ()=>{
		uni.navigateTo({
			url: '/pages/uni-ui/indexList'
		});
	};
	
	const segmentedDataOnClickItem = e =>{
		if (data.segmentedData.current !== e.currentIndex) {
			data.segmentedData.current = e.currentIndex
		}
	};
	
	const gotoTable = ()=>{
		uni.navigateTo({
			url: '/pages/uni-ui/table'
		});
	};
	
	
	
	
	const {
		calendarInfo,
		// 进度
		progessList,
		radioItems
	} = toRefs(data);
</script>

<style lang="scss" scoped>
	.container{
		width: 750rpx;
		padding: 30rpx 0  190rpx 0;
	}
	.progress-box {
		display: flex;
		height: 50rpx;
		margin-bottom: 60rpx;
	}

	.uni-icon {
		line-height: 1.5;
	}

	.progress-cancel {
		margin-left: 40rpx;
	}

	.progress-control button {
		margin-top: 20rpx;
	}
	
	.progress_class{
		width: 750rpx;
	}
	
	.columnbox{
		display:flex;
		flex-flow:column nowrap;
		& button{
			width: 600rpx;
			margin-bottom: 20rpx;
		}
		& button[size=mini] {
			margin-left: auto;
			margin-right: auto;
		}
	}
	.uni-list,	
	.rowbox{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around
	}
	.mt-50{
		margin-top: 50rpx;
	}
</style>