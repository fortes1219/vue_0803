---
title: '2019/08/31~09/07 VueJS 教學筆記'
disqus: hackmd
---

2019/08/31~09/07 VueJS 教學筆記
===

綱要

[TOC]

一. Vue Life Circle 生命週期
---
![](https://i.imgur.com/MLYrjeX.jpg)

當瀏覽器開始new Vue()階段時，會依序經過以下步驟，且每個步驟都可以根據需要的階段來掛載methods:

==**beforeCreate()**==

觀察`data()`結構與初始化 events 

==**created()**==

是否有"el"的 option 被調用，假如有則判斷是否有"template"元素出現，沒有的話則 view model 呼叫 mount 掛載 el 。如果有 `template`，將 `template` 中的 html 模板編譯到 `render()` 中，若沒有 `template` 出現在環境則編譯 el 上一層的 HTML 作為 `template` 模板。

==**beforeMount()**==

Vue掛載初始化並處理好的組件設定與事件之前，會建構一個`vm.$el`屬性物件替換el。

==**mounted()**==

掛載階段，如果data有被更動，則進入`beforeUpdate()`。

==**beforeUpdate()**==

將VDOM重新render並更新。

==**updated()**==

更新data後的狀態。

==**beforeDestroy()**==

當`mounted()`後如果有呼叫`vm.$destroy()`的行為，則進入`beforeDestroy()`
此時拆卸`watcher`(比如compted的getter或watch)和子組件、以及事件偵聽後進入`destroyed()`消滅。

二、router 路由新增頁面練習
---
[GitHub範例](https://github.com/fortes1219/vue_0803/blob/0803/src/router.js)
:::info
注意，假如你也有跟我一樣要把 Home 設定起始畫面就是 Dashboard 才跟著做，如果要改成獨立分頁，寫在跟 home 平行同層物件下即可。
:::

```javascript=
{
  path: 'newpage' //路徑。也就是網址打什麼後綴字會出現
  name: 'newPage', //名稱，router切換頁面$router.push('newPage')會使用這個名字  
  component: () => import './views/newPage.vue'  // 將新增頁面的vue檔案拉到這
}
```

三、Vue 使用 axios 的封裝方式
---
:::info
除了不需要 Call API 取得 Data List 或  Select Options 而會將設定寫入 data() 外，儘早讓各位同學習慣從 JSON Server 模擬環境 Get 資料，提前安排 Axios + vue-axios 在這個禮拜講解實作一次。
:::

先安裝以下套件：

`npm install axios`
`npm install vue-axios`
`npm install json-server`

然後在專案的根目錄下新增 `db.json`，並且新增一些內容。[GitHub範例](https://github.com/fortes1219/vue_0803/blob/0803/db.json)

接下來開啟終端程式輸入 `json-server --watch db.json`

就會看到這個畫面
```
\{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
  http://localhost:3000/profile
  http://localhost:3000/tableData ##剛剛在db.json新增的資料

  Home
  http://localhost:3000


```

==1. main.js當中引入並且設定global prototype==

[GitHub範例](https://github.com/fortes1219/vue_0803/blob/0803/src/main.js)

```javascript=
/* main.js */
import axios from 'axios'
import api from '@/service/api'  // 第二步驟會用到
import VueAxios from 'vue-axios'
// 教學專案採用element UI組件來切版和建置表單，所以先裝好
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 套用並設定prototype
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$api = api // 定義api這個常數給AXIOS存取json-server或實際api環境用
```

==2. 在src裡面創建一個叫做「service」的目錄，此目錄下再創建一個「api.js」==

[GitHub範例](https://github.com/fortes1219/vue_0803/blob/0803/src/service/api.js)

```javascript=
/* api.js */
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
const api = {
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

	get: function (url, params) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: params
			})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	},

	post: function (url, params) {
		return new Promise((resolve, reject) => {
			axios.post(url, params)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	},

	delete: function (url, params) {
		return new Promise((resolve, reject) => {
			axios.delete(url)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}

}
export default api
```

==3. 封裝好axios後回到頁面檔案==

[GitHub範例](https://github.com/fortes1219/vue_0803/blob/0803/src/views/ApiTemp.vue)

```htmlmixed=
<template>
<!--ApiTemp.vue-->
  <div>
    API測試
  </div>
</template>
```

```javascript=
<script>
export default {

data() {
   return{
     tableData: []  //宣告個空陣列
   }
 },
 methods: {
      async packageGetData() {
      const url = 'tableData'  // json-server  API 位置
      let res = await this.$api.get(url)
      this.tableData = [...res]  // 透過ES6語法將res的內容直接繼承到tableData
      console.log(res)
    },
  },

  created() {
    this.packageGetData() // 在created 階段把API資料叫進來
  }

}
</script>
```

接著在開發人員工具畫面的Console中就可以看到我們從 `tableData` Get 回來的資料了。

###### tags: `VueJS` `Axios`
