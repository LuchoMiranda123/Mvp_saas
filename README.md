# Agency OS — MVP Front-End

**Sistema operativo para agencias de marketing con copilotos de IA.**

## Cómo ejecutar

1. Clona o descarga el repositorio.
2. Abre `index.html` directamente en el navegador **o** usa un servidor local:
   ```bash
   # Python 3
   python -m http.server 8080
   # o con npx
   npx serve .
   ```
3. Navega a `http://localhost:8080` (o abre el archivo directamente).

## Estructura del proyecto

```
/index.html            ← Punto de entrada
/css/custom.css        ← Estilos personalizados
/js/data.js            ← Datos mock completos
/js/state.js           ← Estado global + localStorage
/js/utils.js           ← Utilidades
/js/components.js      ← Componentes UI reutilizables
/js/router.js          ← Router SPA por hash
/js/views/
  login.js             ← Pantalla de login
  dashboard.js         ← Dashboard multicliente
  workspace.js         ← Layout del workspace
  summary.js           ← Resumen ejecutivo
  onboarding.js        ← Onboarding del cliente
  brief.js             ← Brief de marca
  meetings.js          ← Reuniones
  files.js             ← Archivos / Drive
  benchmark.js         ← Benchmark e investigación
  strategy.js          ← Estrategia
  content.js           ← Contenido (calendario, copy, community, aprobaciones)
  operations.js        ← Operaciones / Kanban
  reports.js           ← Reportes ejecutivos
  settings.js          ← Configuración del cliente
  agents.js            ← Panel de agentes IA
/js/app.js             ← Inicialización de la app
/README.md
```

## Tecnologías

- HTML5 semántico
- Tailwind CSS (CDN)
- JavaScript vanilla (ES6+)
- Chart.js (CDN) para gráficos
- Lucide Icons (CDN)
- localStorage para persistencia

## Credenciales demo

- **Email:** `demo@agencyos.com`
- **Password:** cualquiera

## Despliegue en GitHub Pages

1. Sube todo el contenido al branch `main` (o `gh-pages`).
2. En Settings → Pages, selecciona la rama y carpeta raíz `/`.
3. La app estará disponible en `https://tu-usuario.github.io/tu-repo/`.

## Licencia

Proyecto MVP demo. Uso interno.
