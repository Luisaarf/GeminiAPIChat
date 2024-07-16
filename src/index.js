import React from "react"; //importa o React do pacote react
import ReactDOM from "react-dom/client"; //importa o ReactDOM do pacote react-dom
import "normalize.css"; //tira o estilo padrão do navegador
import GameScene from "./GameScene"; //importa o componente GameScene do arquivo GameScene.js

//cria um elemento root e renderiza o componente Chat dentro dele
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameScene />
  </React.StrictMode>
);
