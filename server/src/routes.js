const Blockchain = require('./services/BlockchainApiServer')

module.exports = (app) => {
  // OpenAPI
  app.get('/',
    Blockchain.ping)
  app.get('/ping',
    Blockchain.ping)
  app.get('/hiperledgerDemo/v1/init',
    Blockchain.init)
  app.get('/hiperledgerDemo/v1/transaction',
    Blockchain.transaction)
  app.get('/hiperledgerDemo/v1/info',
    Blockchain.info)
  app.get('/hiperledgerDemo/v1/account',
    Blockchain.account)
  app.get('/hiperledgerDemo/v1/disconnect',
    Blockchain.disconnect)
  app.get('/hiperledgerDemo/v1/events',
    Blockchain.events)
  app.get('/hiperledgerDemo/v1/accounts/list',
    Blockchain.accounts_list)
}
