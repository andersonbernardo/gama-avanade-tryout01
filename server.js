var http = require("http");
var fs = require("fs");
var path = require("path")

function startServer(port) {
	var serverObj = http.createServer(function(request, response) {
		if (request.url == '/')
			resourcePath = "public/index.html"
		else 
			resourcePath = "public" + request.url
		fs.readFile(resourcePath, function(err, data){
			if (err) 
				response.writeHead(404, err);
			else {
				var contentType = getContentType(resourcePath)
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
				response.end();
			}
		});
	}).listen(port);
	return serverObj;
}

const contentTypeMap = { html: "text/html", css: "text/css", jpg: "image/jpg", js: "application/javascript" }
function getContentType(resourcePath) {
	var ext = path.extname(resourcePath).replace('.', '')
	return contentTypeMap[ext]
}

exports.startServer = startServer

var port;
process.argv.forEach(function (val, index, array) {
  if (index == 2 && Number(val)) 
  	port = val
});
if (port) startServer(port)