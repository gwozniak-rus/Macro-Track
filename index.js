

document.querySelector('table tbody').addEventListener('click', function (event) {
    //insertRowIntoTable(event.target.dataset.id);

    //need method to insert a new row


    //need meal name to be held somewhere

    //need number of calories to be held somewhere


    const submitBtn = document.querySelector('#submit-btn');

    submitBtn.onclick = function () {

        const mealInput = document.querySelector('#meal-input');
        const meal = mealInput.value;
        mealInput.value = "";
        const calorieInput = document.querySelector('#calorie-input');
        const calorie = calorieInput.value;
        calorieInput.value = "";


        fetch('http://localhost:5500/insert', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ meal: meal })
        })
            .then(response => response.json())
            .then(data => insertRowIntoTable(data['data']));
    }

    //need method to insert a new row
    function insertRowIntoTable(data) {
        console.log(data);
        const table = document.querySelector('table tbody');
        const isTableData = table.querySelector('.no-data');
        let tableHtml = "<tr>";

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (key === 'dateAdded') {
                    data[key] = new Date(data[key]).toLocaleString();
                }
                tableHtml += `<td>${data[key]}</td>`;
            }
        }

        tableHtml += "</tr>";

        if (isTableData) {
            table.innerHTML = tableHtml;
        } else {
            const newRow = table.insertRow();
            newRow.innerHTML = tableHtml;
        }
    }

    function loadHTMLTable(data) {
        const table = document.querySelector('table tbody');

        if (data.length === 0) {
            table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
            return;
        }
        let tableHtml = "";

        data.foreach(function ({ meal, calorie }) {
            tableHtml += "<tr>";
            tableHtml += `<td>${meal}</td>`;
            tableHtml += `<td>${calorie}</td>`;
            //tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
            tableHtml += "</tr>";
        });
        table.innerHTML = tableHtml;
    }
});
