
/* uni.getLocation() 获取当前经纬度 */
export function getLocation(){
	return new Promise((resolve)=>{
		uni.getLocation({
			success(res) {
				console.log('当前经纬度',res);
				resolve(res);
			}
		})
	})
}

/* QQMapWX 引入腾讯地图SDK，qqmap-wx-jssdk.js */
const QQMapWX=require('../utils/qqmap-wx-jssdk.js');
/**
 * 实例化腾讯地图 https://lbs.qq.com/dev/console/key/manage
 * 	key 秘钥，YACBZ-5LPK6-GOQSO-EP343-7LD4J-SIBLV
 */
const map=new QQMapWX({
	key:'HFRBZ-POEWG-54QQ2-I4JJ5-JI5AT-3CBNX'
});

/**
 * map.reverseGeocoder({}) 反解析经纬度
 * 	location{latitude,longitude} 经纬度
 * 	success 成功回调
 * 		获取城市 result.result.address_component.city
 */
export function analysis({latitude,longitude}){
	return new Promise((resolve)=>{
		map.reverseGeocoder({
			location:{latitude,longitude},
			// success:( {result:{address_component:{city}}} )=>{
			// 	console.log('【经纬度反解析结果】', city);
			// 	resolve(city);
			// },
			success:( result )=>{
				// const city = result.result.address_component.city;
				console.log('【经纬度反解析结果】', result);
				resolve( {address:result.result.address_component} );
			},
			fail(err){
				console.log('【错误】', err );
			}
		})
	});
}
	
	