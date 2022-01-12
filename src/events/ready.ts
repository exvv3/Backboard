import { Event } from "../structures/Event";
import board from "../index";

export default new Event("ready", () => {
  console.log("Dribbbling...");
  board.user.setStatus("dnd");
});
