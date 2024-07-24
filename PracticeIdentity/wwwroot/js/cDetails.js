
//var selectedId;
//var roomNumArr = []
//var roomTypeOptions = []
//function deleteCustomer(cusId) {
//    selectedId = cusId;
//    $("#deletePopup").dxPopup("instance").show();
//}

//$(function () {
//    $("#deletePopup").dxPopup({
//        contentTemplate: () => {

//            const form = $("<div id=deleteForm>").dxForm({

//                colCount: 4,
//                items: [
//                    {
//                        label: {
//                            text: "Are you sure you want to delete this customer",
//                        }
//                    },
//                    {
//                        itemType: "button",
//                        buttonOptions: {
//                            text: "Delete",
//                            elementAttr: {
//                                "id": "deleteButton",
//                                "style": "margin-top: 45px; width: 200px;"
//                            },
//                            onClick: async function () {

//                                await deletecustomer();
//                            }
//                        }
//                    },

//                    {
//                        itemType: "button",
//                        buttonOptions: {
//                            text: "Cancel",
//                            elementAttr: {
//                                "id": "deleteButton",
//                                "style": "margin-top: 45px; width: 200px;"
//                            },
//                            onClick: async function ()
//                            {
//                                $("#deletePopup").dxPopup("hide");
//                            }
//                        }
//                    }
//                ]
//            });

//            return form;
//        },

//        visible: false,
//        hideOnOutsideClick: true,
//        showTitle: true,
//        title: "Delete Cusomer",
//        width: 500,
//        height: 200,
//        resizeEnabled: true,
//        dragEnabled: true,
//        position: "center"
//    }).dxPopup("instance");





//    $("#editPopup").dxPopup({
//        contentTemplate: () => {

//            const form = $("<div id=editForm>").dxForm({
//                formData: {},
//                items: [{
//                    itemType: "group",
//                    colCount: 3,
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
//                            dataField: "mobileNo",
//                            isRequired: true,
//                            label: {
//                                text: "Mobile No"
//                            }
//                        },
//                        {
//                            dataField: "nationality",
//                            isRequired: true,
//                            label: {
//                                text: "Nationality"
//                            }
//                        },
//                        {
//                            dataField: "gender",
//                            isRequired: true,
//                            label: {
//                                text: "Gender"
//                            },
//                            editorType: "dxSelectBox",
//                            editorOptions: {
//                                items: ["Male", "Female",],
//                                placeholder: "Select Gender",
//                            }
//                        },
//                        {
//                            dataField: "dateOfBirth",
//                            isRequired: true,
//                            label: {
//                                text: "Date Of Bith"
//                            },
//                            editorType: "dxDateBox",
//                            editorOptions: {
//                                type: 'date',
//                            }
//                        },
//                        ]
//                    },
//                    {
//                        itemType: "group",

//                        items: [{
//                            dataField: "idProof",
//                            isRequired: true,
//                            label: {
//                                text: "Id Proof"
//                            },
//                        },
//                        {
//                            dataField: "address",
//                            isRequired: true,
//                            label: {
//                                text: "Address"
//                            },
//                        },
//                        {
//                            dataField: "checkIn",
//                            isRequired: true,
//                            label: {
//                                text: "Check In"
//                            },
//                            editorType: "dxDateBox",
//                            editorOptions: {
//                                type: 'date',
//                            }
//                        },
//                        ]
//                    },
//                    {
//                        itemType: "group",

//                        items: [

//                            {
//                                dataField: "bed",
//                                isRequired: true,
//                                label: {
//                                    text: "Bed"
//                                },
//                                editorType: "dxSelectBox",
//                                editorOptions: {
//                                    elementAttr: { "id": "bed" },
//                                    items: ["Single", "Double", "Triple"],
//                                    placeholder: "Select Bed Size",
//                                    onValueChanged: function (e) {

