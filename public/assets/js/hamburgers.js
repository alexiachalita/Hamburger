// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");
    var devourStatus = $(this).data("devourstatus");
    devourStatus = (devourStatus == 0) ? 1 : 0;
    console.log(devourStatus);
    var newDevourState = {
      devoured: devourStatus
    };
    //Send the PUT request.
    $.ajax("/api/hamburgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("changed status to", devourStatus);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newHamburger = {
      name: $("#ca").val().trim(),
      devoured: $("[name=devour]:checked").val().trim()
    };
    //Send the POST request.
    $.ajax("/api/hamburgers", {
      type: "POST",
      data: newHamburger
    }).then(
      function() {
        console.log("created new hamburger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-hamburger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/hamburger/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted hamburgers", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
