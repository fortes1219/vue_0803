<template>
  <div class="page component">
    <h1>父子組件資料傳遞</h1>
    <br>
    <tabs :durationsDisplay="true" @tabDuration="tabDuration"></tabs>
		<!-- <tabs :onSaleDisplay="true" @tabOnSale="tabOnSale"></tabs> -->
    <ve-line v-if="currentTab == 0" key="dayTabs01" :data="betSuccess" :loading="true" :settings="lineChartConfig" :legend-visible="false" :colors="lineChartColor.blue" />
  </div>
</template>
<script>
import tabs from '../tabs'
export default {
  components: {
    tabs
  },

  data() {
    this.lineChartConfig = {
      area: true
    }
    return {
      currentTab: '',
      lineChartColor: {
        blue: ['#dcb5ff'],
        orange: ['#a5a552'],
        green: ['#ffe153']
      },
      betSuccess: {
        columns: ['日期', '有效投注'],
        rows: [
          { '日期': '08/17', '有效投注': '100000' },
          { '日期': '08/18', '有效投注': '350000' },
          { '日期': '08/19', '有效投注': '490000' },
          { '日期': '08/20', '有效投注': '370000' },
          { '日期': '08/21', '有效投注': '540000' },
          { '日期': '08/22', '有效投注': '350000' },
          { '日期': '08/23', '有效投注': '650000' },
          { '日期': '08/24', '有效投注': '1000000' },
          { '日期': '08/25', '有效投注': '1400000' },
          { '日期': '08/26', '有效投注': '700000' }
        ]
      },
    }
  },

  methods: {
    tabDuration(val) {
			this.currentTab = val
      console.log('duration type: ', val)
		},
		tabOnSale(val) {
			this.currentTab = val
      console.log('on sale type: ', val)
    }
  },

  created() {

  }
}
</script>