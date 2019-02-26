$(document).ready(function() {
  $(".clickHide").click(function() {
    $("#book").hide("slow", function() {
      // Animation complete.
    });
  });
  $(".clickShow").click(function() {
    $("#book").show("slow", function() {
      // Animation complete.
    });
  });

  $("form").submit(function(event) {
    if ($("#firstname").val() && $("#lastname").val()) {
      $.ajax({
        method: "GET",
        url: "http://localhost:3000/comments?postId=1"
      })
        .done(function(res) {
          alert("Data Saved: ");
        })
        .fail(function() {
          alert("error");
        });
      $("span")
        .text("Validated...")
        .show();
      return;
    }

    $("span")
      .text("Not valid!")
      .show()
      .fadeOut(1000);
    event.preventDefault();
  });
});
