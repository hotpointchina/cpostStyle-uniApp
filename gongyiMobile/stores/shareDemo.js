// stores/counter.js
import { defineStore } from 'pinia';
import * as zMock from '../asset/api/shareDemoApi.js';
import { isPhone } from '../utils/handlerFunction.js';

export const useShareDemoStore = defineStore('shareDemoStore', {
	state: () => ({
		count: 0,
		
		// table page
		list:[],
		total:0,
		currentPage: 1,
		pageSize: 2,
		tableColumn: [
			{
				type:'input',
				props:'addressCode',
				title:'编号',
				width:'130',
				align:'left'
			},
			{
				type:'select',
				props:'eventName',
				title:'活动名称',
				width:'150',
				align:'center',
				required:true,
				option:[
					{ value: 0, text: "爱心行动社" },
					{ value: 1, text: "爱心公社" },
					{ value: 2, text: "志愿社" },
					{ value: 3, text: "爱益启" },
					{ value: 4, text: "白杨树" },
					{ value: 5, text: "递福巴士" },
					{ value: 6, text: "善乐行" },
					{ value: 7, text: "善义社" },
					{ value: 8, text: "益启爱" },
				]
			},
			{
				type:'select',
				props:'type',
				title:'类别',
				width:'60',
				align:'center',
				required:true,
				option:[
					{ value: 0, text: "助学" },
					{ value: 1, text: "助困" },
					{ value: 2, text: "助军" },
					{ value: 3, text: "助农" },
				]
			},
			{
				type:'input',
				props:'name',
				title:'姓名',
				width:'90',
				align:'center',
				required:true,
			},
			// gender: "男"
			// age: 14
			{
				type:'input',
				props:'phone',
				title:'联系电话',
				width:'100',
				align:'center',
				// required:true,
			},
			{
				type:'select',
				props:'certificateType',
				title:'证件类型',
				width:'96',
				align:'center',
				required:true,
				option:[
					{ value: 0, text: "居民身份证" },
					{ value: 1, text: "学生证" },
					{ value: 2, text: "士官证" },
				]
			},
			{
				type:'input',
				props:'certificateNumber',
				title:'证件编号',
				width:'150',
				align:'center',
				// required:true,
			},
			{
				type:'select',
				props:'province',
				title:'所在省',
				width:'130',
				align:'center',
				option:[
					{ value: 0, text: "河北省" },
					{ value: 1, text: "云南省" },
					{ value: 2, text: "黑龙江省" },
				]
			},
			{
				type:'select',
				props:'city',
				title:'所在城市',
				width:'100',
				align:'center',
				option:[
					{ value: 0, text: "河北-1" },
					{ value: 1, text: "云南-2" },
					{ value: 2, text: "黑龙江-3" },
				]
			},
			{
				type:'select',
				props:'county',
				title:'所在区县',
				width:'150',
				align:'center',
				option:[
					{ value: 0, text: "河北-1-1" },
					{ value: 1, text: "云南-2-2" },
					{ value: 2, text: "黑龙江-3-3" },
				]
			},
			{
				type:'input',
				props:'detailAddress',
				title:'详细地址',
				width:'150',
				align:'center'
			},
			{
				type:'dateTimePicker',
				props:'createTime',
				title:'创建时间',
				width:'150',
				align:'center'
			},
			
			{
				type:'select',
				props:'status',
				title:'状态',
				width:'70',
				align:'center',
				option:[
					{ value: 0, text: "启用" },
					{ value: 1, text: "停用" }
				]
			},
		],
		
		formRules: {
			eventName: {
				rules: [{
						required: true,
						errorMessage: '请选择活动名称',
					}
				]
			},
			type: {
				rules: [{
						required: true,
						errorMessage: '请选择救助类别',
					}
				]
			},
			name: {
				rules: [{
						required: true,
						errorMessage: '请输入姓名',
					}
				]
			},
			certificateType: {
				rules: [{
						required: true,
						errorMessage: '请选择证件类型',
					}
				]
			},
			// certificateNumber: {
			// 	rules: [
			// 		{
			// 			required: true,
			// 			errorMessage: '请输入证件编号',
			// 		},
			// 		{
			// 			validateFunction:function(rule,value,data,callback){
			// 				if (value.length < 18) {
			// 					callback('证件编号不正确')
			// 				}
			// 				return true
			// 			}
			// 		}
			// 	]
			// },
			// phone: {
			// 	rules: [
			// 		{
			// 			required: true,
			// 			errorMessage: '请输入联系电话',
			// 		},
			// 		{
			// 			validateFunction:function(rule,value,data,callback){
			// 				if ( !isPhone(value) ) {
			// 					callback('证件编号不正确')
			// 				}
			// 				return true
			// 			}
			// 		}
			// 	]
			// },
		},
		editData:{},
		editDataPageTitle:'',
		
		// 请求 列表数据的 信息
		queryListInfo:{},
		
		// 订单页面
		orderInfoCard:[
			{
				key: 'addressCode',
				title: '编号',
			},
			{
				key: 'eventName',
				title: '活动名称',
			},
			{
				key: 'name',
				title: '姓名',
			},
			{
				key: 'phone',
				title: '联系电话',
			},
			{
				key: 'fullAdress',
				title: '联系地址',
			},
		]
	}),
	actions: {
		async getList(data){
			this.queryListInfo = data;
			const res = await zMock.getListApi(data);
			console.log( ' store getList res -> ', res );
			if(res && res.data){
				this.list = res.data.list;
				this.currentPage = res.data.current;
				this.pageSize = res.data.pageSize;
				this.total = res.data.listTotal;
				console.log( ' store getList this.list -> ', this.list );
			}
		},
		// 加载更多
		async getMoreList(data){
			data = {...data};
			this.currentPage++;
			data.current = this.currentPage;
			data.pageSize = this.pageSize;
			data.pageConfig = {
				current: this.currentPage,
				pageSize: this.pageSize,
				orderby: data.orderby,
			};
			const res = await zMock.getListApi(data);
			console.log( ' store getMoreList res -> ', res );
			
			if(res && res.data){
				this.list = [...res.data.list, ...this.list];
				this.currentPage = res.data.current;
				this.pageSize = res.data.pageSize;
				this.total = res.data.listTotal;
			}
			
		},
		
		saveEditData( obj ){
			this.editData = {...obj};
		},
		async modifyList(data){
			console.log( ' 请求 列表数据的 信息 queryListInfo ->', this.queryListInfo );
			const sendData = {
				pageInfo: {
					current: this.queryListInfo.current,
					pageSize: this.queryListInfo.pageSize,
					orderby: this.queryListInfo.orderby
				},
				data
			};
			const res = await zMock.modifyListData( sendData );
			console.log( ' 更新 & 修改 学生类的列表 res ->', res );
			if( res.statusCode==200 ){
				this.list = res.data.list;
				return res.data
			}else{
				return res.data
			}
			
		},
		addToList(obj){
			this.list = [ ...this.list, obj];
			return {
				statusCall: 'ok'
			};
		},
		repealEditData(){
			this.editData = {};
		},
		
		countHandler( flag ){
			console.log( ' countHandler ', flag )
			flag 
				? this.count++
				: this.count--;
		},
	},
});