var selectedId;

$(function () {

    $('#buttonn').dxButton({
        type: "success",
            text: "Add Employee",
            onClick: function () {
                $("#popup").dxPopup("instance").show();
            }
        });
        
    $("#popup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=myForm>").dxForm({
                formData: {
                    //employeeName: "",
                    //mobileNo: "",
                    //gender: "",
                    //email: "",
                },
                items: [
                    {
                        dataField: "employeeName",
                        label: {
                            text: "Employee Name"
                        }
                    },
                    {
                        dataField: "mobile",
                        label: {
                            text: "Mobile Number"
                        }
                    },
                    {
                        dataField: "employeeGender",
                        label: {
                            text: "Gender"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            items: ["Male", "Female"],
                            placeholder: "Select Gender",
                        }
                    },
                    {
                        dataField: "employeeemailId",
                        label: {
                            text: "Email"
                        }
                    },
                    {
                        itemType: "button",
                        horizontalAlignment: "center",
                        buttonOptions: {
                            text: "Submit",
                            onClick: async function () {
                                var form = $('#myForm').dxForm("instance");
                                var formData = form.option("formData")
                                await EmployeeDetails(formData);                      
                                $("#popup").dxPopup("hide");
                                clearForm();
                            }
                        }
                    }
                ]
            });

            return form;

        },
        visible: false,
        hideOnOutsideClick: true,
        showTitle: true,
        title: "Add Employee",
        width: 500,
        height: 350,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });
    
    $("#editPopup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=editForm>").dxForm({
                formData: {
                    //employeeName: "",
                    //mobileNo: "",
                    //gender: "",
                    //email: "",
                },
                items: [
                    {
                        dataField: "employeeName",
                        label: {
                            text: "Employee Name"
                        }
                    },
                    {
                        dataField: "employeeMobileNo",
                        label: {
                            text: "Mobile Number"
                        }
                    },
                    {
                        dataField: "emploeeGender",
                        label: {
                            text: "Gender"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            items: ["Male", "Female"],
                            placeholder: "Select Gender",
                        }
                    },
                    {
                        dataField: "employeeEmailId",
                        label: {
                            text: "Email"
                        }
                    },
                    {
                        itemType: "button",
                        horizontalAlignment: "center",
                        buttonOptions: {
                            text: "Update Changes",
                            onClick: async function () {
                                await UpdateEmployee();
                            }
                        }
                    }
                ]
            });

            return form;

        },
        visible: false,
        hideOnOutsideClick: true,
        showTitle: true,
        title: "Edit Employee",
        width: 500,
        height: 350,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });
    
    $("#deletePopup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=deleteForm>").dxForm({

                colCount:4,
                items: [
                    {
                        label: {
                            text: "Are you sure you want to delete this Employee",
                        }
                    },
                    {
                        itemType: "button",
                        buttonOptions: {
                            text: "Delete",
                            elementAttr: {
                                "id": "deleteButton",
                                "style": "margin-top: 45px; width: 200px;"
                            },
                            onClick: async function () {

                                await deleteemployee();
                            }
                        }
                    },
                    {
                        itemType: "button",
                        buttonOptions: {
                            text: "Cancel",
                            elementAttr: {
                                "id": "deleteButton",
                                "style": "margin-top: 45px; width: 200px;"
                            },
                            onClick: async function () {
                                
                                $("#deletePopup").dxPopup("hide");
                            }
                        }
                    }
                ]
            });

            return form;

        },

        visible: false,
        hideOnOutsideClick: true,
        showTitle: true,
        title: "Delete Employee",
        width: 500,
        height: 200,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });
    
    function EmployeeDetails(empData) {
        $.ajax({
            url: "/Employee/EmployeeDetails",
            type: "POST",
            data: empData,
            success: function (response) {
                dataGrid.refresh();
                toast('success', 'Employee added successfully');
                console.log("Data submitted successfully:", response);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.error("Error submitting data:", textStatus, errorThrown);
            }
        });
    }
    
    dataGrid = $('#dataGrid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
             key: 'employeeId',
            loadUrl: `/Employee/GetEmployee`,
            // insertUrl: `${url}/InsertOrder`,
            // updateUrl: `/Room/UpdateRooms`,
            // deleteUrl: `${url}/DeleteOrder`,
            onBeforeSend(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            },
        }),
        remoteOperations: true,
        paging: {
            pageSize: 5,
            pageIndex: 0,
        },
        pager: {
            visible: true,
        },
        columns: [
            //{
            //dataField: 'employeeId',
            //caption: 'Employee Id',
            //validationRules: [{
            //    type: 'stringLength',
            //}],
            //},
            {
            dataField: 'employeeName',  
            caption: 'Employee Name',
            dataType: 'stringLength',
            validationRules: [{
                type: 'required',
            }],
        }, {
            dataField: 'employeeMobileNo',
            caption: "Mobile Number",
            validationRules: [{
                type: 'numeric',
            }],
        }, {
            dataField: 'emploeeGender',
            caption: 'Gender',
            validationRules: [{
                type: 'stringLength',
            }],
        }, {
            dataField: 'employeeEmailId',
            caption: 'Email',  
            validationRules: [{
                type: 'stringLength',
            }],
        }, {
            dataField: 'Actions',
            width: 150,
            allowFiltering: false,
            allowSorting: false,
            cellTemplate(container, options) {
                $('<div>')
                    .append($('<button onclick="getEmployee(\'' + options.row.data.employeeId + '\')" >Edit</button> <button onclick="deleteEmployee(\'' + options.row.data.employeeId + '\')">Delete</button>'))
                    .appendTo(container);
            },
        }],
        filterRow: {
            visible: true,
        },
        headerFilter: {
            visible: true,
        },
        scrolling: {
            mode: 'virtual',
        },
        width: '100%',
        height: 820,
        showBorders: true,
        
        grouping: {
            autoExpandAll: false,
        },
    }).dxDataGrid("instance");
});

