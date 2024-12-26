import React, { useState } from "react";
import { useData } from "./useData";

export const useGenerate = () => {
  const [images, setImages] = useState<{ url: string; prompt: string }[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { addImages } = useData();

  const generate = async (
    text: string,
    setModalVisible: null | React.Dispatch<React.SetStateAction<boolean>>,
    modalVisible: boolean | null
  ) => {
    setLoading(true);
    fetch(`https://image.pollinations.ai/prompt/${text}`)
      .then((res) => {
        if (res.ok) {
          return res.url;
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((imageUrl) => {
        const newImage = { id: Date.now(), url: imageUrl, prompt };
        setImages((prevImages) => [...prevImages, newImage]);
        addImages("addImages", [newImage]);
        setPrompt("");
        if (setModalVisible) {
          setModalVisible(!modalVisible);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, images, prompt, generate, setPrompt };
};