//                                        if (e.value === "Single") {
//                                            roomTypeOptions = ["AC", "Non AC"];
//                                        } else if (e.value === "Double") {
//                                            roomTypeOptions = ["AC", "NON AC"];
//                                        } else if (e.value === "Triple") {
//                                            roomTypeOptions = ["AC", "Non AC"];
//                                        }
//                                        $("#roomTypes").dxSelectBox("instance").option("items", roomTypeOptions);
//                                    },
//                                },
//                            },

//                            {
//                                dataField: "roomType",
//                                isRequired: true,
//                                label: {
//                                    text: "Room Type"
//                                },
//                                editorType: "dxSelectBox",
//                                editorOptions: {
//                                    elementAttr: { "id": "roomTypes" },
//                                    items: roomTypeOptions,
//                                    placeholder: "Select Room Type",
//                                    onValueChanged: function (e) {

//                                        var bedSelectVaue = $("#bed").dxSelectBox('instance').option('value');
//                                        GetRooms(bedSelectVaue, e.value);
//                                    },
//                                },
//                            },
//                            {
//                                dataField: "roomNo",
//                                dataSource: roomNumArr,
//                                isRequired: true,
//                                displayExpr: "displayValue",
//                                valueExpr: "value",
//                                label: {
//                                    text: "Room No"
//                                },
//                                editorType: "dxSelectBox",
//                                editorOptions: {
//                                    elementAttr: { "id": "roomNos" },
//                                    onValueChanged: function (e) {

//                                        GetRoomPrice(e.value)
//                                    }
//                                }
//                            },
//                            {
//                                dataField: "price",
//                                isRequired: true,
//                                editorType: "dxTextBox",
//                                editorOptions: {
//                                    elementAttr: { "id": "price" },
//                                    readOnly: true,
//                                },

//                                label: {
//                                    text: "Price"
//                                },
//                            },
//                        ]
//                    }],

//                },
//                {
//                    itemType: "button",
//                    horizontalAlignment: "center",
//                    buttonOptions: {
//                        text: "Allote Room",
//                        useSubmitBehavior: true,
//                        onClick: async function () {
//                            var form = $('#editForm').dxForm("instance");
//                            var formData = form.option("formData")
//                            await AddCustomer(formData);
//                            $("#editPopup").dxPopup("hide");
//                            clearForm();
//                        }
//                    }
//                }]
//            });

//            return form;

//        },
//        visible: false,
//        hideOnOutsideClick: true,
//        showTitle: true,
//        title: "Add Customer",
//        width: 1200,
//        height: 500,
//        resizeEnabled: true,
//        dragEnabled: true,
//        position: "center"
//    });












