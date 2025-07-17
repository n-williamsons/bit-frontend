# 🍽️ Restaurant Management System - Frontend

Sistema de gestión de restaurante desarrollado con Angular. Permite administrar menús, usuarios y órdenes de manera eficiente.

## 🚀 Características

- ✅ **Autenticación de usuarios** (Sign in / Sign up)
- ✅ **Gestión de menús** (CRUD completo)
- ✅ **Navegación dinámica**
- ✅ **Validación de formularios**
- ✅ **Integración con backend API**
- 🚧 **Módulo de órdenes** (En desarrollo)


## ⚡ Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/n-williamsons/bit-frontend.git
   cd bit-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la API**
   - Asegúrate de que tu backend esté ejecutándose en `http://localhost:3000`
   - Verifica la configuración en `src/app/services/`

4. **Ejecutar la aplicación**
   ```bash
   ng serve
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── home/          # Página de inicio
│   │   │   ├── menu/          # Gestión de menús
│   │   │   ├── orders/        # Órdenes (en desarrollo)
│   │   │   ├── sign-in/       # Iniciar sesión
│   │   │   ├── sign-up/       # Registrarse
│   │   │   └── page-not-found/ # Error 404
│   │   └── shared/
│   │       ├── header/        # Cabecera
│   │       ├── footer/        # Pie de página
│   │       └── navigation/    # Navegación
│   ├── services/
│   │   ├── menus.ts          # Servicio de menús
│   │   ├── orders.ts         # Servicio de órdenes
│   │   └── signin.ts         # Servicio de autenticación
│   └── assets/
│       └── images/           # Imágenes del proyecto
```

## 🎯 Funcionalidades Principales

### **Autenticación**
- Registro de nuevos usuarios
- Inicio de sesión con JWT
- Validación de formularios
- Protección de rutas

### **Gestión de Menús**
- Crear nuevos elementos del menú
- Visualizar lista de menús
- Editar menús existentes
- Eliminar elementos del menú
- Categorización por tipo de plato

### **Dashboard**
- Interfaz responsive
- Navegación intuitiva
- Cards informativas
- Estados de carga


## 🌐 API Endpoints

El frontend se conecta a los siguientes endpoints:

- `POST /auth/signin` - Iniciar sesión
- `POST /auth/signup` - Registrarse
- `GET /menu` - Obtener menús
- `POST /menu` - Crear menú
- `PUT /menu/:id` - Actualizar menú
- `DELETE /menu/:id` - Eliminar menú

## 📱 Responsive Design

El proyecto está optimizado para:
- 📱 **Móviles** (< 576px)
- 📱 **Tablets** (576px - 991px)
- 💻 **Desktop** (> 992px)


## 🔒 Seguridad

- Tokens JWT para autenticación
- Validación de formularios del lado cliente
- Protección contra inyección XSS
- Manejo seguro de datos sensibles

## 🚧 Próximas Características

- [ ] Módulo de órdenes completo
- [ ] Dashboard con estadísticas
- [ ] Sistema de roles y permisos
- [ ] Notificaciones en tiempo real


## 🐛 Problemas Conocidos

- El módulo de órdenes está en mantenimiento
- Algunas validaciones podrían mejorarse
- Optimización de imágenes pendiente



## 📄 Licencia

Este proyecto es de uso educativo - desarrollado como parte del bootcamp de programación.

---

## 👨‍💻 Autor

**Nicolás Williamson Silva**  
Junior Web Developer  
📅 2025  

---

## 📬 Contacto

¿Dudas o sugerencias? ¡Contáctame!

- [LinkedIn](https://www.linkedin.com/in/nicolasws17)
- [GitHub](https://github.com/n-williamsons)
- [Email](mailto:silvanicolasandres@gmail.com)

---