import React, { useState } from "react";
import { useData } from "./useData";
import uuid from "react-native-uuid";

export const useGenerate = () => {
  const [images, setImages] = useState<
    { url: string; prompt: string; fav: boolean }[]
  >([]);
  const [prompt, setPrompt] = useState("");
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const { addImages } = useData();

  const generate = async (
    text: string,
    setModalVisible: null | React.Dispatch<React.SetStateAction<boolean>>,
    modalVisible: boolean | null
  ) => {
    console.log(text, "text");
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
        const newImage = {
          id: uuid.v4(),
          url: imageUrl,
          prompt: text || prompt,
          fav: false,
        };
        setWord(text);
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

  return { loading, images, prompt, generate, setPrompt, word };
};
