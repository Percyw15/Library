const newBookButton = document.getElementById('new_book');
const removeBookButton = document.getElementById('remove_book');
const body = document.body;
const overlay = document.getElementById('overlay');
const ReadOrNot = document.querySelectorAll('#read_or_not');
const Confirm = document.getElementById('confirm');
const Cancel = document.getElementById('cancel');
const libraryContainer = document.getElementById('library_container');
let myLibrary = [];

class Book {
    constructor(name, imageUrl,description,author,year,readStatus){
        this.id = crypto.randomUUID();
        this.name = name;
        this.image = imageUrl;
        this.description = description;
        this.author = author;
        this.year = year;
        this.readStatus = readStatus;
    };

};

function addBookToLibrary(){
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let year = document.getElementById('year').value;
    let author = document.getElementById('author').value;
    let image = document.getElementById('file');
    let readStatus = document.getElementById('read_or_not').classList.value;

    let newBook = new Book(name,image,description,author,year,readStatus);
    myLibrary.push(newBook);

    
    overlay.style.display = 'none'
    readBooksOfLibrary()
};

function readBooksOfLibrary(){
    myLibrary.forEach((element)=>{

    let bookContainer = document.createElement('div');
    bookContainer.classList.add('book_container');

    let book = document.createElement('div');
    book.classList.add('book');

    let img = document.createElement('img');
    img.src = URL.createObjectURL(element.image.files[0]);
    img.alt = element.name;
    document.getElementById('file').value = '';
    
    let readStatus = document.createElement('button');
    readStatus.classList.add(element.readStatus);
    readStatus.innerHTML= element.readStatus;
    console.log(element.readStatus);

    book.appendChild(img);
    bookContainer.appendChild(book);
    bookContainer.appendChild(readStatus);
    libraryContainer.appendChild(bookContainer);
})};


ReadOrNot.forEach((element)=>{
    element.addEventListener('mouseup',()=>{
        if (element.classList.contains('read')) {
            element.classList.remove('read');
            element.classList.add('not_read');
            element.innerHTML = "Not Read";
        }
        else if(element.classList.contains('not_read')){
            element.classList.remove('not_read');
            element.classList.add('read');
            element.innerHTML = 'Read';
        };
    });
})

Cancel.addEventListener('mouseup',()=>{
    overlay.style.display = 'none';
});

Confirm.addEventListener('mouseup',()=>{
    addBookToLibrary();
});

newBookButton.addEventListener('mouseup',()=>{
    overlay.style.display = 'flex';
});

removeBookButton.addEventListener('mouseup',()=>{

});
