### Home Page

Read the uploaded image, process it using a web worker, and display it in your Next.js component with the changes. Numerous buttons avaliable for real time reading.

### /Poke Page

Read an uploaded image, use form inputs to select preset assets from /public to apply to the image. The image is proccessed using the base64buffer to bind the added effects to the image.

### Other routes

- (/matt/hosted-inpit) - showcases the features on page load without web workers.
- (/matt/upload) - showcases image uploads with a blur effect applied by default through the web worker
- (/scott) - showcases the initial webworker integration with a blur effect on a single image
- (/scott2) - showcases the web worker with numerous real time buttons appling an effect to a single image.

The worker is like an extra set of hands for your browser. When you give it an image to work on, it performs operations like blurring, resizing, and more without slowing down your main webpage. It runs in the background, making sure your page stays responsive.

### Base64buffer

imageBuffer is a Buffer. This type represents a sequence of bytes and is commonly used for handling binary data, such as images or files, in Node.js. When you pass this Buffer to the web worker or use it in any image processing operations, it retains its binary format, which Jimp can handle perfectly.

When you have some binary data that you want to ship across a network, you generally don't do it by just streaming the bits and bytes over the wire in a raw format. Why? because some media are made for streaming text. You never know -- some protocols may interpret your binary data as control characters (like a modem), or your binary data could be screwed up because the underlying protocol might think that you've entered a special character combination (like how FTP translates line endings).

### Typescript

Jimp does have some native Typescript support, however it isn't as good as other node modules. These can therefore be modified manuall through `jimp.d.ts` where the expected types are defined.

### Notable Functions

- .read() - reads the image from URL

- .getBase64() - needed to encode the image when given by the client (via upload) or to the worker.

- .write() writes the changes back to the image

### Image manipulation Functions

Some functions require parameters to opereate, other do not. Here are some of the most notable and how we used them.

- .resize({w:100});
- .blur(20);
- .invert();
- .opacity(0.3);
- .pixelate(20)
- .sepia();
- .posterize(5);
- .print({font:image8font, x:100, y:200, text:"omg sloth!"});
- .quantize({colors: 2})
- .quantize({colors: 4})
- .fisheye();
- .normalize();
- .flip({horizontal:true, vertical:true});
- .crop({h:200, w:200, x:100, y:100});
- .rotate({deg:130, mode:false});
- .fade(0.6);
- .brightness(2);

### Connecting the webworker

```ts
const worker = new Worker(
  new URL("@/workers/jimp.worker.ts", import.meta.url),
  {
    type: "module",
  }
);
```

### Supported base64params:

```ts
let base64param:
  | "image/bmp"
  | "image/tiff"
  | "image/x-ms-bmp"
  | "image/gif"
  | "image/jpeg"
  | "image/png" = "image/png";
```
