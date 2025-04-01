

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
                        // console.log("Employee Data:", employee_data);
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
                        
                        const statusBox = document.getElementById('form_status');

                        if (saveResult.success) {
                            statusBox.className = 'form-status success';
                            statusBox.textContent = 'Employee record saved.';
                        } else {
                            statusBox.className = 'form-status error';
                            statusBox.textContent = saveResult.msg || 'Failed to save record.';
                        }

                        statusBox.style.display = 'block';
                    }
                );

                const userLabel = document.getElementById('user_role_label');
                if (userLabel) {
                    userLabel.textContent = `Logged in as: ${auth_data.username} (${auth_data.role}) `;
                }
                
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
                                option.textContent = `${emp.first_name} ${emp.last_name} (${emp.role})`;
                                employeeSelect.appendChild(option);
                            });
                        });
                
                    // Listen for selection change
                    employeeSelect.addEventListener('change', function () {
                        const selectedId = this.value;

                        const statusBox = document.getElementById('form_status');
                        statusBox.style.display = 'none';

                
                        if (selectedId) {
                            loadData(selectedId).then(function (employee_data) {
                                FormFiller.apply(employee_data);
                                document.getElementById('id').value = selectedId;
                            });
                        }

                        const formInstructions = document.getElementById('form_instructions');

                        if (selectedId) {
                            loadData(selectedId).then(function (employee_data) {
                                FormFiller.apply(employee_data);
                                document.getElementById('id').value = selectedId;

                                // Change instructions text depending on who is being edited
                                if (parseInt(selectedId) === auth_data.id) {
                                    formInstructions.textContent = 'Enter your employee information below';
                                } else {
                                    formInstructions.textContent = `Editing ${employee_data.first_name} ${employee_data.last_name}'s employee profile`;
                                }
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
