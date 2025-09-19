//console.log("connected!!");
let mockData = [
  {
    id: 0,
    isDone: false,
    content: "React study",
    date: new Date().toLocaleString(),
  },
  {
    id: 1,
    isDone: true,
    content: "친구만나기",
    date: new Date().toLocaleString(),
  },
  {
    id: 2,
    isDone: false,
    content: "낮잠자기",
    date: new Date().toLocaleString(),
  },
];
let idIndex = 3;

//
const parseTodo = function (obj) {
  if (obj.isDone) {
    return ` <div class="TodoItem">
    <input type="checkbox" name="" id=${obj.id} checked/>
    <div class="content">${obj.content}</div>
    <div class="date">${obj.date}</div>
    <button class="buttonDel" id=${obj.id}>삭제</button>
  </div>`;
  }
  return ` <div class="TodoItem">
    <input type="checkbox" name="" id=${obj.id} />
    <div class="content">${obj.content}</div>
    <div class="date">${obj.date}</div>
    <button class="buttonDel" id=${obj.id}>삭제</button>
  </div>`;
};

// toto list 랜더링
const loadList = function (list) {
  let contentSection = document.querySelector(".todos_wrapper");
  let todoList = "";
  for (let i = 0; i < list.length; i++) {
    todoList += parseTodo(list[i]);
  }
  contentSection.innerHTML = todoList;
};

const loadDate = function () {
  document.querySelector("#today").innerHTML = new Date().toLocaleDateString();
};

// todo list에 추가
document.querySelector("form").addEventListener("click", (e) => {
  event.preventDefault();
  if (e.target.previousElementSibling) {
    if (e.target.previousElementSibling.value) {
      //   console.log("1");
      mockData.push({
        id: idIndex++,
        isDone: false,
        content: e.target.previousElementSibling.value,
        date: new Date().toLocaleString(),
      });
    }
    loadList(mockData);
    e.target.previousElementSibling.value = "";
  }
});

// todo 삭제 구현
document.addEventListener("click", (e) => {
  //console.log(e.target.className);
  if (e.target.className === "buttonDel") {
    //console.log(e.target.id);
    mockData = mockData.filter((obj) => obj.id !== parseInt(e.target.id)); // e.target.id 로 가져온 id랑 mockData id 랑 type 안 맞는듯.. -> parseInt로 type 맞춰줌
    loadList(mockData);
  }
});

// 검색 기능
document.querySelector("#searchTodo").addEventListener("input", (e) => {
  let filterContent = e.target.value;
  if (filterContent) {
    let list = mockData.filter((obj) => {
      return obj.content.indexOf(filterContent) != -1;
    });
    loadList(list);
    return;
  }
  loadList(mockData);
});

//수정 기능
document.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    console.log(e.target.id);
    mockData = mockData.map((obj) => {
      if (obj.id == e.target.id) {
        obj.isDone ? (obj.isDone = false) : (obj.isDone = true);
        return obj;
      } else {
        return obj;
      }
    });
    //console.log(mockData);
    //loadList(mockData);
  }
});

loadDate();
loadList(mockData);
//console.log(new Date().toLocaleString());
