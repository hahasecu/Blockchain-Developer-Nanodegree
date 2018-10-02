// Require file system access
fs = require('fs');

// // Read file buffer
imgReadBuffer = fs.readFileSync('test-pattern.jpg');


// // Encode image buffer to hex
imgHexEncode = new Buffer(imgReadBuffer).toString('hex');

// // Output encoded data to console
// console.log(imgHexEncode);

// // Decode
let imgHexDecode = new Buffer(imgHexEncode, 'hex')

// // Save decoded file file system
fs.writeFileSync('decodeHexImage.jpg', imgHexDecode);