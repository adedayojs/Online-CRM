//function to get all user  
$(document).ready(function(){
  $("#view_user_body").ready(function(e){
      
      $.ajax({
          method: "GET",
          url: "http://localhost:3000/user/",
           
        })
          .done(function( msg ) {
            
      //      console.log(msg);
            let a="<table id=\"update_table\">"+
            "<tr><td>Id</td><td>Names</td><td>View</td><td>Delete</td></tr>";
            for(var b=0;b<msg.length;b++){
              a+="<tr><td>" +msg[b].id+ "</td><td>"+msg[b].firstname+" "+msg[b].lastname+"</td><td><button onclick=\"view_details("+b+")\">View</button> </td><td><button onclick=\"perform_deletion("+b+")\">Delete</button></td></tr><input type=\"hidden\" class=\"hidden_value\" value=\""+msg[b].id+"\">";
        //    console.log(a);
            }
            a+="</table>";
            document.getElementById('view_user_body').innerHTML=a;
          });
      
  })
})
//function to view user details
function view_details(value_passed){
var current_id=document.getElementsByClassName('hidden_value')[value_passed].value;
$.ajax({
method: "GET",
url: "http://localhost:3000/user/"+current_id,
 
})
.done(function( msg ) {
  let innerForm=
  "<p><input type=\"hidden\" class=\"update_text\" id=\"id_value\"value=\""+msg.id+"\" /></p>"+
  "<p><input type=\"text\" class=\"update_text\" id=\"firstname\" value=\""+msg.firstname+"\" onkeyup=\"search_for_change()\"/></p>"+
  
  "<p><input type=\"text\" class=\"update_text\" id=\"lastname\" value=\""+msg.lastname+"\" onkeyup=\"search_for_change()\"/></p>"+
  "<p><input type=\"text\" class=\"update_text\" id=\"phone\" value=\""+msg.phone+"\" onkeyup=\"search_for_change()\"/></p>"+
  "<p><input type=\"email\" class=\"update_text\" id=\"email\" value=\""+msg.email+"\" onkeyup=\"search_for_change()\"/></p>"+
  
  "<p><input type=\"submit\" id=\"update_submit\" value=\"Update\"  disabled=\"disabled\"/> "+
  "<input type=\"button\" id=\"update_cancel\" value=\"Cancel\"  onclick=\"hide_pop_up(\'update_div\')\"/></p>"
  document.getElementById('update_div').style.display="block";
  document.getElementById('update_form').innerHTML=innerForm;

})
}
//function to hide pop up menu
function hide_pop_up(div){
document.getElementById(div).style.display="none";
}
//function to search if there is any changes in form fields
function search_for_change(){
let current_id=document.getElementById('id_value').value;
let firstname=document.getElementById('firstname').value;
let lastname=document.getElementById('lastname').value;
let phone=document.getElementById('phone').value;
let email=document.getElementById('email').value;
//alert (current_id);
$.ajax({
method: "GET",
url: "http://localhost:3000/user/"+current_id,
 
})
.done(function( msg ) {
  firstname_from_db=msg.firstname;
  lastname_from_db=msg.lastname;
  phone_from_db=msg.phone;
  email_from_db=msg.email;
  if((firstname!==firstname_from_db)||(lastname!==lastname_from_db)||(phone!==phone_from_db)||(email!==email_from_db)){
    document.getElementById('update_submit').disabled=false;
  }
  else{
    document.getElementById('update_submit').disabled=true;
  }
})

}
//function to update user details
$(document).ready(function(){
$( "#update_form" ).submit(function( event ) {
event.preventDefault();  

let current_id=document.getElementById('id_value').value;
let new_firstname=document.getElementById('firstname').value;
let new_lastname=document.getElementById('lastname').value;
let new_phone=document.getElementById('phone').value;
let new_email=document.getElementById('email').value;
var obj={
    firstname:new_firstname,
    lastname:new_lastname,
    phone:new_phone,
    email:new_email,
    
}
//console.log(obj);
  $.ajax({
      method: "PATCH",
      url: "http://localhost:3000/user/"+current_id,
      data:obj 
    })
      .done(function( msg ) {
        //console.log(msg);
        alert( "User Deatils updated" );
        location.reload();
      });
  
});
});
//function to delete user from db
function perform_deletion(value_passed){
let current_id=document.getElementsByClassName('hidden_value')[value_passed].value;
let confirmation=confirm("Are you sure?");
if (confirmation===true){
$.ajax({
method: "DELETE",
url: "http://localhost:3000/user/"+current_id,

})
.done(function( msg ) {
  //console.log(msg);
  alert( "User file successfully Deleted" );
  location.reload();
});

}
}
//function to view staff
$(document).ready(function(){
$("#view_user_body").ready(function(){

$.ajax({
    method: "GET",
    url: "http://localhost:3000/staff/",
     
  })
    .done(function( msg ) {
      
//      console.log(msg);
      let a="<table id=\"update_table\">"+
      "<tr><td>Id</td><td>Names</td><td>View</td><td>Delete</td></tr>";
      for(var b=0;b<msg.length;b++){
        a+="<tr><td>" +msg[b].id+ "</td><td>"+msg[b].firstname+" "+msg[b].lastname+"</td><td><button onclick=\"view_staff_details("+b+")\">View</button> </td><td><button onclick=\"perform_staff_deletion("+b+")\">Delete</button></td></tr><input type=\"hidden\" class=\"hidden_value\" value=\""+msg[b].id+"\">";
  //    console.log(a);
      }
      a+="</table>";
      document.getElementById('view_staff_body').innerHTML=a;
    });

})
})
//function to view staff details
function view_staff_details(value_passed){
var current_id=document.getElementsByClassName('hidden_value')[value_passed].value;
$.ajax({
method: "GET",
url: "http://localhost:3000/staff/"+current_id,

})
.done(function( msg ) {
let innerForm=
"<p><input type=\"hidden\" class=\"update_text\" id=\"id_value\"value=\""+msg.id+"\" /></p>"+
"<p><input type=\"text\" class=\"update_text\" id=\"firstname\" value=\""+msg.firstname+"\" onkeyup=\"search_for_change_in_staff()\"/></p>"+

"<p><input type=\"text\" class=\"update_text\" id=\"lastname\" value=\""+msg.lastname+"\" onkeyup=\"search_for_change_in_staff()\"/></p>"+
"<p><input type=\"text\" class=\"update_text\" id=\"phone\" value=\""+msg.phone+"\" onkeyup=\"search_for_change_in_staff()\"/></p>"+
"<p><input type=\"email\" class=\"update_text\" id=\"email\" value=\""+msg.email+"\" onkeyup=\"search_for_change_in_staff()\"/></p>"+

"<p><input type=\"submit\" id=\"update_submit\" value=\"Update\"  disabled=\"disabled\"/> "+
"<input type=\"button\" id=\"update_cancel\" value=\"Cancel\"  onclick=\"hide_pop_up(\'update_div\')\"/></p>"
document.getElementById('update_div').style.display="block";
document.getElementById('update_staff_form').innerHTML=innerForm;

})
}
// function to search for any changes made in staff form 
function search_for_change_in_staff(){
let current_id=document.getElementById('id_value').value;
let firstname=document.getElementById('firstname').value;
let lastname=document.getElementById('lastname').value;
let phone=document.getElementById('phone').value;
let email=document.getElementById('email').value;
//alert (current_id);
$.ajax({
method: "GET",
url: "http://localhost:3000/staff/"+current_id,

})
.done(function( msg ) {
firstname_from_db=msg.firstname;
lastname_from_db=msg.lastname;
phone_from_db=msg.phone;
email_from_db=msg.email;
if((firstname!==firstname_from_db)||(lastname!==lastname_from_db)||(phone!==phone_from_db)||(email!==email_from_db)){
  document.getElementById('update_submit').disabled=false;
}
else{
  document.getElementById('update_submit').disabled=true;
}
})

}
//function to update staff details
$(document).ready(function(){
$( "#update_staff_form" ).submit(function( event ) {
event.preventDefault();  

let current_id=document.getElementById('id_value').value;
let new_firstname=document.getElementById('firstname').value;
let new_lastname=document.getElementById('lastname').value;
let new_phone=document.getElementById('phone').value;
let new_email=document.getElementById('email').value;
var obj={
  firstname:new_firstname,
  lastname:new_lastname,
  phone:new_phone,
  email:new_email,
  
}
//console.log(obj);
$.ajax({
    method: "PATCH",
    url: "http://localhost:3000/staff/"+current_id,
    data:obj 
  })
    .done(function( msg ) {
      //console.log(msg);
      alert( "Staff Details updated" );
      location.reload();
    });

});
});
//function to delete staff
function perform_staff_deletion(value_passed){
let current_id=document.getElementsByClassName('hidden_value')[value_passed].value;
let confirmation=confirm("Are you sure?");
if (confirmation===true){
$.ajax({
method: "DELETE",
url: "http://localhost:3000/staff/"+current_id,

})
.done(function( msg ) {
  //console.log(msg);
  alert( "Staff successfully Deleted" );
  location.reload();
});

}
}
