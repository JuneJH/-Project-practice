<template>
  <div class="radar">
    <chart :options="option"></chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/radar";
export default {
  components: {
    chart: ECharts
  },
  name: "HelloWorld",
  data() {
    return {
      option: {
        tooltip: {},
        legend: {
          data: ["期望可达值", "目前实际值"]
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "速度", max: 6500 },
            { name: "射门", max: 16000 },
            { name: "防守", max: 30000 },
            { name: "力量", max: 38000 },
            { name: "传球", max: 52000 },
            { name: "盘带", max: 25000 }
          ]
        },
        series: [
          {
            name: "目标 vs 目前",
            type: "radar",
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "期望可达值"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "目前实际值"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>