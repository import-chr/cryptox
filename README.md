<div align="center">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=Next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/-shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
    <img src="https://img.shields.io/badge/-CoinGecko-06D6A0?style=for-the-badge&logo=coingecko&logoColor=white" />
    <img src="https://img.shields.io/badge/-CodeRabbit-FF6B6B?style=for-the-badge&logo=coderabbit&logoColor=white" />
  </div>

  <h3 align="center">CrypTox — Dashboard</h3>

   <div align="center">
     Proyecto construido con el tutorial de <a href="https://www.youtube.com/watch?v=XUkNR-JfHwo" target="_blank"><b>JavaScript Mastery</b></a> en YouTube.
    </div>
</div>

## 📋 <a name="table">Tabla de contenidos</a>

1. ⚙️ [Tech Stack](#tech-stack)
2. 🔋 [Funcionalidades](#features)
3. 🤸 [Créditos](#original)

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Next.js](https://nextjs.org)** es un potente framework de React para construir aplicaciones web full-stack. Simplifica el desarrollo con características como el renderizado del lado del servidor, la generación de sitios estáticos y las rutas de API, permitiendo a los desarrolladores enfocarse en crear productos y lanzarlos rápidamente.

- **[TypeScript](https://www.typescriptlang.org/)** es un superconjunto de JavaScript que añade tipado estático, proporcionando mejores herramientas, mayor calidad de código y una mejor detección de errores para los desarrolladores. Es ideal para construir aplicaciones a gran escala y mejora la experiencia de desarrollo.

- **[Tailwind CSS](https://tailwindcss.com/)** es un framework CSS basado en utilidades que permite a los desarrolladores crear rápidamente sitios web modernos componiendo estilos directamente en su marcado HTML, lo que facilita diseños altamente personalizados y garantiza los paquetes de CSS de producción más pequeños posibles.

- **[Shadcn/ui](https://ui.shadcn.com/docs)** es una colección de componentes de React bellamente diseñados y accesibles que puedes copiar y pegar directamente en tu proyecto (no es una librería tradicional de npm), lo que te brinda propiedad total del código fuente y control completo de personalización para construir tu propio sistema de diseño, a menudo utilizando Tailwind CSS.

- **[CodeRabbit](https://jsm.dev/crypto-rabbit)** es una plataforma de revisión de código impulsada por inteligencia artificial que se integra en flujos de trabajo de Git (como GitHub y GitLab) para analizar automáticamente las pull requests, identificando problemas que van desde aspectos de legibilidad hasta errores de lógica y fallas de seguridad, y ofreciendo correcciones con un solo clic para ayudar a los equipos a entregar código de alta calidad más rápidamente.

- **[CoinGecko API](https://jsm.dev/crypto-gecko)** es una API RESTful completa y confiable que proporciona datos del mercado de criptomonedas en tiempo real e históricos, incluyendo precios, capitalización de mercado, volumen e información de exchanges, lo que permite a los desarrolladores crear aplicaciones de seguimiento, análisis y gestión de portafolios de criptomonedas.

- **[TradingView](https://www.tradingview.com/lightweight-charts/)** es una librería de visualización financiera de alto rendimiento que ofrece capacidades de gráficos interactivos para renderizar datos OHLCV complejos. Permite la integración de gráficos de velas responsivos e indicadores técnicos, lo que posibilita a los usuarios realizar análisis técnico de nivel profesional con actualizaciones de baja latencia y precisión quirúrgica.

## <a name="features">🔋 Funcionalidades</a>

👉 **Home Dashboard**: Muestra indicadores clave del mercado como **Total Market Cap** y **BTC dominance**, junto con una lista dinámica de **Trending Tokens**, todos obtenidos instantáneamente utilizando los endpoints `/global` y `/search/trending` de CoinGecko.

👉 **Token Discovery Page**: Una tabla completa, ordenable y con búsqueda que presenta métricas clave de los tokens (Price, 24h change, Market Cap Rank) para análisis de mercado masivo, impulsada por la API REST escalable `/coins/markets` y optimizada con paginación para una navegación eficiente.

👉 **Detailed Token Overview**: Proporciona un resumen inmediato de cualquier token seleccionado, incluyendo su logo, precio actual y posición en el ranking de capitalización de mercado, utilizando la API REST `/coins/{id}` para los datos principales y el CGSimplePrice WebSocket para el monitoreo continuo de precios en tiempo real.

👉 **Smart Currency Converter**: Una herramienta interactiva que permite a los usuarios calcular instantáneamente cantidades de monedas en docenas de monedas fiat y criptomonedas compatibles, aprovechando los endpoints `/simple/supported_vs_currencies` y `/simple/price` para conversiones precisas.

👉 **Global Search Functionality**: Una potente barra de búsqueda unificada que permite a los usuarios localizar rápidamente cualquier activo cripto por nombre o símbolo, enlazando directamente a la página de detalle del token correspondiente mediante los endpoints REST `/search` y `/coins/{id}` de CoinGecko.

## <a name="original">📌 Créditos</a>
<p align="center">
  <a href="https://github.com/adrianhajdin/coinpulse" target="_blank">
    <img 
      src="https://opengraph.githubassets.com/1/adrianhajdin/coinpulse"
      alt="Original GitHub Repository"
      width="300"
    />
  </a>
</p>