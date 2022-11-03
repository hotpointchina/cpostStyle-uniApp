<template>
	<view class="edit_wrap" :style="{visibility:isReady?'unset':'hidden'}">
		
		<view class="info_list">
			<view
				class="line"
				v-for="col in data.formColumn"
				:key="col.props"
			>
				<view class="left">
					<text class="word">{{col.title}}超出：</text>
				</view>
				
				<view class="right">
					<template v-if="col.props === 'status'">
						<template v-if="shareDemoStore.editData[col.props] == '启用'">
							<uni-tag :inverted="true" :text="shareDemoStore.editData[col.props]" type="success"></uni-tag>
						</template>
						<template v-else>
							<uni-tag :inverted="true" :text="shareDemoStore.editData[col.props]" type="error"></uni-tag>
						</template>
					</template>
						
					<template v-else>
						<text class="word">{{shareDemoStore.editData[col.props]}}</text>
					</template>
				</view>
			</view>
		</view>
	
		<button class="form_button" type="primary" @click="gotoEdit">编辑</button>
	</view>
</template>



<script setup>
import {
	onReady,
} from "@dcloudio/uni-app";
import { useShareDemoStore } from '@/stores/shareDemo';
import { reactive, ref } from "vue";
const shareDemoStore = useShareDemoStore();

const data = reactive({
	formColumn:[],
	formData:{},
});

const gotoEdit = ()=>{
	shareDemoStore.editDataPageTitle = '编辑';
	uni.navigateTo({
		url: '/pages/shareDemo/subpage/edit'
	});
};

const isReady = ref(false);
onReady(()=>{
	data.formColumn = [...shareDemoStore.tableColumn.slice(1)];
	isReady.value = true;
});

</script>





<style lang="scss" scoped>
	@mixin row {
		display: flex;
		flex-direction: row;
	}
	@mixin column {
		display: flex;
		flex-direction: column;
	}
	.edit_wrap{
		@include column;
		justify-content: flex-start;
		width: calc(750rpx - 56px);
		min-height: 100vh;
		padding: 28px 28px 50px 28px;
		background-color: #fff;
		visibility: hidden;
	}
	.page_title{
		width: 100%;
		padding-bottom: 60rpx;
	}
	.info_list{
		@include column;
		flex-wrap: nowrap;
		padding-bottom: 60rpx;
		
		& .line{
			@include row;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			margin-bottom: 30rpx;
			
			& .left{
				width: 230rpx;
				padding-right: 16px;
				text-align: right;
			}
			& .right{
				width: calc(100% - 250rpx);
				text-align: left;
			}
		}
		
	}
	
	.form_button{
		width: 60%;
		margin-top: 48px;
		border-radius: 24px;
		background-color: #18ae66;
	}
</style>