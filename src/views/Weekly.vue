<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">Weekly Visitor Stats</h1>
        <p class="subheading font-weight-regular">Choose a query to get started</p>
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
        <v-btn @click="exportToCsv()" bottom>Export</v-btn>
      </v-col>
      <v-col>
        <v-date-picker v-model="date" :max="today" @input="getChartData()" landscape></v-date-picker>
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
        <v-card-title>{{selectedQuery.chartTitle}}</v-card-title>
        <v-card-subtitle>Week ending on: {{date}}</v-card-subtitle>
        <h1 class="pl-5">{{dataTable[1].toString()}}</h1>

        <div class="mt-5" v-if="calculatePercentChange()">
          <v-card-title>{{calculatePercentChange()}}</v-card-title>
          <h2 class="pl-5"></h2>
        </div>
      </v-card>
    </div>
    <div v-else>No results to show</div>
  </v-container>
</template>

<script>
import exportService from "@/misc/exportService.js";
import { dataStore } from "../misc/dataStore";
export default {
  name: "Weekly",
  components: {},
  data: () => ({
    dataStore,
    dataTable: [],
    chartsLib: null,
    date: "",
    today: "",
    storeName: "store_name_1",
    selectedQuery: {
      name: "Unique per day",
      query: "unique_per_day_by_week",
      chartTitle: "Number of Unique Visitors Per Day",
      chart: true
    },
    queries: [
      {
        name: "Unique per day",
        query: "unique_per_day_by_week",
        chartTitle: "Number of Unique Visitors Per Day",
        chart: true
      },
      {
        name: "Weekly total",
        query: "weekly_total_unique",
        chartTitle: "Total Visitors",
        chart: false
      },
      {
        name: "Repeat Visitors",
        query: "weekly_total_repeat_customers",
        chartTitle: "Total Number of Repeat Visitors",
        chart: false
      },
      {
        name: "Avg Duration",
        query: "weekly_avg_duration",
        chartTitle: "Avg Minutes Spent In Store Per Visitor",
        chart: false
      }
    ],
    currweekdata: [],
    lastweekdata: []
  }),
  computed: {
    chartOptions() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: this.selectedQuery.chartTitle,
          subtitle: this.date
        },
        hAxis: { format: "decimal" },
        height: 300
      });
    }
  },
  created() {
    this.setCurrentDate();
    this.getChartData();
  },
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    },
    setCurrentDate() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      this.date = date;
      this.today = date;
    },
    async getChartData() {
      let weekdate = this.date;
      if (this.date.slice(8, 9) === "0") {
        weekdate = this.date.slice(0, 8) + this.date.slice(9, 10);
      }

      let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/";
      //let pretest = "athena-query-logs/store_name_1/unique_per_hour/2020-01-07"
      let prefix =
        "athena-query-logs/" +
        this.dataStore.currentStoreName +
        "/" +
        this.selectedQuery.query +
        "/" +
        weekdate +
        "/";
      var key = await this.axios
        .get(base + "?prefix=" + prefix)
        .then(response => {
          var parser = new DOMParser();
          let data = parser.parseFromString(response.data, "text/xml");
          let key = data.getElementsByTagName("Key")[0].innerHTML;
          return key;
        });

      var currweekdata = await this.$papa.parse(base + key, {
        download: true,
        dynamicTyping: true,
        complete: results => {
          results.data.pop();
          if (this.selectedQuery.query === "weekly_avg_duration") {
            results.data[1][0] = results.data[1][0].toFixed(1);
          }
          this.dataTable = results.data;
          this.currweekdata = results.data;
          return results.data;
        }
      });

      let lastweek = this.getLastWeek();
      prefix =
        "athena-query-logs/" +
        this.dataStore.currentStoreName +
        "/" +
        this.selectedQuery.query +
        "/" +
        lastweek +
        "/";
      key = await this.axios.get(base + "?prefix=" + prefix).then(response => {
        var parser2 = new DOMParser();
        let data = parser2.parseFromString(response.data, "text/xml");
        let key = data.getElementsByTagName("Key")[0].innerHTML;
        return key;
      });

      var lastweekdata = await this.$papa.parse(base + key, {
        download: true,
        dynamicTyping: true,
        complete: results => {
          results.data.pop();
          if (this.selectedQuery.query === "weekly_avg_duration") {
            results.data[1][0] = results.data[1][0].toFixed(1);
          }
          this.lastweekdata = results.data;
          return results.data;
        }
      });
      console.log("got through");
    },
    getLastWeek() {
      var parts = this.date.split("-");
      let currDate = new Date(parts[0], parts[1] - 1, parts[2]);
      let lastWeek = new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate() - 7
      );
      let lastmonth = lastWeek.getMonth() + 1;
      let lastString =
        lastWeek.getFullYear() + "-0" + lastmonth + "-" + lastWeek.getDate();
      return lastString;
    },
    exportToCsv() {
      exportService.exportToCSV(
        this.storeName + "_" + this.query + "_" + this.date,
        this.dataTable
      );
    },
    allowedDates(datestring) {
      if (datestring === "2020-02-20" || datestring === "2020-02-13")
        return true;
      var date = new Date(datestring);
      var day = date.getDay();
      return day === 6;
    },
    calculatePercentChange() {
      if (this.currweekdata[1] && this.lastweekdata[1]) {
        var increaseValue = this.currweekdata[1] - this.lastweekdata[1];
        var change = (increaseValue / this.currweekdata[1]) * 100;
        change = change.toFixed(1);

        if (change > 0){
          return "Up " + change + "% from previous week"
        } else {
          return "Down " + change + "% from previous week"
        }
      }
      return null;
    }
  }
};
</script>
