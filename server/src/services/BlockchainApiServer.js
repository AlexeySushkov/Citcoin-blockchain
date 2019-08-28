// Bring key classes into scope, most importantly Fabric SDK network class
var util = require('util')
const fs = require('fs')
// const yaml = require('js-yaml');
const path = require('path')
const { FileSystemWallet, Gateway } = require('fabric-network')
// var fabClient = require('fabric-client')
// var fabricClient = new fabClient()

// Create a new file system based wallet for managing identities.
let walletPath = path.join(process.cwd(), '/../blockchain/')
walletPath = path.join(walletPath, 'wallet')
const wallet = new FileSystemWallet(walletPath)

// capture network variables from config.json
const configPath = path.join(process.cwd(), '/../blockchain/config.json')
const configJSON = fs.readFileSync(configPath, 'utf8')
const config = JSON.parse(configJSON)
var connectionFile = config.connection_file
var appAdmin = config.appAdmin
var channelName = config.channel_name
var smartContractName = config.smart_contract_name
var peerAddr = config.peer
// var appAdminSecret = config.appAdminSecret
// var orgMSPID = config.orgMSPID
// var caName = config.caName

let ccpPath = path.join(process.cwd(), '/../blockchain/')
ccpPath = path.join(ccpPath, connectionFile)
const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
const ccp = JSON.parse(ccpJSON)

var contract = null
var gateway = null

