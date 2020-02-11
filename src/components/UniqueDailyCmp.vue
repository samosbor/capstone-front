<template>
  <v-container>
    <div mb-4>
      <h1 class="display-2 font-weight-bold mb-3">
        Unique visitors
      </h1>
      <p class="subheading font-weight-regular">
        By hour of the day
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
  name: 'UniqueDailyCmp',
  components: {
    
  },
  data: () => ({
    dataTable: [],
    chartsLib: null,
    date: "",
    storeName: "store_name_1",
    query: "unique_per_hour"
  }),
  computed: {
    chartOptions () {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'Number of unique visitors per hour',
          subtitle: this.date
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
    this.setCurrentDate()
    this.getChartData()
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
    },
    setCurrentDate () {
      var today = new Date()
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      this.date = date
    },
    getChartData() {
      let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
      let pretest = "athena-query-logs/store_name_1/unique_per_hour/2020-01-07"
      let prefix = "athena-query-logs/" + this.storeName + "/" + this.query + "/" + this.date + "/"
      this.axios.get(base+"?prefix="+pretest)
        .then((response) => {
          var parser = new DOMParser();
          let data = parser.parseFromString(response.data, "text/xml");
          let key = data.getElementsByTagName("Key")[1].innerHTML
          console.log(key)
          return key
        })
        .then((key) => {
          this.$papa.parse(base+key, {
          download: true,
          dynamicTyping: true,
          complete: (results) => {
            results.data.pop()
            this.dataTable = results.data
          }
      })

        })
        .catch((error) => {
      })
    }
  }
};
</script>
