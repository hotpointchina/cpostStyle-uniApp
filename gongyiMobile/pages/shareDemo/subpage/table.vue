<template>
	<view class="gy_container">
		<uni-title type="h2" title="模拟数据的列表" color="#33333F"></uni-title>
		
		
		<uni-table stripe emptyText="暂无更多数据" >
			<!-- 表头行 -->
			<uni-tr>
				<uni-th
					v-for="column in shareDemoStore.tableColumn"
					:key="column.title"
					:align="column.align"
					:width="column.width"
				>{{column.title}}</uni-th>
			</uni-tr>
			
			<!-- 表格数据行 -->
			<uni-tr
				v-for="tdata in shareDemoStore.list"
				:key="tdata.addressCode"
			>
				<uni-td
					v-for="(column) in shareDemoStore.tableColumn"
					:width="column.width"
					:align="column.align"
					:key="column.props"
				>
					<template v-if="column.props == 'addressCode'">
						<view class="address_code_box" @click="gotoDetail(tdata)">
							{{tdata[column.props]}}
						</view>
					</template>
					
					<template v-else-if="column.props === 'status'">
						<template v-if="tdata[column.props] == '启用'">
							<uni-tag :inverted="true" :text="tdata[column.props]" type="success"></uni-tag>
						</template>
						<template v-else>
							<uni-tag :inverted="true" :text="tdata[column.props]" type="error"></uni-tag>
						</template>
					</template>
					<template v-else>
						{{tdata[column.props]}}
					</template>
					
				</uni-td>
			</uni-tr>
		</uni-table>
		
		<view class="gy_table_pagination">
			<uni-pagination :current="shareDemoStore.currentPage" :total="shareDemoStore.total" title="标题文字" :show-icon="true" @change="change" />
			<text class="example-info">当前页：{{ shareDemoStore.currentPage }}，数据总量：{{ shareDemoStore.total }}条，每页数据：{{ shareDemoStore.pageSize }}</text>
		</view>
		
		
		
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup_button_group">
				<view class="popup_choose" @click="pbClick('detail')"><text class="word">查  看</text></view>
				<view class="popup_choose" @click="pbClick('edit')"><text class="word">编  辑</text></view>
				<view class="popup_choose" @click="pbClick('delete')"><text class="word danger">删  除</text></view>
			</view>
		</uni-popup>
	</view>
</template>



<script setup>
  import {
		onShow
	} from "@dcloudio/uni-app";
	import { reactive, ref } from "vue";
	import { useShareDemoStore } from '@/stores/shareDemo';
	const shareDemoStore = useShareDemoStore();
	
	onShow(async ()=>{
		if( shareDemoStore.editDataPageTitle == '' ){
			await shareDemoStore.getList({
						requestCode:100,
							detailAddress:true,
							certificateNumber:true,
							name:true,
							phone:true,
							current: shareDemoStore.currentPage, 
							pageSize: shareDemoStore.pageSize,
							orderby: 'desc',
							status: ['start','stop'],
					});
		}
		console.log( ' table onShow ', shareDemoStore.list );
	});
	
	
	const popup = ref();
	const gotoDetail = (obj)=>{
		console.log( ' gotoDetail obj -> ', obj );
		shareDemoStore.saveEditData(obj);
		popup.value.open('bottom');
	};
	const pbClick = (str)=>{
		console.log( ' pbClick str -> ', str );
		switch ( str ){
			case 'detail':
				shareDemoStore.editDataPageTitle = '新增';
				uni.navigateTo({
					url: '/pages/shareDemo/subpage/detail'
				});
				break;
			case 'edit':
				shareDemoStore.editDataPageTitle = '编辑';
				uni.navigateTo({
					url: '/pages/shareDemo/subpage/edit'
				});
				break;
		}
	};
	
</script>







<style lang="scss" scoped>
@import '@/uni_modules/uni-scss/variables.scss';
@mixin row {
	display: flex;
	flex-direction: row;
}
@mixin column {
	display: flex;
	flex-direction: column;
}

.gy_container{
	@include column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 730rpx;
	min-height: calc(100vh - 56px);
	padding: 28px 10rpx;
	background-color: #fff;
}
:deep(.uni-table-td ){
	text-overflow:ellipsis;
	white-space:nowrap;
	overflow:hidden;
}
.address_code_box{
	color: #0099E0;
	text-decoration: underline;
}
.gy_table_pagination{
	width: 100%;
}
.popup_error{
	color: $uni-error;
}
.popup_button_group,
.popup_choose{
	@include column;
	justify-content: center;
	align-items: center;
	width: 100%;
}
.popup_choose{
	padding: 24rpx 0;
	border-bottom: 1px solid #d8d8dc;
	& .word{
		line-height: 50rpx;
	}
	& .word.danger{
		color: #ff5446;
	}
}
.popup_choose:last-child{
	border: 0px;
}
</style>