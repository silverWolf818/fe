    window.onload = function(){
var box1 = document.getElementById('box1');
    var file1= document.getElementById('file1');
    var box2= document.getElementById('box2');
    var file2= document.getElementById('file2');
     window.URL = window.URL || window.webkitURL;
    file1.onchange = function(){
        var files = file1.files,img = new Image();
        if(document.getElementById('photo1')){
                document.getElementById('photo1').parentNode.removeChild(document.getElementById('photo1'));
            }
             if(window.URL){
                img.src = window.URL.createObjectURL(files[0]);
                img.id = 'photo1';
                img.onload = function(e) {
                    window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                     box1.appendChild(img);
                }
           }
   }
   file2.onchange = function(){
         var files = file2.files,img = new Image();
        if(document.getElementById('photo2')){
                document.getElementById('photo2').parentNode.removeChild(document.getElementById('photo2'));
            }
             if(window.URL){
                img.src = window.URL.createObjectURL(files[0]);
                img.id = 'photo2';
                img.onload = function(e) {
                    window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                     box2.appendChild(img);
                }
           }
   }
}
  /*  function handleFiles(obj) {
            var files = obj.files,box = document.getElementById('box'),
            img = new Image();
            if(document.getElementById('photo')){
                document.getElementById('photo').parentNode.removeChild(document.getElementById('photo'));

            }
            if(window.URL){
                img.src = window.URL.createObjectURL(files[0]);
                img.id = 'photo';
                img.onload = function(e) {
                    window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                     fileList.appendChild(img);
                }

            }
    }*/