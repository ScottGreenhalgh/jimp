import { Jimp, loadFont} from "jimp";
import Image from "next/image";



export default async function MattPage() {

  // basic resize
  const image1 = await Jimp.read("./public/sloth.jpg");
  image1.resize({w:100});
  await image1.write("./public/sloth-small.jpg");

  // blur
  const image2 = await Jimp.read("./public/sloth.jpg");
  image2.blur(20);
  await image2.write("./public/sloth-blur.jpg");

  // invert
  const image3 = await Jimp.read("./public/sloth.jpg");
  image3.invert();
  await image3.write("./public/sloth-invert.jpg");

  // opacity
  const image4 = await Jimp.read("./public/sloth.jpg");
  image4.opacity(0.1);
  await image4.write("./public/sloth-opacity.jpg");

  // pixelate
  const image5 = await Jimp.read("./public/sloth.jpg");
  image5.pixelate(20)
  await image5.write("./public/sloth-pixelate.jpg");

  const image6 = await Jimp.read("./public/sloth.jpg");
  image6.sepia();
  await image6.write("./public/sloth-sepia.jpg");

  const image7 = await Jimp.read("./public/sloth.jpg");
  image7.posterize(5);
  await image7.write("./public/sloth-posterize.jpg");

  const image8 = await Jimp.read("./public/sloth.jpg");
  const image8font = await loadFont('public/fonts/NotoSans.fnt');
  image8.print({font:image8font, x:100, y:200, text:"omg sloth!"});
  await image8.write("./public/sloth-text.jpg");

  const image9 = await Jimp.read("./public/sloth.jpg");
  image9.quantize({colors: 2})
  await image9.write("./public/sloth-quantize.jpg");

  const image10 = await Jimp.read("./public/sloth.jpg");
  image10.quantize({colors: 4})
  await image10.write("./public/sloth-quantize4.jpg");

  const image11 = await Jimp.read("./public/sloth.jpg");
  image11.fisheye();
  await image11.write("./public/sloth-fisheye.jpg");

  const image12 = await Jimp.read("./public/sloth.jpg");
  image12.normalize();
  await image12.write("./public/sloth-normalize.jpg");

  const image13 = await Jimp.read("./public/sloth.jpg");
  image13.flip({horizontal:true, vertical:true});
  await image13.write("./public/sloth-flip.jpg");

  const image14 = await Jimp.read("./public/sloth.jpg");
  image14.crop({h:200, w:200, x:100, y:100});
  await image14.write("./public/sloth-crop.jpg");

  const image15 = await Jimp.read("./public/sloth.jpg");
  image15.rotate({deg:130, mode:false});
  await image15.write("./public/sloth-rotate.jpg");

  const image16 = await Jimp.read("./public/sloth.jpg");
  image16.fade(0.9);
  await image16.write("./public/sloth-fade.jpg");

  const image17 = await Jimp.read("./public/sloth.jpg");
  image17.brightness(2);
  await image17.write("./public/sloth-brightness.jpg");

  return (
    <div className="bg-gradient-to-tr from-indigo-500 to-rose-400 w-full h-full">
      <div className="flex flex-wrap gap-4 items-center text-center font-bold text-xl p-4">
        
        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Input
          </p>
          <Image
            src="/sloth.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Resize
          </p>
          <Image
            src="/sloth-small.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Blur
          </p>
          <Image
            src="/sloth-blur.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Invert
          </p>
          <Image
            src="/sloth-invert.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Opacity
          </p>
          <Image
            src="/sloth-opacity.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Pixelate
          </p>
          <Image
            src="/sloth-pixelate.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>
        
        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Sepia
          </p>
          <Image
            src="/sloth-sepia.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Posterize
          </p>
          <Image
            src="/sloth-posterize.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Text
          </p>
          <Image
            src="/sloth-text.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Quantize (2)
          </p>
          <Image
            src="/sloth-quantize.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Quantize (4)
          </p>
          <Image
            src="/sloth-quantize4.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Fisheye
          </p>
          <Image
            src="/sloth-fisheye.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Normalize
          </p>
          <Image
            src="/sloth-normalize.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Flip
          </p>
          <Image
            src="/sloth-flip.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Crop
          </p>
          <Image
            src="/sloth-crop.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Rotate
          </p>
          <Image
            src="/sloth-rotate.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Fade
          </p>
          <Image
            src="/sloth-fade.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>

        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Brightness
          </p>
          <Image
            src="/sloth-brightness.jpg"
            width={256}
            height={256}
            alt=""
            className="rounded-full"
          />
        </div>


      </div>
    </div>
    
  )
}