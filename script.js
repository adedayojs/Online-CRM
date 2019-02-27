$(document).ready(
    $("#registrationForm").submit(function(event){
        event.preventDefault();
        
        if ( $("#username").val()) {

            $.ajax({
              method: "POST",
              url: `http://localhost:3000/Personal/AR6hDbT`,
              
            })
            .done(function(res){
                alert("Deleted");
            })
        
    }
}
    )

//  Staff Login Validation Script
    
)

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
                    //document.cookie = `staffId=${res[0].id}, Firstname=${res[0].firstname}, Lastname=${res[0].lastname}`
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

//  Get a list of all product
$(document).on('load', 
    function(){
        $.ajax({
            method:"GET",
            url: `http://localhost:3000/product`
        })
        .done(function(res){
            alert(res);
            let select = document.createElement('select')
            let doc = getElementById('selectProduct');
            doc.appendChild(select)
            res.forEach(function (product){
                alert(product.name);
                let option = document.createElement('option');
                option.innerText = product.name
                select.appendChild(option)
            })
            let divInDoc = getElementById('selectProduct');
            divInDoc.appendChild('')
        })
        
    }
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
                    alert('Welcome Admin');
                    //console.log(res)
                    window.localStorage.clear()
                    window.localStorage.setItem('adminId', `${res[0].id}`)

                    window.location="admin.html";
                }
                    //else{alert('There is a problem')}
                
               //alert(`Our Staff FirstName is ${res[0].firstname} Our Staff Lastname is ${res[0].lastname}  `);
               
            })
        
    }
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
          console.log(current_cookie[1]); 
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
                  alert( "Staff successfully added" );
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

//////      Adding to the table of Items to be sold
function addItemToCart(){
    let cartDiv = document.getElementById('cutomerDetails');
    let newForm = document.createElement('form');
    newForm.innerHTML =   ``;
    table.appendChild(tableRow)
}
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
              //console.log(opt);
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
        url: `http://localhost:3000/product?=${a}`
        
      })
        .done(function( msg ) {
            document.getElementById('productPrice').value=msg[0].sellingPrice;
            document.getElementById('quantity').value=msg[0].quantity;
         });
}

function calculate(){
    let price = document.getElementById('productPrice').value;
    let quantity = document.getElementById('quantityDesired').value;
    let totalPrice = price * quantity
    document.getElementById('totalPrice').value = totalPrice
}

////    Add to Cart Function
$(document).ready(
    $("#addToCart").submit((event)=>{
        event.preventDefault()
        if($("#productName").val()&& $("#quantityDesired").val()){
            addItemToCart()
        }
    })
)