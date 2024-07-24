$(function () {
    const customer = {
       
    };

    const form = $("#form").dxForm({
        id: "form",
        formData: customer,
        labelLocation: "top",
        showColonAfterLabel: false,
        items: [{
            itemType: "group",
            colCount: 3,
            items: [{
                itemType: "group",
               
                items: [{
                    dataField: "Name",
                    isRequired: true,
                },
                    {
                        dataField: "Mobile No",
                        isRequired: true,
                    },
                    {
                        dataField: "Nationality",
                        isRequired: true,
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
                        dataField: "Date Of Bith",
                        isRequired: true,
                        editorType: "dxDateBox",
                        editorOptions: {
                            type: 'date',
                        }
                    },
                  ]
            },
                {
                    itemType: "group",
                   
                    items: [{
                        dataField: "Id Proof",
                        isRequired: true,
                    },
                        {
                            dataField: "Address",
                            isRequired: true,
                        },
                        {
                            dataField: "Check In",
                            isRequired: true,
                            editorType: "dxDateBox",
                            editorOptions: {
                                type: 'date',
                            }
                        },
                        ]
                },
                {
                    itemType: "group",
                   
                    items: [{
                        dataField: "Bed",
                        isRequired: true,
                        editorType: "dxSelectBox",
                        editorOptions: {
                            items: ["Single", "Double","Tripple",],
                            placeholder: "Select Bed Size",
                        }
                    },
                        {
                            dataField: "Room Type",
                            isRequired: true,
                            editorType: "dxSelectBox",
                            editorOptions: {
                                items: ["AC", "Non AC",],
                                placeholder: "Select Room Type",
                            }
                        },
                        {
                            dataField: "Room No",
                            isRequired: true,
                            editorType: "dxSelectBox",
                            editorOptions: {
                               
                            }
                        },
                        {
                            dataField: "Price",
                            isRequired: true,
                        },
                        ]
                }],
        },
            {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: "Submit Form",
                useSubmitBehavior: true
            }
        }]
    }).dxForm("instance");
});