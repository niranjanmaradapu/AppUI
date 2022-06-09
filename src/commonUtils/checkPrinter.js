import React, { useRef, useState } from "react";
// import {BrowserPrint} from 'browserprint'
const PrintBarcode = (type,object) => {
  console.log(type);
  console.log(object);
  var devices = []
  let selected_device =null
  let devicename =""
  // let count =object.qty;
  let count = 1;
  let barcode=object.barcode;
  let barcodeName = object.name;
  let barcodePrice = object.itemMrp;
  let barcodeCategory = object.category;

  // let  BrowserPrint = {},
  //Get the default device from the application as a first step. Discovery takes longer to complete.
  window.BrowserPrint.getDefaultDevice("printer", function (device) {

    //Add device to list of devices and to html select element
    selected_device = device;
    devices.push(device);
    // var html_select = document.getElementById("selected_device");
    // var option = document.createElement("option");
    devicename = device.name;
   
    // html_select.add(option);
    //  selected_device.send('^XA^CF0,50^FO150,30^FDEasy Retail^FS^CF0,30^FX Third section with bar code.^BY3,1,100^FO100,80^BC^FD'+barcode+'^FS^FO70,240^GB450,120,3^FS^FO300,240^GB3,120,3^FS^CF0,20^FO100,260^FDName:^FS^FO100,290^FDPrice:^FS^FO100,320^FDCategory:^FS^CF0,20^FO380,260^FD' +barcodeName+'^FS^FO380,290^FD'+barcodePrice+'^FS^FO380,320^FD'+barcodeCategory+'^FS^XZ'  , undefined, null);
    for(let i=0;i<count;i++){
     selected_device.send('^XA^CF0,50^FO150,30^FDEasy Retail^FS^CF0,30^FX Third section with bar code.^BY3,1,100^FO100,80^BC^FD'+barcode+'^FS^FO70,240^GB450,120,3^FS^FO300,240^GB3,120,3^FS^CF0,20^FO100,260^FDName: ' +barcodeName+'^FS^CF0,30^FO100,290^FDPrice: '+barcodePrice+'^FS^CF0,20^FO100,325^FDCategory: '+barcodeCategory+'^FS^CF0,60^FO380,260^FDOTSI^FS^XZ'  , undefined, null);
    }
    //Discover any other devices available to the application
    window.BrowserPrint.getLocalDevices(function (device_list) {
      var printers_available = false;
      for (var i = 0; i < device_list.length; i++) {
        //Add device to list of devices and to html select element
        var device = device_list[i];
        if (!selected_device || device.uid != selected_device.uid) {
          devices.push(device);
          var option = document.createElement("option");
          option.text = device.name;
          option.value = device.uid;  
          printers_available = true
          // html_select.add(option);
        }
      }
      

    }, function () { alert("Error getting local devices") }, "printer");

  }, function (error) {
    alert(error);
  })

 
};

export default PrintBarcode;
