# TybaChallenge!

Este desarrollo consiste en una API Rest que permite realizar el registro, autenticación de usuarios, consultar restaurantes cercanos mediante una API pública (Usando ciudad o coordenadas) y registrar y consultar el historial de acciones del usuario con sesión activa.

##  Tecnologías utilizadas 🛠

- NodeJs
- Express
- MongoDB
- Jest
- JWT
- API REST
- bCrypt
- Google Places API
- Docker
- Postman
- Swagger

### Arquitectura pensada

 
 Para la implementación me orienté hacia los concetos de una arquitectura por capas, tomando ideas de arquitecturas limpias, separando las responsabilidades en módulos. Todo esto permite una mayor escalabilidad y adaptabilidad de un sistema, facilita el testing de sus funcionalidades, y permite una inyección de dependencias clara.


## Como desplegar el proyecto 🚀

### Requisitos previos:
* Docker + Docker Compose
* NodeJS + NPM(Opcional)
* MongoDB(Opcional)

Respecto a Node, NPM y MongoDB se ejecutan en los contenedores de Docker, entonces no es necesario tenerlos instalados


### Paso a Paso despliegue y uso
El proyecto se puede desplegar por completo localmente usando Docker.

1) Clonar el repositorio: git clone https://github.com/Kyokazu/TybaChallenge.git
2) Navegar hacia la carpeta donde se clone el repo
3) Ingresar las variables de entorno en el archivo .env en el directorio raiz (El Link con el archivo compartido se envia por correo, por seguridad)
4) Ejecutar el comando docker-compose up --build
5) Consumir los endpoints! Ya sea desde Postman o desde Swagger (http://localhost:3000/api-docs)

### Pasos adicionales para realizar las pruebas

6) Abrir ventana de comandos ubicados en la carpeta raíz del proyecto
7) Ejecutar "docker exec -it tybachallenge bash"
8) Ejecutar "npm test"






## ChangeLog:

### V0

- Estructura Base de trabajo:
- - Funciones sin implementaciones
- - model user
- - app.js
- - configuraciones (env, docker, routes)

### V1
- Funcionalidad a: Registro de usuario.
### V2
- Funcionalidad b: Login de usuario.
### V3
- Funcionalidad c: Lista de restaurantes en la zona
### V4
- Funcionalidad d: Consulta de Logs del usuario logeado.
### v5
- Funcionalidad e: Logout (Extra, Blacklist de tokens)
### v6
- Pruebas automatizadas completadas.
### V7 Final!
* Documentación de cada proceso
* Limpieza de código
* Implementación de UI para fácil interacción y consulta de los endpoints(Swagger)
* 
