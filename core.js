function initialize() {
    $("#projects").hide();
    $("#reachout").hide();
    getGithub();
}

function getGithub() {
    $.getJSON( "https://api.github.com/users/tylerjwoodfin/repos", {
    format: "json"
    }).done(function( data ) {
        $("#projects").empty();
        $(_.reverse(_.sortBy(data, "updated_at"))).each(function(i, item) {
            $("#projects").append(`<a href="${item.html_url}" class="sub" target=_new>${item.name}</a>\n`);
            return i < 6;
        })
    }).then(function() {
        $("#projects").append(`<a href="https://www.github.com/tylerjwoodfin" class="sub" target=_new>More...</a>`);
    });
};

function toggleGitHub() {
    if($("#projects")[0].innerHTML.split("<a").length < 2) {
        getGithub();
    }
    $("#projects").toggle();

    if($("#projects")[0].style.display !== 'none') {
        $("#button-latest")[0].style.textDecoration = "underline";
    } else {
        $("#button-latest")[0].style.textDecoration = "";
    }
}

function toggleReachOut() {
    $("#reachout").toggle();

    if($("#reachout")[0].style.display !== 'none') {
        $("#button-reachout")[0].style.textDecoration = "underline";
    } else {
        $("#button-reachout")[0].style.textDecoration = "";
    }
}
