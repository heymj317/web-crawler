

const $input = $("input[name='Search']");
const $userform = $("#user-form");


/// - - - USER QUERY
// $userform.submit(function (event) {
//     event.preventDefault();
//     $.get("/https://github.com/", (data) => {
//         console.log(data);
//     })
//     //SEARCH DATABASE, POPULATE RESULTS TO WEBPAGE
// });

$userform.submit(function (event) {
    event.preventDefault();
    const userInput = $input.val();
    const searchTerm = encodeURIComponent(`${userInput}`);
    $.get(`/query/${searchTerm}`, (data) => {
        const result = JSON.stringify(data);
        let $results = $("#results").empty();

        let $row = $(`<div class="row"></div>`);
        $row.html(`<div class="row">${result}</div>`);
        $row.appendTo($results);
        console.log(data);
    });
});


