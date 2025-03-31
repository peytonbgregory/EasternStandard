

document.addEventListener('DOMContentLoaded', 
    function() {

        let api = new EmployeeApi();

        api.requireLogin().then(
            function( auth_data ) {

                let employee_id = auth_data.id;
                let user_role = auth_data.role;

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
                
                const logoutLink = document.getElementById('logout_link');
                if (logoutLink) {
                    logoutLink.addEventListener('click', function (e) {
                        e.preventDefault();

                        api.logout().then(function (result) {
                            if (result.success) {
                                window.location.href = 'login.html';
                            } else {
                                alert('Logout failed.');
                            }
                        });
                    });
                }
                if (user_role === 'admin') {
                    console.log("User is admin!");
                
                    const adminControls = document.getElementById('admin_controls');
                    const employeeSelect = document.getElementById('employee_select');
                
                    // Show the dropdown
                    adminControls.style.display = 'block';
                
                    // Load employee list
                    fetch('/api.php?obj=employee&req=list')
                        .then(res => res.json())
                        .then(employeeList => {
                            employeeList.forEach(emp => {
                                const option = document.createElement('option');
                                option.value = emp.id;
                                option.textContent = `${emp.last_name}, ${emp.first_name}`;
                                employeeSelect.appendChild(option);
                            });
                        });
                
                    // Listen for selection change
                    employeeSelect.addEventListener('change', function () {
                        const selectedId = this.value;
                
                        if (selectedId) {
                            loadData(selectedId).then(function (employee_data) {
                                FormFiller.apply(employee_data);
                                document.getElementById('id').value = selectedId;
                            });
                        }
                    });
                }
                
            }
        );
    }
);

const loadData = function(id) {
    return fetch(`/api.php?obj=employee&req=get&id=${id}`)
    .then(res => res.json()); 
}
