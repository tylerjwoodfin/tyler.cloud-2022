function initialize() {
    $("#latest").hide();
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
                    `<a href="${item.html_url.tr}" class="sub" target=_new>${
                        item.name.substring(0, 16) +
                        (item.name.length > 16 ? "..." : "")
                    }</a>\n`
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

function toggleLatest() {
    if ($("#latest")[0].innerHTML.split("<a").length < 2) {
        getLatest();
    }

    toggleButton("latest");
}

function toggleButton(name) {
    $(`#${name}`).toggle();
    if ($(`#${name}`)[0].style.display !== `none`) {
        $(`#button-${name}`)[0].style.textDecoration = `underline`;
        $(`[id^=button]`).not(`#button-${name}`).hide();
        $(`[id^=arrow]`).not(`#arrow-${name}`).hide();
        $(`[id^=arrow]`).show();
    } else {
        $(`#button-${name}`)[0].style.textDecoration = ``;
        $(`[id^=arrow]`).hide();
        $(`[id^=button]`).show();
    }
}
