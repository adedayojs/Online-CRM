//function to view staff
$(document).ready(function(){
    $("#view_transaction_div").ready(function(){
        
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sales/",
             
          })
            .done(function( msg ) {
              var s_n=1;
             for (let a=0;a<msg.length;a++){  
             var table_row=document.createElement("tr");
             var table_data=''; 
              
              let transaction_id=msg[a].id;
             
             let grandPrice=msg[a].grandPrice;
             let time_transact=msg[a].time;
             let soldBy=msg[a].soldBy;
             let boughtBy=msg[a].boughtBy;
                
             let obj=msg[a].item;
             table_data+="<td>"+s_n+"</td>";
              table_data+="<td>"+transaction_id+"</td>";
              var obj_keys=Object.keys(obj);
              var internal_data='';
              for (let b=0;b<obj_keys.length;b++){
              var item_name=obj[obj_keys[b]];
              console.log(item_name);
              var item_main_name=item_name.name;
              //var item_price=item_name.price;
              var item_quantity=item_name.quantity;
              internal_data+="Name: "+item_main_name+"; Quantity: "+item_quantity+"<br/>";  
              
            }
           
            s_n++;
            table_data+="<td>"+internal_data+"</td>";
            table_data+="<td>"+boughtBy+"</td>";
            table_data+="<td>"+soldBy+"</td>";
            table_data+="<td>"+time_transact+"</td>";
            table_row.innerHTML=table_data;
            document.getElementById('table').appendChild(table_row);
            }
             
              
            });
        
    })
  })
  