import "./GameScene.css";
import Chat from "./Chat"; //importa o componente Chat do arquivo Chat.js
import { useState, useEffect } from "react";

const GameScene = () => {
  const [player, setPlayer] = useState(<div></div>);
  //   const [moveValue, setMoveValue] = useState(0);

  useEffect(() => {
    setPlayer(document.querySelector("#player"));
    const handleKeyDown = (event) => {
      PlayerMove(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player]);

  function PlayerMove(key) {
    if (!player) return;
    const currentTop = parseInt(player.style.top.replace("px", "") || 0, 10);
    const currentLeft = parseInt(player.style.left.replace("px", "") || 0, 10);

    console.log("currentTop", currentTop);
    console.log("currentLeft", currentLeft);

    switch (key) {
      case "ArrowUp":
        player.style.top = `${currentTop - 10}px`;
        console.log("up");
        break;
      case "ArrowDown":
        player.style.top = `${currentTop + 10}px`;
        console.log("down");
        break;
      case "ArrowLeft":
        player.style.left = `${currentLeft - 10}px`;
        console.log("left");
        break;
      case "ArrowRight":
        player.style.left = `${currentLeft + 10}px`;
        console.log("right");
        break;
    }
  }

  return (
    <div id="background">
      <div id="player"></div>
      <div id="npc"></div>
      <Chat />
    </div>
  );
};
export default GameScene;
