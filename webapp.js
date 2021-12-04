{
    function populateTable(root) {
        console.log("hi");

    }

    /////// hold mealname and calorie and push into the table
    // const mealName = document.createElement("meal-name");
    //const calorie = document.createElement("meal-calorie");





    for (const root of document.querySelectorAll(".container[data-url]")) {
        const table = document.createElement("table");
        const mealName = document.createElement("meal-name");
        const calorie = document.createElement("meal-calorie");

        table.classList.add("container-table");
        mealName.classList.add("container-meal-name");
        calorie.classList.add("container-meal-calorie");

        document.getElementById("submit-btn").onclick = function () {
            document.getElementById("table");
            document.getElementById("mealName");
            document.getElementById("calorie");
        };

        table.innerHTML = `
                <thead>
                    <tr></tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>breakfast</td>
                        <td>1500</td>
                        <td>11/28</td>
                    </tr>
                </tbody>
                `;



        //add event listener for the submit button
        //populate table with data

        //submit.querySelector(".submit-button").addEventListener("click", () => {
        //   populateTable(root);

        //});
        root.append(table, mealName, calorie);


        populateTable(root);
    }
}
