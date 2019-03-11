//  Staff Login Validation Script

$(document).ready(
    
    $("#login").submit(function(event){
        event.preventDefault();
       
        if ( $("#staffId").val() && $("#pword").val()) {
        
            $.ajax({
              method: "GET",
              url: `http://localhost:3000/staff?id=${$("#staffId").val()}&password=${$("#pword").val()}`
              
            })
            .done(function(res){
                if(res.length===0){
                    alert('Wrong Id or Password');
                    $("#staffId").addClass('border-danger');
                    $("#emailHelp").val('')
                }
                else{
                    alert(`Welcome ${res[0].firstname}`)
                    window.location = 'staffPanel.html';
                    let firstName = res[0].firstname;
                    let lastName = res[0].lastname;
                    let userId = res[0].id;
                    window.localStorage.setItem('staffId',`${userId}`)
                    window.localStorage.setItem('name',`${firstName} ${lastName}`)
                    
                }
            })   
    }
}
    )
)

//  Product Creation Validation Script

$(document).ready(
    $("#addProduct").submit(
        function(e){
            e.preventDefault();
            document.getElementById('load').setAttribute('id','show')
            $.ajax({
                method:"GET",
                url: `http://localhost:3000/product?name=${$("#addProductName").val()}`
            })
            .done(
                function(res){
                    if(res.length === 0){
                        $.ajax({
                            method:"POST",
                            url: "http://localhost:3000/product",
                            data: {
                                name:`${$("#addProductName").val()}`,
                                quantity:`${$("#addQuantity").val()}`,
                                costPrice:`${$("#addCostPrice").val()}`,
                                sellingPrice: `${$("#addSellingPrice").val()}`
                            }
                        })
                        .done(
                            function(e){
                            alert('Your Product Was Successfully Added');
                            window.location='productOperations.html'
                            }
                        )
                        .fail(
                            function(){
                                alert('Sorry Something Went Wrong')
                            }
                        )
                    }
                    else{
                        alert('Sorry Product Exist')
                        window.location = 'productAdd.html'
                    }
                }
            )
            .fail(
                function(e){
                alert('Error Validating From Server')
                }
            )
            
        }
    )
)

// Product Deletion Script
$(document).ready(
    $("#deleteProduct").submit(
        function(e){
            e.preventDefault();
            document.getElementById('load').setAttribute('id','show')
            $.ajax({
                method:"GET",
                url: `http://localhost:3000/product?name=${$("#deleteProductName").val()}`
            })
            .done(
                function(res){
                    if(res.length === 1){
                        $.ajax({
                            method:"DELETE",
                            url: `http://localhost:3000/product/${res[0].id}`
                            
                        })
                        .done(
                            function(e){
                            alert(`${$("#deleteProductName").val()} Was Successfully Deleted`);
                            window.location.href ='productOperations.html'
                            }
                        )
                        .fail(
                            function(){
                                alert('Sorry Something Went Wrong');
                                window.location.reload()
                            }
                        )
                    }
                    else{
                        alert('Sorry Product Not Found')
                        window.location.reload();
                    }
                }
            )
            .fail(
                function(e){
                alert('Error Communicating From Server')
                }
            )
            
        }
    )
)

//////      Addition Of Staff  
$(document).ready(function(){
    $( "#addStaff" ).submit(function( event ) {
      event.preventDefault();  
      alert('submitted');
      var firstName=$("#firstname").val();
      var lastName=$("#lastname").val();
      var Gender=$("#gender").val();
      var emailAddress=$("#email").val();
      var phoneNumber=$("#phone").val();
      var defaultPassword=$("#defaultPassword").val();
      var confirmDefault=$("#confirmDefault").val();
      var obj={
          firstname:firstName,
          lastname:lastName,
          gender:Gender,
          email:emailAddress,
          phone:phoneNumber,
          password:defaultPassword
      }
      //console.log(obj);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/staff/",
            data:obj 
          })
            .done(function( msg ) {
              //console.log(msg);
              alert( "Staff successfully added" );
              location.reload();
            });
        
      });
  });

