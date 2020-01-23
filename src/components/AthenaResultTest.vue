<template>
  <v-container>
    <div mb-4>
      <h1 class="display-2 font-weight-bold mb-3">
        This is pulling a result csv from AWS Athena
      </h1>
      <p class="subheading font-weight-regular">
        Also playing with visualization
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
          title: 'Number of unique/returning visitors per day',
          subtitle: 'Week of 1-14-20'
        },
        bars: 'horizontal', // Required for Material Bar Charts.
        hAxis: { format: 'decimal' },
        width: 700,
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
      })
    }
  },
  created() {
    let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
    let filename = "charttest.csv"
    this.$papa.parse(base+filename, {
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        results.data.pop()
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
