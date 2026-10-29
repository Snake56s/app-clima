# App de Clima

Aplicación web sencilla hecha con React y Material UI para consultar el estado del tiempo actual en cualquier ciudad consumiendo la API de [WeatherAPI](https://www.weatherapi.com/).

Permite buscar por nombre de localidad o usar la ubicación del navegador, alternar entre grados Celsius y Fahrenheit, y guarda las últimas búsquedas en `localStorage` para consultarlas rápido.

## Tecnologías

- React 18 + Vite
- Material UI (`@mui/material`, `@mui/icons-material`, `@mui/lab`)
- Notistack para notificaciones

## Configuración y uso local

1. Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

2. Crear un archivo `.env` en la raíz del proyecto (podés copiar `.env.example`) y agregar tu API key gratuita de [WeatherAPI](https://www.weatherapi.com/):

```env
VITE_API_KEY=tu_api_key_aqui
```

3. Levantar el servidor de desarrollo:

```bash
npm run dev
```

Para generar el build de producción:

```bash
npm run build
```
