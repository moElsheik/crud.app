
const PName=document.querySelector("#PName")

const priceInputs=document.querySelectorAll(".price-inputs input")
const price=document.querySelector("#price")
const taxes=document.querySelector("#taxes")
const ads=document.querySelector("#ads")
const discount=document.querySelector("#discount")



const total=document.querySelector("#total")
const count=document.querySelector("#count")
const category=document.querySelector("#category")
const search=document.querySelector("#search")
let deleteAllBtn =document.querySelector("#deleteAll")






const creatbtn =document.querySelector("#creatbtn")

let mood="creat"
let globalI=""
// get price---------------------------------------------------------
    priceInputs.forEach(el=>{
        el.addEventListener("keyup",getTotalPrice)
    })


 function getTotalPrice() {
    
        if (price.value=='' ||price.value<=0) {
            total.innerHTML=''   
            total.classList.replace("bg-success" ,"bg-danger")
        }else{
            let totalPrice = (+price.value + +taxes.value +  +ads.value) - +discount.value
            total.innerHTML=totalPrice
            total.classList.replace( "bg-danger","bg-success")

        }
    }



    // create product----------------------------------------------

   

   creatbtn.addEventListener("click", ValidateInput )
   let allProducts=[]
   if (localStorage.allProducts) {
    allProducts= JSON.parse(localStorage.allProducts)
   }
  

   function creatProduct() {

    let product={
         productName : PName.value,
         netPrice : price.value,
         taxes : taxes.value,
         ads:ads.value,
         discount:discount.value,
         totalPrice :total.innerHTML,
         count:count.value,
         category:category.value

    }
    if (mood == "update") {
        allProducts[globalI]=product
        mood == "creat"
        creatbtn.innerHTML="Save" 
        total.classList.replace("bg-success" ,"bg-danger")




    }else{
        allProducts.push(product)
    }

   localStorage.setItem("allProducts", JSON.stringify(allProducts))
   clearInputs()
   displayProducts()
}

// clearInputs-----------------------------

function clearInputs() {
    PName.value=""
    price.value=""
    taxes.value=""
   ads.value=""
   discount.value=""
   count.value=""
   category.value="" 
   total.innerHTML= "" 
}


// displaaaaaaaay_______________---------------------------------------------------------
displayDiv=document.querySelector("#display")
 
function displayProducts() {
    let productsContainer=''
    for (let i = 0; i < allProducts.length; i++) {
   let { productName ,  totalPrice , count , category} = allProducts[i]

         productsContainer +=`<div id="displayproduct" class="row row-cols-auto row my-3 shadow-lg  justify-content-between text-center">
        <div class="p-3" >
            <h2 class="fs-5">ID</h2>
            <p>${i+1}</p>
        </div>
        <div class="p-3"  >
            <h2 class="fs-5">Product</h2>
            <p> ${productName}</p>
        </div>
        <div class="p-3">
            <h2 class="fs-5">Total</h2>
            <p >${totalPrice}</p>
        </div>
        
        <div class="p-3">
            <h2 class="fs-5">count</h2>
            <p class=>${count} </p>
        </div>
        <div class="p-3">
            <h2 class="fs-5">category</h2>
            <p class=>${category} </p>
        </div>

        <div class="p-3">
        <h2 class="fs-5">Update</h2>
        <button  onclick="updateProduct( ${i})" class=" btn  rounded-5 " type="button">Update</button>
    </div>
    <div class="p-3">
        <h2 class="fs-5">Delete</h2>
        <button onclick="deleteProduct( ${i})" class=" btn bg-danger rounded-5 " type="button">Delete</button>
    </div>
    </div>`
    }
    displayDiv.innerHTML =productsContainer


if (productsContainer == "") {

    deleteAllBtn.classList.replace("d-block","d-none")

}else{
    deleteAllBtn.classList.replace("d-none","d-block")

}
    
    
}


displayProducts()
// deleteProduct----------------------------

function deleteProduct(i){
allProducts.splice(i , 1)
localStorage.allProducts= JSON.stringify(allProducts)
displayProducts()

}




// deleteall-----------------------------------------------------
deleteAllBtn.addEventListener("click",deleteAllProd)
function deleteAllProd() {
    localStorage.clear()
    allProducts.splice(0,)
    displayProducts()
}


