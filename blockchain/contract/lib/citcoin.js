/*
 * Citcoin smart-contract for Hyperledger Fabric
 * (c) Alexey Sushkov, 2019
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const maxAccounts = 5;

class CitcoinEvents extends Contract {

    async instantiate(ctx) {
        console.info('instantiate');
        let emptyList = [];
        await ctx.stub.putState('accounts', Buffer.from(JSON.stringify(emptyList)));
    }

     // add a account object to the blockchain state identifited by their name
    async AddAccount(ctx, name, balance) {
        // this is account data:
        let account = {
            name: name,
            balance: Number(balance),        
            type: 'account',
        };
        // create account:
        await ctx.stub.putState(name, Buffer.from(JSON.stringify(account)));

        // Add account to list:
        let accountsData = await ctx.stub.getState('accounts');
        if (accountsData) {
            let accounts = JSON.parse(accountsData.toString());
            if (acounts.length <= maxAccounts)
            {
                accounts.push(name);
                await ctx.stub.putState('accounts', Buffer.from(JSON.stringify(accounts)));
            } else {
                throw new Error('Max accounts number reached');
            }
        } else {
            throw new Error('accounts not found');
        }
        // return  object
        return JSON.stringify(account);
    }
    // Sends money from Account to Account
    async SendFrom(ctx, fromAccount, toAccount, value) {
        // get Account from
        let fromData = await ctx.stub.getState(fromAccount);
        let from;
        if (fromData) {
            from = JSON.parse(fromData.toString());
            if (from.type !== 'account') {
                throw new Error('wrong from type');
            }    
        } else {
            throw new Error('Accout from not found');
        }
        // get Account to
        let toData = await ctx.stub.getState(toAccount);
        let to;
        if (toData) {
            to = JSON.parse(toData.toString());
            if (to.type !== 'account') {
                throw new Error('wrong to type');
            }   
        } else {
            throw new Error('Accout to not found');
        }

        // update the balances
        if ((from.balance - Number(value)) >= 0 ) {
            from.balance -= Number(value);
            to.balance += Number(value);
        } else {
            throw new Error('From Account: not enought balance');           
        }

        await ctx.stub.putState(from.name, Buffer.from(JSON.stringify(from)));
        await ctx.stub.putState(to.name, Buffer.from(JSON.stringify(to)));
                
        // define and set Event
        let Event = {
            type: "SendFrom",
            from: from.name,
            to: to.name,
            balanceFrom: from.balance,
            balanceTo: to.balance,
            value: value
        };
        await ctx.stub.setEvent('SendFrom', Buffer.from(JSON.stringify(Event)));

        // return to object
        return JSON.stringify(from);
    }

    // get the state from key
    async GetState(ctx, key) {
        let data = await ctx.stub.getState(key);
        let jsonData = JSON.parse(data.toString());
        return JSON.stringify(jsonData);
    }
    // GetBalance    
    async GetBalance(ctx, accountName) {
        let data = await ctx.stub.getState(accountName);
        let jsonData = JSON.parse(data.toString());
        return JSON.stringify(jsonData);
    }
    
    // Refill own balance
    async RefillBalance(ctx, toAccount, value) {
        // get Account to
        let toData = await ctx.stub.getState(toAccount);
        let to;
        if (toData) {
            to = JSON.parse(toData.toString());
            if (to.type !== 'account') {
                throw new Error('wrong to type');
            }   
        } else {
            throw new Error('Accout to not found');
        }

        // update the balance
        to.balance += Number(value);
        await ctx.stub.putState(to.name, Buffer.from(JSON.stringify(to)));
                
        // define and set Event
        let Event = {
            type: "RefillBalance",
            to: to.name,
            balanceTo: to.balance,
            value: value
        };
        await ctx.stub.setEvent('RefillBalance', Buffer.from(JSON.stringify(Event)));

        // return to object
        return JSON.stringify(from);
    }

    async SendFrom(ctx, fromAccount, toAccount, value) {
        // get Account from
        let fromData = await ctx.stub.getState(fromAccount);
        let from;
        if (fromData) {
            from = JSON.parse(fromData.toString());
            if (from.type !== 'account') {
                throw new Error('wrong from type');
            }    
        } else {
            throw new Error('Accout from not found');
        }
        // get Account to
        let toData = await ctx.stub.getState(toAccount);
        let to;
        if (toData) {
            to = JSON.parse(toData.toString());
            if (to.type !== 'account') {
                throw new Error('wrong to type');
            }   
        } else {
            throw new Error('Accout to not found');
        }

        // update the balances
        if ((from.balance - Number(value)) >= 0 ) {
            from.balance -= Number(value);
            to.balance += Number(value);
        } else {
            throw new Error('From Account: not enought balance');           
        }

        await ctx.stub.putState(from.name, Buffer.from(JSON.stringify(from)));
        await ctx.stub.putState(to.name, Buffer.from(JSON.stringify(to)));
                
        // define and set Event
        let Event = {
            type: "SendFrom",
            from: from.name,
            to: to.name,
            balanceFrom: from.balance,
            balanceTo: to.balance,
            value: value
        };
        await ctx.stub.setEvent('SendFrom', Buffer.from(JSON.stringify(Event)));

        // return to object
        return JSON.stringify(from);
    }

// Send Self
}

module.exports = CitcoinEvents;
