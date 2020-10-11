<template>
  <div class="radar">
    <chart :options="option"></chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
export default {
  components: {
    chart: ECharts
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["体能", "带球", "抢断", "射门", "头球"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 335, name: "体能" },
              { value: 310, name: "带球" },
              { value: 234, name: "抢断" },
              { value: 135, name: "射门" },
              { value: 1548, name: "头球" }
            ]
          }
        ]
      }
    };
  }
};
</script>