

document.addEventListener('DOMContentLoaded', 
    function() {

        let api = new EmployeeApi();

        api.requireLogin().then(
            function( auth_data ) {

                let employee_id = auth_data.id;

                const form = document.getElementById('employee_record');

                loadData(employee_id).then(
                    function(employee_data) {
                        console.log("Employee Data:", employee_data);
                        FormFiller.apply(employee_data);
                        document.getElementById('id').value = employee_id;
                    }
                )
        
                form.addEventListener('submit', 
                    async function(e) {
                        e.preventDefault();
                    
                        let api = new EmployeeApi();
                    
                        const formData = new FormData(form);
                        const data = Object.fromEntries(formData.entries());
                    
                        const saveResult = await api.saveData(data);
                        
                        if (saveResult.success) {
                            alert('Saved!');
                        } else {
                            alert('Error: ' + saveResult.msg);
                        }
                    }
                );
            }
        );
    }
);

const loadData = function(id) {
    return fetch(`/api.php?obj=employee&req=get&id=${id}`)
    .then(res => res.json()); 
}

