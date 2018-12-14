// window.addEventListener("load", function() {
let myLibrary = [];

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let theAwesomeBook = new Book("The Awesome Boook", "Cool author", 215, true);
let book3 = new Book("The book3", "Cool2 author", 2115, true);
addBookToLibrary(theHobbit);
addBookToLibrary(theAwesomeBook);
addBookToLibrary(book3);

const container = document.getElementById("container");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", send);

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};
// When the user clicks on submitBtn, close the modal
submitBtn.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read == true ? "read" : "not read";

  this.info = function() {
    return ` ${title} by ${author}, ${pages} pages, ${read} `;
  };
}

function addBookToLibrary(newBook) {
  this.newBook = newBook;
  myLibrary.push(newBook);
}

function render() {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    var template = `<div class="div-book"><ul class="book"><li>${
      myLibrary[i].title
    }</li>
                <li>${myLibrary[i].author}</li>
                <li>${myLibrary[i].pages}</li>
                <li><button class="read-st" data-text-swap="read" data-text-original="not read">${
                  myLibrary[i].read
                }</button></li>
                </ul><button class="remove">X</button></div>`;

    container.innerHTML += template;
  }
  removeBook();
}
render();

function removeBook() {
  const book = Array.from(document.getElementsByClassName("book"));
  book.forEach(function(e) {
    e.nextSibling.addEventListener("click", function() {
      this.parentNode.remove();
      for (let i = 0; i < myLibrary.length; i++) {
        const title = this.previousSibling.firstChild.innerHTML;
        if (myLibrary[i].title == title) {
          myLibrary.splice(i, 1);
        }
      }
    });
  });
}

function changeReadStatus() {
  const readStatus = Array.from(document.getElementsByClassName("read-st"));
  readStatus.forEach(function(e) {
    e.addEventListener("click", function() {
      // if (e.getAttribute("class") !== "positive") {
      //   this.classList.toggle("positive");
      // }

      if (e.getAttribute("data-text-swap") == e.innerHTML) {
        e.innerHTML = e.getAttribute("data-text-original");
      } else {
        e.setAttribute("data-text-original", e.innerHTML);
        e.innerHTML = e.getAttribute("data-text-swap");
      }
    });
  });
}

// function checkReadStatus() {
//   if (myLibrary[i].read == "read") {
//     const btns = document.getElementsByClassName("read-st");
//     // for (const btn of btns) {
//     //   btn.classList.add("positive");
//     // }
//   }
// }

changeReadStatus();

function send(e) {
  e.preventDefault();
  let book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  render();
  document.getElementById("form-user").reset();
}

// });
