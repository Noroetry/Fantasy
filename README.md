NECESARIO:
Lo único necesario es crear un archivo constant.js y colocarlo dentro de ./src
Su contenido será:
    const token = ''
    module.exports = {
        token
    }
Dónde el contenido de "token" será el token que obtenemos en la request "consent" al iniciar sesión en Fantasy.

COMANDOS:
npm run team [pos, pts, avg, market, clause, unblock]
npm run others all [pos, pts, avg, market, clause, unblock]
npm run others {user} [pos, pts, avg, market, clause, unblock]