const env = {
  // config database enviroment variable
  DB_CONNECTION : 'mongodb',
  DB_HOST : 'localhost',
  DB_PORT : '27017',
  DB_NAME : 'tmdu_chat',
  DB_USERNAME : '',
  DB_PASSWORD : '',

  // config APP enviroment variable
  APP_HOST : 'localhost',
  APP_PORT : '8000',

  // Config session key & secret
  SESSION_KEY : "express.sid",
  SESSION_SECRET : "mySecret",

  // config admin email account
  MAIL_USER : 'thiend17pm03@gmail.com',
  MAIL_PASSWORD : '',
  MAIL_HOST : 'smtp.gmail.com',
  MAIL_PORT : '587',

  //config facebook login app
  FB_APP_ID :'' ,
  FB_APP_SECRET : '',
  FB_CALLBACK_URL : 'https://localhost:8000/auth/facebook/callback' ,

  //config google login app
  GG_APP_ID :'' ,
  GG_APP_SECRET : '',
  GG_CALLBACK_URL : 'https://localhost:8000/auth/google/callback' ,

}


module.exports = env 

