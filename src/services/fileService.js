const path = require("path");

const uploadSingleFile = async (req) => {
  let image;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return "";
  }

  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  image = req.files.image;
  // console.log(req.files.image);
  uploadPath = path.resolve(__dirname + "/../public/images/upload");

  //get image extension
  let extName = path.extname(image.name);

  //get image's name without extension
  let baseName = path.basename(image.name, extName);

  //create final path
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  // Use the mv() method to place the file somewhere on your server
  try {
    await image.mv(finalPath);
    return [{ status: "Success", pathFile: finalPath, nameFile: finalName }];
  } catch (error) {
    return error;
  }
};

const uploadMultipleFile = async (req) => {
  const image = req.files.image;
  let resultMultiFile;
  let listPathFile = [];

  uploadPath = path.resolve(__dirname + "/../public/images/upload");

  const listFile = image.map(async (file) => {
    let extName = path.extname(file.name);

    //get image's name without extension
    let baseName = path.basename(file.name, extName);

    //create final path
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;
    listPathFile.push({ pathFile: finalPath, nameFile: finalName });
    return await file.mv(finalPath);
  });

  await Promise.allSettled(listFile)
    .then((result) => {
      resultMultiFile = result;
    })
    .catch((error) => {
      resultMultiFile = error;
    });
  const fileReturn = resultMultiFile.filter((result, index) => {
    if (result.status === "fulfilled") {
      return listPathFile[index];
    } else return;
  });
  return fileReturn;
};

module.exports = { uploadSingleFile, uploadMultipleFile };
