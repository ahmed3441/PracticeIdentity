
var dataGrid;
var selectedId;

$(() => {

    $('#button').dxButton({
        type: "success",
            text: "Add Room",
            onClick: function () {
                $("#popup").dxPopup("instance").show();
            }
    });
    
        $("#popup").dxPopup({
            contentTemplate: () => {

                const form = $("<div id=myForm>").dxForm({
                    formData: {
                        //RoomNo: "",
                        //RoomType: "",
                        //Bed: "",
                        //Price: "",
                    },

                    items: [
                        {
                            dataField: "roomNo",
                            label: {
                                text: "Room No"
                            }
                        },

                        {
                            dataField: "roomType",
                            label: {
                                text: "Room Type"
                            },
                             editorType: "dxSelectBox",
                            editorOptions: {
                                items: ["AC", "Non AC",],
                                placeholder: "Select Room Type",
                            }
                        },

                        {
                            dataField: "bed",
                            label: {
                                text: "Bed"
                            },

                             editorType: "dxSelectBox",
                            editorOptions: {
                                items: ["Single", "Double","Triple"],
                                placeholder: "Select Bed Sizes",
                            }
                        },

                        {
                            dataField: "price",
                            label: {
                                text: "Price"
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
                                    await AddRoom(formData);
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
            title: "Add Room",
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
     
                },

                items: [
                    {
                        dataField: "roomNo",
                        editorType: "dxTextBox",
                        label: {
                            text: "Room No"
                        }
                    },

                    {
                        dataField: "roomType",
                        editorType: "dxTextBox",
                        label: {
                            text: "Room Type"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            items: ["AC", "Non AC",],
                            placeholder: "Select Room Type",
                        }
                    },

                    {
                        dataField: "bed",
                        editorType: "dxTextBox",
                        label: {
                            text: "Bed"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            items: ["Single", "Double", "Triple"],
                            placeholder: "Select Bed Sizes",
                        }
                    },

                    {
                        dataField: "price",
                        editorType: "dxTextBox",
                        label: {
                            text: "Price"
                        }
                    },

                    {
                        itemType: "button",
                        horizontalAlignment: "center",
                        buttonOptions: {
                            text: "Save Changes",
                            onClick: async function () {
                                await UpdateRooms();
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
        title: "Edit Room",
        width: 500,
        height: 350,
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

                                await deleteroom(); 
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
        title: "Delete Room",
        width: 500,
        height: 200,
        resizeEnabled: true,
        dragEnabled: true,
        position: "center"
    });
  
    function AddRoom(roomData) {
            $.ajax({
                url: "/Room/AddRoom",
                type: "POST",
                data: roomData,
                success: function (response) {
                    dataGrid.refresh();
                    toast('success', 'Room Add successfully');
                    console.log("Data submitted successfully:", response);
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    console.error("Error submitting data:", textStatus, errorThrown);
                }
            });
    }
    
   dataGrid= $('#dataGrid').dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: 'roomId',
            loadUrl: `/Room/GetRooms`,
            //insertUrl: `${url}/InsertOrder`,
            updateUrl: `/Room/UpdateRooms`,
            //deleteUrl: `${url}/DeleteOrder`,
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
        //   {
        //    dataField: 'roomId',
        //    caption: 'Room Id',
        //    validationRules: [{
        //        type: 'stringLength',
        //    }],   
        //},
            {
            dataField: 'roomNo',
            caption: 'Room Number',
            dataType: 'stringLength',
            validationRules: [{
                type: 'required',
            }],
            },
            {
            dataField: 'roomType',
            caption: "Room Type",
            validationRules: [{
                type: 'stringLength',
            }],
            },
            {
            dataField: 'bed',
            validationRules: [{
                type: 'stringLength',
            }],
            },
            {
            dataField: 'price',
            caption: 'Room Price',
            validationRules: [{
                type: 'numeric',
            }],
            },

        {
            dataField: 'booked',
            validationRules: [{
                type: 'stringLength',
            }],
        },
            {
                dataField: 'Actions',
                width: 150,
                allowFiltering: false,
                allowSorting: false,
                //make buttons
                cellTemplate(container, options) {
                    $('<div>')
                        .append($('<button onclick="getRoom(\'' + options.row.data.roomId + '\')" >Edit</button> <button onclick="deleteRoom(\'' + options.row.data.roomId + '\')">Delete</button>'))
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
        
        grouping: {
            autoExpandAll: false,
        },
   }).dxDataGrid("instance");
});

function getRoom(roomId) {
    $.ajax({
            url: "/Room/GetRoomById",
            type: "Get",
            data: { id: roomId },
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

function UpdateRooms() {
    var form = $('#editForm').dxForm("instance");
    var formData = form.option("formData")

    $.ajax({
        url: "/Room/UpdateRooms",
        type: "Put",
        data: formData,

        success: function (response) {
            $("#editPopup").dxPopup("hide");
            
            dataGrid.refresh(true);
            toast('success', 'Room updated successfully');
            console.log("data get successfully");

        },
        error: function (jqxhr, textstatus, errorthrown) {
            console.error("error submitting data:", textstatus, errorthrown);
        }
    });
}

function deleteRoom(roomId) {

    selectedId = roomId;
    $("#deletePopup").dxPopup("instance").show();
}

function deleteroom() {
    $.ajax({
                url: "/Room/DeleteRoom",
        type: "GET",
        data: { id: selectedId },

                success: function (response) {

                    $("#deletePopup").dxPopup("instance").hide();
                    dataGrid.refresh(true);
                    toast('error', 'Room Delete successfully');
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
