class Storagex {
  static keySelectedSeats = "keySelectedSeats";
  static keyFullSeats = "keyFullSeats";
  static keySelectedMovie = "keySelectedMovie";

  static getSelectedSeatFromStorage() {
    let selectedSeats;
    if (localStorage.getItem(this.keySelectedSeats) === null) {
      {
        selectedSeats = [];
      }
    } else {
      selectedSeats = JSON.parse(localStorage.getItem(this.keySelectedSeats));
    }
    return selectedSeats;
  }

  static getFullSeatFromStorage() {
    let fullSeats;
    if (localStorage.getItem(this.keyFullSeats) === null) {
      {
        fullSeats = [];
      }
    } else {
      fullSeats = JSON.parse(localStorage.getItem(this.keyFullSeats));
    }
    return fullSeats;
  }

  static getSelectedMovieIndexFromStorage() {
    return localStorage.getItem(this.keySelectedMovie);
  }

  static addSelectedSeatToStorage(indexs) {
    localStorage.setItem(this.keySelectedSeats, JSON.stringify(indexs));
  }

  static addFullSeatToStorage(indexs) {
    const fullSeatsIndex = this.getFullSeatFromStorage();
    indexs.forEach((index) => fullSeatsIndex.push(index));
    localStorage.setItem(this.keyFullSeats, JSON.stringify(fullSeatsIndex));
  }

  static addSelectedMovieToStorage(index) {
    localStorage.setItem(this.keySelectedMovie, JSON.stringify(index));
  }
}
