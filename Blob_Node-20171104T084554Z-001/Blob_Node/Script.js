var blobfile;
var  album=document.getElementById("album");
var blobService = AzureStorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=azurestoragedemo1;AccountKey=gq3VO/QNmt3ns0HmdxdBYeFuqjc74UkEw4MU+6puLvzxpR04aj3J+A3koS/7+RmyDqltn4FjQmCEwCNZGr4naw==;EndpointSuffix=core.windows.net");
var url="https://azurestoragedemo1.blob.core.windows.net/images/";
function fileEvent() {
console.log(event);
    blobfile = event.target.files[0];
}
function upload() {

    blobService.createBlockBlobFromBrowserFile('images', blobfile.name, blobfile, function (error, result, response) {

        if (error) {
            alert("Upload failed");
        } else {
            alert("upload success");
            getAllBlobs();
        }
    });
}

function getAllBlobs(){
    blobService.listBlobsSegmented("images",null,(err,result)=>{
        
        if(err)
        console.log(err);
        if(result)
        console.log(result);
        album.innerHTML="";
        result.entries.forEach(function(element) {
            var ImgUrl = blobService.getUrl("images",element.name);
            var ImageTag = `<img src=${ImgUrl} height=100 width=150 style="border:1px solid gray; margin:10px">`;
            
            album.innerHTML+=ImageTag;
        });

        })

        
}
document.body.onload=getAllBlobs();




