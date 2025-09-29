import { useState } from "react";
import "./FOHTrainer.css";

// Import images for each position
import seaterImg from "../assets/training_agendas/hostAgenda.jpg";
import coordinatorImg from "../assets/training_agendas/coordAgenda.jpg";
import saImg from "../assets/training_agendas/saAgenda.jpg";
import toGoImg from "../assets/training_agendas/togoAgenda.jpg";
import serverImg from "../assets/training_agendas/serverAgenda.jpg";
import bartenderImg from "../assets/training_agendas/barAgenda.jpg";

const FOHTrainer = () => {
  const positions = [
    "Seater/Names",
    "Coordinator",
    "SA",
    "ToGo",
    "Server",
    "Bartender",
  ];

  const [selectedPosition, setSelectedPosition] = useState(null);

  // Map position to image
  const trainingImages = {
    "Seater/Names": seaterImg,
    Coordinator: coordinatorImg,
    SA: saImg,
    ToGo: toGoImg,
    Server: serverImg,
    Bartender: bartenderImg,
  };

  return (
    <div className="foh-trainer-container">
      <h1>FOH Trainer Training</h1>

      {/* Step 1: Select Position */}
      {!selectedPosition && (
        <div className="position-cards">
          {positions.map((pos) => (
            <div
              key={pos}
              className="position-card"
              onClick={() => setSelectedPosition(pos)}
            >
              <h2>{pos}</h2>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Show Training Agenda */}
      {selectedPosition && (
        <div className="agenda">
          <h2>{selectedPosition} Training</h2>
          <img
            src={trainingImages[selectedPosition]}
            alt={`${selectedPosition} Training`}
            className="agenda-image"
          />
          <div className="agenda-buttons">
            <button onClick={() => setSelectedPosition(null)}>Back to Positions</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FOHTrainer;
