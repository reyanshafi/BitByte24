import Keyjumble from "./assets/images/Keyjumble.jpg";
import Debate from "./assets/images/Debate.jpg";
import Webdev from "./assets/images/Webdev.jpg";
import Gaming from "./assets/images/Gaming.jpg";
import Quiz from "./assets/images/Quiz.jpg";
import Iot from "./assets/images/Iot.jpg";
import Problemsol from "./assets/images/Problemsol.jpg";
import Typing from "./assets/images/Typing.jpg";
import Wordfind from "./assets/images/Wordfind.jpg";

const eventInfo = [
  {
    name: "Keyboard Jumble",
    discription:
      "A duo challenge where each team is given 1 minute to arrange scrambled keys on a keyboard. The event features two levels, testing participant's speed, accuracy, and teamwork under pressure.",
    coverImage: Keyjumble,
    teamSize: "1",
  },
  {
    name: "Find the Keyword",
    discription:
      "A solo game where participants guess keywords based on provided hints. This fun and fast-paced game will challenge your problem-solving and critical thinking skills.",
    coverImage: Wordfind,
    teamSize: "1",
  },
  {
    name: "Mini Hackathon",
    discription:
      "Participants in duo, will have to design and develop a website based on a given problem statement. Showcase your creativity and web development skills in this high-energy hackathon!",
    coverImage: Webdev,
    teamSize: "2",
  },
  {
    name: "Build 1.0 (IoT Challenge)",
    discription:
      "Participants will receive IoT kits containing sensors and equipment, and will be tasked with building a solution based on the given problem statement. Let your innovation shine in this hardware-based event!",
    coverImage: Iot,
    teamSize: "2",
  },
  {
    name: "Gaming (4v4)",
    discription:
      "Form your squad and compete in two action-packed games: Valorant and PUBG. Prepare for a thrilling competition of strategy, skill, and teamwork.",
    coverImage: Gaming,
    teamSize: "4",
  },
  {
    name: "Debate",
    discription:
      "Teams of four will battle it out in this classic debate format with the opponent team, arguing either in favor or against a topic. Bring your best arguments and persuasive skills to the table!",
    coverImage: Debate,
    teamSize: "2",
  },
  {
    name: "Quiz (Buzzer Round)",
    discription:
      "A fast-paced duo quiz competition where teams race to press the buzzer and answer questions correctly. Test your knowledge and quick thinking in this exciting quiz show format.",
    coverImage: Quiz,
    teamSize: "3",
  },
  {
    name: "Problem Solving",
    discription:
      "This solo event challenges participants to solve coding problems within a set time limit. Bring your programming expertise and see if you can rise to the top!",
    coverImage: Problemsol,
    teamSize: "2",
  },
  {
    name: "Typing Competition",
    discription:
      "A two-level solo event where participants are evaluated on their typing speed and accuracy. Speed up those fingers and aim for the top spot!",
    coverImage: Typing,
    teamSize: "1",
  },
];

export default eventInfo;
