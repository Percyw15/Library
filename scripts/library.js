const newBookButton = document.getElementById('new_book');
const removeBookButton = document.getElementById('remove_book');
const body = document.body;
const overlay = document.getElementById('overlay');
const ReadOrNot = document.querySelectorAll('#read_or_not');
const Confirm = document.getElementById('confirm');
const Cancel = document.getElementById('cancel');

console.log(overlay);
let myLibrary = [];

class Book {
    constructor(name, imageUrl,description,author,year){
        this.id = crypto.randomUUID();
        this.name = name;
        this.image = imageUrl;
        this.description = description;
        this.author = author;
        this.year = year;
    };
};


function addBookToLibrary(){
    
};

function readBooksOfLibrary(){
    myLibrary.forEach((book)=>{
    let bookContainer = document.createElement('div'); 
})};

newBookButton.addEventListener('mouseup',()=>{
    overlay.style.display = 'flex';

});

removeBookButton.addEventListener('mouseup',()=>{
    
});

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