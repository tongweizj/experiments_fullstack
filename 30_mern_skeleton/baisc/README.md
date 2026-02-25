# README


## Notes

### 1. create website project

```js
npm create vite@latest client --template react
cd client
npm install
npm run dev 

```


### 2. create backend server project

```js
mkdir server
cd server
npm init
npm i express
npm i nodemon
```

create first file `server.js`
```js
const express = require("express");
const path = require("path");
const app = express();

app.use("/", (req, res) => {
    res.json({
      project: "React and Express Fullstack project.",
      from: "MaxTong",
    });
  });
app.get("/api/v1", (req, res) => {
  res.json({
    project: "React and Express Fullstack project.",
    from: "MaxTong",
  });
});

const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
```


### Update Package.json

```json
{
  "scripts": {
    "dev": "nodemon server"
  }
}
```

### 3. create dispatcher


```js
npm init
npm i concurrently
```

### Update Package.json

```json
{
  "scripts": {
    "dev": "concurrently 'npm --prefix client run dev' \"npm --prefix server run dev\"",
  },
}
```