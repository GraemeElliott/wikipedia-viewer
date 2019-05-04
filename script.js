$(document).ready(function() {

  // Autocomplete results
  $(".search-box").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    },
      select: function(event, ui){
        if (ui.item){
          $(".search-box").val(ui.item.value);
        }
        $('.search-btn').submit()
      }
  });

  // On Click Search Wiki
  $(".search-btn").on("click", searchWiki);  
  // on keydown search wiki
  $(window).on('keydown', function(event) {
      if (event.keyCode === 13) {
          searchWiki();
      }
    });
  function searchWiki(event) {
    var searchTerm = $(".search-box").val();
    var searchURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?";

    // Ajax call
    $.ajax ({
      type:"GET",
      url: searchURL,
      async: false,
      dataType: "json",
      success: function (data){
        $(".search-output").html("");        
        for (var i=0; i<data[1].length; i++) {
          $(".search-output").append
          ("<div class='results'><a target='_blank' href="+data[3][i]+">"+data[1][i]+"</a>"+"<p>"+data[2][i]+"</p></div>");
        }; // For loop end      
      }, // Success function end
      failure: function (error) {
        alert("Error");
      }, // Failure end  
    }); // Ajax end
  }; // Search-btn function end

  //Random Article Button
  $(".random-search-btn").on ("click", function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random")
  });
}) // Document end