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
        <v-list-item link to="/uniquedaily">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Unique daily visitors</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Unique weekly visitors</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/testing">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Testing</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/testingAthena">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Testing Athena Results</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/demotest">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Demo Jan 28th</v-list-item-title>
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