// update---------------------------------------------------------------------------------


function updateProduct(i) {
    globalI =i
    PName.value=allProducts[i].productName
    price.value=allProducts[i].netPrice
    taxes.value=allProducts[i].taxes
   ads.value=allProducts[i].ads
   discount.value=allProducts[i].discount
   count.value=allProducts[i].count
   category.value=allProducts[i].category
   getTotalPrice()
    
   creatbtn.innerHTML="Update" 
   mood="update"



}


// search---------------------------------------------------------------------------
search.addEventListener("keyup", searchForProduct)


function searchForProduct() {
   let productsContainer=""

    for (let i = 0; i < allProducts.length; i++) {

        if (allProducts[i].productName.toLowerCase().includes(this.value.toLowerCase())) {


            let { productName ,  totalPrice , count , category} = allProducts[i]
     
            productsContainer +=`<div id="displayproduct" class="row row-cols-auto row my-3 shadow-lg  justify-content-between text-center">
           <div class="p-3" >
               <h2 class="fs-5">ID</h2>
               <p>${i+1}</p>
           </div>
           <div class="p-3"  >
               <h2 class="fs-5">Product</h2>
               <p> ${productName}</p>
           </div>
           <div class="p-3">
               <h2 class="fs-5">Total</h2>
               <p >${totalPrice}</p>
           </div>
           
           <div class="p-3">
               <h2 class="fs-5">count</h2>
               <p class=>${count} </p>
           </div>
           <div class="p-3">
               <h2 class="fs-5">category</h2>
               <p class=>${category} </p>
           </div>
   
           <div class="p-3">
           <h2 class="fs-5">Update</h2>
           <button  onclick="updateProduct( ${i})" class=" btn  rounded-5 " type="button">Update</button>
       </div>
       <div class="p-3">
           <h2 class="fs-5">Delete</h2>
           <button onclick="deleteProduct( ${i})" class=" btn bg-danger rounded-5 " type="button">Delete</button>
       </div>
       </div>`
        }
            
         }
         displayDiv.innerHTML =productsContainer
     
     
     
         
     }



    //  validation--------------------------------------------------------------




    function ValidateInput() {
        if (PNameValidate()) {
            document.getElementById("PNameAlert").classList.replace("d-inline","d-none")
        }else{
            document.getElementById("PNameAlert").classList.replace("d-none","d-inline")
        }


        if ( priceValidate()) {
            document.getElementById("priceAlert").classList.replace("d-inline","d-none")
        }else{
            document.getElementById("priceAlert").classList.replace("d-none","d-inline")
        }

        if ( countValidate()) {
                       document.getElementById("countAlert").classList.replace("d-inline","d-none")

        }else{
            document.getElementById("countAlert").classList.replace("d-none","d-inline")
        }




      if (
        PNameValidate()&&
        categoryValidate()&&
        priceValidate()&&
        taxesValidate()&&
        adsValidate()&&
        discountValidate()&&
        countValidate()
      ) {
        creatProduct()

      }  else{
      }

    }

  
    function PNameValidate() {
        
       return (/^[a-zA-Z0-9_.-]{3,9}$/.test(PName.value) )
    }
    
    function priceValidate() {
      return (/^\d+(.\d{1,2})?$/.test(price.value))
    }
    function taxesValidate() {
      return (/^(\d+(.\d{1,2})?)?$/.test(taxes.value))
    }

    function adsValidate() {
      return (/^(\d+(.\d{1,2})?)?$/.test(ads.value))
    }

    function discountValidate() {
      return (/^(\d+(.\d{1,2})?)?$/.test(discount.value))
    }

    function countValidate() {
       return (/^[-+]?[1-9]\d*$/.test(count.value))
    }

    function categoryValidate() {
        return  (/^[a-zA-Z0-9_.-]*$/.test(category.value))
      }
  

    function searchValidate() {
        
       return (/^[a-zA-Z0-9_.-]*$/.test(search.value) )
    }

    let inputs= document.getElementsByName("input")
    inputs.forEach(element => {
        element.addEventListener("keyup",()=>{
            document.getElementsByName("alert").forEach(el => {
                el.classList.replace("d-inline","d-none")
                console.log(el.classList);
            });
        })
    });
    
    
    





  