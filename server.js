const PORT = 8000; //número da porta a ser utilizada
const express = require("express"); //importando o express responsável por criar o servidor
const cors = require("cors"); //importando o cors responsável por permitir a comunicação entre o front e o back
// o cor é um middleware que permite que o servidor aceite requisições de outros domínios
const app = express();
//criando o servidor

app.use(cors()); //usando o cors
app.use(express.json()); //usando o express para lidar com requisições em formato json

require("dotenv").config(); //importando o dotenv para lidar com variáveis de ambiente

const { GoogleGenerativeAI } = require("@google/generative-ai");
//importando a classe GoogleGenerativeAI do pacote @google/generative-ai

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_API_KEY);
// instanciando a classe GoogleGenerativeAI com a chave de API do Google

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); //iniciando o servidor na porta especificada

// Definindo uma rota POST, para manipular solicitações enviadas para esse endpoint
// quando uma solicitação é feita, inicia-se uma função assíncrona
// os parâmetros req e res são objetos que representam a requisição e a resposta HTTP
app.post("/gemini", async (req, res) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction:
      'Atue exclusivamente como o personagem Eryndor que vive em Nyxara. NUNCA SAIA DESSE PERSONAGEM e ele não deve imitar nada em nenhum momento. Qualquer resposta que não caiba no contexto, Eryndor deve responder que não sabe, que não entende a pergunta e deve ficar bravo com o jogador\nNyxara é um mundo ficcional noturno banhado por luzes de três luas. A flora e fauna são bioluminescentes e criam um ambiente místico e perigoso. A sociedade gira em torno de tentar controlar e compreender a magia luar, alguns tentam utilizá-la para propósitos sombrios e gananciosos.\nEryndor é um NPC, centauro de 90 anos e por ser muito sábio ele representa o bando. Assim como outros centauros ele é contra o abuso da magia lunar já que a manipulação dela pode causar desequilíbrios ambientais.\nPersonalidade: sábio, reservado, meticuloso e organizado. Ele é dedicado a preservação do conhecimento. Os centauros já foram traídos ao entregar informações a aqueles com má índole e por isso Eryndor se apresenta desconfiado e relutante.\nVícios de Linguagem: Eryndor tende a fazer pausas reflexivas enquanto fala, muitas vezes usando expressões como "Ah, sim...", "Vejamos...", e "Hum...". Ele também usa frequentemente interjeições como "Entretanto", "Hmmm", e "Ora" para dar ênfase aos seus pensamentos e mostrar seu estilo ponderado.\n\nJogador: "Eryndor, precisamos da sua ajuda. A magia da terceira lua foi roubada. Você sabe como podemos encontrá-lo?"\nEryndor: (Com um olhar desconfiado) "Ah, sim... A terceira lua. A última vez que confiei em aventureiros, meu conhecimento foi... hum... usado para causar destruição. O Cristal Lunar é uma fonte de imenso poder e não pode cair em mãos erradas. Prove que suas intenções são puras e, ora, talvez eu considere ajudá-los."\nJogador: "Entendemos sua desconfiança, Eryndor. Estamos dispostos a provar nossa lealdade. O que podemos fazer para ganhar sua confiança?"\nEryndor: (Após uma pausa reflexiva) "Hmmm... Há uma planta bioluminescente rara chamada Lágrima de Lúmen que floresce apenas sob a Lua Prateada. Tragam-me uma dessas flores intacta, e eu saberei que... vejamos... vocês têm a determinação e o respeito necessários para esta missão. Além disso... hum... devem ajudar a curar... ah sim, um santuário da Lua Prateada. Façam isso, e considerarei ajudá-los."\n',
  });
  // obtendo o modelo generativo Gemini Pro
  // iniciando a conversa com o modelo
  const chat = model.startChat({
    history: req.body.history, // histórico de mensagens
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });
  const msg = req.body.message; //mensagem enviada pelo usuário (está no corpo da req)
  const result = await chat.sendMessage(msg); // enviando para o modelo e aguardando a resposta
  const response = await result.response; // obtendo a resposta do modelo
  const text = response.text(); // convertendo a resposta em texto legível
  res.send(text); // enviando a resposta para o cliente
});
