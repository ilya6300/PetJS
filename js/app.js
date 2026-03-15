import { initPet } from "./init.pet.js";
// import { createControls } from "./controls.js";
import Pet from "./service/state/pet.js";
import { viewControl } from "./contols.js";

const render = async () => {
  // Создаём PIXI канвас и добавляем его тело документа
  const app = new PIXI.Application();
  await app.init({
    background: "#f7f7f700", // Прозрачный
    resizeTo: window,
  });
  document.body.appendChild(app.canvas);

  // Инициализируем питомца
  const pet = await initPet();
  console.log(pet);

  // Добавляем компонент контроля
  // const controls = createControls(pet); // для controls_pixi_pld
  // Добавляем питомца в приложение
  app.stage.addChild(pet.view);
  // app.stage.addChild(pet.view, controls.view); // для controls_pixi_pld
  // 2. Делаем питомца кнопкой для открытия меню
  pet.view.eventMode = "static";
  pet.view.cursor = "pointer";

  // Создаём контейнер с меню
  const createController = viewControl(pet);

  pet.view.on("pointerdown", () => {
    // Для controls через js
    createController.classList.remove("hidden");
    createController.style.left = `${pet.view.x - 155}px`;
    // Переключаем видимость меню
    // controls.view.visible = true; // для controls_pixi_pld
    // Можно привязать меню к координатам питомца
    // controls.view.x = pet.view.x - 125; // для controls_pixi_pld
  });

  // Запускаем игровой цикл
  app.ticker.add((ticker) => {
    // Вызываем метод обновления у нашего питомца
    // ticker.deltaTime — это тот самый коэффициент разницы времени
    pet.update(ticker.deltaTime);
  });
};

render();
