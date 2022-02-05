function initialize() {
    $("#latest").hide();
    $(`.textarea-reachout-send-loading`).hide();
    $("#reachout").hide();
    getLatest();
}

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
    }
}

function handleSend() {
    $(`.textarea-reachout-send-loading`).show();
    $(`.textarea-reachout-send`).hide();
}
