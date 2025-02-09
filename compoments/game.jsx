import { useState, useEffect } from "react";

const Game = () => {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const heartColor = "#FF0000"; // Only red hearts

  useEffect(() => {
    if (!gameStarted) return;
    
    const generateHeart = () => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(),
          x: Math.random() * 90 + "%", // Random X position
          y: "-10%", // Start slightly above screen
          color: Math.random() < 0.7 ? heartColor : "black", // 70% hearts, 30% bombs
          size: Math.random() * 30 + 70 + "px" // 70% bigger
        },
      ]);
    };
    const heartSpawnInterval = setInterval(generateHeart, 1000);
    return () => clearInterval(heartSpawnInterval);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;
    
    const fallInterval = setInterval(() => {
      setHearts((prevHearts) =>
        prevHearts
          .map((heart) => ({
            ...heart,
            y: parseFloat(heart.y) + 2 + "%", // Move hearts down
          }))
          .filter((heart) => parseFloat(heart.y) < 100) // Remove hearts that reach the bottom
      );
    }, 100);
    return () => clearInterval(fallInterval);
  }, [gameStarted]);

  const collectHeart = (id, color) => {
    if (color === heartColor) { // Only collect red hearts
      setScore(score + 1);
    } else {
      setScore(0); // Clicking a bomb resets the score to zero
    }
    setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== id));
    
    if (score + 1 >= 5) {
      setGameOver(true);
    }
  };

  const handleYesClick = () => {
    setShowMessage(true);
  };

  const handleNoClick = () => {
    setYesScale(yesScale * 1.25);
  };

  return (
    <div className="relative w-full h-screen bg-red-100 flex flex-col items-center justify-center overflow-hidden p-4">
      {!gameStarted ? (
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold text-pink-600">Welcome to the Heart Hunter Game! </h2>
          <p className="text-lg mt-4">Click only the red hearts ❤️ to collect love, but avoid the bombs (🖤) or your score resets!</p>
          <button
            className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg text-xl font-bold shadow-md hover:bg-green-600"
            onClick={() => setGameStarted(true)}
          >Start Game</button>
        </div>
      ) : !gameOver ? (
        <>
          <h2 className="text-xl md:text-2xl font-bold text-pink-600 text-center">Score: {score}</h2>
          <div className="relative w-full h-full">
            {hearts.map((heart) => (
              <div
                key={heart.id}
                className="absolute cursor-pointer transition-transform duration-300 rounded-lg flex items-center justify-center"
                style={{
                  top: heart.y,
                  left: heart.x,
                  width: "75px", // Bigger hitbox
                  height: "75px",
                  backgroundColor: heart.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => collectHeart(heart.id, heart.color)}
              >
                <span className="text-2xl" style={{ fontFamily: 'pixel', color: "white" }}>
                  {heart.color === "#FF0000" ? "❤" : "🖤"}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-10 p-4 flex flex-col items-center">
          {!showMessage ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-pink-600">You’ve captured my heart! 💘</h2>
              <p className="text-lg md:text-xl mt-4">Will you be my Valentine? 🥰</p>
              <div className="mt-6 flex gap-4">
                <button 
                  className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg md:text-xl font-bold shadow-md transition-transform duration-300"
                  onClick={handleYesClick}
                  style={{ transform: `scale(${yesScale})` }}
                >Yes 💖</button>
                <button 
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg text-lg md:text-xl font-bold shadow-md transition-transform duration-300"
                  onClick={handleNoClick}
                >No 😆</button>
              </div>
            </>
          ) : (
            <h2 className="text-3xl font-bold text-pink-600 mt-6">Yay! Can’t wait for our date! 💕</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Game; 
