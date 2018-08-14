var baseUrl;
var baseHost;
var uploadUrl;
if(process.env.NODE_ENV == 'development'){
  baseUrl = 'http://localhost:3002/';
  baseHost = "http://localhost:3002";
  uploadUrl = "http://pdg7xfgd6.bkt.clouddn.com";
}
if(process.env.NODE_ENV == 'production'){
  baseUrl = '/';
  baseHost = "";
  uploadUrl = "http://pdg7xfgd6.bkt.clouddn.com";
}
export {
  baseUrl,
  baseHost,
  uploadUrl
}
