import React, { useState, useEffect } from "react";
import axios from "./util/axiosInstance";

function Diff() {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    axios
      .post("/sdapi/v1/txt2img", {
        prompt: "LETTERING CAKE, RED, CREAM_CHEESE, CIRCLE, VANILLA",
        steps: 20,
        sampler_index: "Euler a",
      })
      .then((res) => {
        const imageData = res.data.images[0];
        const imageUrl = `data:image/png;base64,${imageData}`;
        setImageSrc(imageUrl);
      });
  }, []);
  return (
    <div>
      <h1>Diff</h1>
      {imageSrc && <img src={imageSrc} alt="Generated" />}
    </div>
  );
}

export default Diff;
