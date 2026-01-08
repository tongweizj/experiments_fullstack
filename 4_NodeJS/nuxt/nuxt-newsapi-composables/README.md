# Nuxt 3 Minimal Starter

## New Feature

- Nuxt
  - composebles
  - pinia

详细说明

- 将newsApi fethc 代码，合拢到 `/composables/newsapi.ts`
- 使用pinia保存新闻内容，减少newsapi到调用。
- newsapi调用逻辑
  - 查看state 是否包含newsapi 数据 && 是否过期（30分钟）
  - if 数据 == undefined || 超时，调用api

## Setup and Development Server

Make sure to install the dependencies:

```bash
# npm
npm install pinia @pinia/nuxt
npm i pinia -f
npm install

# start 
npm run dev
```

Start the development server on `http://localhost:3000`

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 资源

- [pinia](https://pinia.vuejs.org/)
- [tailwind css blog templte](https://github.com/merakiui/blog-page-example/)
- [vuejs-newsapireader](https://github.com/webnoobcodes/vuejs-newsapireader)
- [nuxt-3-server-api](https://github.com/BayBreezy/nuxt-3-server-api/blob/main/composables/bookStore.ts)