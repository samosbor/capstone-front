<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">
          Store Leaderboard
        </h1>
        <p class="subheading font-weight-regular">
          Choose a query to get started
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
        <v-btn @click="exportToCsv()" bottom>Export</v-btn>
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
  </v-container>
</template>

<script>
    import exportService from '@/misc/exportService.js'
    import { dataStore } from '../misc/dataStore'
    export default {
        name: 'Leaderboard',
        components: {

        },
        data: () => ({
            dataStore,
            dataTable: [],
            chartsLib: null,
            date: "",
            today: "",
            storeName: "heritage_15",
            selectedQuery: {
                name: "Daily total",
                query: "daily_total_unique",
                chartTitle: "Total Visitors On This Day",
                chart: true
            },
            queries: [{
                name: "Daily total",
                query: "daily_total_unique",
                chartTitle: "Total Visitors On This Day",
                chart: true
            },
            {
                name: "Daily Average Duration",
                query: "daily_avg_duration",
                chartTitle: "Avg Minutes Spent In Store Per Visitor",
                chart: true
            },
            {
                name: "Weekly total",
                query: "weekly_total_unique",
                chartTitle: "Total Visitors in the Week",
                chart: true
            },
            {
                name: "Repeat Visitors",
                query: "weekly_total_repeat_customers",
                chartTitle: "Total Number of Repeat Visitors",
                chart: true
            },
            {
                name: "Weekly Average Duration",
                query: "weekly_avg_duration",
                chartTitle: "Avg Minutes Spent In Store Per Visitor",
                chart: true
            },
            ]
        }),
        computed: {
            chartOptions() {
                if (!this.chartsLib) return null
                return this.chartsLib.charts.Bar.convertOptions({
                    chart: {
                        title: this.selectedQuery.chartTitle,
                        subtitle: this.date
                    },
                    hAxis: { format: 'decimal' },
                    height: 300
                })
            },
        },
        created() {
            this.setCurrentDate()
            this.getChartData()
        },
        methods: {
            onChartReady(chart, google) {
                this.chartsLib = google
            },
            setCurrentDate() {
                var today = new Date()
                var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate()
                this.date = date
                this.today = date
            },
            async getChartData() {
                let base = "https://s3.us-east-2.amazonaws.com/jolt.capstone/";

                var leaderBoard = [];
                switch(this.selectedQuery.query){
                    case "daily_avg_duration":
                        leaderBoard.push(["store", "visit duration (min)"]);
                        break;
                    case "weekly_avg_duration":
                        leaderBoard.push(["store", "visit duration (min)"]);
                        break;
                    case "weekly_total_repeat_customers":
                        leaderBoard.push(["store", "repeat visits"]);
                        break;
                    default:
                        leaderBoard.push(["store", "visits"]);
                        break;
                }

                for (var i = 0; i < dataStore.ownedStores.length; i++) {
                    var index = i;
                    var store = dataStore.ownedStores[i];
                    leaderBoard.push([store.storeName, 0]);

                    let prefix = "athena-query-logs/" + store.storeName + "/" +
                        this.selectedQuery.query + "/" + this.date + "/";
                    await this.axios.get(base + "?prefix=" + prefix)
                        .then((response) => {
                            var parser = new DOMParser();
                            let data = parser.parseFromString(response.data, "text/xml");
                            let key = data.getElementsByTagName("Key")[0].innerHTML;
                            return key;
                        })
                        .then((key) => {
                            this.$papa.parse(base + key, {
                                    download: true,
                                    dynamicTyping: true,
                                    complete: (results) => {
                                        results.data.pop();
                                        if (this.selectedQuery.query === "daily_avg_duration") {
                                            results.data[1][0] = results.data[1][0].toFixed(1);
                                        }
                                        leaderBoard[index][1] = results.data[1][0];
                                    }
                                })
                                .catch((error) => {
                                    // Do nothing
                                })
                        })
                        .catch((error) => {
                            // Do nothing
                        })
                }
                this.dataTable = leaderBoard;
            },
            exportToCsv() {
                exportService.exportToCSV(this.storeName + "_" + this.query + "_" + this.date, this.dataTable)
            }
        }
    };
</script>
