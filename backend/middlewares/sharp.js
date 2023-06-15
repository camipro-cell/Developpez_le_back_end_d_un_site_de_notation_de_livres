const sharp = require('sharp');
const fs = require('fs');

module.exports = async (req, res, next) => {
	if (!req.file) {
    return next()
};
  try {
		// Creating file name + path for compressed version
		req.file.compressedFilename = req.file.filename.replace(/\.[^.]+$/, '') + '.webp';
		req.file.compressedFilePath = req.file.path.replace(/\.[^.]+$/, '') + '.webp';
		await sharp(req.file.path)
		.resize(500, 500)
		.webp(90)
		.toFile(req.file.compressedFilePath, (err, data) => {
			if(err !== null && err !== undefined) {
				// If there is an error during the process, we will just use the original image
				console.log("Something wrent wrong during image compression : " + err);
				console.log("Falling back on original file");
				req.file.compressedFilename = req.file.filename;
				req.file.compressedFilePath = req.file.path;
			}
			else {
				// If the compression succeedd, we just delete the original image
				fs.unlink(req.file.path, (error) => {
					if(error) console.log(error);
				});
			}
		});
		next();
    console.log("Image compression completed successfully");
	} catch(error) {
		res.status(403).json({ error });
	}
};