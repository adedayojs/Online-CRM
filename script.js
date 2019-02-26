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

    // Login Validation Script
    
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
                    alert('No match');
                }
                else{
                    console.log(res)
                    document.cookie = `staffId=${res[0].id}`
                }
                    //else{alert('There is a problem')}
                
               //alert(`Our Staff FirstName is ${res[0].firstname} Our Staff Lastname is ${res[0].lastname}  `);
               
            })
        
    }
}
    )

    )