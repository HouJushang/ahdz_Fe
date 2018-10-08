var baseUrl;
var baseHost;
var uploadUrl;
var homeUrl;
if(process.env.NODE_ENV == 'development'){
  baseUrl = 'http://localhost:3005/';
  baseHost = "http://localhost:3005";
  uploadUrl = "http://upload.anhuiec.com";
  homeUrl = "http://localhost:3005/";
}
if(process.env.NODE_ENV == 'production'){
  baseUrl = '/';
  baseHost = "";
  uploadUrl = "http://upload.anhuiec.com";
  homeUrl = "http://www.anhuiec.com/";

}
export {
  baseUrl,
  baseHost,
  uploadUrl,
  homeUrl
}
