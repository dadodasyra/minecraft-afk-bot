# Un bot d'AFK sur Minecraft Java
Un bot en JS utilisant mineflayer avec une config complète.
Il contient un autoclick, un autofeed, un autodeconnect quand il a moins de 3 coeurs etc.. (configurable via le config.yml), un autoreconnect lors d'une redem serveur ou d'un kick, vous pouvez d'ailleurs écrire dans le chat et consulter le chat via la console.

# Installation
**Installation de Node JS :**
- Tout OS : Installation [ici](https://nodejs.org/fr/)
- Installation pour Linux :
```
curl -sL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
npm i readline mineflayer
```
**Le code nécessite les packages suivants :** READLINE, MINEFLAYER (tout est dans la dernière commande au dessus)


# Usage
**Linux (recommandé):**
- Lancer le bot dans un *screen* ou utilisant *pm2* pour éviter de devoir garder le terminal ouvert (**screen** recommandé pour Linux).
- Dans le répertoire ou se trouve bot.js et start.sh, executé ./start.sh 

**Windows (restart & auto reconnect généralement non-supporté):**
- N'oubliez pas d'installer toutes les dépendances via `npm i readline mineflayer, util, fs` 
- Dans le répertore du bot via un cmd executé `node bot.js`
OU *Pour l'auto connect et le restart*
- Installer Cygwin
- Accéder au répertoire du bot via Cygwin terminal `cd C:/Users/dadodasyra/Downloads` (remplacer les \ par des / si vous en avez)
- Executer `sh start.sh` dans un screen

**MACOS :**
- Pas de tuto disponible mais l'installation est a peu près similaire à Linux

# Commandes
- `/autoclick [temps en ms]` Démarre un autoclick avec le temps indiqué ou 700 ms de base, /!\ L'autoclick peux taper a travers les blocks + bypass la limite de cps client + à 360°. L'autoclick tape uniquement les mobs (il vérifie l'entitée la plus proche puis vérifie si c'est un mob, dans le cas ou une autre entitée passive est plus proche du joueur le mob hostile ne sera pas tapé)
- `/stopautoclick` Arrête l'autoclick et donne le nombre de click qu'il a executé avec succès
- `/quit` Quitte le serveur et stop le script, pareil que un Ctrl+C
- `/reconnect` Uniquement disponible en lancant le script via ./start.sh, il déconnecte le bot et le reconnecte 5 secondes plus tard
- `/help` Une liste vague des commandes disponible

# Confidentialité et sécurité

Veuillez utiliser ce bot uniquement sur accord du propriétaire ou d'un membre du staff du serveur, il contient des fonctions tel que l'autoclick qui a le même effet qu'un killaura qui ne sont pas forcément autorisés sur le serveur.
Vos identifiants ne sont sauvegardés autre part que dans le config par le script, toute la connexion passe par mineflayer, qui lui aussi est open source et très connu.
