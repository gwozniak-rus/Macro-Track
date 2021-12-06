{

    const getEntries = () => {
        axios.get('http://localhost:3000/get')
            .then(response => {
                const entries = response.data;
                let table = document.getElementById('calorieTable');
                let row, cell;

                for (let i = 0; i < entries.length; i++) {
                    row = table.insertRow();
                    cell = row.insertCell();
                    cell.textContent = entries[i].id;
                    cell = row.insertCell();
                    cell.textContent = entries[i].name;
                    cell = row.insertCell();
                    cell.textContent = entries[i].calories;
                    cell = row.insertCell();
                    cell.textContent = new Date(entries[i].created_at).toString();
                }
            })
            .catch(error => console.error(error));
    };

    const appendToDOM = (newEntry) => {
        console.log(newEntry);
        let table = document.getElementById('calorieTable');
        let row, cell;

        row = table.insertRow();
        cell = row.insertCell();
        cell.textContent = newEntry.id
        cell = row.insertCell();
        cell.textContent = newEntry.name;
        cell = row.insertCell();
        cell.textContent = newEntry.calories;
        cell = row.insertCell();
        cell.textContent = new Date(newEntry.created_at).toString();

    }


    const createEntry = (entry) => {
        axios.post('http://localhost:3000/post', entry).then(response => {
            const addedUser = response.data;
            console.log(`POST: user is added`, addedUser);
            appendToDOM(addedUser[0].entry);

        })
            .catch(error => console.error(error));
    };


    function submitForm() {
        let mealName = document.getElementById('mealName').value;
        let calorie = document.getElementById('calorie').value;

        const newEntry = {
            name: mealName,
            calories: calorie
        };

        createEntry(newEntry);
        document.getElementById('mealName').value = '';
        document.getElementById('calorie').value = '';
    }

    // call the function
    getEntries();
}
