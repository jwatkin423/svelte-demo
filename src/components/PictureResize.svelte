<script>

  const resizeStep = (img, width, height, quality) => {
    const result = new Promise(function(resolve, reject) {
      quality = quality || 1.0;

      const canvas  = document.createElement( 'canvas' );
      const context = getContext(canvas);
      const type = "image/png";

      let cW = img.naturalWidth;
      let cH = img.naturalHeight;

      const dst = new Image();
      let tmp = null;

      function stepDown () {
        cW = Math.max(cW / 2, width) | 0;
        cH = Math.max(cH / 2, height) | 0;

        canvas.width  = cW;
        canvas.height = cH;

        context.drawImage(tmp || img, 0, 0, cW, cH);

        dst.src = canvas.toDataURL(type, quality);

        if (cW <= width || cH <= height) {
          return resolve(dst);
        }

        if (!tmp) {
          tmp = new Image();
          tmp.onload = stepDown;
        }

        tmp.src = dst.src;
      }

      if (cW <= width || cH <= height || cW / 2 < width || cH / 2 < height) {
        canvas.width  = width;
        canvas.height = height;
        context.drawImage(img, 0, 0, width, height);
        dst.src = canvas.toDataURL(type, quality);

        resolve(dst);
      } else {
        stepDown();
      }
    });

    return result;
  };

  const getContext = (canvas) => {
    const context = canvas.getContext('2d');

    context.imageSmoothingEnabled       = true;
    context.mozImageSmoothingEnabled    = true;
    context.oImageSmoothingEnabled      = true;
    context.webkitImageSmoothingEnabled = true;

    return context
  };

  let src = '';

  //  this works
  new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = 'img/buzr.png';
  })
  .then((img) => {
    return resizeStep(img, 202, 65);
  })
  .then((resizeImg) => {
    src = resizeImg.src;
  });

  //  this needs more conversions
  fetch('img/buzr.png')
  .then((res) => {
    return res.blob();
  })
  .then((blob) => {
    const a = new Image();
    const reader = new FileReader();
    reader.onloadend = (fileLoadedEvent) => {
      //src = fileLoadedEvent.target.result;
      console.log(src);
    };
    //reader.readAsDataURL(blob);
  });

</script>

<img src="{src}">