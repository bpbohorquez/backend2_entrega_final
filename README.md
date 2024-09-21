# ENTREGA BACKEND II - BRIAN BOHORQUEZ

En este proyecto se desarrollaron los endpoints correspondientes a las sesiones y cookies para los usuarios de la aplicación

## Instructivo:

- Los endpoints de autenticación y usuarios se encuentran dentro de src/routes/sessions.router
- Para ejecutar y probar los endpoints, correr el respectivo endpoint en Postman, usando la dirección http://localhost:8080/
- **Register (POST)** `/sessions/register`: Crea un nuevo usuario. Probar en Postman con el siguiente formato de ejemplo para el body request, usando un cart ID existente:

{
"first_name": "Name",
"last_name": "LastName",
"email": "email@example.com",
"age": 27,
"password": "1234",
"cart": "66c0c101e800bceb038d0f53",
"role": "user"
}

- **Login (POST)** `/sessions/login`: Ingresar con las credenciales del usuario. Probar en Postman utilizando las credenciales del usuario en el body request:

{
"email":"email@example.com",
"password":"1234"
}

- **Current (GET)** `/sessions/current`: Validar información del usuario logeado. Probar en postman usando el token generado en `/sessions/login` dentro de Authorization Bearer Token

## Tecnolgías:

- Express
- NODE JS
- Handlebars
- MongoDB
- Mongoose
- Passport JWT