//  Admin Login Validation
$(document).ready(
    $("#adminLogin").submit(function(event){
        event.preventDefault();
        
        if ( $("#adminId").val() && $("#password").val()) {
        
            $.ajax({
              method: "GET",
              url: `http://localhost:3000/admin?id=${$("#adminId").val()}&password=${$("#password").val()}`
              
            })
            .done(function(res){
                if(res.length===0){
                    alert('Invalid Login');
                }
                else{
                    let url = window.localStorage.getItem('url')
                    if(url){
                        alert('Welcome Admin');
                    window.localStorage.clear()
                    window.localStorage.setItem('adminId', `${res[0].id}`);
                    window.location.href = url
                    }
                    else if(!url){
                    alert('Welcome Admin');
                    window.localStorage.clear()
                    window.localStorage.setItem('adminId', `${res[0].id}`)

                    window.location="admin.html";}
                }
                   
            }).fail(function(msg){
                console.log(Object.getOwnPropertyNames(msg))
                    alert('Could Not Connect To Server');
            });
        
    }
    else{alert('Please Input Admin ID and Password');}
}
    )

    );

//  Addition Of Customer Script
$(document).ready(function(){
        $( "#addCustomer" ).submit(function( event ) {
          event.preventDefault();  
          //alert('submitted');
          var firstName=$("#firstname").val();
          var lastName=$("#lastname").val();
          var Gender=$("#gender").val();
          var emailAddress=$("#email").val();
          var phoneNumber=$("#phone").val();
          var staffId = window.localStorage.getItem('staffId') ;
          //console.log(current_cookie[1]); 
          var obj={
              firstname:firstName,
              lastname:lastName,
              gender:Gender,
              email:emailAddress,
              phone:phoneNumber,
              addedBy:staffId
                
            }
          //console.log(obj);
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/user/",
                data:obj 
              })
                .done(function( msg ) {
                  //console.log(msg);
                  alert( "Customer successfully added" );
                  location.reload();
                });
            
          });
      });
 
//   Adding New Staff To DataBase 
$(document).ready(function(){
    $( "#addStaff" ).submit(function( event ) {
      event.preventDefault();  
      //alert('submitted');
      var firstName=$("#firstname").val();
      var lastName=$("#lastname").val();
      var Gender=$("#gender").val();
      var emailAddress=$("#email").val();
      var phoneNumber=$("#phone").val();
      var defaultPassword=$("#defaultPassword").val();
      var confirmDefault=$("#confirmDefault").val();
      var obj={
          firstname:firstName,
          lastname:lastName,
          gender:Gender,
          email:emailAddress,
          phone:phoneNumber,
          password:defaultPassword
      }
      //console.log(obj);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/staff/",
            data:obj 
          })
            .done(function( msg ) {
              //console.log(msg);
              alert( "Staff successfully added" );
              location.reload();
            });
        
      });
  });
  
  //    Phone Number Validation For Creating Staff Account
  function validate_phone_number(){
    var phone_length=document.getElementById('phone').value.length;
    if (phone_length ===11){
        document.getElementById('submit_button').disabled=false;
        document.getElementById('confirm_phone_number').style.backgroundColor="green";
        document.getElementById('confirm_phone_number').innerText="Valid phone number";
    }
    else{
        document.getElementById('submit_button').disabled=true;
        document.getElementById('confirm_phone_number').style.backgroundColor="red";
    
        document.getElementById('confirm_phone_number').innerText="Invalid Phone nUmber";
    }
    
    
}

//Password Matching Validation for Creating Staff Account
function confirm_pass(){
var password=document.getElementById('defaultPassword').value;
var confirm=document.getElementById('confirmDefault').value;
if (password===confirm){
    document.getElementById('submit_button').disabled=false;
    document.getElementById('confirm_pass_small').style.backgroundColor="green";
    document.getElementById('confirm_pass_small').innerText="Confirm password and password matches";
}
else{
    document.getElementById('submit_button').disabled=true;
    document.getElementById('confirm_pass_small').style.backgroundColor="red";

    document.getElementById('confirm_pass_small').innerText="Confirm password and password mismatch";
}
}

///     Search For Possible matches in the databasse
function query_suggestion(){
    let suggest=document.getElementById('productName').value;
    var return_option='';
    //alert(suggest);
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/product?q=${suggest}`
        
      })
        .done(function( msg ) {
          for (let a=0;a<msg.length;a++){
              var opt="<option onclick=\"getInnerText()\">"+msg[a].name+"</option>";
              console.log(opt);
              return_option+=opt;
          }
          document.getElementById('suggestion_div').style.display="block";
          document.getElementById('suggestion_div').innerHTML=return_option;
           // console.log(msg.length);
          //alert( msg.name);
         // location.reload();
        });
}



function getInnerText(textt){
    //var a=this.innerText;
    var a =document.getElementById('suggestion_div').value;
    document.getElementById('productName').value=a;
    document.getElementById('suggestion_div').style.display="none";
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/product?name=${a}`
        
      })
        .done(function( msg ) {
            console.log(msg)
            document.getElementById('productPrice').value=msg[0].sellingPrice;
            document.getElementById('quantity').value=msg[0].quantity;
         });
}

