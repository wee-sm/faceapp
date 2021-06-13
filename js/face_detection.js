async function faceDetection_init(file) {
    // if(typeof faceapi == 'undefined'){
        const MODEL_URL = './js/face-api/models';
        // await import('./face-api/face-api.min.js');
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    // } 
    return faceDetection_start(file);
}

async function faceDetection_start(file) {
    // remove previous canvas
    if ($('#img_result > canvas')[0]) {
        $('#img_result')[0].removeChild($('#img_result > canvas')[0]);
    }
    // create new canvas
    var image = await faceapi.bufferToImage(file);
    var canvas = faceapi.createCanvasFromMedia(image);
    $('#img_result')[0].appendChild(canvas);
    // draw and set canvas
    const displaySize = { width: image.width, height: image.height };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks();
    const resizedDetections = faceapi.resizeResults(detections[0], displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);

    return faceCropper(image, detections[0]);
}

async function faceCropper(detected_image, detected_data) {
    var croppedimage = document.createElement('canvas');
    var ratio = 2;
    croppedimage.width = detected_data.alignedRect.box.height * ratio;
    croppedimage.height = detected_data.alignedRect.box.width * ratio;
    croppedimage
        .getContext('2d')
        .drawImage(
            detected_image,
            detected_data.alignedRect.box.x,
            detected_data.alignedRect.box.y,
            detected_data.alignedRect.box.height,
            detected_data.alignedRect.box.width,
            0,
            0,
            detected_data.alignedRect.box.height * ratio,
            detected_data.alignedRect.box.width * ratio
        );
    return croppedimage.toDataURL();
}