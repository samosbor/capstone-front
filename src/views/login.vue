<template>
    <div id="login">
        <amplify-authenticator></amplify-authenticator>
    </div>

</template>

<script>
import {dataStore} from '../misc/dataStore'
import { AmplifyEventBus, components } from "aws-amplify-vue" 

    export default {
        name: 'Login',
        components: {components},
        data: () => ({
                input: {
                    username: "",
                    password: ""
                },
                snackbar: false,
                message : "Hello there",
                store : dataStore,
                authConfig: {
                    signUpConfig: {
                        header: 'My Customized Sign Up',
                        hideAllDefaults: true,
                        defaultCountryCode: '1',
                        signUpFields: [
                        {
                            label: 'Email',
                            key: 'email',
                            required: true,
                            displayOrder: 1,
                            type: 'string',
                            signUpWith: true
                        },
                        {
                            label: 'Password',
                            key: 'password',
                            required: true,
                            displayOrder: 2,
                            type: 'password'
                        },
                        {
                            label: 'PhoneNumber',
                            key: 'phone_number',
                            required: true,
                            displayOrder: 3,
                            type: 'string'
                        },
                        {
                            label: 'Custom Attribute',
                            key: 'custom_attr',
                            required: false,
                            displayOrder: 4,
                            type: 'string',
                            custom: true
                        }
                        ]
                    }
                    },
        }),
        mounted() {
            AmplifyEventBus.$on("authState", eventInfo => {
            if (eventInfo === "signedIn") {
                this.$emit("authenticated", true);
                this.$router.push('/home');
            } else if (eventInfo === "signedOut") {
                this.$emit("authenticated",false);
                this.$router.push('/login')
            }
            });
        }

    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>