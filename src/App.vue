<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item @click="$router.push('/')" style="cursor: pointer">
            <v-list-item-avatar>
              <v-img src="https://media.licdn.com/dms/image/C560BAQHQlSTXaVdWrg/company-logo_200_200/0?e=2159024400&v=beta&t=5SfNMkECFR8W1Q0x8lNadENrjnKhR08o-_LgRwbGvtA"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>Jolt Dash</v-list-item-title>
          </v-list-item>

          <v-list-item
            link
            two-line
          >
            <v-list-item-content>
              <v-list-item-title class="title">Store Name</v-list-item-title>
              <v-list-item-subtitle>1</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link to="/daily">
          <v-list-item-icon>
            <v-icon>mdi-calendar-today</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Daily Stats</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/weekly">
          <v-list-item-icon>
            <v-icon>mdi-calendar-week</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Weekly Stats</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/monthly">
          <v-list-item-icon>
            <v-icon>mdi-calendar-month</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Monthly Stats</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/campaigns">
          <v-list-item-icon>
            <v-icon>mdi-calendar-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Campaigns</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
