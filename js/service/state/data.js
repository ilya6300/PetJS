class myData {
  constructor(all_data, dataStyles, style) {
    this.all_data = all_data;
    this.dataStyles = dataStyles;
    this.style = style
  }

  updateItem = (name, value) => {
    this[name] = value;
  };

  updatePetID = (id, name, value) => {
    const petID = this.all_data.find((pet) => pet.id === id);
    console.log(id, this.all_data);
    if (petID) {
      console.log(petID);
      petID[name] = value;
    }
    localStorage.setItem("myPetsLocal", JSON.stringify(this.all_data));
    console.log(this.all_data);
  };
}

export default new myData();
