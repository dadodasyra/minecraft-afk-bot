#! /usr/bin/env node

const mf = require('mineflayer');
const readline = require('readline');

const config = require('./config.json');

let num = 0;
let interval = null;
let eating = false;
let eatingslot;
let options = {
	host: config.server.address,
	port: config.server.port,
	username: config.user.username,
	password: (process.argv[2] ? process.argv[2] : config.user.pass)
}

if(!process.argv[2] && !config.user.pass){
	console.log("bot.js - AFK bot");
	console.log("Usage : ./start.sh OU node bot.js");
	return;
}

const bot = mf.createBot(options);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

bot.on('chat', (username, message) => {
	if (username === bot.username) return;

	console.log(username + ": " + message);
});

/*bot.on('playerJoined', (player) => { Tu peux l'activer si tu veux en supprimant le /* et * /
	bot.chat("Hey " + player.username + "! Je suis un bot pas ouf, me dérangez pas");
})*/

bot.on('error', function(err) {
	console.log('Erreur : ' + err.errno);
	if (err.code === undefined) {
		console.log('Mauvais identifiant, serveur inaccesible ou autre erreur non définie');
	}
	console.log('Reconnexion dans 60 secondes, Ctrl+C pour annuler');
	process.exit(60)
});

bot.on('end', () => {
	process.exit(60);
})

bot.on('login', () => {
	console.log("| Connexion");
});

bot.on('spawn', () => {
	console.log("| Connecté")
	if(config.toggle.sneakbydefault) bot.setControlState("sneak", true);
});

bot.on('health', () => {
	if(bot.health < config.toggle.autodisconnect.health && config.toggle.autodisconnect.toggledisconnect){
		console.log("Deconnexion car plus de vie")
		if(config.toggle.autodisconnect.togglemsg){
			bot.chat(config.toggle.autodisconnect.msg);
			console.log(bot.username+": "+config.toggle.autodisconnect.msg);
		}
		bot.quit();
		process.exit(1);
	}

	if(bot.food < 3 && !eating && config.toggle.autofeed.autofeed){
		eating = true;
		eatingslot = bot.quickBarSlot;
		bot.setQuickBarSlot(config.toggle.autofeed.autofeedslot);
		bot.consume(function () {
			bot.setQuickBarSlot(eatingslot);
			eating = false;
	 	});
	}
})

rl.on("line", input =>{
	let array = input.split(' ')
	switch(array[0]){
		case "/quit":
			bot.quit();
			process.exit(1);
			break;
		case "/reconnect":
			bot.quit();
			process.exit();
			break;
		case "/autoclick":
			if(!array[1] || Number.isInteger(array[1])) array[1] = 700;

			if(!interval){
				interval = setInterval(autofunc, array[1]);
				console.log("| Autoclick démarré")
				return;
			}
			if(interval){
				console.log("| Autoclick déjà actif, pour l'arrêter utilisez /stopautoclick")
				return;
			}
			break;
		case "/stopautoclick":
			if(!interval){
				console.log("| Il n'y a actuellement aucun autoclick d'actif");
				return;
			}
			clearInterval(interval);
			interval = null;

			console.log("| Autoclick stoppé");
			console.log("| Autoclicker a tapé "+num+" fois.");
			num = 0;
			break;
		case "/tps":
			console.log("| Les tps sont à "+bot.getTps());
			break;
		case "/sneak":
			if(bot.getControlState("sneak")){
				console.log("| Le bot ne sneak plus");
				bot.setControlState("sneak", false);
			} else {
				console.log("| Le bot sneak maintenant");
				bot.setControlState("sneak", true);
			}
			break;
		case "/help":
			console.log("/quit - Quitter");
			console.log("/reconnect - Déco reconnect (fonctionne uniquement quand lancé via ./start.sh)");
			console.log("/autoclick [ms] - Activer Autoclick sur entité la plus proche (par défault 700 ms | check entité plus proche + tape uniquement si c'est un mob)");
			console.log("/stopautoclick - Stopper l'autoclick");
			console.log("/sneak - Toggle sneak");
			console.log("Contact : dadodasyra#0001 OU dadodasyra.pro@gmail.com")
			break;
		default:
			bot.chat(input)
	}
});

function autofunc()
{
	let entity = bot.nearestEntity()
	if(entity){
		if (entity.type === 'mob') {
			bot.attack(entity)
			num++;
		}
	}
}