///     Calculate Price on cart
function calculate_total(count){
    let quantity=document.getElementsByClassName('itemQuantity')[count].value;
    let price=document.getElementsByClassName('itemSinglePrice')[count].value;
    let total=quantity * price;
    document.getElementsByClassName('itemPrice')[count].value=total;


    let lenght_of_total=document.getElementsByClassName('itemPrice').length;
    var grand_total=0;
    for (var a=0;a<lenght_of_total;a++){
        grand_total+=parseInt(document.getElementsByClassName('itemPrice')[a].value);
    }
    
    $('#grandTotal').val(grand_total)
}


////    Calculate Grand Totall
function calculate(){
    let price = document.getElementById('productPrice').value;
    let quantity = document.getElementById('quantityDesired').value;
    let totalPrice = price * quantity
    document.getElementById('totalPrice').value = totalPrice

    let lenght_of_total=document.getElementsByClassName('itemPrice').length;
    var grand_total=0;
    for (var a=0;a<lenght_of_total;a++){
        grand_total+=parseInt(document.getElementsByClassName('itemPrice')[a].value);
    }
    
    $('#grandTotal').val(grand_total);
}



////    Add to Cart Function

//////      Adding to the table of Items to be sold
let productTracker = 0
function addItemToCart(){
    let cartDiv = document.getElementById('receipt_table');
    let newItem = document.createElement('tr');
    let itemIdBase = $('#productName').val();
    newItem.setAttribute('id',`${itemIdBase}`);
    newItem.setAttribute('class','border-bottom border-dark')
    newItem.innerHTML =   `
                            
    <td class=""><input type="text" id="${itemIdBase}" onchange="calculate_total(${productTracker}) " value="${itemIdBase}" class="itemName" readonly /></td>
    <td class=""><input type="number" id="${itemIdBase}" onchange="calculate_total(${productTracker})" value="${$('#productPrice').val()}" class="itemSinglePrice" readonly/></td>
    <td class=""><input type="number" id="${itemIdBase}" onchange="calculate_total(${productTracker})" value="${$('#quantityDesired').val()}" class="itemQuantity" /></td>
    <td class=""><input type="number" id="${itemIdBase}" onchange="calculate_total(${productTracker})" value="${$('#totalPrice').val()}" class="itemPrice" readonly/></td>`;
    cartDiv.appendChild(newItem);
    let lenght_of_total=document.getElementsByClassName('itemPrice').length;
    var grand_total=0;
    for (var a=0;a<lenght_of_total;a++){
        grand_total+=parseInt(document.getElementsByClassName('itemPrice')[a].value);
    }
    
    $('#grandTotal').val(grand_total)
    productTracker++
    document.getElementById("addToCart").reset()
}


///     Jquery Calling Function to add to cart 
$(document).ready(
    $("#addToCart").submit((event)=>{
        event.preventDefault()
        if($("#productName").val()&& $("#quantityDesired").val()){
            addItemToCart()
        }
        else{
            alert('Please Input Quantity and Product Name');
        }
    })
)


///     Call Funtion to Checkout After Checking if conditions like Customer Id and Item Is Present
function initSale(){
    let b = document.getElementById('receipt_table')

    if(!($('#customerId').val())){
        alert('Please Input Customer ID')
    }
    else{ 
        if(b.childElementCount<2){
            alert('Please Select a Product(s) To Purchase');
        }
        else{
            makeSale()
        }
    }

}