//    dataGrid = $('#dataGrid').dxDataGrid({
//        dataSource: DevExpress.data.AspNet.createStore({
//            key: 'customerId',
//            loadUrl: `/Customer/GetCustomerCheckOutGrid`,
//            // insertUrl: `${url}/InsertOrder`,
//            // updateUrl: `/Room/UpdateRooms`,
//            // deleteUrl: `${url}/DeleteOrder`,
//            onBeforeSend(method, ajaxOptions) {
//                ajaxOptions.xhrFields = { withCredentials: true };
//            },
//        }),
//        remoteOperations: true,
//        paging: {
//            pageSize: 10,
//            pageIndex: 0,
//        },
//        pager: {
//            visible: true,
//        },
//        columns: [
//            //{
//            //dataField: 'customerId',
//            //caption: 'Customer Id',
//            //validationRules: [{
//            //    type: 'stringLength',
//            //}],
//            //},
//            {
//            dataField: 'customerName',
//            caption: 'Customer Name',
//            dataType: 'stringLength',
//            validationRules: [{
//                type: 'required',
//            }],
//        }, {
//                dataField: 'mobileNo',
//            caption: "Mobile Number",
//            validationRules: [{
//                type: 'numeric',
//            }],
//        }, {
//            dataField: 'nationality',
//            caption: 'Nationality',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//            dataField: 'gender',
//            caption: 'Gender',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//                dataField: 'dateOfBirth',
//            caption: 'Date Of Birth',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//            dataField: 'idProof',
//            caption: 'Id Proof',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//            dataField: 'address',
//            caption: 'Address',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//            dataField: 'checkIn',
//            caption: 'Check In',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//            },
//            {
//                dataField: 'checkOut',
//                caption: 'Check Out',
//                validationRules: [{
//                    type: 'stringLength',
//                }],
//            },
//            {
//            dataField: 'roomNo',
//            caption: 'Room Number',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//            dataField: 'roomType',
//            caption: 'Room Type',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//            dataField: 'bed',
//            caption: 'Bed',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//        }, {
//            dataField: 'price',
//            caption: 'Price',
//            validationRules: [{
//                type: 'stringLength',
//            }],
//            },
//            {
//                dataField: 'Actions',
//                width: 200,
//                allowFiltering: false,
//                allowSorting: false,
//                //make buttons
//                cellTemplate(container, options) {
//                    $('<div>')
//                        .append($('<button onclick="deleteCustomer(\'' + options.row.data.customerId + '\')">Delete</button> <button onclick="editCustomer(\'' + options.row.data.customerId + '\')">Edit</button>'))
//                        .appendTo(container);
//                },
//            }
//        ],
//        filterRow: {
//            visible: true,
//        },
//        headerFilter: {
//            visible: true,
//        },
//        scrolling: {
//            mode: 'virtual',
//        },
//        width: '100%',
//        height: 820,
//        showBorders: true,
//        masterDetail: {
//            enabled: true,
//        },
//        grouping: {
//            autoExpandAll: false,
//        },
//    }).dxDataGrid("instance");
//});

//function deletecustomer() {
//    $.ajax({
//        url: "/Customer/DeleteCustomer",
//        type: "GET",
//        data: { id: selectedId },

//        success: function (response) {

//            $("#deletePopup").dxPopup("instance").hide();
//            dataGrid.refresh(true);
//            toast('error', 'Customer deleted successfully');
//            console.log("data delete successfully");
//        },
//        error: function (jqxhr, textstatus, errorthrown) {
//            console.error("Error deleting room:", textstatus, errorthrown);
//        }
//    });
//}

//function editCustomer(customerId)
//{
//    $.ajax({
//        url: "/Customer/GetCustById",
//        type: "Get",
//        data: { id: customerId },
//        success: function (response) {
//            console.log("data submitted successfully:", response);

//            $("#editPopup").dxPopup("instance").show();

//            var form = $('#editForm').dxForm("instance");
//            form.option("formData", response);
//        },
//        error: function (jqxhr, textstatus, errorthrown) {
//            console.error("error submitting data:", textstatus, errorthrown);
//        }
//    });
//}

//function GetRooms(bedType, roomType) {
//    $.ajax({
//        url: "/Room/GetRoomByType",
//        type: "GET",
//        data: { bedType: bedType, roomType: roomType },
//        success: function (response) {
//            var selectRoom = $("#roomNos").dxSelectBox("instance");
//            selectRoom.option({
//                items: response.rooms,
//                displayExpr: "displayValue",
//                valueExpr: "value",
//            });

//            dataGrid.refresh();
//            console.log("Data submitted rooms no successfully:", response);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {

//            console.error("Error submitting data:", textStatus, errorThrown);
//        }
//    });
//}

//function GetRoomPrice(roomNo) {
//    $.ajax({
//        url: "/Room/GetRoomPrice",
//        type: "GET",
//        data: { roomNo: roomNo },

//        success: function (response) {
//            console.log("Data submitted rooms price get successfully:", response);

//            var selectRoomPrice = $("#price").dxTextBox("instance");
//            selectRoomPrice.option("value", response.prices);

//            dataGrid.refresh();
//        },
//        error: function (jqXHR, textStatus, errorThrown) {

