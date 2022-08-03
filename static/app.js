

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
    $.jstree.defaults.core.data = true;
    $.jstree.defaults.core.check_callback = true;


    $('#jstree_results').jstree({
        'core': {
            'data': [
                'Simple root node',
                {
                    'text': 'Root node 2',
                    'state': {
                        'opened': true,
                        'selected': true
                    },
                    'children': [
                        { 'text': 'Child 1' },
                        'Child 2'
                    ]
                }
            ]
        }
    });


    console.log("jstree is RUNNING");
    $('button').on('click', function () {
        $('#jstree_demo_div').jstree(true).select_node('child_node_1');
        $('#jstree_demo_div').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree_demo_div').select_node('child_node_1');
    });

    $('form').on('submit', function (event) {
        $('#jstree_demo_div').jstree({
            'core': {
                'data': function () {
                    let nodes = [];
                    event.preventDefault();
                    const userInput = $input.val();
                    const searchTerm = encodeURIComponent(`${userInput}`);

                    if (isValidUrl(userInput)) {
                        $.get(`/query/${searchTerm}`, (data) => {
                            const result = JSON.stringify(data);
                            let $results = $("#jstree_results").empty();

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

                            console.log(result)
                            nodes = result;
                            return data;

                        });
                    };
                    console.log(nodes);
                    return nodes;
                }
            }
        });
    });

    $('#jstree_results').on("changed.jstree", function (e, data) {
        console.log(data.node);
    });

    $userform.submit(function (event) {
        event.preventDefault();
        const userInput = $input.val();
        const searchTerm = encodeURIComponent(`${userInput}`);

        if (isValidUrl(userInput)) {
            $.get(`/query/${searchTerm}`, (data) => {
                const result = JSON.stringify(data);
                let $results = $("#jstree_results").empty();

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


                $('div:jstree_results').jstree(true).destroy();
                $('#jstree_results').jstree(true).destroy();
                $('#jstree_demo_div').jstree();
                $('#jstree_demo_div').jstree({
                    'core': {
                        'data': result
                    }
                });

                const tree = JASON.stringify(result);
                $('#jstree_demo_div').jstree({
                    'core': {
                        'data': `${tree}`
                    }
                });
                return data;

                //const tree = JSON.stringify(data);
                let $tree = $("#jstree_results").empty();



            });
        };


    });

});




const isValidUrl = urlString => {
    var a = document.createElement('a');
    a.href = urlString;
    return (a.host && a.host != window.location.host);
}