function getEmployee(empId) {
    $.ajax({
        url: "/Employee/GetEmployeeById",
        type: "Get",
        data: { id: empId },
        success: function (response) {
            console.log("data submitted successfully:", response);

            $("#editPopup").dxPopup("instance").show();

            var form = $('#editForm').dxForm("instance");
            form.option("formData", response);
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}

function UpdateEmployee() {
    var form = $('#editForm').dxForm("instance");
    var formData = form.option("formData")

    $.ajax({
        url: "/Employee/UpdateEmployee",
        type: "Put",
        data: formData,

        success: function (response) {
            $("#editPopup").dxPopup("hide");
            
            dataGrid.refresh(true);
            toast('success', 'Employee updated successfully');

            console.log("data get successfully");
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}

function deleteEmployee(empId) {

    selectedId = empId;
    $("#deletePopup").dxPopup("instance").show();
}

function deleteemployee() {
    $.ajax({
        url: "/Employee/deleteEmployee",
        type: "GET",
        data: { id: selectedId },

        success: function (response) {

            $("#deletePopup").dxPopup("instance").hide();
            dataGrid.refresh(true);
            toast('error', 'Employee deleted successfully');
            console.log("data delete successfully");
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("Error deleting room:", textstatus, errorthrown);
        }
    });
}

function toast(type, message) {
    DevExpress.ui.notify({
        message: message,
        height: 80,
        width: 150,
        minWidth: 300,
        type: type,
        displayTime: 3500,
        animation: {
            show: {
                type: 'fade', duration: 400, from: 0, to: 1,
            },
            hide: { type: 'fade', duration: 40, to: 0 },
        },
    },
        {
            position: 'top right',
            direction: "down-push",
        });
}

function clearForm() {

    var form = $('#myForm').dxForm("instance");
    form.resetValues();
}
