# 🎮 Aventura Kids - Next.js

Plataforma educativa con juegos interactivos para niños de 4+ años, desarrollada con Next.js 14 y optimizada para dispositivos móviles.

## 🚀 Características

### Juegos Incluidos

1. **🧩 Rompecabezas**: Organiza piezas para completar la imagen
2. **🧠 Memoria**: Encuentra parejas de elementos
3. **🎨 Clasificación**: Arrastra elementos según su color
4. **🕵️ El Intruso**: Identifica el elemento diferente
5. **👀 Veo Veo**: Busca objetos por color

### Características Técnicas

- ⚡️ **Next.js 14** con App Router
- 🎨 **Tailwind CSS** para estilos
- 📱 **Responsive Design** optimizado para móviles
- 🎯 **Touch Events** para interacción táctil
- 🎉 **Confetti Effects** para celebraciones
- 💾 **localStorage** para persistencia de datos
- ♿️ **Accesible** y fácil de usar

## 📋 Requisitos Previos

- Node.js 18.17 o superior
- npm o yarn

## 🛠️ Instalación

1. **Descomprimir el archivo ZIP**

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📦 Scripts Disponibles

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start

# Linter
npm run lint
```

## 📁 Estructura del Proyecto

```
aventura-kids-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css         # Estilos globales
│   └── components/
│       ├── Navbar.tsx          # Barra de navegación
│       ├── MainMenu.tsx        # Menú principal
│       ├── SuccessModal.tsx    # Modal de éxito
│       └── games/              # Componentes de juegos
│           ├── PuzzleGame.tsx
│           ├── MemoryGame.tsx
│           ├── ClassificationGame.tsx
│           ├── OddOneOutGame.tsx
│           └── ISpyGame.tsx
├── public/                     # Archivos estáticos
├── next.config.js             # Configuración de Next.js
├── tailwind.config.js         # Configuración de Tailwind
└── package.json               # Dependencias
```

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js` para modificar la paleta de colores:

```javascript
theme: {
  extend: {
    colors: {
      // Tus colores personalizados
    }
  }
}
```

### Agregar Nuevo Juego

1. Crear componente en `src/components/games/`:

```tsx
'use client'

interface MyGameProps {
  onComplete: () => void
}

export default function MyGame({ onComplete }: MyGameProps) {
  return (
    <div>
      {/* Tu juego aquí */}
    </div>
  )
}
```

2. Importar y agregar en `src/app/page.tsx`

### Modificar Estilos

Los estilos personalizados están en `src/app/globals.css`

## 📱 Optimización Móvil

- **Touch Events**: Todos los juegos soportan interacción táctil
- **Viewport**: Configurado para prevenir zoom no deseado
- **Performance**: Optimizado para dispositivos de gama baja
- **Gestos**: Soporte para tap, drag, y swipe

## 🌐 Despliegue

### Vercel (Recomendado)

1. Push del código a GitHub
2. Conectar repositorio en [Vercel](https://vercel.com)
3. Deploy automático

### Otros Hostings

```bash
npm run build
npm start
```

## 🔧 Tecnologías

- **Next.js 14**: Framework React
- **React 18**: Biblioteca UI
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework CSS
- **Lucide React**: Iconos
- **Canvas Confetti**: Efectos de celebración

## 🐛 Solución de Problemas

### El juego no carga
- Verifica que Node.js esté instalado
- Elimina `node_modules` y reinstala: `rm -rf node_modules && npm install`

### Problemas con touch en móvil
- Asegúrate de estar usando HTTPS en producción
- Verifica que no haya otros event listeners interfiriendo

### Build falla
- Verifica la versión de Node.js: `node -v` (debe ser ≥18.17)
- Limpia caché: `npm run build -- --no-cache`

## 📄 Licencia

Proyecto educativo de código abierto.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork del proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Desarrollo

Desarrollado con ❤️ para el aprendizaje infantil.

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.
