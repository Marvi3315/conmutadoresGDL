# Conmutadores GDL

Sitio web corporativo de Conmutadores GDL, especialistas en telecomunicaciones, conmutadores IP, CCTV, alarmas, control de acceso y cableado estructurado en Guadalajara y la ZMG.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Motion (animaciones)
- Firebase (Authentication + Firestore) — backend del panel de administración y catálogo

## Requisitos

- Node.js 18 o superior

## Instalación y ejecución local

```bash
npm install
npm run dev
```

La app quedará disponible en `http://localhost:3000`.

Sin configurar Firebase (ver abajo), el sitio funciona normalmente pero en
modo solo-lectura: se muestra el catálogo de fábrica y el panel de
administración avisa que falta configuración, sin bloquear el resto de la página.

## Build de producción

```bash
npm run build
npm run preview
```

---

## Configurar Firebase (panel de administración y catálogo en la nube)

Esto se hace **una sola vez**. Con esto, Felipe podrá entrar al panel de
administración desde cualquier dispositivo con su correo y contraseña, y los
cambios al catálogo se verán para todos los visitantes al instante (antes solo
se guardaban en el navegador de quien los hacía).

### 1. Crear el proyecto en Firebase

1. Entra a [console.firebase.google.com](https://console.firebase.google.com) con una cuenta de Google.
2. Clic en **Agregar proyecto**. Nómbralo, por ejemplo, `conmutadores-gdl`.
3. Puedes desactivar Google Analytics si no lo vas a usar (no es necesario para esto).
4. Espera a que termine de crearse.

### 2. Registrar la app web y obtener las llaves de configuración

1. Dentro del proyecto, clic en el ícono **`</>`** (Web) para agregar una app web.
2. Ponle un apodo, por ejemplo `conmutadores-gdl-web`. No necesitas activar "Firebase Hosting".
3. Firebase te mostrará un bloque `firebaseConfig` con varios valores (`apiKey`, `authDomain`, `projectId`, etc). Los vas a necesitar en el paso 5.

### 3. Activar Authentication (correo y contraseña)

1. En el menú lateral, ve a **Build → Authentication**.
2. Clic en **Comenzar** / **Get started**.
3. En la pestaña **Sign-in method**, activa el proveedor **Correo electrónico/contraseña** (Email/Password).
4. Ve a la pestaña **Users** y crea manualmente al usuario administrador:
   - Clic en **Agregar usuario**.
   - Correo: el que usará Felipe para entrar al panel (ej. `felipe@conmutadoresgdl.com` o el que prefiera).
   - Contraseña: una contraseña segura (mínimo 6 caracteres, mejor si es más larga y con números/símbolos).
5. **Este es el único usuario que podrá administrar el catálogo.** Si en el futuro se necesita otro, se agrega de la misma forma.

### 4. Activar Firestore Database (donde vive el catálogo)

1. En el menú lateral, ve a **Build → Firestore Database**.
2. Clic en **Crear base de datos**.
3. Elige la ubicación del servidor más cercana (por ejemplo `us-central` o `southamerica-east1`; para México, cualquier región de EE.UU. da buena latencia).
4. Empieza en **modo de producción** (las reglas de seguridad ya las trae este proyecto en el archivo `firestore.rules`).
5. Una vez creada, ve a la pestaña **Reglas** y reemplaza el contenido con el del archivo `firestore.rules` de este proyecto. Clic en **Publicar**.

### 4b. Configurar ImgBB (fotos de producto que se suben desde el panel)

Firebase Storage ahora exige activar el plan de pago "Blaze" (aunque el uso
real se quede en $0), así que en vez de eso usamos **ImgBB**, un servicio de
hospedaje de imágenes gratuito que no pide tarjeta.

1. Entra a [api.imgbb.com](https://api.imgbb.com/) e inicia sesión (puedes usar tu cuenta de Google).
2. Copia la **API key** que te muestra en esa página.
3. Pégala en tu archivo `.env` como `VITE_IMGBB_API_KEY=tu_llave_aqui`.
4. Agrega esa misma variable en Netlify/Vercel (igual que las de Firebase).

Con esto, desde el panel de administración se puede subir una foto directo
desde la computadora (botón "Subir foto desde mi equipo" al editar un
producto) en vez de solo pegar una URL.

### 5. Configurar las variables de entorno del proyecto

1. Copia el archivo `.env.example` y renómbralo a `.env`.
2. Rellena cada línea con los valores del bloque `firebaseConfig` que copiaste en el paso 2:

```
VITE_FIREBASE_API_KEY=el_apiKey_de_firebase
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

3. Guarda el archivo. **Nunca subas este `.env` a GitHub** (ya está excluido en `.gitignore`).

### 6. Configurar las mismas variables en Netlify o Vercel

El archivo `.env` solo funciona en tu computadora. Para que el sitio publicado
(Netlify/Vercel) también se conecte a Firebase, agrega las mismas 6 variables
en el panel de tu proveedor de hosting:

- **Netlify:** Site settings → Environment variables → Add a variable (una por una, con los mismos nombres `VITE_FIREBASE_...`).
- **Vercel:** Project Settings → Environment Variables (una por una, igual).

Después de agregarlas, vuelve a desplegar el sitio (Trigger deploy / redeploy) para que tomen efecto.

### 7. Primer inicio de sesión (siembra automática del catálogo)

1. Corre el sitio (local o ya publicado) y abre el panel de administración.
2. Inicia sesión con el correo y contraseña que creaste en el paso 3.
3. La primera vez que un administrador entra y la base de datos está vacía, el
   sitio copia automáticamente el catálogo de fábrica a Firestore. A partir de
   ahí, todo lo que agregues, edites o borres desde el panel se guarda en la nube.

### ¿Cómo cambia el "Cambiar PIN" de antes?

Ahora es **"Cambiar Contraseña"**, dentro del panel de administración, y usa el
sistema de contraseñas de Firebase (mucho más seguro que un PIN guardado en el
navegador). Si Felipe olvida su contraseña, puede usar el enlace **"¿Olvidaste
tu contraseña?"** en la pantalla de acceso, que le envía un correo de
recuperación automáticamente.
