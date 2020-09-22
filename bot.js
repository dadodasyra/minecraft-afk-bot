#! /usr/bin/env node

const mf = require('mineflayer');
const readline = require('readline');
const fs = require('fs');
const { isNull, isNullOrUndefined, isNumber } = require('util');

const rawJson = fs.readFileSync("config.json");
const config = JSON.parse(rawJson);

var num = 0;
var interval = null;
var eating = false;
var eatingslot

if(!process.argv[2] && !config.user.pass){
	console.log("bot.js - AFK bot");
	console.log("Usage : ./start.sh OU node bot.js");
	return;
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const bot = mf.createBot({
	host: config.server.address,
	port: config.server.port,
	username: config.user.username,
	password: (process.argv[2] ? process.argv[2] : config.user.pass)
});

bot.on('chat', (username, message) => {
	if (username === bot.username) return;

	console.log(username + ": " + message);
/*
	if(config.keyword.sleep.find(elmt => message.search(elmt) != -1)){
		bot.chat(config.message.sleep);
		bot.quit();
		process.exit();
		return;
	}

	if(config.keyword.name.find(elmt => message.search(elmt) != -1)){
		bot.chat(config.message.afk);
	}

	if(config.keyword.tps.find(elmt => message.search(elmt) != -1)){
		bot.chat("Voici les tps incroyable : "+bot.getTps())
	}*/
});

bot.on('login', () => {
	console.log("Connecté !");
});

/*bot.on('playerJoined', (player) => { Tu peux l'activer si tu veux
	bot.chat("Hey " + player.username + "! Je suis un bot pas ouf, me déranger pas");
})*/

bot.on('health', () => {
	if(bot.health < 3 && config.toggle.autodisconnect.toggledisconnect == false){
				if(config.toggle.autodisconnect.togglemsg){
					bot.chat(config.toggle.autodisconnect.msg)
					console.debug(config.toggle.autodisconnect.msg)
 				}
		bot.quit();
		process.exit(1);
	}

	if(bot.food < 3 && !eating && config.toggle.autofeed.autofeed == false){
		eating = true;
		eatingslot = bot.quickBarSlot;
		bot.setQuickBarSlot(config.toggle.autofeed.autofeedslot);
		bot.consume(function(){bot.setQuickBarSlot(eatingslot);eating = false;});
	}
})

rl.on("line", input =>{
	array = input.split(' ')
	if(input == "/quit"){
		bot.quit();
		process.exit(1);
		return;
	}

	if(input == "/reconnect"){
		bot.quit();
		process.exit();
		return;
	}

	if(array[0] == "/autoclick"){
		if(isNullOrUndefined(array[1]) || isNumber(array[1])){
			array[1] = 700;
		}
		if(isNullOrUndefined(interval)){
			autoclick = null;
			interval = setInterval(autofunc, array[1]);
			console.log("| Autoclick started")
			return;
		}
		if(interval){
			console.log("| Autoclick déjà actif")
			return;
		}

	}

	if(input == "/stopautoclick"){
		if(isNullOrUndefined(interval)){
			console.log("| Il n'y a actuellement aucun autoclick d'actif");
			return;
		}
		clearInterval(interval);
		interval = null;


		console.log("| Autoclick stopper");
		console.log("| Autoclicker a tapé "+num+" fois.");
		num = 0;
		return;
	}

	if(input == "/help"){
		console.log("/quit - Quitter");
		console.log("/reconnect - Déco reconnect (fonctionne uniquement quand lancé via ./start.sh)");
		console.log("/autoclick [ms] - Activer Autoclick sur entité la plus proche (par défault 700 ms | check entité plus proche + tape uniquement si c'est un mob)");
		console.log("/stopautoclick - Stopper l'autoclick");
		console.log("Contact : dadodasyra#0001 OU dadodasyra.pro@gmail.com")
		return;
	}

	bot.chat(input)
});

function autofunc()
{
	entity = bot.nearestEntity()
	if(entity){
		if (entity.type === 'mob') {
			bot.attack(entity, true)
			num++;
		}
	}
}
