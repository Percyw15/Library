//Overlays
const new_book_overlay = document.getElementById('new_book_overlay');
const book_information_overlay = document.getElementById('book_information_overlay');

//Buttons
const close_button = document.getElementById('close_button');
const Cancel = document.getElementById('cancel');
const form = document.getElementById('new_book_modal');
const ReadOrNot = document.getElementById('read_or_not');
const newBookButton = document.getElementById('new_book');
const removeBookButton = document.getElementById('remove_book');

//Others
const libraryContainer = document.getElementById('library_container');
const id_information = document.getElementById('id_information');
const name_information = document.getElementById("name_information");
const description_information = document.getElementById("description_information");
const author_information = document.getElementById("author_information");
const year_information = document.getElementById('year_information');


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

function readBooksOfLibrary(){
    libraryContainer.innerHTML = "";
    myLibrary.forEach((element)=>{

        let bookContainer = document.createElement('article');
        bookContainer.classList.add('book_container');  

        let book = document.createElement('div');
        book.classList.add('book');

        let img = document.createElement('img');
        img.src = element.image
        img.alt = element.name;
        document.getElementById('file').value = '';
        
        let readStatus = document.createElement('button');
        readStatus.classList.add('read_or_not');

        //Creating Book Data
        let json = JSON.stringify(element);
        bookContainer.setAttribute('data-book',json);

        if (element.readStatus === true) {
            readStatus.classList.add('read');
            readStatus.innerHTML = 'Read';
        } else {
            readStatus.classList.add('not_read');
            readStatus.innerHTML = 'Not Read';
        }

        readStatus.addEventListener('click', () => {
            element.readStatus = !element.readStatus;

            if (element.readStatus === true) {
                readStatus.classList.remove('not_read');
                readStatus.classList.add('read');
                readStatus.innerHTML = 'Read';
            } else {
                readStatus.classList.remove('read');
                readStatus.classList.add('not_read');
                readStatus.innerHTML = 'Not Read';
            }
        });

        book.appendChild(img);
        bookContainer.appendChild(book);
        bookContainer.appendChild(readStatus);
        libraryContainer.appendChild(bookContainer);
    });
    
    const books = document.getElementsByClassName('book'); 
    Array.from(books).forEach((book)=>{
        book.addEventListener('mouseup',()=>{
            //Get Data Book
            const Data = JSON.parse(book.closest('article').dataset.book);

            if (book.classList.contains('removal-mode')){
                const id = Data.id;
                myLibrary = myLibrary.filter(b=>b.id !==id)
                const container = book.closest('article');
                container.remove();
                
            }
            else {
            
            for (const [key, value] of Object.entries(Data)) {
                if (key !== "image" && key !== "readStatus"){
                    const container = document.getElementById(`${key}_information`);
                    const strong = container.querySelector('strong');
                
                    // Limpa tudo depois do <strong>
                    while (strong.nextSibling) {
                    strong.nextSibling.remove();
                    }
                
                    // Adiciona novo valor
                    strong.after(document.createTextNode(' ' + value));
                }
                
              }
            book_information_overlay.querySelector('img').src = Data.image;   

            
            //Activating the button
            book_information_overlay.style.display = 'flex';
            }
        });
    });

};

// Adding book to the library
function addBookToLibrary(name,description,year,author,imageUrl,readStatus){   
    let newBook = new Book(name,description,year,author,imageUrl,readStatus);
    myLibrary.push(newBook);
    new_book_overlay.style.display = 'none'
    readBooksOfLibrary()
    
};
    
//New Book Config
Cancel.addEventListener('click',()=>{
    new_book_overlay.style.display = 'none';
});

form.addEventListener('submit',function(event){
    event.preventDefault();

    const name = form.elements['name'].value;
    const description = form.elements['description'].value;
    const author = form.elements['author'].value;
    const year = form.elements['year'].value;
    const image = URL.createObjectURL(form.elements['file'].files[0]);
    const readStatus = form.elements['read_or_not'];

    let IsRead = null;
    let canCreateBook = false;

    if (readStatus.classList.contains('not_read')){
        IsRead = false;
        canCreateBook = true;
    }
    else if (readStatus.classList.contains('read')){
        ReadOrNot.classList.remove('read');
        ReadOrNot.classList.add('not_read');
        ReadOrNot.innerHTML = 'Not Read';
        IsRead = true;
        canCreateBook = true;
    }
    else{
        alert()
    };
    if  (canCreateBook){
        addBookToLibrary(name,description,year,author,image,IsRead);
    };
})

newBookButton.addEventListener('click',()=>{
    const allBooks = document.querySelectorAll('.book');
    allBooks.forEach(book=>{
        book.classList.remove('removal-mode');
    });
    new_book_overlay.style.display = 'flex';
});

removeBookButton.addEventListener('click',()=>{
    const allBooks = document.querySelectorAll('.book');
    allBooks.forEach(book=>{
        book.classList.toggle('removal-mode');
    });
});

ReadOrNot.addEventListener('click',()=>{
    if (ReadOrNot.classList.contains('not_read')) {
        ReadOrNot.classList.remove('not_read');
        ReadOrNot.classList.add('read');
        ReadOrNot.innerHTML = 'Read';
    } else if (ReadOrNot.classList.contains('read')){
        ReadOrNot.classList.remove('read');
        ReadOrNot.classList.add('not_read');
        ReadOrNot.innerHTML = 'Not Read';
    }
});

close_button.addEventListener('click',()=>{
    book_information_overlay.style.display = 'none';
});

addBookToLibrary('bible','a history of humanity',2005,'God','booksImages/Bible.png',true);
addBookToLibrary('percy jackson','Half human and half god, son of Poseidon.',2000,'Rick Riordan','booksImages/percyjackson.png',false);