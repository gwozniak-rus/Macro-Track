{

    const getEntries = () => {
        axios.get('http://localhost:3000/get')
            .then(response => {
                const entries = response.data;
                console.table(entries);
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


    // call the function
    getEntries();
}
