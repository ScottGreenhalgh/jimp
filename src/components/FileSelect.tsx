"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageComponent() {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFile(e.target.files[0])
  }

  useEffect(() => {

    if (!file) return;

    console.log("Sending image to worker:", file);
    const worker = new Worker(
      new URL("@/workers/jimp.worker.ts", import.meta.url),
      { type: "module" }
    );
    
    const suffix = file.name.slice(file.name.lastIndexOf("."));


    file.arrayBuffer().then((imageBuffer) => {
      try {
        worker.postMessage({
            image: imageBuffer,
            options: { blur: 8 },
            suffix: suffix,
          });
      }
      catch (err) {
        console.error("Error fetching the image:", err);
        setIsLoading(false);
      }
    });

    worker.addEventListener("message", (e) => {
      console.log("Message received from worker:", e.data);
      setOutput(e.data.base64);
      setIsLoading(false);
    });

    return () => {
      worker.terminate();
    };
  }, [file]);

  return (
    <>
      <input type="file" accept="image/*" onChange={handleChange}/>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Image src={output} alt="Shrek" height={500} width={500} />
        )}
      </div>
    </>

  );
}
