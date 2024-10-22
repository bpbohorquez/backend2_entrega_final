# ENTREGA FINAL BACKEND II - BRIAN BOHORQUEZ

En este proyecto se desarrollaron los endpoints correspondientes a autorización, autenticación y creación de tickets de compra, utilizando el modelo de arquitectura por capas, DAO, DTO y middleware de políticas de autorización

## Instructivo:

- Se organizaron las distintas capas de la aplicación en las carpetas src\routes, src\dao y src\controllers
- El endpoint para crear el ticket y finalizar la compra (/carts/:cid/purchase) se encuentra en src\routes\carts.router.js
- Los endpoints de autenticación y usuarios se encuentran dentro de src\routes\sessions.router.js
- Para ejecutar y probar los endpoints, correr el respectivo endpoint en Postman, usando la dirección http://localhost:8080/ . Tener en cuenta que para correr el endpoint de creación de un carrito y finalización de la compra es necesario crear un usuario de tipo "user" y hacer log in, siguiendo los siguientes pasos:

1. **Register (POST)** `/sessions/register`: Crea un nuevo usuario. Probar en Postman con el siguiente formato de ejemplo para el body request, usando un cart ID existente:

{
"first_name": "Name",
"last_name": "LastName",
"email": "email@example.com",
"age": 27,
"password": "1234",
"cart": "6716f515c5af21b32eef3568",
"role": "user"
}

2. **Login (POST)** `/sessions/login`: Ingresar con las credenciales del usuario creado. Probar en Postman utilizando las credenciales del usuario en el body request:

{
"email":"email@example.com",
"password":"1234"
}

3. **Current (GET)** `/sessions/current`: Validar información del usuario logeado. Probar en postman usando el token generado en `/sessions/login` dentro de Authorization Bearer Token

4. **Purchase (POST)** `/carts/:cid/purchase`: Estando logeado, probar la ruta en postman reemplazando el parámetro cid con el id de un carrito existente (Ej: 6716f515c5af21b32eef3568). El endpoint devuelve el ticket creado con el monto total de la compra, eliminando los productos comprados del carrito

## Tecnolgías:

- Express
- NODE JS
- Handlebars
- MongoDB
- Mongoose
- Passport JWT
