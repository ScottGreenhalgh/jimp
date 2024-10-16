"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import style from "@/styles/this.module.css";

export default function ImageComponent({ imageUrl }: { imageUrl: string }) {
  const [output, setOutput] = useState<string>(""); // Store image data
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [originalImageBuffer, setOriginalImageBuffer] =
    useState<ArrayBuffer | null>(null); // Store original image buffer
  const suffix = imageUrl.slice(imageUrl.lastIndexOf(".")); // File extension

  // Fetch and store the original image buffer
  useEffect(() => {
    const worker = new Worker(
      new URL("@/workers/jimp.worker.ts", import.meta.url),
      {
        type: "module",
      }
    );

    fetch(imageUrl)
      .then((res) => res.arrayBuffer()) // Fetch the image and convert to buffer
      .then((buffer) => {
        setOriginalImageBuffer(buffer); // Store the original image buffer
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching the image:", err);
        setIsLoading(false);
      });

    worker.addEventListener("message", (e) => {
      if (e.data.base64) {
        setOutput(e.data.base64); // Update the output image
        setIsLoading(false);
      }
    });

    return () => {
      worker.terminate();
    };
  }, [imageUrl]);

  // Function to send image effects to the worker
  const applyEffect = (options: object) => {
    if (originalImageBuffer) {
      setIsLoading(true); // Start loading
      const worker = new Worker(
        new URL("@/workers/jimp.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );

      worker.postMessage({
        image: originalImageBuffer, // Send original image buffer to worker
        options, // Send effect options
        suffix, // File extension
      });

      worker.addEventListener("message", (e) => {
        if (e.data.base64) {
          setOutput(e.data.base64); // Update the output image
          setIsLoading(false); // Stop loading
        }
      });

      worker.addEventListener("error", (err) => {
        console.error("Worker error:", err);
        setIsLoading(false);
      });
    }
  };

  // Reset function to reload the page
  const resetImage = () => {
    window.location.reload(); // Reload page to reset state
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Image
            src={output || imageUrl}
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
