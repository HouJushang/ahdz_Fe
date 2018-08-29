var baseUrl;
var baseHost;
var uploadUrl;
if(process.env.NODE_ENV == 'development'){
  baseUrl = 'http://localhost:3002/';
  baseHost = "http://localhost:3002";
  uploadUrl = "http://upload.anhuiec.com";
}
if(process.env.NODE_ENV == 'production'){
  baseUrl = 'http://www.anhuiec.com/';
  baseHost = "http://www.anhuiec.com";
  // uploadUrl = "http://upload.anhuiec.com";
  uploadUrl = "http://upload.anhuiec.com";
}
export {
  baseUrl,
  baseHost,
  uploadUrl
}
