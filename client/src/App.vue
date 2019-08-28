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
            @click="dialog_disconnect = !dialog_disconnect"
          >
            <v-list-item-content>
              <v-list-item-title>
                Disconnect Blockchain
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         <v-list-item
            :key="3"
            @click="dialog_new_account = !dialog_new_account"
          >
            <v-list-item-content>
              <v-list-item-title>
                Add Account
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>          
          <v-list-item
            :key="4"
            @click="dialog_transaction = !dialog_transaction"
          >
            <v-list-item-content>
              <v-list-item-title>
                Send Transaction
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>     
          <v-list-item
            :key="5"
            @click="dialog_events = !dialog_events"
          >
            <v-list-item-content>
              <v-list-item-title>
                View Events
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>   
          <v-list-item
            :key="6"
            @click="dialog_view_accounts = !dialog_view_accounts"
          >
            <v-list-item-content>
              <v-list-item-title>
                Accounts List
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>           
          <v-list-item
            :key="7"
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
              value="Citcoin Network v1.5"
              solo           
              readonly
            ></v-text-field>
            <v-text-field
              value="Hyperledger Fabric Blockchain Demo"
              solo           
              readonly
            ></v-text-field>
            <v-text-field
              value="(c) Alexey Sushkov, 2019"
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
      v-model="dialog_disconnect"
      width="400px"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>Disconnect Blockchain</v-toolbar-title>
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
            @click="BlockchainDisconnect"
          >Disconnect
          </v-btn>
          <v-btn
            dark color="blue darken-3"
            @click="dialog_disconnect = false"
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
            <v-text-field
              label="From"
              v-model="fromAccount"
            ></v-text-field>
            <v-text-field
              label="From Balance"
              v-model="fromBalance"
              append-outer-icon="search"
              @click:append-outer="GetBalanceFrom"
            ></v-text-field>
            <v-text-field
              label="To"
              v-model="toAccount"
            ></v-text-field>
            <v-text-field
              label="To Balance"
              v-model="toBalance"
              append-outer-icon="search"
              @click:append-outer="GetBalanceTo"
            ></v-text-field>
            <v-select
              :items="['1', '2', '5', '10']"
              label="Amount citcoins"
              v-model="volume"
            ></v-select>                               
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
          <v-toolbar-title>Start Events</v-toolbar-title>
        </v-toolbar>
         <v-container>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark color="blue darken-3"
            @click="BlockchainEvents"
          >Start
          </v-btn>
          <v-btn
            dark color="blue darken-3"
            @click="dialog_events = false"
          >Cancel
          </v-btn>          
         </v-card-actions>
      </v-card>
    </v-dialog>        
      <v-dialog
      v-model="dialog_view_accounts"
      width="400px"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>List Accounts</v-toolbar-title>
        </v-toolbar>
         <v-container>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark color="blue darken-3"
            @click="BlockchainListAccounts"
          >Get List
          </v-btn>
          <v-btn
            dark color="blue darken-3"
            @click="dialog_view_accounts = false"
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
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >

        <v-row
          align="streach"
          justify="center"
        >
        <v-card class="elevation-12" width = "500" max-width="800">
        <v-toolbar dark color="blue darken-3">
          <v-toolbar-title>Log view (new records first)</v-toolbar-title>
        </v-toolbar>
         <v-container>
          <v-list rounded dense>
           <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark color="blue darken-3"
            @click="ClearLog"
          >Clear Log
          </v-btn>          
         </v-card-actions>
      </v-card>
        </v-row>
      </v-container>
    </v-content>    
  </v-app>
</template>

