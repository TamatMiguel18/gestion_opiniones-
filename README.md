# 📌 API de Gestión de Opiniones – Postman

## Base URL

```
http://localhost:3001/Opiniones/v1
```

---

## 1️⃣ Autenticación

### 1.1 Login Usuario

* **POST** `/login`
* **Body (JSON)**:

```json
{
  "name": "usuario1",
  "password": "123456"
}
```

* **Respuesta esperada**:

```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": "userId123",
      "name": "usuario1"
    },
    "token": "jwt_token_aqui"
  }
}
```

### 1.2 Login Admin

* **POST** `/loginAdmin`
* **Body (JSON)**:

```json
{
  "email": "admin@mail.com",
  "password": "admin123"
}
```

---

## 2️⃣ Usuarios

> Recuerda incluir el token JWT en Headers:

```
Authorization: Bearer <token>
```

### 2.1 Crear Usuario

* **POST** `/usuarios`
* **Body (JSON)**:

```json
{
  "name": "Juan Perez",
  "email": "juan@mail.com",
  "password": "123456",
  "phone": "5551234",
  "dpi": "1234567890123",
  "address": "Calle 1",
  "job_name": "Developer",
  "monthly_income": 1000,
  "birthdate": "1990-01-01"
}
```

### 2.2 Obtener todos los usuarios

* **GET** `/usuarios`
* **Query Opcional**:

```
?page=1&limit=10&isActive=true
```

### 2.3 Obtener usuario por ID

* **GET** `/usuarios/:id`

### 2.4 Actualizar usuario

* **PUT** `/usuarios/:id`
* **Body opcional (JSON)**:

```json
{
  "phone": "5554321",
  "monthly_income": 1200
}
```

### 2.5 Desactivar usuario

* **DELETE** `/usuarios/:id`

---

## 3️⃣ Publicaciones

### 3.1 Crear publicación

* **POST** `/publicaciones`
* **Body (JSON)**:

```json
{
  "userId": "userId123",
  "titulo": "Mi Opinión",
  "categoria": "Tecnología",
  "texto": "Este es mi primer post"
}
```

### 3.2 Obtener publicaciones

* **GET** `/publicaciones`
* **Query Opcional**:

```
?page=1&limit=10
```

### 3.3 Obtener publicación por ID

* **GET** `/publicaciones/:id`

### 3.4 Actualizar publicación

* **PUT** `/publicaciones/:id`
* **Body (JSON)**:

```json
{
  "texto": "Texto actualizado de la publicación"
}
```

### 3.5 Eliminar publicación

* **DELETE** `/publicaciones/:id`

---

## 4️⃣ Comentarios

### 4.1 Crear comentario

* **POST** `/comentarios`
* **Body (JSON)**:

```json
{
  "userId": "userId123",
  "publicacionId": "publicacionId123",
  "texto": "Me gusta tu publicación"
}
```

### 4.2 Obtener comentarios

* **GET** `/comentarios`
* **Query Opcional**:

```
?page=1&limit=10
```

### 4.3 Obtener comentario por ID

* **GET** `/comentarios/:id`

### 4.4 Actualizar comentario

* **PUT** `/comentarios/:id`
* **Body (JSON)**:

```json
{
  "texto": "Comentario editado"
}
```

### 4.5 Eliminar comentario

* **DELETE** `/comentarios/:id`

---

## 5️⃣ Notas Importantes

* Todas las rutas que modifican datos requieren **JWT en header**:

```
Authorization: Bearer <token>
```

* Todos los IDs deben ser válidos de MongoDB (`ObjectId`).
* Los usuarios **solo pueden editar o eliminar sus propias publicaciones y comentarios**.
* Validaciones automáticas aseguran que campos obligatorios no estén vacíos y los formatos sean correctos.
