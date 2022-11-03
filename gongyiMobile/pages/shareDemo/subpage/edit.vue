<template>
	<view class="edit_wrap" :style="{visibility:isReady?'unset':'hidden'}">
		
		<uni-forms 
			ref="editForm"
			label-position="top"
			:modelValue="data.formData"
			:rules="shareDemoStore.formRules"
		>
				<uni-forms-item 
					class="form_section"
					v-for="col in data.formColumn"
					:key="col.props"
					:label="col.title"
					:required="col.required"
					:name="col.props"
				>
					<uni-easyinput 
						v-if="col.type == 'input'"
						class="" 
						trim="all" 
						v-model="data.formData[col.props]" 
						:placeholder="`请输入${col.title}`"
					></uni-easyinput>
					
					<!-- <input
						class="uni-input"
						v-if="col.type == 'inputNumber'"
						type="number"
						v-model="data.formData[col.props]" 
						:placeholder="`请输入${col.title}`"
					/> -->
					
					<uni-data-select
						v-if="col.type == 'select' "
						v-model="data.formData[col.props]" 
						:localdata="col.option" 
					></uni-data-select>
					
					<uni-datetime-picker
						v-if="col.type == 'dateTimePicker'"
						v-model="data.formData[col.props]" 
						@change="dateTimePickerChange"
					/>
				</uni-forms-item>
			
		</uni-forms>
		<button class="form_button" type="primary" @click="submit">提交</button>
	</view>
</template>



<script setup>
import {
	onReady
} from "@dcloudio/uni-app";
import { useShareDemoStore } from '@/stores/shareDemo';
import { reactive, ref } from "vue";
const shareDemoStore = useShareDemoStore();

const data = reactive({
	formColumn:[],
	formData:{},
});

console.log( ' EditPage editData -> ', shareDemoStore.editData );

const dateTimePickerChange = (e)=>{
	console.log( ' EditPage dateTimePickerChange e -> ', e );
};


const editForm = ref();
const formValidate = ()=>{
	return new Promise((resolve,reject)=>{
		editForm.value.validate().then(async res=>{
			console.log('表单数据信息：', res);
			res.validateStatus = true;
			resolve(res);
		}).catch(err =>{
			console.log('表单错误信息：', err);
			err.validateStatus = false;
			uni.showToast({
				icon:'error',
				title: '有必输项目未填',
				duration: 2000
			});
			reject(err);
		})
	});
};

const submit = async ()=>{
	const validateRes = await formValidate();
	let res = null;
	if( validateRes.validateStatus ){
		const sendData = {...formatData(data.formData,'word')};
		switch( shareDemoStore.editDataPageTitle ){
			case '添加':
				sendData.addressCode = 'NEWCO-' + Math.floor( Math.random() * Math.pow(10,4) );
				res = await shareDemoStore.addToList( sendData );
				break;
			case '编辑':
				res = await shareDemoStore.modifyList( sendData );
				console.log( ' Edit 编辑 res -> ', res );
				break;
		}
	}
	if( res && res.statusCall == 'ok' ){
		uni.showToast({
			title: '更新成功',
			duration: 2000
		});
		// 清空 store 中的 editData
		shareDemoStore.repealEditData();
		setTimeout(()=>{
			uni.navigateTo({
				url: '/pages/shareDemo/subpage/orderList'
			});
		},500)
		
	}else{
		uni.showToast({
			title: '更新失败',
			duration: 2000
		});
	}
}

/*
	将数据转换为 form Select 需要的格式，
	或者转换为
	本来的样子（从服务器上获取到的样子）
*/
const getOptionValue = (arr, obj, key, direction='number')=>{
	for(let i=0; i<arr.length; i++){
		if( arr[i].props == key ){
			// if( direction == 'number' ){
			// 	obj[key] = arr[i].option.find(it=>it.text==obj[key]).value;
			// }else{
			// 	console.log( ' getOptionValue text key -> ' , key );
			// 	console.log( ' getOptionValue text arr[i].option -> ' , arr[i].option );
			// 	console.log( ' getOptionValue text obj[key] -> ' , obj[key] );
			// 	console.log( ' getOptionValue text value -> ' , arr[i].option.find(it=>it.value+''==obj[key]+'') );
			// 	obj[key] = arr[i].option.find(it=>it.value+''==obj[key]+'').text;
			// }
			obj[key] = direction == 'number'
				? obj[key] = arr[i].option.find(it=>it.text==obj[key]).value
				: arr[i].option.find(it=>it.value+''==obj[key]+'')
						? arr[i].option.find(it=>it.value+''==obj[key]+'').text
						: 0;
			break;
		}
	}
};

const formatData = (obj, direction='number')=>{
	let temp = {...obj};
	Object.keys(temp).forEach(key=>{
		switch (key){
			case 'eventName':
			case 'type':
			case 'certificateType':
			case 'status':
				getOptionValue( shareDemoStore.tableColumn, temp, key, direction );
				break;
		}
	});
	return temp;
};


const isReady = ref(false);
onReady(()=>{
	editForm.value.setRules(shareDemoStore.formRules);
	data.formColumn = [...shareDemoStore.tableColumn.slice(1)];
	if( shareDemoStore.editDataPageTitle == '编辑' ){
		data.formData = {...formatData(shareDemoStore.editData)};
	}else{
		data.formData = {};
	}
	isReady.value = true;
});




</script>





<style lang="scss" scoped>
	@mixin column {
		display: flex;
		flex-direction: column;
	}
	.edit_wrap{
		@include column;
		justify-content: flex-start;
		width: calc(750rpx - 56px);
		padding: 28px 28px 50px 28px;
		background-color: #fff;
	}
	:deep(.uni-forms form){
		@include column;
		flex-wrap: nowrap;
		padding-bottom: 60rpx;
	}
	.form_section{
		@include column;
		flex-wrap: nowrap;
		width: 100%;
		margin-bottom: 30rpx;
	}
	.form_button{
		width: 60%;
		border-radius: 24px;
		background-color: #18ae66;
	}
</style>