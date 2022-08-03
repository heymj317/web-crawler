

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
//FILE TREE STRUCTURE
$(function () {
    $('#jstree_demo_div').jstree();
    console.log("jstree is RUNNING");
    $('button').on('click', function () {
        $('#jstree_demo_div').jstree(true).select_node('child_node_1');
        $('#jstree_demo_div').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree_demo_div').select_node('child_node_1');
    });

    $('#jstree_demo_div').on("changed.jstree", function (e, data) {
        console.log(data.node.text);
    });

});



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

        return data;


    }).then(data => {
        let paths = data;
        let result = [];
        let level = { result };

        for (var i = 0; i < data.length; i++) {
            const url = data[i]['url'];
            url.split('/').reduce((r, name, i, a) => {
                if (!r[name]) {
                    r[name] = { result: [] };
                    r.result.push({ text: name, children: r[name].result })
                }

                return r[name];
            }, level)
        }
        paths.forEach(path => {

        })

        console.log(result)
    });
});








