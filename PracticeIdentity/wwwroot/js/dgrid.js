
var roomTypeOptions = []
var roomNumArr = []
var dataGrid;
var selectedId;
$(function () {
    
    $('#button').dxButton({
        type: "success",
        text: "Add Customer",
        onClick: function () {
            $("#popup").dxPopup("instance").show();
        }
    });
    
    $("#popup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=myForm>").dxForm({
                formData: {},
                items: [{
                    itemType: "group",
                    colCount: 2,
                    items: [{
                        itemType: "group",

                        items: [{
                            dataField: "customerName",
                            isRequired: true,
                            label: {
                                text: "Customer Name"
                            }
                        },
                        {
                            dataField: "mobileNo",
                            isRequired: true,
                            label: {
                                text: "Mobile No"
                            }
                        },
                        {
                            dataField: "nationality",
                            isRequired: true,
                            label: {
                                text: "Nationality"
                            }
                        },
                        {
                            dataField: "gender",
                            isRequired: true,
                            label: {
                                text: "Gender"
                            },
                            editorType: "dxSelectBox",
                            editorOptions: {
                                items: ["Male", "Female",],
                                placeholder: "Select Gender",
                            }
                        },
                        
                        ]
                    },
                    {
                        itemType: "group",

                        items: [
                            {
                                dataField: "dateOfBirth",
                                isRequired: true,
                                label: {
                                    text: "Date Of Bith"
                                },
                                editorType: "dxDateBox",
                                editorOptions: {
                                    type: 'date',
                                }
                            },
                            {
                            dataField: "idProof",
                            isRequired: true,
                            label: {
                                text: "Id Proof"
                            },
                        },
                        {
                            dataField: "address",
                            isRequired: true,
                            label: {
                                text: "Address"
                            },
                        },
                        //{
                        //    dataField: "checkIn",
                        //    isRequired: true,
                        //    label: {
                        //        text: "Check In"
                        //    },
                        //    editorType: "dxDateBox",
                        //    editorOptions: {
                        //        type: 'date',
                        //    }
                        //},
                        ]
                    },
                    //{
                    //    itemType: "group",

                    //    items: [
                            
                    //        {
                    //            dataField: "bed",
                    //            isRequired: true,
                    //            label: {
                    //                text: "Bed"
                    //            },
                    //            editorType: "dxSelectBox",
                    //            editorOptions: {
                    //                elementAttr: { "id": "bed" },
                    //                items: ["Single", "Double", "Triple"],
                    //                placeholder: "Select Bed Size",
                    //                onValueChanged: function (e) {
                                        
                    //                    if (e.value === "Single") {
                    //                        roomTypeOptions = ["AC", "Non AC"];
                    //                    } else if (e.value === "Double") {
                    //                        roomTypeOptions = ["AC", "NON AC"];
                    //                    } else if (e.value === "Triple") {
                    //                        roomTypeOptions = ["AC", "Non AC"];
                    //                    }
                    //                    $("#roomTypes").dxSelectBox("instance").option("items", roomTypeOptions);
                    //                },
                    //            },
                    //        },

                    //        {
                    //            dataField: "roomType",
                    //            isRequired: true,
                    //            label: {
                    //                text: "Room Type"
                    //            },
                    //            editorType: "dxSelectBox",
                    //            editorOptions: {
                    //                elementAttr: { "id": "roomTypes" },  
                    //                items: roomTypeOptions,
                    //                placeholder: "Select Room Type",
                    //                onValueChanged: function (e) {

                    //                    var bedSelectVaue = $("#bed").dxSelectBox('instance').option('value');
                    //                    GetRooms(bedSelectVaue, e.value);
                    //                },
                    //            },
                    //        },
                    //    {
                    //        dataField: "roomNo",
                    //        dataSource: roomNumArr,
                    //        isRequired: true,
                    //        displayExpr: "displayValue",
                    //        valueExpr: "value",
                    //        label: {
                    //            text: "Room No"
                    //        },
                    //        editorType: "dxSelectBox",
                    //        editorOptions: {
                    //            elementAttr: { "id": "roomNos" },
                    //            onValueChanged: function (e) {

                    //                GetRoomPrice(e.value)
                    //            }
                    //        }
                    //    },
                    //    {
                    //        dataField: "price",
                    //        isRequired: true,
                    //        editorType: "dxTextBox",
                    //        editorOptions: {
                    //            elementAttr: { "id": "price" },
                    //            readOnly: true,
                    //        },
                            
                    //        label: {
                    //            text: "Price"
                    //        },
                    //    },
                    //    ]
                        //    }
                    ],

                },
                    {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: "Add Customer",
                        useSubmitBehavior: true,
                          onClick: async function () {
                                            var form = $('#myForm').dxForm("instance");
                                            var formData = form.option("formData")
                                            await AddCustomer(formData);
                                            $("#popup").dxPopup("hide");
                                            clearForm();
                                        }
                    }
                }]
            });

            return form;

        },
        visible: false,
        hideOnOutsideClick: true,
        showTitle: true,
        title: "Add Customer",
        width: 1000,
        height: 450,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });

    $("#editPopup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=editForm>").dxForm({
                formData: {

                },

                items: [
                    {
                        dataField: "customerName",
                        editorType: "dxTextBox",
                        label: {
                            text: "Customer Name"
                        }
                    },

                    {
                        dataField: "mobileNo",
                        editorType: "dxTextBox",
                        label: {
                            text: "Mobile No"
                        },
                    },

                    {
                        dataField: "nationality",
                        editorType: "dxTextBox",
                        label: {
                            text: "Nationality"
                        },
                    },

                    {
                        dataField: "gender",
                        editorType: "dxTextBox",
                        label: {
                            text: "Gender"
                        },
                         editorType: "dxSelectBox",
                        editorOptions: {
                            items: ["Male", "Female",],
                            placeholder: "Select Gender",
                        }
                    },
                    {
                        dataField: "dateOfBirth",
                        label: {
                            text: "Date Of Birth"
                        },
                         editorType: "dxDateBox",
                        editorOptions: {
                            type: 'date',
                        }
                    },
                    {
                        dataField: "idProof",
                        editorType: "dxTextBox",
                        label: {
                            text: "Id Proof"
                        }
                    },
                    {
                        dataField: "address",
                        editorType: "dxTextBox",
                        label: {
                            text: "Address"
                        }
                    },
                    {
                        itemType: "button",
                        horizontalAlignment: "center",
                        buttonOptions: {
                            text: "Save Changes",
                            onClick: async function () {
                                await UpdateCustomers();
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
        title: "Edit Customer",
        width: 600,
        height: 500,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });
    

    $("#deletePopup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=deleteForm>").dxForm({

                colCount: 4,

                items: [
                    {
                        label: {
                            text: "Are you sure you want to delete this room",
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

                                await deletecustomer();
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
            $("#deleteButton").css("margin-right", "50px");
            return form;
        },

        visible: false,
        hideOnOutsideClick: true,
        showTitle: true,
        title: "Delete Customer",
        width: 500,
        height: 200,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });





    $("#checkPopup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=checkForm>").dxForm({
                formData: {},
                items: [{
                    itemType: "group",
                    colCount: 1,
                    items: [
                        {
                            itemType: "group",

                            items: [
                                {
                                    dataField: "customerName",
                                    editorType: "dxTextBox",
                                    label: {
                                        text: "Customer Name"
                                    }
                                },
                        {
                            dataField: "checkIn",
                            isRequired: true,
                            label: {
                                text: "Check In"
                            },
                            editorType: "dxDateBox",
                            editorOptions: {
                                type: 'datetime',
                                format: 'yyyy-MM-dd HH:mm:ss',
                            }
                        },
                                {
                                    dataField: "bed",
                                    isRequired: true,
                                    label: {
                                        text: "Bed"
                                    },
                                    editorType: "dxSelectBox",
                                    editorOptions: {
                                        elementAttr: { "id": "bed" },
                                        items: ["Single", "Double", "Triple"],
                                        placeholder: "Select Bed Size",
                                        onValueChanged: function (e) {

                                            if (e.value === "Single") {
                                                roomTypeOptions = ["AC", "Non AC"];
                                            } else if (e.value === "Double") {
                                                roomTypeOptions = ["AC", "NON AC"];
                                            } else if (e.value === "Triple") {
                                                roomTypeOptions = ["AC", "Non AC"];
                                            }
                                            $("#roomTypes").dxSelectBox("instance").option("items", roomTypeOptions);
                                        },
                                    },
                                },

                                {
                                    dataField: "roomType",
                                    isRequired: true,
                                    label: {
                                        text: "Room Type"
                                    },
                                    editorType: "dxSelectBox",
                                    editorOptions: {
                                        elementAttr: { "id": "roomTypes" },
                                        items: roomTypeOptions,
                                        placeholder: "Select Room Type",
                                        onValueChanged: function (e) {

                                            var bedSelectVaue = $("#bed").dxSelectBox('instance').option('value');
                                            GetRooms(bedSelectVaue, e.value);
                                        },
                                    },
                                },
                            {
                                dataField: "roomNo",
                                dataSource: roomNumArr,
                                isRequired: true,
                                displayExpr: "displayValue",
                                valueExpr: "value",
                                label: {
                                    text: "Room No"
                                },
                                editorType: "dxSelectBox",
                                editorOptions: {
                                    elementAttr: { "id": "roomNos" },
                                    onValueChanged: function (e) {

                                        GetRoomPrice(e.value)
                                    }
                                }
                            },
                            {
                                dataField: "price",
                                isRequired: true,
                                editorType: "dxTextBox",
                                editorOptions: {
                                    elementAttr: { "id": "price" },
                                    readOnly: true,
                                },

                                label: {
                                    text: "Price"
                                },
                                },
                                {
                                  dataField: "checkOut",
                                  isRequired: true,
                                  label: {
                                           text: "Check Out"
                                   },
                                  editorType: "dxDateBox",
                                  editorOptions: {
                                      type: 'datetime',
                                      format: 'yyyy-MM-dd HH:mm:ss',
                                   }
                                  },

                            ]
                            }
                    ],

                },
                {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: "Allote Room",
                        useSubmitBehavior: true,
                        onClick: async function () {
                            var form = $('#checkForm').dxForm("instance");
                            var formData = form.option("formData")
                            await AlloteRoomToCustomer(formData);
                            $("#popup").dxPopup("hide");
                            clearForm();
                        }
                    }
                }]
            });

            return form;

        },
        visible: false,
        hideOnOutsideClick: true,
        showTitle: true,
        title: "Add Customer CheckIn/Out Time",
        width: 500,
        height: 500,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });













    $("#deletePopup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=deleteForm>").dxForm({

                colCount: 4,

                items: [
                    {
                        label: {
                            text: "Are you sure you want to delete this room",
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

                                await deletecustomer();
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
            $("#deleteButton").css("margin-right", "50px");
            return form;
        },

        visible: false,
        hideOnOutsideClick: true,
        showTitle: true,
        title: "Delete Customer",
        width: 500,
        height: 200,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });



    

    
//    $("#checkPopup").dxPopup({
//        contentTemplate: () => {

//            const form = $("<div id=myForm>").dxForm({
//                formData: {},
//                items: [{
//                    itemType: "group",
//                    colCount: 1,
//                    items: [{
//                        itemType: "group",

//                        items: [{
//                            dataField: "customerName",
//                            isRequired: true,
//                            label: {
//                                text: "Customer Name"
//                            }
//                        },
//                        {
//                            dataField: "roomNo",
//                            isRequired: true,
//                            label: {
//                                text: "Room No"
//                            }
//                        },
//                        {
//                            dataField: "checkOut",
//                            isRequired: true,
//                            label: {
//                                text: "Check Out"
//                            },
//                            editorType: "dxDateBox",
//                            editorOptions: {
//                                type: 'date',
//                            }

//                        },

//                        ]
//                    },
//],
//                },
//                    {
//                    itemType: "button",
//                    horizontalAlignment: "center",
//                    buttonOptions: {
//                        text: "Add CheckOut",
//                        useSubmitBehavior: true,
//                        onClick: async function () {
//                            var form = $('#myForm').dxForm("instance");
//                            var formData = form.option("formData")
//                            await AddCheckOut(formData);
//                        }
//                    }
//                }]
//            });

//            return form;

//        },
//        visible: false,
//        hideOnOutsideClick: true,
//        showTitle: true,
//        title: "Add Customer CheckOut",
//        width: 500,
//        height: 400,
//        resizeEnabled: true,
//        dragEnabled: true,
//        position: "center"
//    });
    
    dataGrid = $('#dataGrid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
           // key: 'customerId',
            loadUrl: `/Customer/GetCustomerGrid`,
            // insertUrl: `${url}/InsertOrder`,
            // updateUrl: `/Room/UpdateRooms`,
            // deleteUrl: `${url}/DeleteOrder`,
            onBeforeSend(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            },
        }),
        remoteOperations: true,
        paging: {
            pageSize: 10,
            pageIndex: 0,
        },
        pager: {
            visible: true,
        },
        columns: [
            {
            dataField: 'customerName',
            caption: 'Customer Name',
            dataType: 'stringLength',
            validationRules: [{
                type: 'required',
            }],
        }, {
            dataField: 'mobileNo',
            caption: "Mobile Number",
            validationRules: [{
                type: 'numeric',
            }],
        }, {
            dataField: 'nationality',
            caption: 'Nationality',
            validationRules: [{
                type: 'stringLength',
            }],
        }, {
            dataField: 'gender',
            caption: 'Gender',
            validationRules: [{
                type: 'stringLength',
            }],
            }, {
                dataField: 'dateOfBirth',
                caption: 'Date Of Birth',
                validationRules: [{
                    type: 'stringLength',
                }],
            }, {
                dataField: 'idProof',
                caption: 'Id Proof',
                validationRules: [{
                    type: 'stringLength',
                }],
            }, {
                dataField: 'address',
                caption: 'Address',
                validationRules: [{
                    type: 'stringLength',
                }],
            },
            //{
            //    dataField: 'checkIn',
            //    caption: 'Check In',
            //    validationRules: [{
            //        type: 'stringLength',
            //    }],
            //}, {
            //    dataField: 'roomNo',
            //    caption: 'Room Number',
            //    validationRules: [{
            //        type: 'stringLength',
            //    }],
            //}, {
            //    dataField: 'roomType',
            //    caption: 'Room Type',
            //    validationRules: [{
            //        type: 'stringLength',
            //    }],
            //}, {
            //    dataField: 'bed',
            //    caption: 'Bed',
            //    validationRules: [{
            //        type: 'stringLength',
            //    }],
            //}, {
            //    dataField: 'price',
            //    caption: 'Price',
            //    validationRules: [{
            //        type: 'stringLength',
            //    }],
            //},
        //    {
        //    dataField: 'Actions',
        //    width: 150,
        //    allowFiltering: false,
        //        allowSorting: false,
        //        cellTemplate: function (container, options) {
        //            $('<div>')
        //                .append($('<button onclick="getcustomer(\'' + options.row.data.customerId + '\', \'' + options.row.data.roomNo + '\' , \'' + options.row.data.customerName + '\' )">CheckOut</button>'))
        //                .appendTo(container);
        //        }
            //}

            {
                dataField: 'Actions',
                width: 250,
                allowFiltering: false,
                allowSorting: false,
                //make buttons
                cellTemplate(container, options) {
                    $('<div>')
                        .append($('<button onclick="getCustomer(\'' + options.row.data.customerId + '\')" >Edit</button>  <button onclick="customerDetail(\'' + options.row.data.customerId + '\')">Customer Details</button> <button onclick="deleteCustomer(\'' + options.row.data.customerId + '\')">Delete</button> ')) // <button onclick="checkCustomer(\'' + options.row.data.customerId + '\')">CheckIn/Out</button>
                        .appendTo(container);
                },
            }
        ],
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
        //masterDetail: {
        //    enabled: true,
        //},
        grouping: {
            autoExpandAll: false,
        },
    }).dxDataGrid("instance");

    function AddCustomer(cusData) {
        $.ajax({
            url: "/Customer/AddCustomer",
            type: "POST",
            data: cusData,
            success: function (response)
            {
                dataGrid.refresh();
                toast('success', 'Customer added successfully');
               
                console.log("Customer submitted successfully:", response);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.error("Error submitting data:", textStatus, errorThrown);
            }
        });
    }

    function GetRooms(bedType, roomType) {
        $.ajax({
            url: "/Room/GetRoomByType",
            type: "GET",
            data: { bedType: bedType, roomType: roomType },
            success: function (response)
            {
                var selectRoom = $("#roomNos").dxSelectBox("instance");
                selectRoom.option({
                    items: response.rooms,
                    displayExpr: "displayValue",
                    valueExpr: "value",
                });

                dataGrid.refresh();
                console.log("Data submitted rooms no successfully:", response);
            }, 
            error: function (jqXHR, textStatus, errorThrown) {

                console.error("Error submitting data:", textStatus, errorThrown);
            }
        });
    }
  
    function GetRoomPrice(roomNo) {
        $.ajax({
            url: "/Room/GetRoomPrice",
            type: "GET",
            data: { roomNo: roomNo},

            success: function (response) {
                console.log("Data submitted rooms price get successfully:", response);

                var selectRoomPrice = $("#price").dxTextBox("instance");
                selectRoomPrice.option("value", response.prices);
      
                dataGrid.refresh();
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.error("Error submitting data:", textStatus, errorThrown);
            }
        });
    }

});

    function getCustomer(customerId) {
    $.ajax({
        url: "/Customer/GetCustomerById",
        type: "Get",
        data: { id: customerId },
        success: function (response) {
            console.log("data submitted successfully:", response);

            $("#editPopup").dxPopup("instance").show();

            var form = $('#editForm').dxForm("instance");
            form.option("formData", response.customer);
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}


function UpdateCustomers() {
    var form = $('#editForm').dxForm("instance");
    var formData = form.option("formData")

    $.ajax({
        url: "/Customer/UpdateCustomers",
        type: "Put",
        data: formData,

        success: function (response) {
            $("#editPopup").dxPopup("hide");

            dataGrid.refresh(true);
            toast('success', 'Customer updated successfully');
            console.log("data get successfully");

        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}

function deleteCustomer(customerId) {

    selectedId = customerId;
    $("#deletePopup").dxPopup("instance").show();
}

function deletecustomer() {
    $.ajax({
        url: "/Customer/DeleteCustomer",
        type: "GET",
        data: { id: selectedId },

        success: function (response) {

            $("#deletePopup").dxPopup("instance").hide();
            dataGrid.refresh(true);
            toast('error', 'Customer Delete successfully');
            console.log("data delete successfully");
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("Error deleting room:", textstatus, errorthrown);
        }
    });
}


function checkCustomer(customerId) {
  //  var form = $('#checkForm').dxForm("instance");
   // var formData = form.option("formData")

    $.ajax({
        url: "/Customer/GetCustomerById",
        type: "Get",
        data: { id: customerId }, 

        success: function (response) {
            $("#checkPopup").dxPopup("instance").show();
            var form = $('#checkForm').dxForm("instance");
            form.option("formData", response);

            dataGrid.refresh(true);
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}

function customerDetail(customerId) {
    window.location.href = 'CustomerDetails?id=' + encodeURIComponent(customerId);
}

//function AlloteRoomToCustomer(customerId) {
//    var checkInDate = new Date(customerId.checkIn).toISOString();
//    var checkOutDate = new Date(customerId.checkOut).toISOString();
//    $.ajax({
//        url: "/CustomersInRooms/AlloteRoomToCustomer",
//        type: "Post",
//        data: {
//            CustomerId: customerId.customerId, checkIn: checkInDate, checkOut: checkOutDate, roomId: customerId.roomNo
//        },
       
//        success: function (response) {

//            console.log("Room Allote to Customer successfully");
//            dataGrid.refresh(true);
//        },
//        error: function (jqxhr, textstatus, errorthrown) {
//            console.error("error submitting data:", textstatus, errorthrown);
//        }
//    });
//}





//function getcustomer(customerId, roomNo, customerName) {
//    $.ajax({
//        url: "/Customer/GetCustomerById",
//        type: "Get",

//        data: { id: customerId, roomNo: roomNo, customerName: customerName },
//        success: function (response)
//        {
//            console.log("data submitted id and roomno successfully:", response);
//            $("#checkPopup").dxPopup("instance").show();

//            var form = $('#myForm').dxForm("instance");
//            form.option("formData", response);
//        },
//        error: function (jqxhr, textstatus, errorthrown) {
//            console.error("error submitting data:", textstatus, errorthrown);
//        }
//    });
//}

//function AddCheckOut(customerId, roomId, checkOut)
//{
//    $.ajax({
//        url: "/Customer/AddCheckOut",
//        type: "Post",
//        data: { customerId: customerId.customer.customerId, roomId: customerId.customer.roomIdFK, checkOut: customerId.checkOut },

//        success: function (response)
//        {
//            $("#checkPopup").dxPopup("hide");

//            dataGrid.refresh(true);

//            console.log("data get successfully");
//        },
//        error: function (jqxhr, textstatus, errorthrown) {
//            console.error("error submitting data:", textstatus, errorthrown);
//        }
//    });
//}

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

function clearForm()
{
    var form = $('#myForm').dxForm("instance");
   // form.resetValues();
}
