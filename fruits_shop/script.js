// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${
          item.id
        }" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}

// 과일 출력
function filterAndSortFruits(sortType) {
  //console.log(fruitList); // fruitList 는 과일을 담는 div, 즉 container임
  const sortedFruits = [...fruits];
  switch (sortType) {
    case "low":
      sortedFruits.sort((f1, f2) => {
        return f1.price - f2.price;
      });
      break;
    case "high":
      sortedFruits.sort((f1, f2) => {
        return f2.price - f1.price;
      });
      break;
    case "name":
      sortedFruits.sort((f1, f2) => {
        return f1.name.localeCompare(f2.name);
      });
      break;
    case "":
      break;
    default:
      renderProducts(
        sortedFruits.filter((f) => {
          return f.name.includes(sortType);
        }),
        fruitList
      );
      return;
  }
  renderProducts(sortedFruits, fruitList);
  //console.log(sortType);
  // console.log(
  //   sortedFruits.filter((f) => {
  //     return f.name.indexOf(sortType) !== -1;
  //   })
  // );
  // console.log(sortedFruits);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  for (let i = 0; i < 3; i++) {
    if (veggiePage == veggies.length) break;
    veggiePage++;
  }
  //renderProducts(veggies, veggieList);
  renderProducts(veggies.slice(0, veggiePage), veggieList);

  if (veggiePage == veggies.length) {
    // button 삭제
    loadMoreBtn.remove();
  }
}

// 이벤트 리스너
searchBox.addEventListener("input", (e) =>
  filterAndSortFruits(e.target.value.trim())
);
sortSelect.addEventListener("change", (e) =>
  filterAndSortFruits(e.target.value)
);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits("");
loadVeggies();
