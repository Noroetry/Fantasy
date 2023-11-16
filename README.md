NECESARIO:
Lo único necesario es crear un archivo constant.js y colocarlo dentro de una carpeta lib que creemos en .
El contenido de ese .js será:
    const token = ''
    module.exports = {
        token
    }
Dónde el contenido de "token" será el token que obtenemos en la request "consent" al iniciar sesión en Fantasy.

COMANDOS:
npm run team [pos, pts, avg, market, clause, unblock]
npm run others all [pos, pts, avg, market, clause, unblock]
npm run others {user} [pos, pts, avg, market, clause, unblock]

MEJORAS:
! -> COLORES CONSOLA (picocolor)
!!! -> Tabla con jugadores del mercado
!! -> Jugadores más interesantes de los rivales con desbloqueo < 1 día
!! -> Advertencias de vulnerabilidades
        - Jugadores con claúsulas sin subir
        - Desbloqueos pronto
        - Posibles clausulazos que te dejan sin posible alineación
