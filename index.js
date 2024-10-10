// Import the 'http' module 
const http = require('http'); 
var random = require('./random.js');

// Import the 'fs' module (File System) 
const fs = require('fs'); 
// Define the file path 
const filePath = './sample.txt'; 

// fs.
fs.readFile(filePath, 'utf8', (err, data) => { 
  if (err) { 
  console.error('Error reading the file:', err); 
  return; 
  } 
  // Output the file content to the console 
  console.log('File content:'); 
  console.log(data); 
  });
  

// Define the hostname and port 
const hostname = '127.0.0.1'; 
const port = 3000; 
// Create the server 
const server = http.createServer((req, res) => { 
// Set the response HTTP header with HTTP status and content type 
res.statusCode = 200; 
res.setHeader('Content-Type', 'text/plain'); 
// Send the response body 
res.end(`${random.getRandom()}`); 

}); 
// Make the server listen on the specified port and hostname 
server.listen(port, hostname, () => { 
console.log(`Server running at http://${hostname}:${port}/`); 
});
