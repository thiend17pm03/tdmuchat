const {AkismetClient } = require('akismet-api');
const {app } = require('./../config/app');

const dectectComment = (commentCheck)=>{
  return new Promise(async (resolve, reject) => {
    try {
      let key = app.api_akisment_key;
      let blog = 'http://localhost';
      const client = new AkismetClient({ key, blog });
      let isValid = true;
      isValid = await client.verifyKey();
      if(!isValid)  {
        console.log("Akisment out of Trial ");
        resolve(false); // KEY TRIAL
      }
      const isSpam = await client.checkSpam(commentCheck)
      resolve(isSpam);
    
    }
    catch(err) {
      console.error('AKisment error: ', err.message)
      reject(err);
    }
  });
}


module.exports = {
  dectectComment : dectectComment,
}