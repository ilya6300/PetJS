import { createBtnHome, main } from "../contols.js";
import { createElement } from "../service/components/elements.js";
import { utilitysContainer } from "./list.utility.js";

export const visibleNotes = () => {
  main.classList.add("hidden");
  createBtnHome.classList.remove("hidden");
  notesContainer.classList.remove("hidden");
  utilitysContainer.classList.add("hidden");
};

export const notesContainer = createElement("div", "mainAndHeader__ hidden");


