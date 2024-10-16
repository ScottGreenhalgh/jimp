import { Jimp } from "jimp";

const ctx: Worker = self as unknown as Worker;

ctx.addEventListener("message", async (e: MessageEvent) => {
  console.log("Worker received image data:", e.data);
  const buffer = e.data.image;
  const options = e.data.options;
  const suffix = e.data.suffix;
  let base64param:
    | "image/bmp"
    | "image/tiff"
    | "image/x-ms-bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/png" = "image/png";

  try {
    const image = await Jimp.fromBuffer(buffer); // Read from buffer
    console.log("Image processed by Jimp:", image);

    if (options.resize) {
      image.resize({ w: options.resize.w });
    }
    if (options.blur) {
      image.blur(options.blur);
    }
    if (options.invert) {
      image.invert();
    }
    if (options.opacity) {
      image.opacity(options.opacity);
    }
    if (options.pixelate) {
      image.pixelate(options.pixelate);
    }
    if (options.sepia) {
      image.sepia();
    }
    if (options.quantize) {
      image.quantize({ colors: options.quantize.colors });
    }
    if (options.fisheye) {
      image.fisheye();
    }
    if (options.normalize) {
      image.normalize();
    }
    if (options.flip) {
      image.flip({
        horizontal: options.flip.horizontal,
        vertical: options.flip.vertical,
      });
    }
    if (options.crop) {
      image.crop({
        h: options.crop.h,
        w: options.crop.w,
        x: options.crop.x,
        y: options.crop.y,
      });
    }
    if (options.rotate) {
      image.rotate({ deg: options.rotate.deg, mode: options.rotate.mode });
    }
    if (options.fade) {
      image.fade(options.fade);
    }
    if (options.brightness) {
      image.brightness(options.brightness);
    }

    if (suffix.includes(".png")) {
      base64param = "image/png";
    } else if (suffix.includes(".jpg") || suffix.includes(".jpeg")) {
      base64param = "image/jpeg";
    } else if (suffix.includes(".bmp")) {
      base64param = "image/bmp";
    } else if (suffix.includes(".tiff")) {
      base64param = "image/tiff";
    } else if (suffix.includes(".gif")) {
      base64param = "image/gif";
    } else {
      throw new Error("incorrect file type given");
    }

    ctx.postMessage({ base64: await image.getBase64(base64param) });
  } catch (error) {
    ctx.postMessage({ error: (error as Error).message });
  }
});