module.exports = {

  async ping (req, res) {
    res.status(200).send({
      status: 'OK'
    })
  },

  async init (req, res) {
    console.log('init')

    // Main try/catch block
    try {
      // A gateway defines the peers used to access Fabric networks
      gateway = new Gateway()
      await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: { enabled: true, asLocalhost: false } })
      console.log('Connected to Fabric gateway. channelName: ', channelName)
      // Get addressability to network
      const network = await gateway.getNetwork(channelName)
      console.log('Got addressability to network')
      // Get addressability to  contract
      contract = await network.getContract(smartContractName)
      console.log('Got addressability to contract')
      res.status(200).send({
        status: 'Status: Init OK'
      })
    } catch (error) {
      console.log(`Error processing transaction. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Init Error'
      })
    }
  },

  async disconnect (req, res) {
    console.log('disconnect, query: ', req.query)

    // Main try/catch block
    try {
      // Disconnect from the gateway
      console.log('Disconnect from Fabric gateway: ', gateway)
      if (gateway != null) {
        await gateway.disconnect()
        res.status(200).send({
          status: 'Status: disconnect OK'
        })
      } else {
        res.status(200).send({
          status: 'Status: disconnect error: not connected'
        })
      }
    } catch (error) {
      console.log(`Error disconnect. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Status: disconnect error: exception'
      })
    }
  },

  async account (req, res) {
    console.log('account, query: ', req.query)

    let name = req.query.name
    let balance = req.query.balance

    // Main try/catch block
    try {
      const addAccountResponse = await contract.submitTransaction('AddAccount', name, balance)
      console.log('AddAccount: ')
      console.log(JSON.parse(addAccountResponse.toString()))
      res.status(200).send({
        status: 'Status: Add Account OK'
      })
    } catch (error) {
      console.log(`Error processing transaction. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Status: Add Account error: exception'
      })
    }
  },

  async transaction (req, res) {
    console.log('transaction, query: ', req.query)

    let fromAccount = req.query.from
    let toAccount = req.query.to
    let volume = req.query.volume

    // Main try/catch block
    try {
      const sendFromResponse = await contract.submitTransaction('SendFrom', fromAccount, toAccount, volume)
      console.log('sendFromResponse: ')
      console.log(JSON.parse(sendFromResponse.toString()))
      res.status(200).send({
        status: 'Status: Send transaction OK'
      })
    } catch (error) {
      console.log(`Error processing transaction. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Status: transaction error: exception'
      })
    }
  },

  async info (req, res) {
    console.log('info, query: ', req.query)

    let account = req.query.account
    let accountBalance = null

    // Main try/catch block
    try {
      accountBalance = await contract.submitTransaction('GetState', account)
      console.log('accountBalance: ')
      console.log(JSON.parse(accountBalance.toString()))
      let objStr = accountBalance.toString()
      console.log('accountBalance toString: ', objStr)
      let obj = JSON.parse(objStr)
      console.log('accountBalance JSON.parse(objStr): ', obj)
      let objStr2 = obj.toString()
      console.log('accountBalance toString: ', objStr2)
      let obj2 = JSON.parse(objStr2)
      console.log('accountBalance JSON.parse(objStr2): ', obj2)
      console.log('accountBalance.balance: ', obj2.balance)
      /*
      Disconnect from Fabric gateway.
      accountBalance toString:  "{\"balance\":97,\"name\":\"Bob\",\"type\":\"account\"}"
      accountBalance JSON.parse(objStr):  {"balance":97,"name":"Bob","type":"account"}
      accountBalance toString:  {"balance":97,"name":"Bob","type":"account"}
      accountBalance JSON.parse(objStr2):  { balance: 97, name: 'Bob', type: 'account' }
      accountBalance.balance:  97
      */

      res.status(200).send({
        status: 'Status: Get balance OK',
        balance: obj2.balance.toString()
      })
    } catch (error) {
      console.log(`Error processing transaction. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Status: get info error: exception'
      })
    }
  },

  async events (req, res) {
    console.log('events')
    res.status(200).send({
      status: 'Status: Events are not yet supported'
    })

    // Main try/catch bloc
    try {
      const client = gateway.getClient()
      console.log('Got addressability to client')

      const channel = client.getChannel(channelName)
      console.log('Got addressability to channel')

      // ---------------------------------------------------
      // newChannelEventHub vs getChannelEventHub  ???
      // ---------------------------------------------------
      let eventHub = channel.newChannelEventHub(peerAddr)
      eventHub.connect(true)
      var regid = eventHub.registerChaincodeEvent(smartContractName, 'SendFrom', function (event) {
        console.log('----------------- event: ------------------------')
        console.log(event)
        console.log(util.format('Event payload: %j\n', event.payload.toString()))
        console.log('----------------- event end ------------------------')
      /*
      event
      { chaincode_id: 'citcoin4',
        tx_id: '3d020f866a7742e49beb3c4cb984b9b02e84ab62cbdab5eceefe92644d4e905f',
        event_name: 'SendFrom',
        payload: <Buffer 7b 22 74 79 70 65 22 3a 22 53 65 6e 64 46 72 6f 6d 22 2c 22 66 72 6f 6d 22 3a 22 41 6c 69 63 65 22 2c 22 74 6f 22 3a 22 42 6f 62 22 2c 22 62 61 6c 61 ... > }
        Custom event received, payload: "{\"type\":\"SendFrom\",\"from\":\"Alice\",\"to\":\"Bob\",\"balanceFrom\":115,\"balanceTo\":4982,\"value\":\"5\"}"
      */
      })
      var countTime = 0
      var maxCountTime = 60 / 5

      var storeTimeInterval = setInterval(function () {
        console.log('Timeout sec: ', countTime * 5)
        ++countTime
        if (countTime >= maxCountTime) {
          clearInterval(storeTimeInterval)
          eventHub.unregisterChaincodeEvent(regid)
          console.log('Save data to DB and exit timeout sec: ', countTime * 5)
        }
      }, 5000)
    } catch (error) {
      console.log(`Error processing events. ${error}`)
      console.log(error.stack)
    }
  },
  async accounts_list (req, res) {
    console.log('transaction, query: ', req.query)

    // Main try/catch block
    try {
      const sendFromResponse = await contract.submitTransaction('GetAccounts')
      console.log('sendFromResponse: ')
      console.log(JSON.parse(sendFromResponse.toString()))
      res.status(200).send({
        status: 'Status: Get Accounts OK',
        // list: JSON.stringify(JSON.parse(sendFromResponse.toString()))
        list: JSON.parse(sendFromResponse.toString())
      })
    } catch (error) {
      console.log(`Error processing transaction. ${error}`)
      console.log(error.stack)
      res.status(200).send({
        status: 'Status: accounts list error: exception'
      })
    }
  }

} // All functions