//            console.error("Error submitting data:", textStatus, errorThrown);
//        }
//    });
//}

//function AddCustomer(cusData) {
//    $.ajax({
//        url: "/Customer/AddCustomerAgain",
//        type: "POST",
//        data: cusData,
//        success: function (response) {
//            dataGrid.refresh();
//            toast('success', 'Customer Readded successfully');

//            console.log("Customer submitted successfully:", response);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {

//            console.error("Error submitting data:", textStatus, errorThrown);
//        }
//    });
//}

//function toast(type, message)
//{
//    DevExpress.ui.notify({
//        message: message,
//        height: 80,
//        width: 150,
//        minWidth: 300,
//        type: type,
//        displayTime: 3500,
//        animation: {
//            show: {
//                type: 'fade', duration: 400, from: 0, to: 1,
//            },
//            hide: { type: 'fade', duration: 40, to: 0 },
//        },
//    },
//        {
//            position: 'top right',
//            direction: "down-push",
//        });
//}






var roomTypeOptions = []
var roomNumArr = []
var selectedCustomerId;
var customerId;
$(function () {
    customerId = getQueryParam('id')

    //$('#button').dxButton({
    //    type: "success",
    //    text: "Customer CheckIn Entry",
    //    onClick: function () {
    //        $("#checkPopup").dxPopup("instance").show();
    //    }
    //});

    //$('#button').dxButton({
    //    type: "success",
    //    text: "CheckIn/Out",
    //    onClick: function (e) {
    //        // Extract customer ID from the row data
    //       // var customerId = options.row.data.customerId;

    //        // Call your checkCustomer function with the customer ID
    //        checkCustomer();

    //        // Open the popup (assuming you have a popup with id "checkPopup")
    //        $("#checkPopup").dxPopup("instance").show();
    //    }
    //});
    $('#button').dxButton({
        type: "success",
        text: "Customer CheckIn Entry",
        onClick: function () {
    
            var urlParams = new URLSearchParams(window.location.search);
            var customerId = urlParams.get('id');
           
            checkCustomer(customerId);

            // Open the popup (assuming you have a popup with id "checkPopup")
            //$("#checkPopup").dxPopup("instance").show();
        }
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
                                //{
                                //    dataField: "customerName",
                                //    editorType: "dxTextBox",
                                //    label: {
                                //        text: "Customer Name"
                                //    }
                                //},
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
                                //{
                                //    dataField: "checkOut",
                                //    isRequired: true,
                                //    label: {
                                //        text: "Check Out"
                                //    },
                                //    editorType: "dxDateBox",
                                //    editorOptions: {
                                //        type: 'datetime',
                                //        format: 'yyyy-MM-dd HH:mm:ss',
                                //    }
                                //},

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
                            $("#checkPopup").dxPopup("hide");
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
        title: "Add Customer CheckIn Time",
        width: 500,
        height: 500,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });


    $("#checkoutPopup").dxPopup({
        contentTemplate: () => {

            const form = $("<div id=checkoutForm>").dxForm({
                formData: {},
                items: [{
                    itemType: "group",
                    colCount: 1,
                    items: [
                        {
                            itemType: "group",

                            items: [
                                //{
                                //    dataField: "customerName",
                                //    editorType: "dxTextBox",
                                //    label: {
                                //        text: "Customer Name"
                                //    }
                                //},
                                //{
                                //    dataField: "mobileNo",
                                //    editorType: "dxTextBox",
                                //    label: {
                                //        text: "Mobile No"
                                //    }
                                //},
                                //{
                                //    dataField: "checkIn",
                                //    isRequired: true,
                                //    label: {
                                //        text: "Check In"
                                //    },
                                //    editorType: "dxDateBox",
                                //    editorOptions: {
                                //        type: 'datetime',
                                //        format: 'yyyy-MM-dd HH:mm:ss',
                                //    }
                                //},
                                //{
                                //    dataField: "bed",
                                //    isRequired: true,
                                //    label: {
                                //        text: "Bed"
                                //    },
                                //    editorType: "dxSelectBox",
                                //    editorOptions: {
                                //        elementAttr: { "id": "bed" },
                                //        items: ["Single", "Double", "Triple"],
                                //        placeholder: "Select Bed Size",
                                //        onValueChanged: function (e) {

                                //            if (e.value === "Single") {
                                //                roomTypeOptions = ["AC", "Non AC"];
                                //            } else if (e.value === "Double") {
                                //                roomTypeOptions = ["AC", "NON AC"];
                                //            } else if (e.value === "Triple") {
                                //                roomTypeOptions = ["AC", "Non AC"];
                                //            }
                                //            $("#roomTypes").dxSelectBox("instance").option("items", roomTypeOptions);
                                //        },
                                //    },
                                //},

                                //{
                                //    dataField: "roomType",
                                //    isRequired: true,
                                //    label: {
                                //        text: "Room Type"
                                //    },
                                //    editorType: "dxSelectBox",
                                //    editorOptions: {
                                //        elementAttr: { "id": "roomTypes" },
                                //        items: roomTypeOptions,
                                //        placeholder: "Select Room Type",
                                //        onValueChanged: function (e) {

                                //            var bedSelectVaue = $("#bed").dxSelectBox('instance').option('value');
                                //            GetRooms(bedSelectVaue, e.value);
                                //        },
                                //    },
                                //},
                                //{
                                //    dataField: "roomNo",
                                //    dataSource: roomNumArr,
                                //    isRequired: true,
                                //    displayExpr: "displayValue",
                                //    valueExpr: "value",
                                //    label: {
                                //        text: "Room No"
                                //    },
                                //    editorType: "dxSelectBox",
                                //    editorOptions: {
                                //        elementAttr: { "id": "roomNos" },
                                //        onValueChanged: function (e) {

                                //            GetRoomPrice(e.value)
                                //        }
                                //    }
                                //},
                                //{
                                //    dataField: "price",
                                //    isRequired: true,
                                //    editorType: "dxTextBox",
                                //    editorOptions: {
                                //        elementAttr: { "id": "price" },
                                //        readOnly: true,
                                //    },

                                //    label: {
                                //        text: "Price"
                                //    },
                                //},
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
                        text: "Add CheckOut",
                        useSubmitBehavior: true,
                        onClick: async function () {
                            var form = $('#checkoutForm').dxForm("instance");
                            var formData = form.option("formData")
                            await addCheckout(formData);
                            $("#checkoutPopup").dxPopup("hide");
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
        title: "Add Customer CheckOut Time",
        width: 450,
        height: 250,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });


   

    dataGrid = $('#dataGrid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            //key: customerId,
            loadUrl: `/Customer/GetCustomerCheckGrid?id=${customerId}`,
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
            dataField: 'checkIn',
            caption: 'Check In',
            validationRules: [{
                type: 'stringLength',
            }],
            },
            {
                dataField: 'checkOut',
                caption: 'Check Out',
                validationRules: [{
                    type: 'stringLength',
                }],
            },
            {
            dataField: 'roomNo',
            caption: 'Room Number',
            validationRules: [{
                type: 'stringLength',
            }],
        }, {
            dataField: 'roomType',
            caption: 'Room Type',
            validationRules: [{
                type: 'stringLength',
            }],
        }, {
            dataField: 'bed',
            caption: 'Bed',
            validationRules: [{
                type: 'stringLength',
            }],
        }, {
            dataField: 'price',
            caption: 'Price',
            validationRules: [{
                type: 'stringLength',
            }],
            },
            {
                //dataField: 'Actions',
                //width: 200,
                
                //cellTemplate(container, options) {
                //    $('<div>')
                //        .append($(`<button id="checkoutButton_${options.row.data.customerId}" onclick="checkOutCustomer('${options.row.data.customerId}', '${options.row.data.roomId}', '${options.row.data.customersInRoomsId}')">Add CheckOut</button>`))
                //        .appendTo(container);
                //},

                 
                dataField: 'Actions',
                width: 200,
                cellTemplate(container, options) {
             
                    const CheckOutNull = options.row.data.checkOut === null;
                    
                    if (CheckOutNull) {
                        $('<div>')
                            .append($(`<button id="checkoutButton_${options.row.data.customerId}" onclick="checkOutCustomer('${options.row.data.customerId}', '${options.row.data.roomId}', '${options.row.data.customersInRoomsId}')">Add CheckOut</button>`))
                            .appendTo(container);
                    } else {
                        $('<div>').appendTo(container);
                    }
                },
            
                

                //make buttons
                //cellTemplate(container, options) {
                //    $('<div>')
                //        .append($(`<button onclick="checkOutCustomer('${options.row.data.customerId}', '${options.row.data.roomId}', '${options.row.data.customersInRoomsId}')">Add CheckOut</button>`))

                //       // .append($('<button onclick="checkOutCustomer(\'' + options.row.data.customerId + '\')">Add CheckOut</button> '))
                //        .appendTo(container);
                //},
                
            }
        ],
        //filterRow: {
        //    visible: true,
        //},
        //headerFilter: {
        //    visible: true,
        //},
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


function GetRooms(bedType, roomType) {
    $.ajax({
        url: "/Room/GetRoomByType",
        type: "GET",
        data: { bedType: bedType, roomType: roomType },
        success: function (response) {
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
        data: { roomNo: roomNo },

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


function checkCustomer(customerId)
{
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


function AlloteRoomToCustomer(customerId) {
    var checkInDate = new Date(customerId.checkIn).toISOString();
    //var checkOutDate = new Date(customerId.checkOut).toISOString();
    $.ajax({
        url: "/CustomersInRooms/AlloteRoomToCustomer",
        type: "Post",
        data: {
            CustomerId: customerId.customer.customerId, checkIn: checkInDate, roomId: customerId.roomNo
        },

        success: function (response) {

            console.log("Room Allote to Customer successfully");
            dataGrid.refresh(true);
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}

function getQueryParam(parameter) {
    var queryString = window.location.search.substring(1);
    var queryParams = queryString.split('&');

    for (var i = 0; i < queryParams.length; i++) {
        var pair = queryParams[i].split('=');
        if (pair[0] === parameter) {
            return pair[1];
        }
    }

    return null;
}


function checkOutCustomer(customerId, roomId, customerInRoomId) {
    $.ajax({
        url: "/Customer/GetCustomerById",
        type: "Get",
        data: {
            id: customerId, roomId: roomId, customerInRoomId: customerInRoomId
        },

        success: function (response) {
            
            $("#checkoutPopup").dxPopup("instance").show();
            var form = $('#checkoutForm').dxForm("instance");
            form.option("formData", response);

            dataGrid.refresh(true);
        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}

//function GetCustomerCheckGrid(customerId)
//{
//    $.ajax({
//        url: "/Customer/GetCustomerCheckGrid",
//        type: "Get",
//        data: { id: customerId },
//        success: function (response) {

//            console.log("Customer id get successfully in backend:", response);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {

//            console.error("Error submitting data:", textStatus, errorThrown);
//        }
//    });
//}


function addCheckout(formData) {
    var checkOutDate = new Date(formData.checkOut).toISOString();
    $.ajax({
            url: "/CustomersInRooms/addCheckOut",
        type: "Post",
        data: { roomId: formData.rooms.roomId, checkout: checkOutDate, cusInroom: formData.customersInRoomsId },
            success: function (response) {

                console.log("Customer id get successfully in backend:", response);
                dataGrid.refresh(true);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.error("Error submitting data:", textStatus, errorThrown);
            }
        });
}