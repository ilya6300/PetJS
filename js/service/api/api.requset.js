import { fakeApiPets, fakeStyle } from "../dev_data/fake.pets.js";
import data from "../state/data.js";

class apiPets {
  // Получаем список всех питомцев
  getMyPetsList = async () => {
    // Оффлайн
    const myPetsLocal = localStorage.getItem("myPetsLocal");
    if (myPetsLocal === null) {
      localStorage.setItem("myPetsLocal", JSON.stringify(fakeApiPets));
      data.updateItem("all_data", fakeApiPets);
      return fakeApiPets;
    } else {
      data.updateItem("all_data", JSON.parse(myPetsLocal));
      return JSON.parse(myPetsLocal);
    }
  };

  // Обновляем текущего питомца
  updateMyPets = (id, name, value) => {
    // оффлайн
    console.log("!updateMyPets");
    data.updatePetID(id, name, value);
    // localStorage.setItem("myPetsLocal", JSON.stringify(data.all_data));
    // console.log(data.all_data);
  };

  // Получаем все наши стили
  getStyles = () => {
    try {
      // Оффлайн
      const myStyleLocal = localStorage.getItem("myStyleLocal");
      if (myStyleLocal === null) {
        localStorage.setItem("myStyleLocal", JSON.stringify(fakeStyle));
        data.updateItem("dataStyles", fakeStyle);
        return fakeStyle;
      } else {
        data.updateItem("dataStyles", JSON.parse(myStyleLocal));
        return JSON.parse(myStyleLocal);
      }
    } catch (e) {
      console.error(e);
    } finally {
      const styleID = data.dataStyles.find((s) => s.active);
      if (styleID) {
        data.updateItem("style", styleID);
      }
    }
  };
}
export default new apiPets();
