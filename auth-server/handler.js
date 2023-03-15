const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://andrew0t.github.io/meet/"],
  javascript_origins: ["https://andrew0t.github.io", "http://127.0.0.1:8080",
     "http://192.168.0.92:8080", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    
    const code = decodeURIComponent(`${event.pathParameters.code}`);
  
    return new Promise((resolve, reject) => {
  
      oAuth2Client.getToken(code, (error, token) => {
        if (error) {
          return reject(error);
        }
        return resolve(token);
      });
    })
      .then((token)=> {
        
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(token),
        };
      })
      .catch((error)=> {
        console.error(error);
        return {
          statusCode: 500,
          body: JSON.stringify(error),
        };
      });
  };
  
  module.exports.getCalendarEvents = async (event) => {
  
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    
    oAuth2Client.setCredentials({access_token});
  
    return new Promise((resolve, reject) => {
      
      calendar.events.list(
        {
          calendarId: calendar_id,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    })
      .then((results) => {
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({ events: results.data.items })
        };
      })
      .catch((error)=> {
        console.error(error);
        return {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          statusCode: 500,
          body: JSON.stringify(error),
        };
      });
  };
  