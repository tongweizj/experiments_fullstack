// Load the module dependencies
const config = require('./config/index'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  cors = require('cors');

module.exports = function () {
  const app = express();

  if (config.isDevelopment) {
    app.use(morgan('dev'));
    console.log('🛠️  开发模式：已开启详细日志');
  }

  if (config.isProduction) {
    app.use(compress());
    console.log('🚀 生产模式：已开启 Gzip 压缩');
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json()); //use middleware that only parses json
  app.use(cookieParser());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(
    cors({
      origin: 'http://localhost:3000', // Update to your Vite app's origin
      credentials: true, // Allow credentials (cookies) to be sent
    })
  );
  //
  app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  //handle the use of PUT or DELETE methods
  //override with POST having ?_method=DELETE or
  // ?_method=PUT
  app.use(methodOverride('_method'));
  //saveUninitialized - orces a session that is "uninitialized" to be saved to the store
  //resave - forces the session to be saved back to the session store
  // Configure the 'session' middleware
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.SESSION_SECRET,
    })
  );
  //Configure Express to use EJS module as the default template engine
  // Set the application view engine and 'views' folder
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  //bootstrap the app using the controller and routing modules
  // Load the routing files
  const routes = require('./routes/index.js');
  app.use('/api', routes);

  //The express.static() middleware takes one argument
  //to determine the location of the static folder
  //Configure static file serving
  app.use(express.static('./public'));
  return app;
};