/////   Process The Sale (CHECKOUT FUNCTION)
function makeSale(){
    let check;
    let cartList = document.getElementById('receipt_table');
    cartList = cartList.children
    let items = {};
    let grandTotal = $('#grandTotal').val();
    let customerId = document.getElementById('customerId').value;
    let staffId = window.localStorage.getItem('staffId');
    let saleDate = new Date();
    let saleId = `${customerId}/${saleDate.getTime()}/${saleDate.getUTCFullYear()}/${saleDate.getUTCMonth()}/${saleDate.getUTCDate()}/${staffId}`;
    
    for (let i=1; i<cartList.length; i++){
        let name = cartList[i].getElementsByClassName('itemName');
        name = name[0].value;
        let price = cartList[i].getElementsByClassName('itemPrice');
        price = price[0].value;
        let quantity = cartList[i].getElementsByClassName('itemQuantity');
        quantity = quantity[0].value;
        let item = {name:name,price:price,quantity:quantity}
        items[`${name}`] = item
    }
    console.log(items)
     $(document).ready(
        $.ajax({
            method: "POST",
            url: `http://localhost:3000/sales`,
            data: JSON.stringify({
                item:items,
                grandPrice:grandTotal,
                id:saleId,
                time:saleDate,
                soldBy:staffId,
                boughtBy:customerId                  
            }),
            contentType: "application/json"

            
          }).done(
              function(msg){
                alert('Done' + msg)
                console.log(msg)
             })
    );
}

let formCounter = 0;
//function to get all products  
$(document).ready(function(){
    if(!$("#productsList").val()){return false}
    $("#productsList").ready(function(){
        
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/product/",
             
          })
            .done(
                function(msg) {
                    console.log(msg)
                    let row = document.getElementById('productsList');
                for(let i=0; i<msg.length; i++){
                    let column = document.createElement('div');
                    column.setAttribute('class','col-sm-3')
                    column.innerHTML = `
                    <form class="productForms border border-dark rounded" id="${formCounter}">
                        <div class="form-group">
                          <label>Name</label>
                          <input type="text" class="form-control productName" value="${msg[i].name}" readonly>
                        </div>
                        <div class="form-group">
                          <label>Quantity</label>
                          <input type="number" class="form-control productQuantity" value="${msg[i].quantity}" disabled="false" >
                        </div>
                        <div class="form-group">
                          <label>Selling Price</label>
                          <input type="number" class="form-control productPrice" value="${msg[i].sellingPrice}" disabled>
                        </div>
                        <small>
                        <input type="hidden" class="productId" value="${msg[i].id}"/>
                        <input type="checkbox" class="checked" onchange="allowEdit(${formCounter})"/> <label class="p-auto">Allow Edit</label>
                        
                        
                        <input onclick="updateProduct(${formCounter})" type="button" value='Update' class="btn btn-success m-auto" />
                        <input onclick="deleteProduct(${formCounter})" type="button" value='Delete' class="btn btn-danger m-auto" />
                        </small>
                    </form>
                    <br>`
                  row.append(column)
                  formCounter++
                }
              
            });
        
    })
  })

  ///       Allow Update
  function allowEdit(index){
    let form = document.getElementById(`${index}`)
    let productQuantity = form.getElementsByClassName('productQuantity')[0];
    let productPrice = form.getElementsByClassName('productPrice')[0];
    if(productPrice.disabled===true){
        console.log(productPrice.disabled);
        productQuantity.disabled = false
        productPrice.disabled = false;
    }   else{
        console.log(productPrice.disabled);
        productQuantity.disabled=true;
        productPrice.disabled=true;
    }
    
  }

///     Update Product
function updateProduct(index){
   
    let form = document.getElementById(`${index}`)
    let productName = form.getElementsByClassName('productName')[0].value;
    let productQuantity = form.getElementsByClassName('productQuantity')[0].value;
    let productPrice = form.getElementsByClassName('productPrice')[0].value;
    let productId = form.getElementsByClassName('productId')[0].value;
    let decision = confirm('Are You Sure You want to update?');
    if (!decision){return decision}
    $.ajax({
        method:"PATCH",
        url: `http://localhost:3000/product/${productId}`,
        data:{
            name:productName,
            quantity:productQuantity,
            sellingPrice:productPrice
            }
    }).done(
        function(res){
            alert(`${productName} Details updated`);
            console.log(res);
        }
    ).fail(
        function(err){
            alert('Something Is Wrong');
            console.log(err);
        }
    )
}


///     Delete Product
function deleteProduct(index){
    let form = document.getElementById(`${index}`)
    let productName = form.getElementsByClassName('productName')[0].value;
    let productId = form.getElementsByClassName('productId')[0].value;
    let decision = confirm('Are You Sure You want to delete?');
    if (!decision){return decision}
    $.ajax({
        method:"DELETE",
        url: `http://localhost:3000/product/${productId}`,
        
    }).done(
        function(){
            alert(`${productName} Details Deleted`)
        }
    )
}