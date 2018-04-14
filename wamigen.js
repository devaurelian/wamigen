/* eslint-disable require-jsdoc */

const cloudinary = require("cloudinary").v2;
const download = require("image-downloader");

async function downloadIMG(url, dest) {
    try {
        const { filename, image } = await download.image({ url: url, dest: dest });
        console.log(`${url}\n===> ${filename}\n`); // => /path/to/dest/image.jpg 
    } catch (error) {
        throw error;
    }
}


const sizes = [16, 48, 64, 72, 96, 128, 144, 152, 180, 192, 256, 512];


function getFileName(base, size, optim) {
    return `./output${optim ? "-optim" : ""}/${base}-${size}.png`;
}


function generateImages(publicId, imageSlug) {
    // For each icon size
    sizes.forEach(size => {

        // Generate the resized, not optimized image
        let url = cloudinary.url(publicId, { width: size });
        downloadIMG(url, getFileName(imageSlug, size, false));

        // Generate the resized and optimized image
        url = cloudinary.url(publicId, { width: size, quality: "auto" });
        downloadIMG(url, getFileName(imageSlug, size, true));
    });
}

module.exports = function (cloudinaryConfig) {
    cloudinary.config(cloudinaryConfig);

    if (process.argv.length <= 2) {
        console.log("Please specify a source image path");
        return;
    }

    const srcImageSlug = process.argv[2];

    cloudinary.uploader.upload(`source\\${srcImageSlug}.png`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(result);
        generateImages(result.public_id, srcImageSlug);
    });
};
