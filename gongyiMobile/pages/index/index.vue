<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="uni-margin-wrap">
		
		<view class="counterbox">
			<uni-section class="mb-10" title="导航" type="line"></uni-section>
			<view class="button_line">
				<navigator class="btn" url="/pages/shareDemo/index">测试</navigator>
				<navigator class="btn" url="/pages/map/index/index">地图</navigator>
				<navigator class="btn" url="/pages/shareDemo/subpage/orderList">订单列表页</navigator>
				<navigator class="btn" url="/pages/shareDemo/subpage/table">table 列表页</navigator>
			</view>
		</view>
		
		
		<view class="counterbox">
			<uni-section class="mb-10" title="计数器" type="line"></uni-section>
			<uni-row :width="750">
				<uni-col :span="3">
					<button @click="countHandler(false)">-</button>
				</uni-col>
				<uni-col :span="3">
					<button>{{shareDemoStore.count}}</button>
				</uni-col>
				<uni-col :span="3">
					<button @click="countHandler(true)">+</button>
				</uni-col>
			</uni-row>
		</view>
		
		<view class="container">
			<view class="blue_word"> view blue word </view>
		</view>
		
		
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item>
				<!-- #ifdef MP-WEIXIN -->
				<view class="swiper-item uni-primary-bg uni-white">A - 我在微信小程序</view>
				<!-- #endif  -->
				<!-- #ifdef H5 -->
				<view class="swiper-item uni-primary-bg uni-white">A - 我在H5</view>
				<!-- #endif  -->
			</swiper-item>
			<swiper-item>
				<!-- #ifdef MP-WEIXIN -->
				<view class="swiper-item uni-success-bg uni-white">B - 我在微信小程序</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="swiper-item uni-success-bg uni-white">B - 我在H5</view>
				<!-- #endif -->
			</swiper-item>
			<swiper-item>
				<!-- #ifdef MP-WEIXIN -->
				<view class="swiper-item uni-warning-bg uni-white">C - 我在微信小程序</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="swiper-item uni-warning-bg uni-white">C - 我在H5</view>
				<!-- #endif -->
			</swiper-item>
		</swiper>
		
		
		<view class="container">
			<!-- #ifdef MP-WEIXIN -->
			<text class="word">我在微信小程序</text>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<text class="word">我在H5</text>
			<!-- #endif -->
			
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :showMonth="false" @change="change" @monthSwitch="monthSwitch" />
		</view>
	</view>
		
</template>


<script setup>
import { reactive, ref, toRefs } from "vue";
import { useShareDemoStore } from '@/stores/shareDemo';
const shareDemoStore = useShareDemoStore();


const countHandler = (flag)=>{
	shareDemoStore.countHandler(flag);
};



const data = reactive({
	indicatorDots: true,
	autoplay: true,
	interval: 2000,
	duration: 500
});

const {
	indicatorDots,
	autoplay,
	interval,
	duration
} = toRefs(data);


// const showCalendar = ref(false);
const	info = reactive({
	lunar: true,
	range: true,
	insert: false,
	selected: []
});
const change = (e)=> {
	console.log('change 返回:', e)
	// 模拟动态打卡
	if (this.info.selected.length > 5) return
	this.info.selected.push({
		date: e.fulldate,
		info: '打卡'
	})
};
const monthSwitch = (e)=> {
	console.log('monthSwitchs 返回:', e)
}



</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uni-scss/variables.scss';
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 750rpx;
		padding: 20rpx 0;
		background-color: #fff;
		
		& .word{
			width: 100%;
			padding: 20rpx 0;
			font-size: 50rpx;
			text-align: center;
		}
	}
	
	// counter
	.counterbox{
		margin: 20rpx 0rpx;
		padding: 20rpx 0rpx;
		background-color: #fff;
	}
	
	// 文字
	.blue_word{
		color: dodgerblue;
		font-size: 50rpx;
	}
	

.uni-calendar--hook{
	width: 750rpx;
}


.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
	.button_line{
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		
		& .btn{
			display: flex;
			justify-content: center;
			align-items: center;
			width: auto;
			margin: 0 30rpx 30rpx 0;
			padding: 8px 16px;
			border: 1px solid #18ae66;
			border-radius: 8px;
		}
	}
	// 日历
	
</style>
