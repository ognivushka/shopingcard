//VARIABLES
////////////////////////////////////////////////////////////////////////////////////
const courses = document.querySelector('#courses-list'),
shopingCartContent = document.querySelector('#cart-content tbody'),
clearCartBtn = document.querySelector('#clear-cart');


//EVENT LISTNERS
///////////////////////////////////////////////////////////////////////////////////
loadEventListeners()
function loadEventListeners(){
   // when new cours is chosen
   courses.addEventListener('click', buyCourse)
   //when remove button is clicked
   shopingCartContent.addEventListener('click', removeCourse)
   //clear card btn
   clearCartBtn.addEventListener('click', clearCard)
}



//FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////
function buyCourse(e){
   e.preventDefault();
   // console.log(e.target);
   //use deligation to find the course that was added
   if(e.target.classList.contains('add-to-cart')){
      //read the cours values
      const course = e.target.parentElement.parentElement;
      //read the values
      getCourseInfo(course)
   }
}

//read the html info of the selected cours
function getCourseInfo(course){
   //create object with cours data
   const courseInfo = {
      image: course.querySelector('img').src,
      title: course.querySelector('h4').textContent,
      price: course.querySelector('.price span').textContent,
      id: course.querySelector('a').getAttribute('data-id')
   }
   //insert into the shoping cart
   addIntoCart(courseInfo);
}


//display selected course into the shoping card
function addIntoCart(course){
   //create a <tr> in the table os shoping list
   const row = document.createElement('tr');

   //build the template
   row.innerHTML = `
       <tr>
           <td>
                <img src="${course.image}" width=100px>
           </td>
           <td>${course.title}</td>
           <td>${course.price}</td>
           <td>
               <a href="#" class ="remove" data-id="${course.id}">X</a>
           </td>
      </tr>
   `;

   //add into the shoping card
   shopingCartContent.appendChild(row);

   //add course into a storage
   saveIntoStorage(course)
}


//remove course frome the DOM
function removeCourse(e){

   if(e.target.classList.contains('remove')){
      e.target.parentElement.parentElement.remove()
   }

}


//clears the shoping card with the button
function clearCard(){
   // shopingCartContent.innerHTML = ''; //not recomended way of clean!

   while(shopingCartContent.firstChild){
      shopingCartContent.removeChild(shopingCartContent.firstChild)
   }
}
