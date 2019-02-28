var counter=0;
function append_to_table(){
    alert('submitted');
    let itemName=document.getElementById('product_name').value;
    let itemPrice=document.getElementById('product_price').value;
    let itemQuantity=document.getElementById('product_quantity').value;
    let itemTotal=document.getElementById('product_total').value;
    var table_row=document.createElement("tr");
    var table_data="<td><input type=\"text\" value=\""+itemName+"\"/ class=\"itemName\" readonly/></td>";
    table_data +="<td><input type=\"number\" value=\""+itemPrice+"\"/ class=\"itemPrice\" readonly/></td>";
    table_data +="<td><input type=\"number\" value=\""+itemQuantity+"\"/ class=\"itemQuantity\" onchange=\"calculate_total("+counter+")\" onkeyup=\"calculate_total("+counter+")\"/></td>";
    table_data +="<td><input type=\"number\" value=\""+itemTotal+"\"/ class=\"itemTotal\" readonly/></td>";

    table_row.innerHTML=table_data;
    document.getElementById('receipt_table').appendChild(table_row);
    document.getElementById('overall_total').value=itemTotal;
    document.getElementById('first_form').reset();
    console.log(counter);
    counter ++;
}
function calculate_total(count){
     var quantity=document.getElementsByClassName('itemQuantity')[count].value;
    if (quantity <=0){
     quantity=0;
     document.getElementsByClassName('itemQuantity')[count].value=quantity;   
    }
    var price=document.getElementsByClassName('itemPrice')[count].value;
    var total=quantity * price;
    document.getElementsByClassName('itemTotal')[count].value=total;
   
    let lenght_of_total=document.getElementsByClassName('itemTotal').length;
    var grand_total=0;
    for (var a=0;a<lenght_of_total;a++){
        grand_total+=parseInt(document.getElementsByClassName('itemTotal')[a].value);
    }
    document.getElementById('overall_total').value=grand_total;
    
}
function generate_invoice(){
    //var 
}