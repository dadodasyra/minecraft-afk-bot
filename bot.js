#! /usr/bin/env node

const mf = require('mineflayer');
const readline = require('readline');

const config = require('./config.json');

var num = 0;
var interval = null;
var eating = false;
var eatingslot
var options = {
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
/* Désactivé les réponses automatique au message dans le chat, concernant par exemple pour dormir le bot peux deco ou répondre avec les tps
	if(message == "sleep"){
		bot.chat("Je me reco dans 5 secondes");
		bot.quit();
		process.exit();
		return;
	}

	if(message == "afk"){
		bot.chat("Je suis afk !");
	}

	if(message == "tps"){
		bot.chat("Voici les tps incroyable : "+bot.getTps())
	}*/
});

/*bot.on('playerJoined', (player) => { Tu peux l'activer si tu veux en supprimant le /* et * /
	bot.chat("Hey " + player.username + "! Je suis un bot pas ouf, me déranger pas");
})*/

bot.on('error', function(err) {
	console.log('Erreur : ' + err.errno);
	if (err.code == undefined) {
		console.log('Mauvais identifiant, serveur inaccesible ou autre erreur non défini');
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
		bot.consume(function(){bot.setQuickBarSlot(eatingslot);eating = false;});
	}
})

rl.on("line", input =>{
	array = input.split(' ')
	if(input == "/quit"){
		bot.quit();
		process.exit(1);
	}

	if(input == "/reconnect"){
		bot.quit();
		process.exit();
	}

	if(array[0] == "/autoclick"){
		if(!array[1] || Number.isInteger(array[1])){
			array[1] = 700;
		}
		if(!interval){
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
		if(!interval){
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
