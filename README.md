# Wamigen

A Web App Manifest Icon Generator using [Cloudinary](https://cloudinary.com/) and [Node.js](https://nodejs.org).


Create a `wamigen-sample.js` file with the following contents, and replace your Cloudinary configuration parameters. 

```javascript
const wamigen = require("./wamigen.js");

wamigen({
    cloud_name: 'sample', 
    api_key: '874837483274837', 
    api_secret: 'a676b67565c6767a6767d6767f676fe1' 
});
```

Run

```
node wamigen-sample source-image
```

where `source-image` is the name (without extension) of the source PNG image from the source subdirectory (`source\source-image.png`).