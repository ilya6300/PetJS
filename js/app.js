import { initPet } from "./init.pet.js";
import { createControls } from "./controls.js";
import Pet from "./service/state/pet.js";

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
  const controls = createControls(pet);
  // Добавляем питомца в приложение
  app.stage.addChild(pet.view, controls.view);

  // Запускаем игровой цикл
  app.ticker.add((ticker) => {
    // Вызываем метод обновления у нашего питомца
    // ticker.deltaTime — это тот самый коэффициент разницы времени
    pet.update(ticker.deltaTime);
  });
};

render();
