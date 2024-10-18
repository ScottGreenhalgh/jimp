"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import style from "@/styles/this.module.css";
import "@/styles/root.css";
import { DotLoader } from "react-spinners";

export default function ProductionImageComponent() {
  const [output, setOutput] = useState<string>(""); // Store image data
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null); // Store the uploaded file
  const [originalImageBuffer, setOriginalImageBuffer] =
    useState<ArrayBuffer | null>(null); // Store original image buffer

  // Handle file input change
  function handleChange(e1: React.ChangeEvent<HTMLInputElement>) {
    if (!e1.target.files) return;
    setFile(e1.target.files[0]); // Set file from input
  }

  // Fetch and store the original image buffer on file upload
  useEffect(() => {
    if (!file) return;

    const worker = new Worker(
      new URL("@/workers/jimp.worker.ts", import.meta.url),
      {
        type: "module",
      }
    );

    const suffix = file.name.slice(file.name.lastIndexOf(".")); // Get file extension

    file.arrayBuffer().then((imageBuffer) => {
      setOriginalImageBuffer(imageBuffer); // Store original image buffer

      worker.postMessage({
        image: imageBuffer, // Send original image buffer to worker
        options: { blur: 0 }, // Default effect for demo purposes
        suffix: suffix, // File extension
      });

      worker.addEventListener("message", (e2) => {
        if (e2.data.base64) {
          setOutput(e2.data.base64); // Update output with base64 image
          setIsLoading(false); // Stop loading
        }
      });

      worker.addEventListener("error", (err) => {
        console.error("Worker error:", err);
        setIsLoading(false);
      });
    });

    return () => {
      worker.terminate();
    };
  }, [file]);

  // Function to apply effects to the image using the worker
  const applyEffect = (options: object) => {
    if (originalImageBuffer) {
      setIsLoading(true); // Start loading
      const worker = new Worker(
        new URL("@/workers/jimp.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );

      const suffix = file!.name.slice(file!.name.lastIndexOf(".")); // File extension

      worker.postMessage({
        image: originalImageBuffer, // Use original image buffer
        options: options, // Apply selected effect
        suffix: suffix, // Pass file extension
      });

      worker.addEventListener("message", (e3) => {
        if (e3.data.base64) {
          setOutput(e3.data.base64); // Update output with base64 image
          setIsLoading(false); // Stop loading
        }
      });

      worker.addEventListener("error", (err) => {
        console.error("Worker error:", err);
        setIsLoading(false);
      });
    }
  };

  // Reset function to reload the page and reset state
  const resetImage = () => {
    window.location.reload(); // Reload page to reset everything
  };

  return (
    <div className="w-full h-svh flex items-center justify-evenly">
      <div className="flex flex-col gap-8 w-2/5 text-black text-2xl rounded-3xl bg-slate-700 bg-opacity-40 px-12 py-10">
        <input
          type="file"
          accept=".JPG, .PNG, .JPEG, .BMP, .TIFF, .GIF"
          className="w-2/3 self-center"
          onChange={handleChange}
        />
        <div className="flex gap-4 flex-wrap justify-start items-start">
          <button
            className=""
            onClick={() => applyEffect({ resize: { w: 100 } })}
          >
            Resize
          </button>
          <button className="" onClick={() => applyEffect({ blur: 20 })}>
            Blur
          </button>
          <button className="" onClick={() => applyEffect({ invert: true })}>
            Invert
          </button>
          <button className="" onClick={() => applyEffect({ opacity: 0.1 })}>
            Opacity
          </button>
          <button className="" onClick={() => applyEffect({ pixelate: 20 })}>
            Pixelate
          </button>
          <button className="" onClick={() => applyEffect({ sepia: true })}>
            Sepia
          </button>
          <button className="" onClick={() => applyEffect({ posterize: 5 })}>
            Posterize
          </button>
          <button
            className=""
            onClick={() => applyEffect({ quantize: { colors: 2 } })}
          >
            Quantize (2)
          </button>
          <button
            className=""
            onClick={() => applyEffect({ quantize: { colors: 4 } })}
          >
            Quantize (4)
          </button>
          <button className="" onClick={() => applyEffect({ fisheye: true })}>
            Fisheye
          </button>
          <button className="" onClick={() => applyEffect({ normalize: true })}>
            Normalize
          </button>
          <button
            className=""
            onClick={() =>
              applyEffect({ flip: { horizontal: true, vertical: true } })
            }
          >
            Flip
          </button>
          <button
            className=""
            onClick={() =>
              applyEffect({ crop: { h: 200, w: 200, x: 100, y: 100 } })
            }
          >
            Crop
          </button>
          <button
            className=""
            onClick={() => applyEffect({ rotate: { deg: 130, mode: false } })}
          >
            Rotate
          </button>
          <button className="" onClick={() => applyEffect({ fade: 0.9 })}>
            Fade
          </button>
          <button className="" onClick={() => applyEffect({ brightness: 2 })}>
            Brightness
          </button>

          {/* Reset Button */}
          <button
            className="!bg-red-500 hover:!bg-red-600"
            onClick={resetImage}
          >
            Reset
          </button>
        </div>
      </div>
      {file && (
        <div className="flex justify-center items-center w-2/5 rounded-3xl bg-slate-700 bg-opacity-40 px-12 py-10">
          {isLoading ? (
            <div>
              <p className="text-4xl mb-20 font-medium text-zinc-100">
                Loading
              </p>
              <DotLoader size={100} color={"#2f2e2e"} />
            </div>
          ) : (
            <div>
              <Image
                src={output || URL.createObjectURL(file!)}
                alt="Edited Image"
                height={650}
                width={650}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
