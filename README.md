# Mouchos League

Portal deportivo estático para la liga fantasy privada **Mouchos League**. Reúne las clasificaciones de Primera y Segunda Mouchos, la Copa Mouchense y un sistema de noticias fácil de mantener.

## Tecnología

- Astro 7, HTML, CSS y JavaScript mínimo.
- Datos deportivos en JSON y noticias en Markdown.
- GitHub Actions y GitHub Pages, sin backend ni base de datos.
- Node.js 26 LTS (declarado en `.nvmrc`).

## Desarrollo local

```bash
nvm use
npm install
npm run dev
```

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

En instalaciones reproducibles usa `npm ci`.

## Actualizar las clasificaciones

Edita únicamente los archivos de la temporada activa:

- `src/data/seasons/2026-2027/primera.json`
- `src/data/seasons/2026-2027/segunda.json`
- `src/data/seasons/2026-2027/copa.json`

Cada fila referencia un `teamId` estable definido en `src/data/teams.json`. No uses el nombre visible como identificador. En Copa, `for` y `against` representan puntos fantasy (GF y GC), no goles.

Para conservar temporadas anteriores, crea otra carpeta junto a `2026-2027` con los mismos archivos. La interfaz histórica queda fuera de esta primera versión.

## Añadir una noticia

Crea un archivo `.md` en `src/content/noticias/`:

```md
---
title: "Titular"
summary: "Resumen breve"
date: 2026-11-05
category: "Actualidad"
image: "images/news/mi-imagen.webp"
featured: false
demo: false
---

Contenido de la noticia en Markdown.
```

Categorías permitidas: `Actualidad`, `Lesionados`, `Fichajes`, `Polémicas` y `Humor`. La URL se crea automáticamente a partir del nombre del archivo. Pon la imagen en `public/images/news/`; el campo `image` es opcional.

## Añadir escudos y el logotipo

Exporta cada escudo como WebP y guárdalo en `public/images/teams/` con el `id` del equipo: por ejemplo, `ego-fc.webp`. El avatar de iniciales se sustituirá automáticamente. Si no existe el archivo, se mantiene el avatar provisional.

La identidad de cabecera es provisional. El futuro logotipo oficial puede añadirse a `public/images/` y sustituirse en `src/components/Header.astro`.

## Actualizar la Copa

Modifica los grupos dentro de `src/data/seasons/2026-2027/copa.json`. Mantén los campos `position`, `teamId`, `points`, `played`, `won`, `drawn`, `lost`, `for`, `against` y `difference`. Borjinetta no debe añadirse a la Copa. Los cruces permanecen vacíos hasta que existan emparejamientos oficiales.

## Publicación en GitHub Pages

El proyecto está configurado para el repositorio real `domins14/mouchos-league`:

- `site`: `https://domins14.github.io`
- `base`: `/mouchos-league`
- workflow: `.github/workflows/deploy.yml`

Cada cambio enviado a `main` ejecuta `npm ci`, compila Astro y publica `dist` con las acciones oficiales de GitHub Pages.

Configuración manual única: en GitHub abre **Settings → Pages → Build and deployment** y selecciona **GitHub Actions** como origen. Después, envía estos archivos a `main` y comprueba la ejecución del workflow. La web no se considera publicada hasta que ese workflow termine correctamente.

## Dependencias y seguridad

El proyecto tiene una única dependencia directa: Astro. Dependabot revisa semanalmente npm y GitHub Actions.

```bash
npm outdated
npm update
npm audit
npm run build
```

Revisa `package-lock.json` antes de confirmar cambios. No uses `npm audit fix --force` sin evaluar rupturas. Nunca guardes tokens, contraseñas o claves privadas en el repositorio.

## Estructura principal

```text
src/
├── components/       # Componentes Astro reutilizables
├── content/noticias/ # Noticias Markdown
├── data/             # Equipos y temporadas JSON
├── layouts/          # Plantilla HTML general
├── lib/              # Lectura y preparación de datos
├── pages/            # Rutas del sitio
└── styles/           # Diseño global
```
