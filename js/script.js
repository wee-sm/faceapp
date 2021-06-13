$(document).ready(async function () {
    const uploader = document.createElement('input');
    uploader.type = 'file';
    uploader.accept = 'image/jpeg';
    $('#img_result')[0].onclick = function () {
        uploader.click();
    };

    uploader.onchange = async function (evt) {
        var file = evt.target.files[0],
            reader = new FileReader();
        reader.onload = function () {
            $('#img_result > img')[0].src = reader.result;
        };
        if (file) {
            // read image
            reader.readAsDataURL(file);
            
            // detect face in image
            // face-api
            var imageURL = await faceDetection_init(file);
            
            // analyze image
            var imageURL = URL.createObjectURL(file);
            await faceAnalyzation_init(imageURL);
        }
    };
});