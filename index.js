if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

setOnChangeAttribute()

function ready() {
  //for the remove button function
  var removeCartItemButton = document.getElementsByClassName('btn')
  console.log(removeCartItemButton)
  for (var i = 0; i < removeCartItemButton.length; i++) {
    var button = removeCartItemButton[i]
    button.addEventListener('click', removeCartItem)
  }
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

var addToCartButtons = document.getElementsByClassName('buy-btn')
console.log("addtocart",addToCartButtons)
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i]
  console.log("button",button)
  button.addEventListener('click', addToCartClicked)
  
}



//for the function of addto cart button
function addToCartClicked(event) {
  console.log("button clicked")
  var button = event.target
  var shopItem = button.parentElement
  console.log('shopItem',shopItem)
  var title = shopItem.getElementsByClassName('item-name')[0].innerText
  console.log(title)
  var price = shopItem.getElementsByClassName('price')[0].innerText
  var image = shopItem.getElementsByClassName('cart-item-image')[0].src
  console.log(title,price,image)
  addInDB(title,price,image)
  addCartItem(title,price,image)
  addInDB(title,price,image)
}

db = new Array();

function addInDB(title, price, image){
  const productObject = {
    title: title,
    price: price,
    imageUrl: image
  }
  db.push(productObject)
  console.log(db)

  
}

function addCartItem(title,price,image){
  for(var i = 0 ; i < db.length; i++)
    var cartItem = db[i];
    console.log(cartItem)
    var cartRow = document.createElement('div')
    var cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image"src="${cartItem.imageUrl}" height="100px"width="75px">
      <span class="cart-item-title">${cartItem.title}</span>
    </div>
    <span class="cart-item-price cart-column">${cartItem.price}</span>
    <div class="cart-quantity-column cart-column">
        <input onchange="onChangeQuantity(event)" class="cart-quantity-input" type="number" value="1">
        <button class="btn" 
        role="button">Remove</button>
    </div>  `
    cartRowContents.innerHTML = cartRow
 
   
  }


function setOnChangeAttribute() {
  var cartQuantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < cartQuantityInputs.length; i++) {
    var input = cartQuantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

//for Curousel 
const buttons = document.querySelectorAll("[data-carousel-button]")
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelectoconsole.log('hello')("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})


function onChangeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  console.log("cartRows", cartRows)
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]

    var priceElement = cartRow.getElementsByClassName('cart-item-price')[0]

    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = priceElement.innerText.replace('Rs.', '')
    var quantity = quantityElement.value

    console.log(price * quantity)
    total = total + (price * quantity)
    console.log("total =", total)
  }
  var totalPurchase = document.getElementsByClassName('cart-total-price')[0].innerText = "Rs." + total

}