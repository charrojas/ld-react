# Frontend - Proyecto LogicalData

Esta aplicación corresponde al **frontend** de LogicalData, desarrollada en **React 18** utilizando **TypeScript** y **Vite**. 

Para manejar las solicitudes al **backend**, se utiliza **Axios**, una biblioteca que simplifica las peticiones HTTP. La gestión del estado se realiza mediante **Zustand**, lo que permite un manejo eficiente y centralizado del estado de la aplicación. Esta combinación de tecnologías proporciona un frontend robusto, con comunicación eficiente con el backend y una experiencia de usuario fluida.

---

## Requisitos previos

- Tener la **API de LogicalData** en funcionamiento
  
---

## Instalación y ejecución

1. Clonar o descargar el repositorio y abrir una terminal en la carpeta raíz del proyecto.  

2. Configurar la URL base de la API en el archivo `.env` según el puerto en el que esté corriendo tu backend:

```env
`VITE_API_PORT_BACKEND_LD=8081`
```

3. Solo se debe cambiar el puerto si tu API corre en un puerto diferente. Los servicios de la aplicación toman automáticamente la variable VITE_API_PORT_BACKEND_LD.

4. Se debe instalar Vite
   
6. Instalar las dependencias con el comando "npm install" desde la terminal abierta anteriormente.

7. Para iniciar la aplicación usar: npm run dev

# Notas

La aplicación depende de que la API esté corriendo y que la base de datos tenga al menos un usuario registrado.

Revisa el archivo .env para confirmar que el puerto del backend coincide con el de la API.

El frontend utiliza Material UI para los componentes visuales y Vite como build tool para un arranque rápido.

## Sistema:

Al levantar la aplicación se mostrará la vista del Login, se debe ingresar el usuario y la contraseña previamente creada (según indicaciones del readme de proyecto del Api):

<img width="1901" height="822" alt="brave_screenshot_localhost (1)" src="https://github.com/user-attachments/assets/772b62d1-5793-419b-a17d-d422e6ee893c" />

Al ingresar nos redigirá al home donde se pueden visualizar del lado izquierdo tres opciones (Ventas, Facturación y cerrar sesión): 

<img width="1913" height="999" alt="image" src="https://github.com/user-attachments/assets/d39fb6df-088e-48cc-909b-141f57633306" />


Si selecciona la opción de Ventas se muestra lo siguiente:

<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/574a947d-0c35-45c8-aa3c-65f7a2d3a0a5" />

Donde podrá agregar articulos, editar o bien eliminarlos.

Si selecciona la opción de Facturación podrá ver lo siguiente:
<img width="1917" height="940" alt="image" src="https://github.com/user-attachments/assets/b348def7-6603-4252-94da-d759a3dddbfa" />

<img width="1916" height="940" alt="image" src="https://github.com/user-attachments/assets/6a6b55b3-f7b3-49e1-86f7-ee227a1edc10" />

Donde se podrá buscar un articulo de venta, poner la cantidad respectiva y agregarlo para seguidamente facturarlo 

Seleccionando la opcion de facturar:

<img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/f55e91c9-10ec-4a08-8800-6d459e7ccc4a" />

Seleccionando la opción de imprimir:

<img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/34731105-9001-4247-a94f-bc825173978b" />



