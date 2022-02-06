// initialize
$(document).ready(function () {
    $("#reachout").removeClass("hidden");
    $("#latest").removeClass("hidden");
    $(`.load-spin-send`).removeClass("hidden");
    $("#reachout").hide();
    $("#latest").hide();
    $(`.load-spin-send`).hide();
});

function getLatest() {
    $.getJSON("https://api.github.com/users/tylerjwoodfin/repos", {
        format: "json",
    })
        .done(function (data) {
            $("#latest").empty();
            $(_.reverse(_.sortBy(data, "pushed_at"))).each(function (i, item) {
                $("#latest").append(
                    `<a href="${item.html_url}" class="sub" target=_new>${item.name}</a>\n`
                );
                return i < 6;
            });
        })
        .then(function () {
            $("#latest").append(
                `<a href="https://www.github.com/tylerjwoodfin" class="sub" target=_new>More...</a>`
            );
        });
}

function toggleButton(name) {
    $(`#${name}`).toggle();

    if (name === "latest" && $("#latest")[0].innerHTML.split("<a").length < 2) {
        getLatest();
    }
    if (name === "reachout") {
        $(`.button-reachout-send`).show();
        $(`.textarea-${name}`)[0].focus();
    }

    // show
    if ($(`#${name}`)[0].style.display !== `none`) {
        $(`#button-${name}`)[0].style.textDecoration = `underline`;
        $(`[id^=button]`).not(`#button-${name}`).hide();
        $(`[id^=arrow]`).not(`#arrow-${name}`).hide();
        $(`[id^=arrow]`).show();
    } else {
        //hide
        $(`textarea`).val("");
        $(`#button-${name}`)[0].style.textDecoration = ``;
        $(`[id^=arrow]`).hide();
        $(`[id^=button]`).show();
        $("#reachout-send-results").html("");
    }
}

function handleSend() {
    $(`.button-reachout-send`).hide();
    $(`.load-spin-send`).show();

    $.get(
        "/assets/php/feedback.php?subject=Website&message=" +
            $("#textarea-reachout")[0].value,
        function (data) {
            $("#reachout-send-results").text(
                "Thank you! Your message has been sent."
            );
            $("#textarea-reachout")[0].value = "";
            $("#textarea-reachout").hide();
            $(`.load-spin-send`).hide();
        },
        "text"
    ).fail(function () {
        $("#reachout-send-results").html(
            "There was a problem sending your message. Please reach out through <a href='https://linkedin.com/in/tylerjwoodfin' target='_new'>LinkedIn</a>."
        );
        $(`.button-reachout-send`).show();
        $(`.load-spin-send`).hide();
    });
}
