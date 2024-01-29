## MARVEL APP

Este es el README de la **MARVEL APP**. Aquí encontrarás información sobre la aplicación y cómo ejecutarla.

### Descripción

La **MARVEL APP** es una aplicación web que te permite explorar información sobre personajes y cómics del universo de Marvel.

### Características

- Buscar personajes de Marvel.
- Filtrar resultados por personajes o cómics.
- Ver detalles de cada personaje, incluidos los cómics en los que aparece.
- Guardar búsquedas favoritas para acceder rápidamente en el futuro.

### Warnings

- La unica Warning en consola es debido a que accedo a las imagenes que me trae la api de marvel y estas debe ser tranformadas de HTTP a HTTPS debido a MIXED CONTENT a partir de Chrome 84 aparece esta warning. Dejo documentacion:

Update (April 6, 2020): Mixed image autoupgrading was originally scheduled for Chrome 81, but will be delayed until at least Chrome 84. Check the Chrome Platform Status entry for the latest information about when mixed images will be autoupgraded and blocked if they fail to load over https://. Sites with mixed images will continue to trigger the “Not Secure” warning.
https://blog.chromium.org/2019/10/no-more-mixed-messages-about-https.html

### Deploy

https://marvel-app-m138.onrender.com/

### Ejecución

Para ejecutar la aplicación localmente, sigue estos pasos:

1. Clona este repositorio a tu máquina local.
2. Abre una terminal y navega al directorio del proyecto.
3. Instala las dependencias utilizando el siguiente comando:

npm install

4. Una vez completada la instalación, inicia la aplicación con el comando:

npm run dev

5. Abre tu navegador web y navega a `http://localhost:5173/` para ver la aplicación.

### Tecnologías Utilizadas

La **MARVEL APP** está construida con las siguientes tecnologías:

- React.js: Biblioteca de JavaScript para construir interfaces de usuario.
- Redux Toolkit: Biblioteca de gestión del estado para aplicaciones JavaScript.
- Ant Design: Biblioteca de componentes de interfaz de usuario para React.
- Marvel API: API proporcionada por Marvel para acceder a datos sobre personajes y cómics.

### Créditos

Este proyecto fue creado por [Iñaki Armendariz]. Siéntete libre de contribuir o realizar sugerencias para mejorar la aplicación.
