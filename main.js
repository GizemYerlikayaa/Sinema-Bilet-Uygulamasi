const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = Array.from(document.querySelectorAll(".seat i")); // ✅ tüm koltuklar
const buyButton = document.querySelector("#buyButton");
const clearButton = document.querySelector("#clearButton");

runEventListeners();

function runEventListeners() {
  container.addEventListener("click", select);
  selectMovie.addEventListener("change", changeMovie);
  document.addEventListener("DOMContentLoaded", runPageLoaded);
  buyButton.addEventListener("click", buyTicket);
  clearButton.addEventListener("click", clearStorage);
}

function runPageLoaded() {
  const selectedSeatIndex = Storagex.getSelectedSeatFromStorage();
  const fullSeatsIndex = Storagex.getFullSeatFromStorage();

  seats.forEach((seat, index) => {
    if (selectedSeatIndex.includes(index)) {
      seat.classList.add("selectedSeat");
    }
  });

  seats.forEach((seat, index) => {
    if (fullSeatsIndex.includes(index)) {
      seat.classList.add("fullSeat");
    }
  });
  selectMovie.selectedIndex = Storagex.getSelectedMovieIndexFromStorage();
  calculate();
}

function buyTicket() {
  if (confirm("Satın almak istiyor musunuz?")) {
    const selectedSeats = getSelectedSeat();
    const selectedSeatsIndex = getSelectedSeatIndex();
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selectedSeat");
      seat.classList.add("fullSeat");
    });

    Storagex.addFullSeatToStorage(selectedSeatsIndex);

    Storagex.addSelectedSeatToStorage(getSelectedSeatIndex());
  }
}

function select(e) {
  const selectedElement = e.target;
  if (
    selectedElement.classList.contains("fa-couch") &&
    !selectedElement.classList.contains("fullSeat")
  ) {
    selectedElement.classList.toggle("selectedSeat");
    calculate();
    saveSelectedSeatsIndexToStorage();
    saveSelectedMovieIndexToStorage();
  }
}

function changeMovie() {
  calculate();
  saveSelectedMovieIndexToStorage();
}

function getSelectedSeat() {
  const selectedList = Array.from(container.querySelectorAll(".selectedSeat"));
  return selectedList;
}

function getSelectedSeatIndex() {
  const selectedList = getSelectedSeat(); // ✅ doğru fonksiyon adı
  const selectedSeatsIndex = selectedList.map((seat) => {
    return seats.indexOf(seat);
  });
  return selectedSeatsIndex;
}

function saveSelectedSeatsIndexToStorage() {
  const selectedSeatsIndex = getSelectedSeatIndex();
  Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
}

function saveSelectedMovieIndexToStorage() {
  const selectedMovieIndex = selectMovie.selectedIndex;
  Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}

function calculate() {
  const selectedSeatCount = getSelectedSeat().length;
  const price = selectMovie.value;
  count.textContent = selectedSeatCount;
  amount.textContent = price * selectedSeatCount;
}

function clearStorage() {
  if (confirm("Tüm seçimler silinsin mi?")) {
    localStorage.removeItem(Storagex.keySelectedSeats);
    localStorage.removeItem(Storagex.keyFullSeats);
    localStorage.removeItem(Storagex.keySelectedMovie);

    seats.forEach((seat) => {
      seat.classList.remove("selectedSeat", "fullSeat");
    });

    selectMovie.selectedIndex = 0;

    calculate();
  }
}
