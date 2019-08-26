<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
         <v-list-item
            :key="1"
            @click="dialog_init = !dialog_init"
          >
            <v-list-item-content>
              <v-list-item-title>
                Init Blockchain
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         <v-list-item
            :key="2"
            @click="dialog_new_account = !dialog_new_account"
          >
            <v-list-item-content>
              <v-list-item-title>
                Add Account
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>          
          <v-list-item
            :key="3"
            @click="dialog_transaction = !dialog_transaction"
          >
            <v-list-item-content>
              <v-list-item-title>
                Send Transaction
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>     
          <v-list-item
            :key="4"
            @click="dialog_events = !dialog_events"
          >
            <v-list-item-content>
              <v-list-item-title>
                View Events
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>   
          <v-list-item
            :key="5"
            @click="dialog_about = !dialog_about"
          >
            <v-list-item-content>
              <v-list-item-title>
                About
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>         </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Hyperledger Fabric Demo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        @click="dialog_about = !dialog_about">
        About
      </v-btn>      
    </v-app-bar>
   <v-dialog
      v-model="dialog_about"
      width="400px"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>About</v-toolbar-title>
        </v-toolbar>
         <v-container>
            <v-text-field
              value="Hyperledger Fabric Demo v1.5"
              solo           
              readonly
            ></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark color="blue darken-3"
            @click="dialog_about = false"
          >OK</v-btn>
         </v-card-actions>
      </v-card>
    </v-dialog>

   <v-dialog
      v-model="dialog_init"
      width="400px"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>Init Blockchain</v-toolbar-title>
        </v-toolbar>
         <v-container>
            <v-text-field
              v-model="BlockchainState"
              solo           
              readonly
            ></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark color="blue darken-3"
            @click="BlockchainInit"
          >Init
          </v-btn>
          <v-btn
            dark color="blue darken-3"
            @click="dialog_init = false"
          >Cancel
          </v-btn>          
         </v-card-actions>
      </v-card>
    </v-dialog>    
  <v-dialog
      v-model="dialog_transaction"
      width="400px"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>Send Transaction</v-toolbar-title>
        </v-toolbar>
         <v-container>
            <v-select
              :items="['Bob', 'Alice']"
              label="From"
              v-model="fromAccount"
            ></v-select>            
            <v-text-field
              label="From Balance"
              v-model="fromBalance"
            ></v-text-field>
            <v-select
              :items="['Bob', 'Alice']"
              label="To"
              v-model="toAccount"
            ></v-select>                       
            <v-text-field
              label="To Balance"
              v-model="toBalance"
            ></v-text-field>
            <v-select
              :items="['1', '2', '3']"
              label="Amount citcoins"
              v-model="volume"
            ></v-select>                               
            <v-text-field
              v-model="BlockchainState"
              solo           
              readonly
            ></v-text-field>
        </v-container>
        <v-card-actions class="justify-center">
          <v-spacer></v-spacer>
         <v-btn
            dark color="blue darken-3"
            @click="SendTransaction"
          >Send
          </v-btn>          
          <v-btn
            dark color="blue darken-3"
            @click="GetBalances"
          >Get Balaces
          </v-btn>
          <v-btn
            dark color="blue darken-3"
            @click="dialog_transaction = false"
          >Cancel
          </v-btn>          
         </v-card-actions>
      </v-card>
    </v-dialog>    
  <v-dialog
      v-model="dialog_new_account"
      width="400px"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>Add Account</v-toolbar-title>
        </v-toolbar>
         <v-container>
            <v-text-field
              label="Name"
              v-model="newAccount"
            ></v-text-field>
            <v-text-field
              label="Balance"
              hint="Must be number"
              type='number'
              v-model="newBalance"
            ></v-text-field>                          
            <v-text-field
              v-model="BlockchainState"
              solo           
              readonly
            ></v-text-field>
        </v-container>
        <v-card-actions class="justify-center">
          <v-spacer></v-spacer>
         <v-btn
            dark color="blue darken-3"
            @click="AddAccount"
          >Add
          </v-btn>          
          <v-btn
            dark color="blue darken-3"
            @click="dialog_new_account = false"
          >Cancel
          </v-btn>          
         </v-card-actions>
      </v-card>
    </v-dialog>        
  <v-dialog
      v-model="dialog_events"
      width="400px"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>Events</v-toolbar-title>
        </v-toolbar>
         <v-container>
            <v-text-field
              v-model="BlockchainState"
              solo          
              readonly 
            ></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark color="blue darken-3"
            @click="BlockchainEvents"
          >Events
          </v-btn>
          <v-btn
            dark color="blue darken-3"
            @click="dialog_events = false"
          >Cancel
          </v-btn>          
         </v-card-actions>
      </v-card>
    </v-dialog>        
        <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog_new_account = !dialog_new_account"
    >
      <v-icon>add</v-icon>
    </v-btn>    
  </v-app>
</template>

<script>
  import BlockchainApi from '@/services/BlockchainApi'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      dialog_about: false,
      dialog_init: false,
      dialog_transaction: false,
      dialog_events: false,
      dialog_new_account: false,
      BlockchainState: 'Status: Initinal',
      fromAccount: null,
      toAccount: null,
      fromBalance: null,
      toBalance: null,
      newAccount: null,
      newBalance: null,
      volume: null,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'Contacts', click: 'dialog_about = !dialog_about' },
        { icon: 'history', text: 'Frequently contacted', click: 'dialog = !dialog' }
      ],
    }),
    methods: {
    async BlockchainInit () {
      console.log('InitBlockchain')
      try {
        let ret = await BlockchainApi.blockchain_init()
        // console.log('InitBlockchain ret: ', ret)
        this.BlockchainState = ret.data.status
      } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
     },
    async SendTransaction () {
      console.log('SendTransaction')
      try {
        let params = {
          from: this.fromAccount,
          to: this.toAccount,
          volume: this.volume
        }
        console.log('SendTransaction: ', params)
        this.BlockchainState = 'Status: Sending transaction...'
        let ret = await BlockchainApi.blockchain_transaction(params)
        this.BlockchainState = ret.data.status
        } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
     },
    async AddAccount () {
      console.log('AddAccount')
      try {
        let params = {
          name: this.newAccount,
          balance: this.balance
        }
        console.log('AddAccount: ', params)
        this.BlockchainState = 'Status: Adding account...'
        let ret = await BlockchainApi.blockchain_account(params)
        this.BlockchainState = ret.data.status
        } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
     },     
    async GetBalances () {
      console.log('GetBalances')
      try {
        this.BlockchainState = 'Status: Getting balances...'       
        let params = {
          account: this.fromAccount
        }
        console.log('GetBalance: ', params)
        let ret = await BlockchainApi.blockchain_info(params)
        this.fromBalance = ret.data.balance

        params = {
          account: this.toAccount
        }
        console.log('GetBalance: ', params)
        ret = await BlockchainApi.blockchain_info(params)
        this.toBalance = ret.data.balance

        this.BlockchainState = ret.data.status
        } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
     },     
    async BlockchainEvents () {
      console.log('BlockchainEvents')
      try {
        let ret = await BlockchainApi.blockchain_events()
        // console.log('BlockchainEvents ret: ', ret)
        this.BlockchainState = ret.data.status
     } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
     }     
     }
    }
</script>
