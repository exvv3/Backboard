require("dotenv").config();
import { Board } from "./structures/Client";

const board = new Board();
export default board;

board.start();