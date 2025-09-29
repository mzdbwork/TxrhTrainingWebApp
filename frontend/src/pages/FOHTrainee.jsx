import { useState } from "react";
import "./FOHTrainee.css";

// Import images dynamically
import hostDay1 from "../assets/training_agendas/hostAgenda.jpg";

// Add other positions similarly

const FOHTrainee = () => {
  const positions = [
    { name: "Host", days: 4 },
    { name: "SA", days: 3 },
    { name: "Server", days: 4 },
    { name: "Bartender", days: 4 },
    // Add others
  ];

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // Map position & day to image
  const trainingImages = {
    Host: {
      1: hostDay1,
    },
    // Add other positions
  };

  return (
    <div className="foh-container">
      <h1>FOH Trainee Training</h1>

      {/* Step 1: Select Position */}
      {!selectedPosition && (
        <div className="position-cards">
          {positions.map((pos) => (
            <div
              key={pos.name}
              className="position-card"
              onClick={() => setSelectedPosition(pos)}
            >
              <h2>{pos.name}</h2>
              <p>{pos.days} Days of Training</p>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Select Day */}
      {selectedPosition && !selectedDay && (
        <div className="day-selector">
          <h2>Select a Day for {selectedPosition.name}</h2>
          <div className="day-cards">
            {Array.from({ length: selectedPosition.days }, (_, i) => i + 1).map(
              (day) => (
                <div
                  key={day}
                  className="day-card"
                  onClick={() => setSelectedDay(day)}
                >
                  Day {day}
                </div>
              )
            )}
          </div>
          <button onClick={() => setSelectedPosition(null)}>Back to Positions</button>
        </div>
      )}

      {/* Step 3: Show Training Agenda Image */}
      {selectedPosition && selectedDay && (
        <div className="agenda">
          <h2>
            {selectedPosition.name} - Day {selectedDay} Training
          </h2>
          <img
            src={trainingImages[selectedPosition.name][selectedDay]}
            alt={`${selectedPosition.name} Day ${selectedDay}`}
            className="agenda-image"
          />
          <div>
            <button onClick={() => setSelectedDay(null)}>Back to Days</button>
            <button onClick={() => setSelectedPosition(null)}>Back to Positions</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FOHTrainee;
