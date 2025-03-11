# SummerShop E-commerce Project

A Vue.js e-commerce website for summer products featuring responsive design, product catalog, shopping cart, and wishlist functionality.

## Features

- Responsive design with Bootstrap 5
- Product catalog with filtering and sorting
- Shopping cart functionality
- Wishlist management
- Category browsing
- Mobile-friendly interface
- PWA support for offline capabilities
- Toast notifications for user actions

## Technologies Used

- Vue.js 3
- Vuex for state management
- Vue Router for navigation
- Bootstrap 5 for styling
- SCSS for custom styles
- PWA features for offline support

## Project Setup

```bash
# Install dependencies
npm install

# Compile and hot-reload for development
npm run serve

# Compile and minify for production
npm run build

# Lint and fix files
npm run lint
```

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Configure the project:
   - Framework Preset: Vue.js
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
5. Click "Deploy"

## Customization

You can customize the configuration by editing the `vue.config.js` file.

## Directory Structure

```
├── public/             # Static assets
├── src/                # Source files
│   ├── assets/         # Assets like images and styles
│   ├── components/     # Vue components
│   ├── data/           # Mock data files
│   ├── router/         # Vue router configuration
│   ├── store/          # Vuex store modules
│   ├── utils/          # Utility functions
│   ├── views/          # Page components
│   ├── App.vue         # Root component
│   └── main.js         # Entry point
└── package.json        # Dependencies and scripts
```
