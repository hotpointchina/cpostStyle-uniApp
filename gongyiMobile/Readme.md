# 微信小程序 & H5   

## 技术栈     
- uni-app(HBuilder)   
- uni-ui   
- uni-app 分包加载   
- vue3   
- pinina（使用HBuilder创建项目后，自带）   
- dayJS（手动安装）   
- 腾讯地图   

## 页面   
> pages/index   
- 目录导航页   
1. 微信小程序 & H5 交替打包的判读   

> pages/map   
- 腾讯地图的应用    
	+ 微信小程序 使用的是 uni-app 自带的 **<map>** 组件   
	+ H5 打包，使用的是 腾讯地图 原生的 API    

- 微信小程序 & H5 打包，尽可能的做到，视觉、操作的一致性   
- **注**      
	+ 微信小程序方面的地图操作，由于使用的是 uni-app 的内置组件 <map> ，故此，调整需求查看文档：   
	+ [uni-app,map文档](https://uniapp.dcloud.net.cn/component/map.html#)    
	+ H5 端，使用的是腾讯地图 原生的 API，依赖手动编写的 `/pages/map/Function/TMap.js` 文件    
		- 代理加载 腾讯地图必要的 JS 文件（提供2中方式，本地or远程），并校验该文件是否加载完成。完成后，进行地图的初始化。  
		- 腾讯地铁的 KEY 使用的是，文档中提供的测试 KEY    
		- TMap.js 在完成初始化地图后，返回 地图实例、标记点实例、自定义Lable实例、地图中心点信息等内容，可以直接用于在页面中，对于地图的后续操作   
	+ H5 端，地图初始化后返回的各个实例，不能存储为 VUE 的响应式数据中    

> pages/shareDemo    
- `pages/shareDemo/index.vue` 与 `pages/shareDemo/index.vue` SVG 图片等的测试   
- `pages/shareDemo/subpage`   
	+ 增删改查的 DEMO     
	+ orderList.nvue 仿微信小程序 京医通 的订单列表页面     
	+ table.vue uni-ui 的 table 组件的列表页面     
	+ 远程请求模拟数据数据。依赖 `BackendServe`      
	+ 请求函数方面，已处理了 nodeJS koa 框架在接收 post 请求时报错的问题     


## H5 打包、及打包后的运行项目    

> 打包    
- HBuilderX 顶部菜单栏：`发行` -> `网站-PC Web或手机H5(仅适用于uni-app)(H)`  

> 运行    
- 需要运行在网络服务中。可在本地等地方启动一个 Living Server 后，使用 [代理的服务](https://192.168.1.113:8001/) 进行浏览




