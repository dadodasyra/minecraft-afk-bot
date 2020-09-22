# Un bot d'afk sur Minecraft Java
Un bot en JS utilisant mineflayer avec une config complète.

# Installation
Nécessite Node JS, installation ici : https://nodejs.org/fr/
Installation de node js pour Debian/Linux :
```
# Using Ubuntu user
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
```
**Installation des package nécessaire :**
- FS : `npm i fs`
- READLINE : `npm i readline`
- MINEFLAYER : `npm i mineflayer`
- UTIL : `npm i util`

# Usage
**Linux (recommandé):**
- Lancer le bot dans un *screen* ou utilisant *pm2* pour éviter de devoir garder le terminal ouvert (**screen** recommandé pour Linux).
- Dans le répertoire ou se trouve bot.js et start.sh, executé ./start.sh 

**Windows (restart pas supporté):**
- Dans le répertore du bot via un cmd executé node bot.js

**MACOS :**
- Ptdr ta cru quoi
