"use client";

import {
  HorizontalAlign,
  Jimp,
  loadFont,
  VerticalAlign,
  rgbaToInt,
} from "jimp";
import Image from "next/image";
import { useEffect, useState } from "react";
import "@/styles/poke.css";
import { DotLoader } from "react-spinners";

export default function PokeCardCreator() {
  const [output, setOutput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [lengthValue, setLengthValue] = useState("0'1\"");
  const [weightValue, setWeightValue] = useState("0.1");
  const [weightSlider, setWeightSlider] = useState(1);
  const [lengthSlider, setLengthSlider] = useState(1);

  const [formData, setFormData] = useState({
    name: "MissingNo.",
    type: "colorless",
    descType: "",
    flavorText: "",
    hp: "30",
    move1name: "",
    move1dmg: "",
    move2name: "",
    move2dmg: "",
    weakness: "none",
    resistance: "none",
    retreatCost: "",
  });

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  }

  function handleWeightSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setWeightSlider(parseInt(e.target.value));
    const value = parseInt(e.target.value);
    if (value <= 100) {
      setWeightValue((value / 10).toFixed(1));
    } else {
      setWeightValue((value - 92).toString());
    }
  }

  function handleLengthSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setLengthSlider(parseInt(e.target.value));
    const value = parseInt(e.target.value);
    const feet = Math.floor(value / 12);
    const inches = value % 12;
    if (inches === 0) {
      setLengthValue(`${feet}'`);
    } else {
      setLengthValue(`${feet}'${inches}"`);
    }
  }

  function handleDownload(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!output) return;
    const link = document.createElement("a");
    link.href = output;
    link.download = `${formData.name || "pokemon-card"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newFormData = new FormData(e.currentTarget);

    setFormData({
      name: newFormData.get("name") as string,
      type: newFormData.get("type") as string,
      descType: newFormData.get("desc-type") as string,
      flavorText: newFormData.get("flavor-text") as string,
      hp: newFormData.get("hp") as string,
      move1name: newFormData.get("move1name") as string,
      move1dmg: newFormData.get("move1dmg") as string,
      move2name: newFormData.get("move2name") as string,
      move2dmg: newFormData.get("move2dmg") as string,
      weakness: newFormData.get("weakness") as string,
      resistance: newFormData.get("resistance") as string,
      retreatCost: newFormData.get("retreat-cost") as string,
    });
  }

  useEffect(() => {
    // const abortController = new AbortController();

    const renderCardReset = setInterval(() => {
      async function makeCard(inputImage: InstanceType<typeof Jimp>) {
        // if (abortController.signal.aborted) return;

        // add overlay
        const blank = new Jimp({
          width: 726,
          height: 996,
          color: rgbaToInt(0, 0, 0, 0),
        });
        blank.opacity(0);
        const overlay = await Jimp.read(`/poke/${formData.type}.png`);
        const resizedInput = inputImage.resize({ w: 558, h: 390 });
        const background = blank.composite(resizedInput, 82, 122);
        const card = background.composite(overlay, 0, 0);

        // setup
        const gillCb44 = await loadFont("/fonts/gill-cb-44.fnt");
        const gillCb48 = await loadFont("/fonts/gill-cb-48.fnt");
        const gillRp64 = await loadFont("/fonts/gill-rp-64.fnt");
        // const gillRi24 = await loadFont("/fonts/gill-ri-24.fnt");
        // const gillRi22 = await loadFont("/fonts/gill-ri-22.fnt");
        // const gillRbi24 = await loadFont("/fonts/gill-rbi-24.fnt");
        const gillRbi22 = await loadFont("/fonts/gill-rbi-22.fnt");
        const energyType = await Jimp.read(
          `/poke/energy-large-${formData.type}.png`
        );
        const energyColorless = await Jimp.read(`/poke/energy-colorless.png`);
        let weakness;
        if (formData.weakness != "none") {
          weakness = await Jimp.read(
            `/poke/energy-small-${formData.weakness}.png`
          );
        } else {
          weakness = new Jimp({
            width: 1,
            height: 1,
            color: rgbaToInt(0, 0, 0, 0),
          });
        }
        let resistance;
        if (formData.resistance != "none") {
          resistance = await Jimp.read(
            `/poke/energy-small-${formData.resistance}.png`
          );
        } else {
          resistance = new Jimp({
            width: 1,
            height: 1,
            color: rgbaToInt(0, 0, 0, 0),
          });
        }
        const retreat = await Jimp.read(`/poke/energy-small-colorless.png`);

        // name
        card.print({ font: gillCb48, x: 72, y: 60, text: `${formData.name}` });

        // hp
        const hp = await Jimp.read(`/poke/hp-${formData.hp}.png`);
        hp.resize({ w: 118, h: 32 });
        card.composite(hp, 490, 76);

        // desc type, height & weight
        card.print({
          font: gillRbi22,
          x: 100,
          y: 529,
          text: {
            text: `${formData.descType} Pokemon. Length: ${lengthValue}, Weight: ${weightValue} lbs.`,
            alignmentX: HorizontalAlign.CENTER,
          },
          maxWidth: 525,
          maxHeight: 30,
        });

        // flavor text
        card.print({
          font: gillRbi22,
          x: 87,
          y: 877,
          text: {
            text: `${formData.flavorText}`,
            alignmentX: HorizontalAlign.LEFT,
          },
          maxWidth: 590,
          maxHeight: 55,
        });

        // move 1
        card.composite(energyType, 80, 609);
        card.print({
          font: gillCb44,
          x: 114,
          y: 600,
          text: {
            text: `${formData.move1name}`,
            alignmentX: HorizontalAlign.CENTER,
            alignmentY: VerticalAlign.MIDDLE,
          },
          maxWidth: 500,
          maxHeight: 50,
        });
        card.print({
          font: gillRp64,
          x: 570,
          y: 600,
          text: {
            text: `${formData.move1dmg}`,
            alignmentX: HorizontalAlign.CENTER,
            alignmentY: VerticalAlign.MIDDLE,
          },
          maxWidth: 100,
          maxHeight: 50,
        });

        // move 2
        card.composite(energyType, 58, 709);
        card.composite(energyColorless, 108, 709);
        card.print({
          font: gillCb44,
          x: 114,
          y: 700,
          text: {
            text: `${formData.move2name}`,
            alignmentX: HorizontalAlign.CENTER,
            alignmentY: VerticalAlign.MIDDLE,
          },
          maxWidth: 500,
          maxHeight: 50,
        });
        card.print({
          font: gillRp64,
          x: 570,
          y: 700,
          text: {
            text: `${formData.move2dmg}`,
            alignmentX: HorizontalAlign.CENTER,
            alignmentY: VerticalAlign.MIDDLE,
          },
          maxWidth: 100,
          maxHeight: 50,
        });

        // weakness, resistance & retreat cost
        card.composite(weakness, 100, 834);
        card.composite(resistance, 340, 834);
        if (formData.retreatCost === "1") {
          card.composite(retreat, 580, 834);
        } else if (formData.retreatCost === "2") {
          card.composite(retreat, 563, 834);
          card.composite(retreat, 596, 834);
        } else if (formData.retreatCost === "3") {
          card.composite(retreat, 547, 834);
          card.composite(retreat, 580, 834);
          card.composite(retreat, 612, 834);
        }

        // downsize and upsize for resolution matching
        card.resize({ w: 363, h: 498 });
        card.resize({ w: 726, h: 996 });

        // output
        return card;
      }

      async function updateImage() {
        // if (abortController.signal.aborted) return;

        if (!file) {
          const missingo = await Jimp.read("/poke/missingno.png");
          const outputImage = await makeCard(
            missingo as InstanceType<typeof Jimp>
          );
          const base64 = await outputImage.getBase64("image/png");
          setOutput(base64);
        } else {
          const reader = new FileReader();
          reader.onload = async (e) => {
            if (!e.target) return;
            const buffer = e.target.result as ArrayBuffer;
            const inputImage = await Jimp.read(buffer);

            const outputImage = await makeCard(
              inputImage as InstanceType<typeof Jimp>
            );

            const base64 = await outputImage.getBase64("image/png");
            setOutput(base64);
          };
          reader.readAsArrayBuffer(file);
        }
      }

      updateImage();
    }, 1500);

    return () => {
      clearInterval(renderCardReset);
      // abortController.abort();
    };
  }, [formData, file]);

  return (
    <div className="flex gap-0 w-full h-svh justify-evenly items-center">
      <h1 className="handwriting absolute top-7 text-5xl opacity-50 text-zinc-100">
        Pokemon Card Generator
      </h1>
      <form
        onSubmit={handleUpdate}
        onChange={handleUpdate}
        className="flex gap-10 text-black text-2xl rounded-3xl bg-slate-700 bg-opacity-40 px-12 py-10"
      >
        <div className="flex flex-col gap-5">
          <div>
            <label className="" htmlFor="image-select">
              Image
            </label>
            <input
              name="image-select"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
          <div className="flex gap-8">
            <div className="">
              <label className="" htmlFor="name">
                Name
              </label>
              <input type="text" name="name" maxLength={12} size={12} />
            </div>
            <div>
              <label className="" htmlFor="hp">
                HP
              </label>
              <select name="hp" id="hp">
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
                <option value="110">110</option>
                <option value="120">120</option>
              </select>
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <label htmlFor="desc-type">Descriptive Type</label>
              <input type="text" name="desc-type" maxLength={10} size={12} />
            </div>
            <div className="">
              <label className="" htmlFor="type">
                Energy Type
              </label>
              <select name="type" id="type">
                <option value="colorless">🕊️ Colorless</option>
                <option value="fire">️‍🔥 Fire</option>
                <option value="water">🌊 Water</option>
                <option value="grass">🌱 Grass</option>
                <option value="lightning">⚡ Lightning</option>
                <option value="psychic">🔮 Psychic</option>
                <option value="fighting">🥊 Fighting</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="length">Length</label>
            <div className="flex gap-4">
              <input
                type="range"
                name="length-feet"
                min="1"
                max="360"
                value={lengthSlider}
                onChange={handleLengthSlider}
                className="w-3/4"
              />
              <span className="font-bold italic mx-auto">{lengthValue}</span>
            </div>
          </div>
          <div>
            <label htmlFor="weight">Weight</label>
            <div className="flex gap-4">
              <input
                type="range"
                name="weight"
                min="1"
                max="592"
                value={weightSlider}
                onChange={handleWeightSlider}
                className="w-3/4"
              />
              <span className="font-bold italic mx-auto">
                {weightValue} lbs
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="flavor-text">Flavor Text</label>
            <textarea name="flavor-text" rows={3} maxLength={120} cols={30} />
          </div>
        </div>

        <div className="flex flex-col gap-5 border-l-zinc-300 border-opacity-40 border-l-2 pl-12">
          <div className="bg-zinc-300 bg-opacity-30 rounded-xl pb-6 pt-4 px-8">
            <label className="italic text-orange-400 w-full text-center">
              ~ First Attack ~
            </label>
            <div className="flex gap-8">
              <div>
                <label className="" htmlFor="move1name">
                  Name
                </label>
                <input type="text" name="move1name" maxLength={12} />
              </div>
              <div>
                <label className="" htmlFor="move1dmg">
                  Dmg
                </label>
                <select name="move1dmg" id="move1dmg">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-zinc-300 bg-opacity-30 rounded-xl pb-6 pt-4 px-8">
            <label className="italic text-rose-400 w-full text-center">
              ~ Second Attack ~
            </label>
            <div className="flex gap-8">
              <div>
                <label className="" htmlFor="move2name">
                  Name
                </label>
                <input type="text" name="move2name" maxLength={12} />
              </div>
              <div>
                <label className="" htmlFor="move2dmg">
                  Dmg
                </label>
                <select name="move2dmg" id="move2dmg">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <label className="" htmlFor="weakness">
                Weakness
              </label>
              <select name="weakness" id="weakness">
                <option value="fire">️‍🔥 Fire</option>
                <option value="water">🌊 Water</option>
                <option value="grass">🌱 Grass</option>
                <option value="lightning">⚡ Lightning</option>
                <option value="psychic">🔮 Psychic</option>
                <option value="fighting">🥊 Fighting</option>
              </select>
            </div>
            <div>
              <label className="" htmlFor="resistance">
                Resistance
              </label>
              <select name="resistance" id="resistance">
                <option value="fire">️‍🔥 Fire</option>
                <option value="water">🌊 Water</option>
                <option value="grass">🌱 Grass</option>
                <option value="lightning">⚡ Lightning</option>
                <option value="psychic">🔮 Psychic</option>
                <option value="fighting">🥊 Fighting</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="retreat-cost">Retreat Cost</label>
            <select
              name="retreat-cost"
              id="retreat-cost"
              className="text-center"
            >
              <option value="0" className="pr-4">
                none
              </option>
              <option value="1" className="">
              ✴️
              </option>
              <option value="2" className="">
              ✴️ ✴️
              </option>
              <option value="3" className="">
              ✴️ ✴️ ✴️
              </option>
            </select>
          </div>
          <button onClick={handleDownload}>Download Card</button>
        </div>
      </form>
      <div className="rounded-3xl bg-slate-700 bg-opacity-40 p-5">
        {!output ? (
          <div className="w-[500px] h-[684px] flex flex-col justify-center items-center">
            <p className="text-4xl mb-20 font-medium text-zinc-100">Loading</p>
            <DotLoader size={100} color={"#2f2e2e"} />
          </div>
        ) : (
          <Image src={output} alt="poke" height={500} width={500} />
        )}
      </div>
    </div>
  );
}
