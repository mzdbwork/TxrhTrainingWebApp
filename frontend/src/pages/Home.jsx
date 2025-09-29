import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ userType }) => {
  // Cards for trainee
  const cardsForTrainee = [
    { title: "New Roadie Material", desc: "View New Roadie Training Materials.", link: "/foh-trainee" },
    { title: "Validations", desc: "Done with Training? Validate!", link: "/validations" },
    { title: "Learning Live", desc: "Access Learning Live resources.", link: "/learningLive" },
    { title: "Practice Test", desc: "Try a practice test", link: "/practice-test" },
    { title: "Closing Checklist", desc: "Access Closing Checklist.", link: "/closing-list" },
  ];

  // Cards for trainer
  const cardsForTrainer = [
    { title: "Trainee Materials", desc: "View New Roadie Training Materials.", link: "/foh-trainee" },
    { title: "Your Materials", desc: "View your On The Job Training Materials.", link: "/foh-trainer" },
    { title: "Validations", desc: "Done with Training? Validate!", link: "/validations" },
    { title: "Learning Live", desc: "Access Learning Live resources.", link: "/learningLive" },
    { title: "Practice Test", desc: "Try a practice test", link: "/practice-test" },
    { title: "ZAAKH", desc: "Trainer Lettering Program!", link: "/zaakh" },
    { title: "Closing Checklist", desc: "Access Closing Checklist.", link: "/closing-list" },
  ];

  // Cards for manager
  const cardsForManager = [
    { title: "Validations", desc: "Approve trainee validations.", link: "/manager-validations" },
    { title: "ZAAKH", desc: "Trainer Lettering Program!", link: "/zaakh" },
    { title: "Trainee Materials", desc: "View New Roadie Training Materials.", link: "/foh-trainee" },
    { title: "Trainer Materials", desc: "View On The Job Training Materials.", link: "/foh-trainer" },
    { title: "Learning Live", desc: "Access Learning Live resources.", link: "/learningLive" },
    { title: "Closing Checklist", desc: "Access Closing Checklist.", link: "/closing-list" },
  ];

  // Select cards based on userType
  let cards = [];
  if (userType === "manager") {
    cards = cardsForManager;
  } else if (userType === "trainer") {
    cards = cardsForTrainer;
  } else {
    cards = cardsForTrainee; // default fallback
  }

  // Optional: capitalize userType for welcome
  const capitalizedUserType = userType.charAt(0).toUpperCase() + userType.slice(1);

  return (
    <div className="home-container">
      <h1>Welcome, {capitalizedUserType}</h1>
      <div className="cards">
        {cards.map((card) => (
          <Link key={card.link} to={card.link} className="card-link">
            <div className="card">
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
