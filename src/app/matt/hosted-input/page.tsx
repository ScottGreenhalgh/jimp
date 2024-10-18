import { Jimp, loadFont} from "jimp";
import Image from "next/image";

export default async function MattHostedInputPage() {

  // basic resize
  const image1 = await Jimp.read("./public/sloth.png");
  image1.resize({w:100});
  await image1.write("./public/sloth-small.png");

  // blur
  const image2 = await Jimp.read("./public/sloth.png");
  image2.blur(20);
  await image2.write("./public/sloth-blur.png");

  // invert
  const image3 = await Jimp.read("./public/sloth.png");
  image3.invert();
  await image3.write("./public/sloth-invert.png");

  // opacity
  const image4 = await Jimp.read("./public/sloth.png");
  image4.opacity(0.3);
  await image4.write("./public/sloth-opacity.png");

  // pixelate
  const image5 = await Jimp.read("./public/sloth.png");
  image5.pixelate(20)
  await image5.write("./public/sloth-pixelate.png");

  const image6 = await Jimp.read("./public/sloth.png");
  image6.sepia();
  await image6.write("./public/sloth-sepia.png");

  const image7 = await Jimp.read("./public/sloth.png");
  image7.posterize(5);
  await image7.write("./public/sloth-posterize.png");

  const image8 = await Jimp.read("./public/sloth.png");
  const image8font = await loadFont('public/fonts/NotoSans.fnt');
  image8.print({font:image8font, x:100, y:200, text:"omg sloth!"});
  await image8.write("./public/sloth-text.png");

  const image9 = await Jimp.read("./public/sloth.png");
  image9.quantize({colors: 2})
  await image9.write("./public/sloth-quantize.png");

  const image10 = await Jimp.read("./public/sloth.png");
  image10.quantize({colors: 4})
  await image10.write("./public/sloth-quantize4.png");

  const image11 = await Jimp.read("./public/sloth.png");
  image11.fisheye();
  await image11.write("./public/sloth-fisheye.png");

  const image12 = await Jimp.read("./public/sloth.png");
  image12.normalize();
  await image12.write("./public/sloth-normalize.png");

  const image13 = await Jimp.read("./public/sloth.png");
  image13.flip({horizontal:true, vertical:true});
  await image13.write("./public/sloth-flip.png");

  const image14 = await Jimp.read("./public/sloth.png");
  image14.crop({h:200, w:200, x:100, y:100});
  await image14.write("./public/sloth-crop.png");

  const image15 = await Jimp.read("./public/sloth.png");
  image15.rotate({deg:130, mode:false});
  await image15.write("./public/sloth-rotate.png");

  const image16 = await Jimp.read("./public/sloth.png");
  image16.fade(0.6);
  await image16.write("./public/sloth-fade.png");

  const image17 = await Jimp.read("./public/sloth.png");
  image17.brightness(2);
  await image17.write("./public/sloth-brightness.png");

  return (
    <div className="bg-gradient-to-tr from-indigo-500 to-rose-400 h-full">
      <div className="flex flex-wrap gap-4 items-center justify-center text-center font-bold text-3xl p-4">
        
        <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
          <p className="pb-4">
            Input
          </p>
          <Image
            src="/sloth.png"
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
            src="/sloth-small.png"
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
            src="/sloth-blur.png"
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
            src="/sloth-invert.png"
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
            src="/sloth-opacity.png"
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
            src="/sloth-pixelate.png"
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
            src="/sloth-sepia.png"
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
            src="/sloth-posterize.png"
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
            src="/sloth-text.png"
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
            src="/sloth-quantize.png"
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
            src="/sloth-quantize4.png"
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
            src="/sloth-fisheye.png"
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
            src="/sloth-normalize.png"
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
            src="/sloth-flip.png"
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
            src="/sloth-crop.png"
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
            src="/sloth-rotate.png"
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
            src="/sloth-fade.png"
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
            src="/sloth-brightness.png"
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