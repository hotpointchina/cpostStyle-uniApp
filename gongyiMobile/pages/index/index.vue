<template>
	<view class="gy_container">
		<view class="key_show">
			<view class="gy_info">
				<view class="box">
					<view class="line">
						<text class="word">爱心公益活动</text>
						<img class="tag_img" src="/static/tempPic/index/tag.png" />
					</view>
					
					<view class="line">
						<text class="summary">邮政公益，邮联万家</text>
					</view>
				</view>
			</view>
			
			<view class="user_click" @click="userInfoPage">
				<img class="user_img" src="/static/tempPic/index/user.png" />
			</view>
			
			<img class="key_show_img" src="/static/tempPic/index/dog.jpg" />
		</view>
		
		<view class="container_wrap_box" :style="{'padding-bottom':isSafari?'150px':'60px'}">
			<!-- 捐赠类型 -->
			<view class="box">
				<view class="category_title_botton">
					<text class="word">捐赠类型</text>
					<view class="gy_button">网点查询</view>
				</view>
				<view class="jz_type">
					<view class="info">
						<text class="title">衣服</text>
						<text class="summary">为世界添加一分温暖</text>
						<!-- <button type="warn">我要捐赠</button> -->
						<view class="gy_button">我要捐赠</view>
					</view>
					<view class="pic">
						<img mode="widthFix" class="pic_img" src="/static/tempPic/index/clothes.jpg" />
					</view>
				</view>
			</view>
			
			<!-- 捐赠流程 -->
			<view class="box">
				<text class="category_title">捐赠流程</text>
				<view class="jz_sop">
					<view class="crew">
						<view class="pic">
							<img class="file_img" src="/static/tempPic/index/file.png" />
							<uni-icons type="forward" size="20" class="sop_icon"></uni-icons>
						</view>
						<text class="word">捐赠下单</text>
					</view>
					
					<view class="crew">
						<view class="pic">
							<img class="you_ring_img" src="/static/tempPic/index/you-ring.png" />
							<uni-icons type="forward" size="20" class="sop_icon"></uni-icons>
						</view>
						<text class="word">网点自寄</text>
					</view>
					
					<view class="crew">
						<view class="pic">
							<img class="box_img" src="/static/tempPic/index/box.png" />
							<uni-icons type="forward" size="20" class="sop_icon"></uni-icons>
						</view>
						<text class="word">机构签收</text>
					</view>
					
					<view class="crew">
						<view class="pic">
							<img class="heart_img" src="/static/tempPic/index/taoxin.png" />
							<uni-icons type="forward" size="20" class="sop_icon"></uni-icons>
						</view>
						<text class="word">公益执行</text>
					</view>
				</view>
			</view>
			
			<!-- 旧衣回收去哪里了？ -->
			<view class="box">
				<text class="category_title">旧衣回收去哪里了？</text>
				<view class="clothes_where">
					<view class="box">
						<img class="pic" src="/static/tempPic/index/city.jpg" />
						<view class="word_box">
							<text class="word">环保再生</text>
							<view class="arrow"></view>
						</view>
					</view>
					
					<view class="box">
						<img class="pic" src="/static/tempPic/index/cat.jpg" />
						<view class="word_box">
							<text class="word">旧衣出口</text>
							<view class="arrow"></view>
						</view>
					</view>
					
					<view class="box">
						<img class="pic" src="/static/tempPic/index/book.jpg" />
						<view class="word_box">
							<text class="word">环保再造</text>
							<view class="arrow"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { reactive, ref } from "vue";
	const data = reactive({
		title: 'VUE3-uni-app-test'
	});
	
	const userInfoPage = ()=>{
		console.log( 'userInfoPage' );
	};
	
	const isSafari = ref(false);
	// #ifdef H5
	const userAgent = ref('');
	userAgent.value = navigator.userAgent.toLocaleLowerCase();
	if( userAgent.value.indexOf('safari') ){
		isSafari.value = true;
	}
	// #endif
</script>

