const newBookButton = document.getElementById('new_book');
const removeBookButton = document.getElementById('remove_book');
const body = document.body;
const readStatus = document.getElementById('read_or_not');
const overlay = document.getElementById('overlay');
const Confirm = document.getElementById('confirm');
const Cancel = document.getElementById('cancel');
const libraryContainer = document.getElementById('library_container');

let myLibrary = [];


// Creating book
class Book {
    constructor(name, description,year,author,imageUrl,readStatus){
        this.id = crypto.randomUUID();
        this.name = name;
        this.image = imageUrl;
        this.description = description;
        this.author = author;
        this.year = year;
        this.readStatus = readStatus;
    };

};

// Iterating through the library
function readBooksOfLibrary(){
    libraryContainer.innerHTML = "";
    myLibrary.forEach((element)=>{

        let bookContainer = document.createElement('div');
        bookContainer.classList.add('book_container');

        let book = document.createElement('div');
        book.classList.add('book');

        let img = document.createElement('img');
        img.src = element.image
        img.alt = element.name;
        document.getElementById('file').value = '';
        
        let readStatus = document.createElement('button');
        readStatus.classList.add('read_or_not');

        // Mostrar status inicial, sem alterar o valor
        if (element.readStatus === true) {
            readStatus.classList.add('read');
            readStatus.innerHTML = 'Read';
        } else {
            readStatus.classList.add('not_read');
            readStatus.innerHTML = 'Not Read';
        }

        // Alterar o valor só quando clicar
        readStatus.addEventListener('click', () => {
            element.readStatus = !element.readStatus;

            if (element.readStatus === true) {
                readStatus.classList.remove('not_read');
                readStatus.classList.add('read');
                readStatus.innerHTML = 'Read';
                console.log('FOI');
            } else {
                readStatus.classList.remove('read');
                readStatus.classList.add('not_read');
                readStatus.innerHTML = 'Not Read';
                console.log('Nao foi');
            }
        });

        book.appendChild(img);
        bookContainer.appendChild(book);
        bookContainer.appendChild(readStatus);
        libraryContainer.appendChild(bookContainer);
})};

// Adding book to the library
function addBookToLibrary(name,description,year,author,imageUrl,readStatus){   
    let newBook = new Book(name,description,year,author,imageUrl,readStatus);
    myLibrary.push(newBook);
    overlay.style.display = 'none'
    readBooksOfLibrary()
    
};


    
//New Book Config
Cancel.addEventListener('mouseup',()=>{
    overlay.style.display = 'none';
});

Confirm.addEventListener('mouseup',()=>{
    
});

newBookButton.addEventListener('mouseup',()=>{
    overlay.style.display = 'flex';
});

removeBookButton.addEventListener('mouseup',()=>{

});

addBookToLibrary('bible','a history of humanity',2005,'God','booksImages/Bible.png',true);
addBookToLibrary('percy jackson','Half human and half god, son of Poseidon.',2000,'Rick Riordan','booksImages/percyjackson.png',false);