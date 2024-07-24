$(function () {
    const employee = {
       
    };

    const form = $("#form").dxForm({

        id: "form",
        formData: employee,
        horizontalAlignment: "center",
        labelLocation: "top",
        showColonAfterLabel: false,
        items: [{
            itemType: "group",
            colCount: 2,
            horizontalAlignment: "center",
            items: [{
                itemType: "group",
                caption: "Employee",
                items: [{
                    dataField: "Employee Name",
                    isRequired: true,
                   
                },
                    {
                        dataField: "Mobile No",
                        isRequired: true,
                        type: "numeric",
                        
                    },
                    {
                        dataField: "Gender",
                        isRequired: true,
                        editorType: "dxSelectBox",
                        editorOptions: {
                            items: ["Male", "Female",],
                            placeholder: "Select Gender",
                        }
                    },
                    {
                        dataField: "Email",
                        isRequired: true,
                      
                    },
]
            }]
        }, {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: "Submit",
                useSubmitBehavior: true
            }
        }]
    }).dxForm("instance");

});