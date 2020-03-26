<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">
          Range Config Stats
        </h1>
        <p class="subheading font-weight-regular">
          
        </p>
        <v-spacer></v-spacer>
        <v-select
          v-model="selectedQuery"
          :items="queries"
          item-text="name"
          item-value="query"
          return-object
          label="Select a query"
          solo
          @change="getChartData()"
        ></v-select>
        <v-select
          v-model="range"
          :items="rangeValues"
          item-text="name"
          item-value="value"
          return-object.value
          label="Select a range"
          solo
          @change="getChartData()"
        ></v-select>
        <v-btn @click="saveRange()">Save range preference</v-btn>
      </v-col>
      <v-col>
        <v-date-picker v-model="date" :max="today" @input="getChartData()" landscape ></v-date-picker>
      </v-col>
    </v-row>
    <v-card v-if="dataTable.length > 0 && selectedQuery.chart" class="pa-5">
      <GChart
        :settings="{packages: ['bar']}"
        :data="dataTable"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
        @ready="onChartReady"
        width="90%"
      />
    </v-card>
    <div v-else-if="dataTable.length > 0 && !selectedQuery.chart">
      <v-card class="pa-5">
        <v-card-title>
          {{selectedQuery.chartTitle}}
        </v-card-title>
        <v-card-subtitle>
          {{date}}
        </v-card-subtitle>
        <h1 class="pl-5">
          {{dataTable[1].toString()}}
        </h1>
      </v-card>
    </div>
    <div v-else>
      No results to show
    </div>

    <v-snackbar
      v-model="snackbar"
      timeout="5000"
    >
      Range has been updated for future data
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import exportService from '@/misc/exportService.js'
import {dataStore} from '../misc/dataStore'
export default {
  name: 'Range',
  components: {

  },
  data: () => ({
    dataStore,
    snackbar: false,
    dataTable: [],
    chartsLib: null,
    date: "",
    today: "",
    storeName: "heritage_15",
    selectedQuery: {
        name: "Total per hour",
        query: "total_per_hour",
        chartTitle: "Number of Total Visitors Per Hour",
        chart: true
      },
    range: -999,
    RANGE_MAX: -999,
    RANGE_MED: -80,
    RANGE_MIN: -60,
    queries: [
      {
        name: "Total per hour",
        query: "total_per_hour",
        chartTitle: "Number of Total Visitors Per Hour",
        chart: true
      }
    ],
    rangeValues: [
      {
        name: "100 ft",
        value: -999,
      },
      {
        name: "60 ft",
        value: -80,
      },
      {
        name: "30 ft",
        value: -60,
      },
    ],
  }),
  computed: {
    chartOptions () {
      return {
        chart: {
          title: this.selectedQuery.chartTitle,
          subtitle: this.date
        },
        vAxis: {
          title: "nice",
          ticks: [0, 100, 200,]
        },
        height: 300
      }
    },
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
      this.today = date
    },
    getChartData() {
      let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/"
      //let pretest = "athena-query-logs/store_name_1/unique_per_hour/2020-01-07"
      //let prefix = "athena-query-logs/" + this.dataStore.currentStoreName + "/" + this.selectedQuery.query + "/" + this.date + "/"
      let prefix = "athena-query-logs/heritage_15/intermediate/dt=" + this.date
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
            if (this.selectedQuery.query === "daily_avg_duration") {
              results.data[1][0] = results.data[1][0].toFixed(1)
            }

            this.dataTable = this.filterByRange(results.data)
          }
      })
      .catch((error) => {
          this.dataTable = []
      })
        })
        .catch((error) => {
          this.dataTable = []
      })
    },
    filterByRange(data){
        var range = this.range
        if(range == null){
            range = this.RANGE_MAX
        }
        var filteredData = []

        if(this.selectedQuery.query === "total_per_hour"){
            filteredData.push(["time", "# of customers"])
            for(var hour = 0; hour < 24; hour++){
                filteredData.push([this.date + " " + hour + ":00", 0])
            }
        }
        // Parse dates and add to counts in filteredData
        for(var i = 1; i < data.length; i++){
            if(data[i][3] > range){
                var firstSeen = data[i][1].substr(data[i][1].indexOf(" ") + 1)
                var dateHour = parseInt(firstSeen.substr(firstSeen.indexOf(" ") + 1, firstSeen.indexOf(":")))
                filteredData[dateHour + 1][1] += 1
            }
        }
        return filteredData
    },
    saveRange() {
      this.snackbar = true
    }
  }
};
</script>