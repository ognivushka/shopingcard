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
   //doc is ready
   document.addEventListener('DOMContentLoaded', getFromLocalStorage)
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

//add the courses into the local storage
function saveIntoStorage(course){
   let courses = getCoursesFromStorage();

   //add courses into the arr
   courses.push(course);

   //storage save onli strings! => JSON concert to string
   localStorage.setItem('courses', JSON.stringify(courses))

}

//get the contant from the storage
function getCoursesFromStorage(){

   let courses;
   //exist in storage?=>value, not exist?=>[]
   if(localStorage.getItem('courses')===null){
      courses =[];
   }else{
      courses = JSON.parse(localStorage.getItem('courses'));
   }
   return courses
}

//remove course frome the DOM
function removeCourse(e){

   let course, courseId;

   //remove frome the DOM
   if(e.target.classList.contains('remove')){
      e.target.parentElement.parentElement.remove()
      course = e.target.parentElement.parentElement;
      courseId = course.querySelector('a').getAttribute('data-id');
   }
   // console.log(courseId);
   //remove from loc storage
   removeCourseLocalStorage(courseId)
}
//remove frome loc storage
function removeCourseLocalStorage(id){
   //get data from the loc storage
   let coursesLS = getCoursesFromStorage();
   //loop throught the arr and find the index to remove
   coursesLS.forEach(function(courseLS, index){
      if(courseLS.id === id){
         coursesLS.splice(index,1)
      }
   })
   //add the rest of the arr
   localStorage.setItem('courses', JSON.stringify(coursesLS))
}

//clears the shoping card with the button
function clearCard(){
   // shopingCartContent.innerHTML = ''; //not recomended way of clean!

   while(shopingCartContent.firstChild){
      shopingCartContent.removeChild(shopingCartContent.firstChild)
   }

   //clear frome loc storage
   clearLocalStorage()
}

//clear the whole local storage
function clearLocalStorage(){
   localStorage.clear();
}

//loads when doc is ready and print courses into shopping cart

function getFromLocalStorage(){
   let coursesLS = getCoursesFromStorage();

   //loop throught the courses and print into the card
   coursesLS.forEach(function(course){
      //create <tr>
      const row = document.createElement('tr')
      //print the content
      row.innerHTML =`
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
      shopingCartContent.appendChild(row);
   })
}