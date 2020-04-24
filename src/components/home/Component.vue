<template>
  <div class="page component">
    <h1>父子組件資料傳遞</h1>
    <br />
    <tabs
      :durationsDisplay="true"
      @tabDuration="tabDuration"
    />
    <!-- <tabs :onSaleDisplay="true" @tabOnSale="tabOnSale"></tabs> -->
    <ve-line
      v-if="currentTab == 0"
      key="dayTabs01"
      :data="income"
      :loading="true"
      :settings="lineChartConfig"
      :legend-visible="false"
      :colors="lineChartColor.blue"
    />
    <ve-line
      v-if="currentTab == 1"
      key="dayTabs02"
      :data="incomeRate"
      :loading="true"
      :settings="lineChartConfigPercentage"
      :legend-visible="false"
      :colors="lineChartColor.orange"
    />
  </div>
</template>
<script>
import tabs from "../tabs"
export default {
  components: {
    tabs
  },

  data() {
    this.lineChartConfig = {
      area: true
    },
    this.lineChartConfigPercentage = {
      area: true,
      yAxisType: ['percent']
    }
    return {
      currentTab: "",
      lineChartColor: {
        blue: ["#dcb5ff"],
        orange: ["#a5a552"],
        green: ["#ffe153"]
      },
      income: {
        columns: ["日期", "有效總收益"],
        rows: [
          { "日期": "08/17", "有效總收益": "100000" },
          { "日期": "08/18", "有效總收益": "350000" },
          { "日期": "08/19", "有效總收益": "490000" },
          { "日期": "08/20", "有效總收益": "370000" },
          { "日期": "08/21", "有效總收益": "540000" },
          { "日期": "08/22", "有效總收益": "350000" },
          { "日期": "08/23", "有效總收益": "650000" },
          { "日期": "08/24", "有效總收益": "1000000" },
          { "日期": "08/25", "有效總收益": "1400000" },
          { "日期": "08/26", "有效總收益": "700000" }
        ]
      },
      incomeRate: {
        columns: ['日期', '獲利率'],
        rows: [
          { "日期": '08/17', '獲利率': '-0.05' },
          { "日期": '08/18', '獲利率': '0.03' },
          { "日期": '08/19', '獲利率': '0.05' },
          { "日期": '08/20', '獲利率': '0.03' },
          { "日期": '08/21', '獲利率': '0.06' },
          { "日期": '08/22', '獲利率': '0.025' },
          { "日期": '08/23', '獲利率': '0.06' },
          { "日期": '08/24', '獲利率': '0.1' },
          { "日期": '08/25', '獲利率': '0.13' },
          { "日期": '08/26', '獲利率': '0.0865' }
        ]
      }
    }
  },

  methods: {
    tabDuration(val) {
      this.currentTab = val
      console.log("duration type: ", val)
    },
    tabOnSale(val) {
      this.currentTab = val
      console.log("on sale type: ", val)
    }
  },

  created() {}
}
</script>