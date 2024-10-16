"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import style from "@/styles/this.module.css";

export default function ProductionImageComponent() {
  const [output, setOutput] = useState<string>(""); // Store image data
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null); // Store the uploaded file
  const [originalImageBuffer, setOriginalImageBuffer] =
    useState<ArrayBuffer | null>(null); // Store original image buffer

  // Handle file input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFile(e.target.files[0]); // Set file from input
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

      worker.addEventListener("message", (e) => {
        if (e.data.base64) {
          setOutput(e.data.base64); // Update output with base64 image
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

      worker.addEventListener("message", (e) => {
        if (e.data.base64) {
          setOutput(e.data.base64); // Update output with base64 image
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
    <div>
      <input
        type="file"
        accept=".JPG, .PNG, .JPEG, .BMP, .TIFF, .GIF"
        onChange={handleChange}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Image
            src={output || URL.createObjectURL(file!)}
            alt="Edited Image"
            height={500}
            width={500}
          />

          <div style={{ marginTop: "10px" }}>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ resize: { w: 100 } })}
            >
              Resize
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ blur: 20 })}
            >
              Blur
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ invert: true })}
            >
              Invert
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ opacity: 0.1 })}
            >
              Opacity
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ pixelate: 20 })}
            >
              Pixelate
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ sepia: true })}
            >
              Sepia
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ posterize: 5 })}
            >
              Posterize
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ quantize: { colors: 2 } })}
            >
              Quantize (2)
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ quantize: { colors: 4 } })}
            >
              Quantize (4)
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ fisheye: true })}
            >
              Fisheye
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ normalize: true })}
            >
              Normalize
            </button>
            <button
              className={style["button"]}
              onClick={() =>
                applyEffect({ flip: { horizontal: true, vertical: true } })
              }
            >
              Flip
            </button>
            <button
              className={style["button"]}
              onClick={() =>
                applyEffect({ crop: { h: 200, w: 200, x: 100, y: 100 } })
              }
            >
              Crop
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ rotate: { deg: 130, mode: false } })}
            >
              Rotate
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ fade: 0.9 })}
            >
              Fade
            </button>
            <button
              className={style["button"]}
              onClick={() => applyEffect({ brightness: 2 })}
            >
              Brightness
            </button>

            {/* Reset Button */}
            <button className={style["button-reset"]} onClick={resetImage}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
