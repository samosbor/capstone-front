<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">
          Unique visitors
        </h1>
        <p class="subheading font-weight-regular">
          By day of the week
        </p>
        <v-spacer></v-spacer>
        <v-btn @click="exportToCsv()" bottom>Export</v-btn>
      </v-col>
      <v-col>
        <v-date-picker v-model="date" @input="getChartData()" landscape></v-date-picker>
      </v-col>
    </v-row>
    <v-card class="pa-5">
      <GChart
        :settings="{packages: ['bar']}"    
        :data="dataTable"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
        @ready="onChartReady"
        width="90%"
      />
    </v-card>
  </v-container>
</template>

<script>
import exportService from '@/misc/exportService.js'
export default {
  name: 'UniqueWeekly',
  components: {
    
  },
  data: () => ({
    dataTable: [],
    chartsLib: null,
    date: "",
    storeName: "store_name_1",
    query: "unique_per_day_by_week"
  }),
  computed: {
    chartOptions () {
      if (!this.chartsLib) return null
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'Number of unique visitors per day',
          subtitle: this.date
        },
        hAxis: { format: 'decimal' },
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
      var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate()
      this.date = date
    },
    getChartData() {
      let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
      //let pretest = "athena-query-logs/store_name_1/unique_per_hour/2020-01-07"
      let prefix = "athena-query-logs/" + this.storeName + "/" + this.query + "/" + this.date + "/"
      this.axios.get(base+"?prefix="+prefix)
        .then((response) => {
          var parser = new DOMParser();
          let data = parser.parseFromString(response.data, "text/xml");
          let key = data.getElementsByTagName("Key")[0].innerHTML
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
    },
    exportToCsv() {
      exportService.exportToCSV(this.storeName + "_" + this.query + "_" + this.date, this.dataTable)
    }
  }
};
</script>