<style lang="scss" scoped>
	@mixin row{
		display: flex;
		flex-flow: row nowrap;
	}
	@mixin column {
		display: flex;
		flex-direction: column;
	}
	
	.gy_container {
		height: calc(100vh - 44px);
		background-color: #fff;
		/*  #ifdef  H5  */
		position: fixed;
		top: 44px;
		left: 0px;
		z-index: 9;
		width: 100vh;
		overflow-y: scroll;
		box-sizing: content-box;
		/* #endif */
		font-size: 14px;
		line-height: 24px;
	}
	
	
	// 顶部图
	.key_show{
		@include row;
		justify-content: flex-start;
		align-items: flex-start;
		position: relative;
		width: 750rpx;
		height: 280rpx;
		overflow: hidden;
	}
	.key_show_img{
		width: 100%;
		opacity: .5;
	}
	.gy_info{
		position: absolute;
		top:50rpx;
		left:90rpx;
		z-index: 1;
		
		.box{
			@include column;
			justify-content: flex-start;
			align-items: flex-start;
		}
		.line{
			@include row;
			justify-content: flex-start;
			align-items: center;
		}
		
		& .word{
			font-size: 36rpx;
		}
		& .summary{
			margin-top: 30rpx;
			font-size: 26rpx;
		}
	}
	.tag_img{
		width: 34rpx;
		height: 45rpx;
		margin: -30rpx 0 0 17rpx;
		opacity: 1;
	}
	
	.user_click{
		@include row;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 21rpx;
		right: 32rpx;
		z-index: 1;
		width: 46rpx;
		height: 50rpx;
		
		& .user_img{
			width: 46rpx;
			height: 46rpx;
			opacity: 1;
		}
	}
	
	// 内容区
	.container_wrap_box{
		@include column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 750rpx;
		padding-bottom: 60px;
		/*  #ifdef  H5  */
		box-sizing: content-box;
		/* #endif */ 
		
		& .box{
			@include column;
			justify-content: flex-start;
			align-items: flex-start;
			width: 750rpx;
			padding: 22rpx;
			
			& .category_title_botton{
				@include row;
				justify-content: space-between;
				align-items: center;
				width: 697rpx;
				padding: 0rpx 0 29rpx 9rpx;
				
				& .word{
					padding: 0 0 0 9rpx;
					font-size: 26rpx;
				}
				& .gy_button{
					width: 160rpx;
					height: 60rpx;
					padding: 0rpx 24rpx;
					background-color: #18ae66;
					border-radius: 6rpx;
					color: #fff;
					font-size: 27rpx;
					line-height: 60rpx;
					text-align: center;
					box-sizing: border-box;
				}
			}
			& .category_title{
				padding: 20rpx 0 29rpx 9rpx;
				font-size: 26rpx;
			}
		}
	}
	.jz_type{
		@include row;
		justify-content: flex-start;
		align-items: flex-start;
		width: 706rpx;
		padding: 14rpx 10rpx;
		background: linear-gradient(90deg,#e3e8f1,#dde2f1);
		box-sizing: border-box;
		
		& .info{
			@include column;
			justify-content: space-between;
			align-items: center;
			width: 266rpx;
			& .title{
				 @include row;
				 justify-content: center;
				 align-items: center;
				 padding: 29rpx 0 20rpx 0;
				 color: #f20c0c;
				 font-size: 37rpx;
			}
			& .summary{
				padding-bottom: 20rpx;
				color: #102867;
				font-size: 24rpx;
			}
			& .gy_button{
				width: 160rpx;
				height: 60rpx;
				padding: 0rpx 24rpx;
				background-color: #f20c0c;
				border-radius: 6rpx;
				color: #fff;
				font-size: 27rpx;
				line-height: 60rpx;
				text-align: center;
				box-sizing: border-box;
			}
		}
		& .pic{
			@include row;
			justify-content: center;
			align-items: center;
			width: 420rpx;
			height: 240rpx;
			overflow: hidden;
			& .pic_img{
				width: 400rpx;
			}
		}
	}
	
	.jz_sop{
		@include row;
		justify-content: center;
		align-items: center;
		width: 706rpx;
		padding: 76rpx 0 59rpx 0;
		background: rgba(187, 187, 187, 0.17) none;
		border: 2px solid #bbbbbb;
		border-radius: 6px;
		box-sizing: border-box;
		
		& .crew{
			@include column;
			justify-content: center;
			align-items: center;
			margin-right: 54rpx;
			
			& .pic{
				@include row;
				justify-content: center;
				align-items: center;
				position: relative;
				height: 44rpx;
				margin-bottom: 40rpx;
				
				& .sop_icon{
					position: absolute;
					top: 2rpx;
					right: -70rpx;
					z-index: 1;
				}
				& .file_img{
					width: 33rpx;
					height: 43rpx;
				}
				& .you_ring_img{
					width: 44rpx;
					height: 44rpx;
				}
				& .box_img{
					width: 44rpx;
					height: 33rpx;
				}
				& .heart_img{
					width: 44rpx;
					height: 39rpx;
				}
			}
			& .word{
				font-size: 22rpx;
			}
		}
	}
	
	.clothes_where{
		@include row;
		justify-content: space-around;
		align-items: flex-start;
		width: 706rpx;
		background: #fff none;
		box-sizing: border-box;
		
		& .box{
			@include column;
			position: relative;
			width: 226rpx;
			height: 176rpx;
			padding: 0;
			
			& .pic{
				width: 226rpx;
				height: 176rpx;
				opacity: .7;
			}
			& .word_box{
				@include row;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 56rpx;
				left: 0;
				z-index: 1;
				width: 100%;
				
				& .word{
					color: #fff;
					font-size: 26rpx;
				}
				& .arrow{
					width: 0;
					height: 0;
					margin-left: 11rpx;
					border-left: 10rpx solid #fff;
					border-top: 10rpx solid transparent;
					border-bottom: 10rpx solid transparent;
				}
			}
		}
	}
</style>
