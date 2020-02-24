<script>
  export let url = '';
  export let width = 0;
  export let height = 0;
  
  const scale = (img, maxW, maxH) => {
    const original = {w: img.width, h: img.height};

    if (original.w > maxW || original.h > maxH) {
      if (original.h > original.w) {
        if (original.h > maxH) {
          const res = fixedHeight(original, maxH);
          if (res.w > maxW) {
            return fixedWidth(res, maxW);
          } else {
            return res;
          }
        }
        if (original.w > maxW) {
          return fixedWidth(original, maxW);
        } else {
          return original;
        }
      }
      else {
        if (original.w > maxW) {
          const res = fixedWidth(original, maxW);
          if (res.h > maxH) {
            return fixedHeight(res, maxH);
          } else {
            return res;
          }
        }
        if (original.h > maxH) {
          return fixedHeight(original, maxH);
        } else {
          return original;
        }
      }
    } else {
      //  scale up
      const ratioW = maxW / original.w;
      const ratioH = maxH / original.h;
      const ratio = (ratioH > ratioW) ? ratioW : ratioH;
      return {w: original.w * ratio, h: original.h * ratio};
    }
  };
  const fixedWidth = (dim, max) => {
    return {w: max, h: dim.h / dim.w * max};
  };
  const fixedHeight = (dim, max) => {
    return {w: dim.w / dim.h * max, h: max};
  };

  const resizeStep = (img, width, height, quality) => {
    return new Promise(function(resolve, reject) {
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
        context.drawImage(tmp || img, 0, 0, cW, cH, 0,0);
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
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      resolve(img);
    };
    img.src = url;
  })
  .then((img) => {
    let dim = scale(img, width, height);
    return resizeStep(img, dim.w, dim.h);
  })
  .then((resizeImg) => {
    src = resizeImg.src;
  });

</script>

<style>
  .logo-image {
      margin-left: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
  }
</style>


<img class="logo-image" src="{src}" alt="logo">

