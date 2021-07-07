$(document).ready(async function () {
    const uploader = document.createElement('input');
    uploader.type = 'file';
    uploader.accept = 'image/jpeg';
    uploader.onchange = async function (evt) {
        var file = evt.target.files[0],
            reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onload = function () {
            $('#imageSrc')[0].src = reader.result;
        };
    };
    $('#img_result')[0].onclick = function () {
        uploader.click();
    };
});

$('#imageSrc')[0].onload = async function () {
    let src = cv.imread('imageSrc');
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.imshow('canvasOutput', gray);

    let faces = new cv.RectVector();
    let faceCascade = new cv.CascadeClassifier();

    // load pre-trained classifiers
    faceCascade.load('haarcascade_frontalface_default.xml');
    // detect faces
    let msize = new cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);

    var mainFaceArea = 0;
    var mainFacePoint1, mainFacePoint2;
    for (let i = 0; i < faces.size(); ++i) {
        let roiGray = gray.roi(faces.get(i));
        let roiSrc = src.roi(faces.get(i));
        let faces_x = faces.get(i).x;
        let faces_y = faces.get(i).y;
        let faces_w = faces.get(i).width;
        let faces_h = faces.get(i).height;
        let faces_area = faces_w * faces_h;

        if (faces_area > mainFaceArea) {
            mainFaceArea = faces_area;
            mainFacePoint1 = new cv.Point(faces_x, faces_y);
            mainFacePoint2 = new cv.Point(faces_x + faces_w, faces_y + faces_h);
        }
        roiGray.delete();
        roiSrc.delete();
    }

    cv.rectangle(src, mainFacePoint1, mainFacePoint2, [255, 0, 0, 255]);
    cv.imshow('canvasOutput', src);

    src.delete();
    gray.delete();
    faceCascade.delete();
    faces.delete();

    // analyze image
    let face = faceCropper(this, mainFacePoint1, mainFacePoint2);
    if (face) {
        var predictImage = new Image();
        predictImage.setAttribute('src', face);
        await faceAnalyzation_predict(predictImage);
    }
};

function faceCropper(image, point1, point2) {
    var croppedimage = document.createElement('canvas');
    croppedimage.width = 150;
    croppedimage.height = 150;
    croppedimage
        .getContext('2d')
        .drawImage(
            image,
            point1.x,
            point1.y,
            point2.x - point1.x,
            point2.y - point1.y,
            0,
            0,
            croppedimage.height,
            croppedimage.width
        );
    return croppedimage.toDataURL();
}


function onOpenCvReady() {
    let eyeCascadeFile = 'haarcascade_eye.xml';
    createFileFromUrl(eyeCascadeFile, eyeCascadeFile, () => {
        let faceCascadeFile = 'haarcascade_frontalface_default.xml';
        createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
            document.getElementById('analysis_container').hidden = false;
            document.getElementById('loading_container').hidden = true;
            console.log('successed to load OpenCv datas.');
        });
    });
}

var createFileFromUrl = function (path, url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function (ev) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let data = new Uint8Array(request.response);
                cv.FS_createDataFile('/', path, data, true, false, false);
                callback();
            } else {
                self.printError('Failed to load ' + url + ' status: ' + request.status);
            }
        }
    };
    request.send();
};