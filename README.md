# Flores amarillas

Landing page romántica, responsiva y sin dependencias. La interacción está optimizada para celular y las animaciones usan únicamente `transform` y `opacity` para mantenerse fluidas.

## Abrir el proyecto

Puedes abrir `index.html` directamente en el navegador o iniciar un servidor local:

```powershell
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Desplegar en Vercel

El proyecto está configurado como un sitio estático sin dependencias ni paso de compilación. Al importar el repositorio en Vercel, usa el preset `Other`; la raíz del repositorio se publica directamente.

Si ya tienes instalada la CLI de Vercel de forma global, también puedes desplegarlo desde la terminal:

```powershell
vercel --prod
```

## Interacción

- El botón "Sí" escapa tres veces y después permite abrir la sorpresa.
- El botón "No" muestra una respuesta juguetona y conduce a la misma celebración.
- La preferencia del sistema para reducir movimiento es respetada.
