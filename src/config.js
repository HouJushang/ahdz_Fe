var baseUrl
var baseHost
if(process.env.NODE_ENV == 'development'){
  baseUrl = 'http://localhost:3002/';
  baseHost = "http://localhost:3002";
}
if(process.env.NODE_ENV == 'production'){
  baseUrl = '/';
  baseHost = "";
}
export {
  baseUrl,
  baseHost
}