<script>
  import BlockchainApi from '@/services/BlockchainApiClient'
    function AddLog(items, text)
    {
      console.log('AddLog')
      var currentdate = new Date()
      var datetime = '' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds()
      let ooo = {}
      ooo.text = datetime + '   ' + text
      ooo.icon = 'No icon'
      console.log(ooo)    
      console.log('AddLog: ', ooo)

      items.unshift(ooo)
    }  
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      dialog_about: false,
      dialog_init: false,
      dialog_disconnect: false,
      dialog_transaction: false,
      dialog_events: false,
      dialog_view_accounts: false,
      dialog_new_account: false,
      BlockchainState: 'Blockchain status: Not initialized',
      items: [{text: 'Blockchain status: Not initialized', icon: 'No icon'}],
      fromAccount: null,
      toAccount: null,
      fromBalance: null,
      toBalance: null,
      newAccount: null,
      newBalance: null,
      volume: null,
      drawer: null,
    }),
    methods: {
    async ClearLog () {
      console.log('ClearLog')
      this.items = []
     },
    async BlockchainInit () {
      console.log('InitBlockchain')
      this.dialog_init = false

      this.BlockchainState = 'Initializing Blockchain...'
      AddLog(this.items, this.BlockchainState)

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
        AddLog(this.items, this.BlockchainState)
     },
    async BlockchainDisconnect () {
      console.log('BlockchainDisconnect')
      this.dialog_disconnect = false
      AddLog(this.items, 'Blockchain disconnecting...')
      try {
        let ret = await BlockchainApi.blockchain_disconnect()
        // console.log('InitBlockchain ret: ', ret)
        this.BlockchainState = ret.data.status
      } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
        AddLog(this.items, this.BlockchainState)  
     },
    async SendTransaction () {
      console.log('SendTransaction')
      this.dialog_transaction = false
      this.BlockchainState = 'Status: Sending transaction...'
      AddLog(this.items, this.BlockchainState)
      try {
        let params = {
          from: this.fromAccount,
          to: this.toAccount,
          volume: this.volume
        }
        console.log('SendTransaction: ', params)
        let ret = await BlockchainApi.blockchain_transaction(params)
        console.log('SendTransaction: ret.data.status: ', ret.data.status)
        this.BlockchainState = ret.data.status
        } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
        AddLog(this.items, this.BlockchainState)  
        await this.GetBalanceFrom ()
        await this.GetBalanceTo ()
     },
    async AddAccount () {
      console.log('AddAccount')
      this.dialog_new_account = false
      this.BlockchainState = 'Status: Adding account...'
      AddLog(this.items, this.BlockchainState)  

      try {
        let params = {
          name: this.newAccount,
          balance: this.newBalance
        }
        console.log('AddAccount: ', params)
        let ret = await BlockchainApi.blockchain_account(params)
        this.BlockchainState = ret.data.status
        } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
      AddLog(this.items, this.BlockchainState)  
     },     
    async GetBalanceFrom () {
      console.log('GetBalanceFrom')
      try {
        this.BlockchainState = 'Status: Getting balance From...'       
        AddLog(this.items, this.BlockchainState)  
        let params = {
          account: this.fromAccount
        }
        console.log('GetBalance: ', params)
        let ret = await BlockchainApi.blockchain_info(params)
        this.fromBalance = ret.data.balance
        this.BlockchainState = ret.data.status
        } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
        AddLog(this.items, this.BlockchainState)  
     },     
    async GetBalanceTo () {
      console.log('GetBalanceTo')
      try {
        this.BlockchainState = 'Status: Getting balances To...'       
        AddLog(this.items, this.BlockchainState)  
        let params = {
          account: this.toAccount
        }
        console.log('GetBalance: ', params)
        let ret = await BlockchainApi.blockchain_info(params)
        this.toBalance = ret.data.balance
        this.BlockchainState = ret.data.status
        } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
      }
        AddLog(this.items, this.BlockchainState)  
     },     
    async BlockchainEvents () {      
      console.log('BlockchainEvents')
      this.BlockchainState = 'Status: Start getting events...'       
      AddLog(this.items, this.BlockchainState)  

      this.dialog_events = false
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
        AddLog(this.items, this.BlockchainState)  
     }, // BlockchainEvents
    async BlockchainListAccounts () {      
      console.log('BlockchainListAccounts')
      this.BlockchainState = 'Status: Start getting list accounts'       
      AddLog(this.items, this.BlockchainState)  

      this.dialog_view_accounts = false
      try {
        let ret = await BlockchainApi.blockchain_list_accounts()
        // console.log('BlockchainEvents ret: ', ret)
        this.BlockchainState = ret.data.status
        AddLog(this.items, this.BlockchainState)  
        AddLog(this.items, ret.data.list)  
     } catch (error) {
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
        AddLog(this.items, this.BlockchainState)  
      }
     } // BlockchainListAccounts   
     } 
    }
</script>
