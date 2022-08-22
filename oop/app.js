function Book(title,author,isbn){
  this.title= title
  this.author = author
  this.isbn =isbn
}

function UI(){}

UI.prototype.addBookToList = function(book){
  // console.log(book)
  const list = document.getElementById('book-list')

  const row = document.createElement('tr')

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class = "delete">X</a></td> 
  
  `

 list.appendChild(row)

}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

UI.prototype.showAlert= function(message,className){
  const div = document.createElement('div')
  div.id='up'
  div.className=`alert ${className}`

  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container')
  const form = document.getElementById('book-form')

  container.insertBefore(div,form)

  setTimeout(function(e){
    document.getElementById('up').remove()
  },2000)


}

UI.prototype.deleteBook = function(target){
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove()
  }
}


document.getElementById('book-form').addEventListener('submit',function(e){

  const title= document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  const book = new Book(title,author,isbn)

  console.log(book)

  //instantiate the ui
  const ui= new UI()

  //validate
  if(title === '' || author ==='' || isbn === ''){
    ui.showAlert('Please fill in all the fields','error')
  }else{
    ui.addBookToList(book)

    ui.showAlert('Book Added Successfully','success')

    ui.clearFields();

  }
  

  e.preventDefault();

})

document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI()

  ui.deleteBook(e.target)

  ui.showAlert('Book Removed!','success')

  e.preventDefault();
})