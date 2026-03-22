import { refreshEnergy, startEnergyTicker } from "./components/ui/statics.bar.js";
import apiRequset from "./service/api/api.requset.js";
import apiPets from "./service/api/api.requset.js";
// import { fakeApiPets } from "./service/dev_data/fake.pets.js";
import Pet from "./service/state/pet.js";

const petProfile = () => {};

// Получаем всех питомцев по апи
// const getApiPets = async () => {
//   return fakeApiPets;
// };

// Получаем активного питомца
const getMyPets = async (id) => {
  const resPets = await apiPets.getMyPetsList();
  // const resPets = await getApiPets();
  const petID = resPets.find((p) => p.id === id);
  console.log(resPets, petID);
  // Создаём питомца
  const myPet = new Pet(
    petID.id,
    "Зевс",
    petID.data,
    petID.parameters.baseSpeed,
    petID.parameters.stepDistance,
    petID.commands,
    petID.energy,
    petID.timeIncrement,
    petID.style,
    petID.intervalIncrement,
  );
  return myPet;
};

const getPetsAssets = async (myPet) => {
  const events = myPet.dataSkin.map((e) => {
    return { alias: e.event, src: e.source };
  });
  const assetsPet = await PIXI.Assets.load(events);
  return assetsPet;
};
export const initPet = async () => {
  // активный питомец под ид - 0
  const myPet = await getMyPets(0);
  // Собираем все скины питомца
  const assetsPet = await getPetsAssets(myPet);

  // Сохраняем ассеты в экземпляр класса
  myPet.assets = assetsPet;

  // Инициализируем питомца
  myPet.initView();
  // Чтение стилей
  apiRequset.getStyles();
  // 1. Считаем сколько накопилось за время отсутствия
  refreshEnergy(myPet);

  // 2. Если всё еще не максимум — запускаем тиканье
  if (myPet.energy < 8) {
    startEnergyTicker(myPet);
  }

  return myPet;
};
