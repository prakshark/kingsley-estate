# Kingsley Estates Frontend

A React + Vite frontend for the Kingsley Estates real estate application.

## 🚀 Deployment on Vercel

### Prerequisites
- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- GitHub account (recommended)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Configure the project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` (if your repo has both frontend and backend)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. **Add Environment Variables (if needed):**
   - Go to Project Settings → Environment Variables
   - Add any environment variables your app needs

7. **Deploy!**

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Set project name
   - Confirm settings

### Configuration Files

- **`vercel.json`** - Vercel configuration for SPA routing
- **`vite.config.js`** - Vite build configuration
- **`.gitignore`** - Git ignore rules

### Features

- ✅ SPA routing with React Router
- ✅ Automatic builds on git push
- ✅ Preview deployments for pull requests
- ✅ Custom domain support
- ✅ Environment variables
- ✅ Edge functions support (if needed)

### Troubleshooting

#### Build Errors
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+
- Check build logs in Vercel dashboard

#### Routing Issues
- The `vercel.json` file handles SPA routing
- All routes redirect to `index.html`
- Check that your React Router setup is correct

#### Environment Variables
- Add them in Vercel dashboard under Project Settings
- They're automatically available in your app
- Use `import.meta.env.VITE_VARIABLE_NAME` to access them

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your app.

### Build for Production

```bash
npm run build
npm run preview
```

The built files will be in the `dist` directory.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
