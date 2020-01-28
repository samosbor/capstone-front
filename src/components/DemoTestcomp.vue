<template>
  <v-container>
    <div mb-5>
      <h1 class="display-2 font-weight-bold mb-3">
        We are spying on you
      </h1>
      <p class="subheading font-weight-regular">
        Some of you were late to class
      </p>
    </div>
      <GChart
        :settings="{packages: ['bar']}"    
        :data="dataTable"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
        @ready="onChartReady"
      />
  </v-container>
</template>

<script>

export default {
  name: 'AthenaResultTest',
  components: {
    
  },
  data: () => ({
    dataTable: [],
    chartsLib: null
  }),
  computed: {
    chartOptions () {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'Number of unique devices scanned per 10 minute interval',
          subtitle: 'Demo Day Jan 28, 2020'
        },
        hAxis: { format: 'decimal' },
        width: 700,
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
      })
    }
  },
  created() {
    let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
    let filename = "demotest1.csv"
    this.$papa.parse(base+filename, {
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        results.data.pop()
        results.data[0][0] = "10 Minute Time Interval"
        results.data[0][1] = "# Unique Devices"
        this.dataTable = results.data
      }
    })
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
    }
  }
};
</script>
