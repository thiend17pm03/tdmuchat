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

  // config admin email account
  MAIL_USER : 'thiend17pm03@gmail.com',
  MAIL_PASSWORD : '11012000',
  MAIL_HOST : 'smtp.gmail.com',
  MAIL_PORT : '587',

  //config facebook login app
  FB_APP_ID :'776098003021595' ,
  FB_APP_SECRET : '552ccbaf1ceb2498dd8835348ac52d2a',
  FB_CALLBACK_URL : 'https://localhost:8000/auth/facebook/callback' ,

  //config google login app
  GG_APP_ID :'366226866454-32lllr6v7pli3c01rip3mv8ef23jkgj0.apps.googleusercontent.com' ,
  GG_APP_SECRET : '_4z-cj5Pv14QNT7rUgOz-8UZ',
  GG_CALLBACK_URL : 'https://localhost:8000/auth/google/callback' ,

}


module.exports = env 

