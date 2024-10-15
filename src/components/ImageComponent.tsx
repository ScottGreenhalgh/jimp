"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageComponent({ imageUrl }: { imageUrl: string }) {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Sending imageUrl to worker:", imageUrl);
    const worker = new Worker(
      new URL("@/workers/jimp.worker.ts", import.meta.url),
      { type: "module" }
    );

    const suffix = imageUrl.slice(imageUrl.lastIndexOf("."));

    fetch(imageUrl) // Fetch the image via its URL
      .then((res) => res.arrayBuffer()) // Convert response to array buffer
      .then((buffer) => {
        worker.postMessage({
          image: buffer,
          options: { blur: 8 },
          suffix: suffix,
        });
      })
      .catch((err) => {
        console.error("Error fetching the image:", err);
        setIsLoading(false);
      });

    worker.addEventListener("message", (e) => {
      console.log("Message received from worker:", e.data);
      setOutput(e.data.base64);
      setIsLoading(false);
    });

    return () => {
      worker.terminate();
    };
  }, [imageUrl]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Image src={output} alt="Shrek" height={500} width={500} />
      )}
    </div>
  );
}
