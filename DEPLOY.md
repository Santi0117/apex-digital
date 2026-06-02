# Publicar Apex Digital en Vercel

## 1. Subir el código a GitHub

En terminal, dentro del proyecto:

```bash
cd ~/Projects/mi-portafolio
git add .
git commit -m "Sitio listo para producción"
```

Creá un repo en [github.com/new](https://github.com/new) (ej. `apex-digital`). Luego:

```bash
git remote add origin https://github.com/TU-USUARIO/apex-digital.git
git branch -M main
git push -u origin main
```

## 2. Conectar con Vercel

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión (con GitHub)
2. **Add New… → Project**
3. Importá el repo `apex-digital`
4. Vercel detecta Next.js solo — no cambies nada en Build Settings
5. Antes de **Deploy**, abrí **Environment Variables** y agregá:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ophafuwqkvqjjptwwchb.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | tu `sb_secret_...` |
| `OPENAI_API_KEY` | tu key (opcional, para chat IA) |
| `NEXT_PUBLIC_SITE_URL` | la URL que te dé Vercel (ej. `https://apex-digital.vercel.app`) |

6. **Deploy** y esperá 1–2 minutos

## 3. Después del primer deploy

1. Copiá la URL de producción (ej. `https://apex-digital-xxx.vercel.app`)
2. Vercel → Project → **Settings → Environment Variables**
3. Editá `NEXT_PUBLIC_SITE_URL` con esa URL
4. **Deployments → Redeploy** (para actualizar SEO/sitemap)

## 4. Probar en producción

- [ ] Página carga con imágenes del hero y portafolio
- [ ] Formulario de contacto → éxito → fila en Supabase `contact_submissions`
- [ ] Chatbot responde
- [ ] Botón WhatsApp abre +506 6303-0204

## 5. Dominio propio (opcional)

Vercel → **Settings → Domains** → agregá tu dominio y seguí las instrucciones DNS.

Luego actualizá `NEXT_PUBLIC_SITE_URL` al dominio final y redeploy.

## Qué se publica automáticamente

- Todas las imágenes en `public/` (hero, portafolio, logos)
- Formulario + Supabase
- Chatbot + OpenAI (si hay key)
- WhatsApp flotante
- SEO (robots, sitemap)

## Variables solo en tu máquina

`.env.local` **no** se sube a GitHub. Las mismas keys van en el dashboard de Vercel.
