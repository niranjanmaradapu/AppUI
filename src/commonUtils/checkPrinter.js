import React, { useRef, useState } from "react";

const printerReciept = () => {
  // 192.168.1.13  HOME
  // 10.80.2.50 OFC
   const printSucess = "printed...."
     let printer;
    let prn = printer.current;
    if (!prn) {
      alert("Not connected to printer");
      return;
    }
    // var receiptString =
    // "======================\n" +
    // "|       Invoice      |\n" +
    // "======================\n" +
    // "Item             Price\n" +
    // "----------------------\n" +
    // "shirts           10.40\n" +
    // "T-shirts         20.60\n" +
    // "paste            10.00\n" +
    // "Idlyrava         15.00\n" +
    // "pants            10.00\n" +
    // "bendi            25.00\n" +
    // "brinja           10.00\n" +
    // "tamatoo          45.00\n" +
    // "shorts           50.00\n" +
    // "shoes            70.00\n" +
    // "sandle           30.00\n" +
    // "fliplops         55.00\n" +
    // "----------------------\n" +
    // "Total-----------220.00\n";
    // prn.addText(receiptString);
    // prn.addFeedLine(5);
    // prn.addCut(prn.CUT_FEED);

    // prn.send();

   // *************************PRINT BILL*****************************
    prn.addTextPosition(212);
    prn.addTextVPosition(486);
    prn.addText('EASY RETAIL\n');
    prn.addTextPosition(240);
    prn.addText('Invoice\n');
    prn.addText(' =============================================\n');
    prn.addTextPosition(3);
    prn.addBarcode('ESYRETAIL7895574', prn.BARCODE_CODE39, prn.HRI_BELOW, prn.FONT_B, 2, 90);
    prn.addText(' =============================================\n');
    prn.addTextPosition(10);
    prn.addText('CUSTOMER NAME:   Kadali         \n');
    prn.addTextPosition(10);
    prn.addText('Mobile       :   8328418471      \n');
    prn.addText(' =============================================\n');
    prn.addText(' |                ITEMS LIST                 |\n');
    prn.addText(' =============================================\n');
    prn.addText(' S.No   Item     Qty    Type     Disc    Price\n');
    prn.addText(' ---------------------------------------------\n');
    prn.addText(' 1.    shirts     2       M      0.0   1850.00\n');
    prn.addText(' 2.    sarees     4       F      0.0   2550.00\n');
    prn.addText(' 3.    T-shirts   3       M      0.0   3000.00\n');
    prn.addText(' 4.    shorts     2       M      0.0    750.00\n');
    prn.addText(' 5.    pants      1       T      0.0    800.00\n');
    prn.addText(' 6.    shoes      1       S      0.0   1250.00\n');
    prn.addText(' 7.    socks      2       M      0.0    250.00\n');
    prn.addText(' 8.    paste      5       Y      0.0    450.00\n');
    prn.addText(' 9.    soaps      6       M      0.0    350.00\n');
    prn.addText(' 10.   brushes    5       F      0.0    800.00\n');
    prn.addText(' ---------------------------------------------\n');
    prn.addText(' Total            31             0.0  11230.00\n');
    prn.addText(' ---------------------------------------------\n');
    prn.addText(' Tax                                          \n');
    prn.addText(' ---------------------------------------------\n');
    prn.addText(' SGST                                   125.00\n');
    prn.addText(' CGST                                   125.00\n');
    prn.addText(' IGST                                     0.00\n');
    prn.addText(' ---------------------------------------------\n');
    prn.addText(' Net Total                            11230.00\n');
    prn.addText(' ---------------------------------------------\n');
    // prn.addSymbol('http://www.google.com/', prn.SYMBOL_QRCODE_MODEL_1, prn.LEVEL_DEFAULT, 9, 8, 350);
    prn.addText(' ==================THANK YOU===================\n');
    prn.addCut(prn.CUT_FEED);
    // *************************PRINT BILL*****************************
   
    prn.send();

    return printSucess
 
};

export default printerReciept;
