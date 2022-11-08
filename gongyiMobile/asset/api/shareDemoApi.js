// 仅用于测试
// import axios from 'axios';
	
	
const o2o = (data)=>{
	return Object.keys(data).map(key=>{
						let str = ``;
						str += `${key}=${data[key]}&`;
						return str
					}).join('').slice(0,-1);
};




// 获取 orderList 页面的列表
export function getListApi (data){
	console.log( ' getListApi data -> ', data );
	console.log( ' getListApi o2o(data) -> ', o2o(data) );
	return new Promise(resolve=>{
		uni.request({
			url: 'http://1.15.182.223:9090/getStudenMockDataList',
			// url: 'http://localhost:9090/getStudenMockDataList',
			header: {'content-type': 'application/json;charset:utf-8'},
			method: 'POST',
			data,
			complete: (res) => resolve(res)
		})
	})
}

// 更新 orderList 页面列表中对应的数据
export function modifyListData(data){
	return new Promise(resolve=>{
		uni.request({
			url: 'http://localhost:9090/studenListUpdate',
			// url: 'http://localhost:9090/studenListUpdate',
			header: {'content-type': 'application/json;charset:utf-8'},
			method: 'POST',
			data,
			complete: (res) => resolve(res)
		})
	})
}

