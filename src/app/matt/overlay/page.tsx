import { Jimp } from "jimp";
import Image from "next/image";

export default async function MattHostedInputPage() {

  // basic resize
  const blank = new Jimp ({width: 600, height: 855, color: 0x00000000});
  const overlay = await Jimp.read("./public/overlay/poke-colorless.png");
  const input = await Jimp.read("./public/sloth.jpg");
  // todo: figure out aspect ratio of image and set appropriate w/h and x/y. (center on the longer, set the shorter axis to width: 500 or h: 360 depending on which is shorter).
  const resizedInput = input.resize({w:500, h:360});
  const background = blank.composite(resizedInput, 50, 90);
  const output = background.composite(overlay, 0, 0);
  await output.write("./public/poke-overlay.jpg");

  return (
    <div className="bg-gradient-to-tr from-indigo-500 to-rose-400 w-full h-full">
      <div className="flex flex-wrap gap-4 items-center text-center font-bold text-xl p-4">
        
        <div className="bg-slate-700 bg-opacity-40 p-5 rounded-2xl">
          <p className="pb-4">
            Output
          </p>
          <Image
            src={"/poke-overlay.jpg"}
            width={600}
            height={855}
            alt=""
            className="w-[600px] h-[855px]"
          />
        </div>

      </div>
    </div>
    
  )
}