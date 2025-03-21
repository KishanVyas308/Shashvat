import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../loadingAnimationLottie.json"; // Replace with the path to your Lottie JSON file

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-black opacity-20"></div>
      <div className="fixed inset-0 flex z-50 items-center justify-center">
        <Lottie
          animationData={loadingAnimation}
          style={{ width: 200, height: 200 }}
        />
      </div>
    </>
  );
};

export default Loading;
