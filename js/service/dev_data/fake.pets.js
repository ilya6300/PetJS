const huskyStand = new URL(
  "../../../images/pets/husky_1/husky_stand.png",
  import.meta.url,
).href;
const huskySid = new URL(
  "../../../images/pets/husky_1/husky_sid.png",
  import.meta.url,
).href;
const huskyPawn = new URL(
  "../../../images/pets/husky_1/husky_pawn.png",
  import.meta.url,
).href;
const huskyMove1 = new URL(
  "../../../images/pets/husky_1/husky_move_1.png",
  import.meta.url,
).href;
const huskyMove2 = new URL(
  "../../../images/pets/husky_1/husky_move_2.png",
  import.meta.url,
).href;
const huskyLie = new URL(
  "../../../images/pets/husky_1/husky_lie.png",
  import.meta.url,
).href;
const huskySleep = new URL(
  "../../../images/pets/husky_1/husky_sleep.png",
  import.meta.url,
).href;
const huskySleep2 = new URL(
  "../../../images/pets/husky_1/husky_sleep2.png",
  import.meta.url,
).href;
const huskyGame = new URL(
  "../../../images/pets/husky_1/husky_game.png",
  import.meta.url,
).href;

export const fakeApiPets = [
  {
    type: "dog",
    name: "husky",
    id: 0,
    parameters: {
      baseSpeed: 1.5, // Базовая скорость
      stepDistance: 30, // растояние шага
    },
    commands: [
      { name: "Сидеть!", id: 1, successRate: 60, active: true },
      { name: "Дай лапу!", id: 2, successRate: 50, active: true },
      { name: "Лежать!", id: 5, successRate: 40, active: true },
    ],
    data: [
      {
        id: 0,
        default: true, // если true, то это будет спрайтом по умолчанию
        event: "stand", // стоит
        source: huskyStand, // изображение
        permittedEvents: [1, 3, 5, 8], // разрешённые события. Какие анимации по id события могут срабатывать отталкиваясь от текущего события
        // permittedEvents: [3],
        minTime: 2, // 3 Минимальное время выполнения события
        maxTime: 6, // 60 Максимальное время выполнения события
      },
      {
        id: 1,
        default: false,
        event: "sid", // сидит
        source: huskySid,
        permittedEvents: [2, 0, 5],
        minTime: 1, // 3
        maxTime: 1, // 120
      },
      {
        id: 2,
        default: false,
        event: "pawn", // даёт лапу
        source: huskyPawn,
        permittedEvents: [1],
        minTime: 1, // 0.5
        maxTime: 1, // 2
      },
      {
        id: 3,
        default: false,
        event: "move_1", // движение 1 этап
        source: huskyMove1,
        permittedEvents: [4, 0, 8],
        minTime: 1, // 0.5
        maxTime: 1, // 1
      },
      {
        id: 4,
        default: false,
        event: "move_2", // движение 2 этап
        source: huskyMove2,
        permittedEvents: [3, 0, 8],
        minTime: 1, //0.5
        maxTime: 1, // 1
      },
      {
        id: 5,
        default: false,
        event: "lie", // лежит
        source: huskyLie,
        permittedEvents: [0, 1, 6, 8, 7],
        minTime: 1, // 10
        maxTime: 1, // 300
      },
      {
        id: 6,
        default: false,
        event: "sleep1", // Спит 1
        source: huskySleep,
        permittedEvents: [0, 1, 5, 7],
        minTime: 1, // 60
        maxTime: 1, // 1200
      },
      {
        id: 7,
        default: false,
        event: "sleep2", // Спит 2
        source: huskySleep2,
        permittedEvents: [0, 1, 5, 6],
        minTime: 4, // 60
        maxTime: 8, // 1200
      },
      {
        id: 8,
        default: false,
        event: "game", // Играет
        source: huskyGame,
        permittedEvents: [0, 5],
        minTime: 4, // 2
        maxTime: 8, // 5
      },
    ],
  },
];
