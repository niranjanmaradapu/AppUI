import React, { Component, useRef } from "react";
import scan from "../../assets/images/scan.svg";
import edit from "../../assets/images/edit.svg";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import InventoryService from "../../services/InventoryService";
import URMService from "../../services/URM/URMService";
import { toast } from "react-toastify";
import { number } from "prop-types";
import { stringify } from "querystring";
import * as xlsx from "xlsx";
import ReactPageNation from "../../commonUtils/Pagination";
import PrintBarcode from "../../commonUtils/checkPrinter";
// import paginationFactory, {
//   PaginationProvider,
//   SizePerPageDropdownStandalone,
//   PaginationListStandalone,
// } from "react-bootstrap-table2-paginator";
// import ToolkitProvider, {
//   Search,
// } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// import BootstrapTable from "react-bootstrap-table-next";
const data1 = [
  "Textile",

  "Retail",

  "Electronics"

];
export default class BarcodeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddBarcode: false,
      uomsList: [],
      hsnList: [],
      storeIds: [],
      sortedStoreIds: [],
      uom: "",
      barcodeId: "",
      stock: "",
      costPrice: "",
      listPrice: "",
      empId: "",
      isLoggedUser: false,
      clientId: "",
      storesList: [],
      domainsList: [],
      domain: "",
      storeId: "",
      status: "",
      productValidity: "",
      fromDate: "",
      toDate: "",
      barcodeSearchId: "",
      domainData: "",
      barcodesList: [],
      pageNumber: 0,
      columns: [
        {
          name: "barcode",
          selector: (row) => row.barcode,
        },
        {
          name: "itemMrp",
          selector: (row) => row.itemMrp,
        },
        {
          name: "originalBarcodeCreatedAt",
          selector: (row) => row.originalBarcodeCreatedAt,
        },
        {
          name: " qty",
          selector: (row) => row.qty,
        },
        {
          name: "value",
          selector: (row) => row.value,
        },
      ],
      domainDetails: {},
      isEdit: false,
      domainId: "",
      qty: "",
      stockValue: "",
      productItemId: "",
      selectedStoreId: "",
      name: "",
      productTextile: "",
      barcodeTextileId: "",
      divisionsList: [],
      sectionsList: [],
      subSectionsList: [],
      categoriesList: [],
      subSection: "",
      section: "",
      division: "",
      category: "",
      batchNo: "",
      selectedDomain: "",
      domainDetailsObj: {},
      colour: "",
      hsnCode: "",
      commonFieldsErr: false,
      retailFieldsErr: false,
      textileFieldsErr: false,
      errors: {},
      totalPages: 0,
      statusTypeList: [
        { id: 1, label: "YES", value: "YES" },
        { id: 0, label: "NO", value: "NO" },
      ],
    };
    this.addBarcode = this.addBarcode.bind(this);
    this.openBarcode = this.openBarcode.bind(this);
    this.getAllBarcodes = this.getAllBarcodes.bind(this);
    this.changePage = this.changePage.bind(this);
    this.editBarcode = this.editBarcode.bind(this);
    this.openEditBarcode = this.openEditBarcode.bind(this);
    this.closeBarcode = this.closeBarcode.bind(this);
    this.getDomainsList = this.getDomainsList.bind(this);
    this.setDropdowns = this.setDropdowns.bind(this);
    this.checkForMandatory = this.checkForMandatory.bind(this);
    this.handleDivisionChange = this.handleDivisionChange.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleSubsectionChange = this.handleSubsectionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleHsnChange = this.handleHsnChange.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.setStoreNames = this.setStoreNames.bind(this);
    this.storeNameMap = this.storeNameMap.bind(this);
    this.inputReference = React.createRef();
    this.deleteBarcode = this.deleteBarcode.bind(this);
    this.preventMinus = this.preventMinus.bind(this);
    this.updateBarcodesQuntity = this.updateBarcodesQuntity.bind(this);
  }

  openBarcode() {
    this.setState({ isAddBarcode: true });
    this.setState({ isEdit: false });
    this.setDropdowns(false);
    this.stateReset();
  }

  closeBarcode() {
    this.setState({ isAddBarcode: false });
    this.stateReset();
  }
  openEditBarcode(barcodeId,Value) {
    this.setState({popupVlaue:Value})
    this.setState({ isAddBarcode: true });
    this.setState({ isEdit: true });
    this.getbarcodeDetails(barcodeId);
  }

  EditBarcode(barcodeId){
    this.setState({ isAddBarcode: true });
    this.setState({ isEdit: true });
    this.getbarcodeDetails(barcodeId);
  }
  clear = () => {
    this.setState({
      fromDate: '',
      toDate: '',
      barcodeSearchId: ''
    }, () => {
      this.getAllBarcodes(0);
    });

  }


  componentWillMount() {
    this.state.domainDetailsObj = undefined;
    // this.state.domainDetails = JSON.parse(
    //   sessionStorage.getItem("selectedDomain")
    // );
    // this.setState({ domainDetails: this.state.domainDetails });
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.setState({
      selectedStoreId: JSON.parse(sessionStorage.getItem("storeId")),
    });
    if (user["custom:isSuperAdmin"] === "true") {
      this.setState(
        {
          clientId: user["custom:clientId1"],
        },
        () => {
          this.getAllBarcodes(0);
          this.getAllStoresList();
          this.getAllUoms();
          this.getAllDivisions();
          this.getHsnDetails();
          this.getAllCategories();
          this.loadErrorMsgs();
        }
      );
    } else {
      this.setState(
        {
          clientId: user["custom:clientId1"],
          // domainId: user["custom:domianId1"]
        },
        () => {
          this.getAllStoresList();
          this.getAllBarcodes(0);
          // this.getAllUoms();
          // this.getAllDivisions();
          // this.getHsnDetails();
          // this.getAllCategories();
          this.loadErrorMsgs();
        }
      );
    }
  }
  handleDomainChange = (event) => {
    // this.setState({selectedDomain: event.target.value });
    // console.log(this.state.selectedDomain)
    // let copy = {}
    // data1.forEach((item, index) => {
    //   if (item.label === event.target.value) {
    //     copy = Object.assign({}, item);
    //   }
    // })

    this.setState({ selectedDomain: event.target.value, domainDetailsObj: event.target.value }, () =>
      console.log(this.state.domainDetailsObj));
    //  this.getHeaders(e.target.value)
     this.getAllUoms();
     this.getAllDivisions(event.target.value);
     this.getHsnDetails(event.target.value);
     this.getAllCategories(event.target.value);
    //  this.loadErrorMsgs();

  }
  handleChange = (e) => {
    this.setState({ uom: e.target.value });
  };
  handleStoreChange = (e) => {
    this.setState({ storeId: e.target.value });
  };

  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  };

  handleDivisionChange = (e) => {
    this.setState({
      division: e.target.value,
      subSectionsList: [],
      subSection: "",
    });
    this.getAllSections(e.target.value,this.state.selectedDomain);
  };
  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
    this.getAllSubsections(e.target.value,this.state.selectedDomain);
  };
  handleSubsectionChange = (e) => {
    this.setState({ subSection: e.target.value });
  };
  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  handleHsnChange = (e) => {
    this.setState({ hsnCode: e.target.value });
  };

  getAllBarcodes(pageNumber) {
    let saveJson = {};
    this.setState({ sortedStoreIds: [] });
    // if (
    //   this.state.domainDetailsObj &&
    //   this.state.domainDetailsObj === "Retail"
    // ) {
    //   saveJson = {
    //     fromDate: this.state.fromDate,
    //     toDate: this.state.toDate,
    //     barcodeId: this.state.barcodeSearchId,
    //     storeId: this.state.selectedStoreId,
    //   };
    // } else {

    saveJson = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      barcode: this.state.barcodeSearchId.trim(),
      storeId: this.state.selectedStoreId,
    };
    // }

    InventoryService.getAllBarcodes(
      saveJson,
      this.state.domainDetailsObj,
      pageNumber
    )
      .then((res) => {
        // console.log("...", pageNumber);
        if (res.data.content.length !== 0) {
          this.state.barcodesList = res?.data;
          this.setState({
            barcodesList: this.state.barcodesList,
            totalPages: res.data.totalPages,
          });
          this.setStoreNames();

        } else {
          this.setState({ barcodesList: [] });
          toast.error("No Record Found");
        }

      })
      .catch((error) => {
        if (error.response && error.response.data.isSuccess === "false") {
          this.setState({ barcodesList: [] });
          toast.error("Please enter valid Barcode details ");
        }
      });
  }

  changePage(pageNumber) {
    console.log(">>>page", pageNumber);
    let pageNo = pageNumber + 1;
    this.setState({ pageNumber: pageNo });
    this.getAllBarcodes(pageNumber);
  }

  setStoreNames() {
    this.state.barcodesList.forEach((ele, index) => {
      if (
        this.state.domainDetailsObj &&
        this.state.domainDetailsObj === "Retail"
      ) {
        if (ele.storeId) {
          this.state.sortedStoreIds.push(JSON.stringify(ele.storeId));
        }
      } else {
        if (ele.productTextile && ele.productTextile.storeId) {
          this.state.sortedStoreIds.push(
            JSON.stringify(ele.productTextile.storeId)
          );
        }
      }
    });
    this.setState({ sortedStoreIds: this.state.sortedStoreIds });
    this.setState({ storeIds: this.uniq() });
    this.getStoreNamesById();
  }

  uniq() {
    return Array.from(new Set(this.state.sortedStoreIds));
  }

  getStoreNamesById() {
    let obj = {};
    this.state.sortedStoreIds = [];
    this.setState({ sortedStoreIds: this.state.sortedStoreIds });
    if (this.state.storeIds && this.state.storeIds.length > 0) {
      InventoryService.getStoreNamesByIds(this.state.storeIds).then((res) => {
        if (res && res.data && res.data.result && res.data.result.length > 0) {
          res.data.result.forEach((ele, index) => {
            obj = {
              id: ele.id,
              value: ele.name,
            };
            this.state.sortedStoreIds.push(obj);
          });
          this.setState({ sortedStoreIds: this.state.sortedStoreIds });
          this.storeNameMap();
        }
      });
    }
  }

  storeNameMap() {
    if (this.state.barcodesList && this.state.barcodesList.length > 0) {
      this.state.barcodesList.forEach((ele, index) => {
        this.state.sortedStoreIds.forEach((ele1, index1) => {
          if (
            this.state.domainDetailsObj &&
            this.state.domainDetailsObj === "Retail"
          ) {
            if (ele.storeId === ele1.id) {
              this.state.barcodesList[index].storeName = ele1.value;
              // this.setState({ barcodesList: this.state.barcodesList });
            }
          } else if (ele.productTextile.storeId === ele1.id) {
            this.state.barcodesList[index].productTextile.storeName =
              ele1.value;
            // this.setState({ barcodesList: this.state.barcodesList });
          }
        });
        this.setState({ barcodesList: this.state.barcodesList });
      });
    }
  }

  getAllUoms() {
    InventoryService.getUOMs().then((res) => {
      res.data.forEach((ele, index) => {
        const obj = {
          id: ele.id,
          value: ele.uomName,
          label: ele.uomName,
        };
        this.state.uomsList.push(obj);
      });
    });
  }

  getHsnDetails() {
    InventoryService.getAllHsnList().then((res) => {
      res.data.result.forEach((ele, index) => {
        const obj = {
          id: ele.id,
          value: ele.hsnCode,
          label: ele.hsnCode,
        };
        this.state.hsnList.push(obj);
      });

      this.setState({ hsnList: this.state.hsnList });
      console.log(this.state.hsnList);
    });
  }

  getAllDivisions(data) {
    InventoryService.getAllDivisions(data).then((res) => {
      res.data.forEach((ele, index) => {
        const obj = {
          id: ele.id,
          value: ele.name,
          label: ele.name,
        };
        this.state.divisionsList.push(obj);
      });
      this.setState({ divisionsList: this.state.divisionsList });
    });
  }

  getAllSections(id,data) {
    this.setState({ sectionsList: [] });
    InventoryService.getAllSections(id,data).then((res) => {
      if (res.data) {
        res.data.forEach((ele, index) => {
          const obj = {
            id: ele.id,
            value: ele.name,
            label: ele.name,
          };
          this.state.sectionsList.push(obj);
        });
        this.setState({ sectionsList: this.state.sectionsList });
      } else {
        this.setState({ sectionsList: [] });
      }
      console.log(this.state.sectionsList);
    });
  }

  getAllSubsections(id,data) {
    this.setState({ subSectionsList: [] });
    InventoryService.getAllSections(id,data).then((res) => {
      if (res.data) {
        res.data.forEach((ele, index) => {
          const obj = {
            id: ele.id,
            value: ele.name,
            label: ele.name,
          };
          this.state.subSectionsList.push(obj);
        });
        this.setState({ subSectionsList: this.state.subSectionsList });
      } else {
        this.setState({ subSectionsList: [] });
      }
    });
  }

  getAllCategories(data) {
    this.setState({ categoriesList: [] });
    InventoryService.getAllCategories(data).then((res) => {
      if (res.data) {
        res.data.forEach((ele, index) => {
          const obj = {
            id: ele.id,
            value: ele.name,
            label: ele.name,
          };
          this.state.categoriesList.push(obj);
        });
        this.setState({ categoriesList: this.state.categoriesList });
      } else {
        this.setState({ categoriesList: [] });
      }
    });
  }

  dateFormat = (d) => {
    let date = new Date(d)
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
  }

  getAllStoresList() {
    URMService.getStoresByDomainId(this.state.clientId).then(
      (res) => {
        if (res) {
          res.data.forEach((ele, index) => {
            const obj = {
              id: ele.id,
              value: ele.name,
              label: ele.name,
            };
            this.state.storesList.push(obj);
          });
        }
        this.setState({ storesList: this.state.storesList });
      }
    );
  }

  getDomainsList() {
    URMService.getDomainsList(this.state.clientId).then((res) => {
      if (res) {
        this.setState({
          domainsList: res.data.result,
          domainId: res.data.result[0].clientDomainaId,
        });
        this.getAllStoresList();
      }
    });
  }

  getbarcodeDetails(barcodeId) {
    InventoryService.getBarcodeDetails(
      barcodeId,
      this.state.domainDetailsObj,
      this.state.selectedStoreId
    ).then((res) => {
      const barcode = res.data;
      if (res.data) {
        if (
          this.state.domainDetailsObj &&
          this.state.domainDetailsObj === "Retail"
        ) {
          this.setState({
            status: barcode.status,
            stockValue: barcode.stockValue ? barcode.stockValue : "",
            qty: barcode.qty ? barcode.qty : "",
            barcodeId: barcode.barcodeId,
            name: barcode.name,
            colour: barcode.colour,
            costPrice: barcode.costPrice,
            listPrice: barcode.listPrice,
            productValidity: barcode.productValidity,
            storeId: barcode.storeId,
            empId: barcode.empId,
            uom: barcode.uom,
            productItemId: barcode.productItemId,
            hsnCode: barcode.hsnCode,
            batchNo: barcode.batchNo,
          });
        } else {
          this.setState({
            status: barcode.status,
            stockValue: barcode.stockValue ? barcode.stockValue : "",
            qty: barcode.qty ? barcode.qty : "",
            barcodeId: barcode.barcodeId,
            productTextileId: barcode.id,
            barcodeTextileId: barcode.barcodeTextileId,
            costPrice: barcode.costPrice,
            storeId: barcode.storeId,
            empId: barcode.empId,
            uom: barcode.uom,
            division: barcode.division,
            section: barcode.section,
            listPrice: barcode.itemMrp,
            subSection: barcode.subSection,
            category: barcode.category,
            batchNo: barcode.batchNo,
            colour: barcode.colour,
            hsnCode: barcode.hsnCode,
            name: barcode.name,
            domainDetailsObj: barcode.domainType,
            selectedDomain: barcode.domainType
          });
        }
        this.setDropdowns(true);
      } else {
        toast.error(res.data.message);
      }
    });
  }

  setDropdowns(isEdit) {
    if (isEdit && this.state.domainDetailsObj === "Textile") {
      this.getAllSections(this.state.division,this.state.selectedDomain);
      this.getAllSubsections(this.state.section,this.state.selectedDomain);
    }
  }
  
  updateBarcodesQuntity(barcodeId) {
    InventoryService.updateBarcodesQuntity(
      barcodeId,
      this.state.domainDetailsObj,
      this.state.selectedStoreId
    ).then((res) => {
      const barcode = res.data;
      if (res.data) {
        if (
          this.state.domainDetailsObj &&
          this.state.domainDetailsObj === "Retail"
        ) {
          this.setState({
            status: barcode.status,
            id: this.state.productTextileId,
            stockValue: barcode.stockValue ? barcode.stockValue : "",
            qty: barcode.qty ? barcode.qty : "",
            barcodeId: barcode.barcodeId,
            name: barcode.name,
            colour: barcode.colour,
            costPrice: barcode.costPrice,
            listPrice: barcode.listPrice,
            productValidity: barcode.productValidity,
            storeId: barcode.storeId,
            empId: barcode.empId,
            uom: barcode.uom,
            productItemId: barcode.productItemId,
            hsnCode: barcode.hsnCode,
            batchNo: barcode.batchNo,
          });
        } else {
          this.setState({
            status: barcode.status,
            stockValue: barcode.stockValue ? barcode.stockValue : "",
            qty: barcode.qty ? barcode.qty : "",
            barcodeId: barcode.barcodeId,
            productTextileId: barcode.id,
            id: this.state.productTextileId,
            barcodeTextileId: barcode.barcodeTextileId,
            costPrice: barcode.costPrice,
            storeId: barcode.storeId,
            empId: barcode.empId,
            uom: barcode.uom,
            division: barcode.division,
            section: barcode.section,
            listPrice: barcode.itemMrp,
            subSection: barcode.subSection,
            category: barcode.category,
            batchNo: barcode.batchNo,
            colour: barcode.colour,
            hsnCode: barcode.hsnCode,
            name: barcode.name,
            domainDetailsObj: barcode.domainType,
            selectedDomain: barcode.domainType
          });
        }
        this.setDropdowns(true);
      } else {
        toast.error(res.data.message);
      }
    });
  }
  addBarcode() {
    let domainInfo = this.state.domainDetailsObj;
    this.state.textileFieldsErr = false;
    let saveJson = {};
    // if (domainInfo && domainInfo === "Retail") {
    //   saveJson = {
    //     status: this.state.status,
    //     stockValue: this.state.stockValue,
    //     costPrice:parseInt(this.state.costPrice),
    //     itemMrp:parseInt(this.state.listPrice),
    //     productValidity: this.state.productValidity,
    //     storeId: this.state.storeId,
    //     empId: this.state.empId,
    //     uom: this.state.uom,
    //     isBarcode: false,
    //     domainType: this.state.domainDetailsObj,
    //     name: this.state.name,
    //     hsnCode: this.state.hsnCode,
    //     batchNo: this.state.batchNo,
    //     colour: this.state.colour,
    //   };
    // } else {
    saveJson = {
      status: (domainInfo === "Retail") ? this.state.status : null,
      // stockValue:(domainInfo === "Retail")? this.state.stockValue:null,
      productValidity: (domainInfo === "Retail") ? this.state.productValidity : null,
      isBarcode: (domainInfo === "Retail") ? false : null,
      division: parseInt(this.state.division),
      section: parseInt(this.state.section),
      subSection: parseInt(this.state.subSection),
      category: parseInt(this.state.category),
      batchNo: this.state.batchNo,
      colour: this.state.colour,
      name: this.state.name,
      qty: parseInt(this.state.qty),
      costPrice: parseInt(this.state.costPrice),
      itemMrp: parseInt(this.state.listPrice),
      storeId: parseInt(this.state.storeId),
      empId: this.state.empId,
      uom: this.state.uom,
      domainType: this.state.domainDetailsObj,
      hsnCode: this.state.hsnCode,
    };
    // }

    InventoryService.addBarcode(
      saveJson,
      this.state.domainDetailsObj,
      this.state.isEdit

    ).then((res) => {
      if (res.data) {
        toast.success("Barcode added successfully");
        // Printer Barcode used for Testing
        // PrintBarcode('BARCODE', res.data);
        this.setState({ isAddBarcode: false });
        this.props.history.push("/barcodeList");
        this.getAllBarcodes(0);
        this.stateReset();
      } else {
        toast.error(res.data.message);
      }
    });
  }

  stateReset() {
    this.setState({
      status: "",
      stockValue: "",
      costPrice: "",
      productValidity: "",
      storeId: "",
      empId: "",
      uom: "",
      domainId: "",
      name: "",
      listPrice: "",
      division: "",
      section: "",
      subSection: "",
      category: "",
      batchNo: "",
      hsnCode: "",
      colour: "",
      qty: "",
      popupVlaue:"",
      selectedDomain: "",
      domainDetailsObj: "",
      retailFieldsErr: false,
      textileFieldsErr: false,
      commonFieldsErr: false,
      sortedStoreIds: [],
    });
  }

  editBarcode() {
    let domainInfo = this.state.domainDetailsObj;
    let saveJson = {};
    // if (domainInfo && domainInfo === "Retail") {
    //   saveJson = {
    //     status: this.state.status,
    //     stockValue: this.state.stockValue,
    //     costPrice: this.state.costPrice,
    //     listPrice: this.state.listPrice,
    //     domainDataId: this.state.stockValue,
    //     productValidity: this.state.productValidity,
    //     storeId: this.state.storeId,
    //     empId: this.state.empId,
    //     uom: this.state.uom,
    //     barcodeId: this.state.barcodeId,
    //     domainDataId: this.state.domainDetailsObj,
    //     productItemId: this.state.productItemId,
    //     name: this.state.name,
    //     hsnCode: this.state.hsnCode,
    //     batchNo: this.state.batchNo,
    //     colour: this.state.colour,
    //   };
    // } else {
    saveJson = {
      status: this.state.edit ? this.state.status : null,
      productValidity: this.state.edit ? this.state.productValidity : null,
      id: this.state.productTextileId,
      division: parseInt(this.state.division),
      section: parseInt(this.state.section),
      subSection: parseInt(this.state.subSection),
      category: parseInt(this.state.category),
      batchNo: this.state.batchNo,
      colour: this.state.colour,
      name: this.state.name,
      qty: this.state.qty,
      costPrice: this.state.costPrice,
      itemMrp: parseInt(this.state.listPrice),
      storeId: this.state.storeId,
      domainType: this.state.domainDetailsObj,
      empId: this.state.empId,
      uom: this.state.uom,
      productTextileId: this.state.productTextileId,
      // hsnMasterId: this.state.hsnCode,
      hsnCode: this.state.hsnCode,
    };
    // }
    InventoryService.addBarcode(
      saveJson,
      this.state.domainDetailsObj,
      this.state.isEdit,
      this.state.popupVlaue
    ).then((res) => {
      if (res.data) {
        toast.success("Barcode updated Sucessfully");
        this.setState({ isAddBarcode: false });
        this.stateReset();
        this.props.history.push("/barcodeList");
        this.getAllBarcodes(0);
      }
    });
  }
  updateBarcodesQuntity(){
    let domainInfo = this.state.domainDetailsObj;
    let saveJson = {};
    saveJson = {
      status: this.state.edit ? this.state.status : null,
      productValidity: this.state.edit ? this.state.productValidity : null,
      id: this.state.productTextileId,
      division: parseInt(this.state.division),
      section: parseInt(this.state.section),
      subSection: parseInt(this.state.subSection),
      category: parseInt(this.state.category),
      batchNo: this.state.batchNo,
      colour: this.state.colour,
      name: this.state.name,
      qty: this.state.qty,
      costPrice: this.state.costPrice,
      itemMrp: parseInt(this.state.listPrice),
      storeId: this.state.storeId,
      domainType: this.state.domainDetailsObj,
      empId: this.state.empId,
      uom: this.state.uom,
      productTextileId: this.state.productTextileId,
      // hsnMasterId: this.state.hsnCode,
      hsnCode: this.state.hsnCode,
    };
    InventoryService.updateBarcodesQuntity(
      
    ).then((res) => {
      if (res.data) {
        toast.success("Barcode updated Sucessfully");
        this.setState({ isAddBarcode: true });
        this.setState({isEdit:true})
        this.stateReset();
        this.props.history.push("/barcodeList");
        this.getAllBarcodes(0);
      }
    });
    

  }

  deleteBarcode(id) {
    InventoryService.deleteBarcode(id, this.state.domainDetailsObj).then(
      (res) => {
        if (res.data && res.data) {
          toast.success(res.data.result);
          this.setState({ isAddBarcode: false });
          this.props.history.push("/barcodeList");
          this.stateReset();
          this.getAllBarcodes(0);
        } else {
          toast.error(res.data.message);
        }
      }
    );
  }

  barcodesRetailHeader() {
    return (
      <tr className="m-0 p-0">
        <th className="col-1">S.NO</th>
        <th className="col-3">BARCODE</th>
        <th className="col-1">MRP</th>
        <th className="col-2">CREATED DATE</th>
        <th className="col-1 p-l-1">QTY</th>
        <th className="col-1 p-l-0">VALUE</th>
        <th className="col-1 p-l-0">DOMAIN</th>
        <th className="col-2 text-center">Actions</th>
      </tr>
    );
  }

  barcodesTextileHeader() {
    return (
      <tr className="m-0 p-0">
        <th className="col-1">S.NO</th>
        <th className="col-3">BARCODE</th>
        <th className="col-1">Mrp</th>
        <th className="col-2">CREATED DATE</th>
        <th className="col-1 p-l-1">QTY</th>
        <th className="col-1 p-l-0">VALUE</th>
        <th className="col-1 p-l-0">DOMAIN</th>
        <th className="col-2 text-center">Actions</th>
      </tr>
    );
  }

  barcodesListTable() {
    return this.state.barcodesList.map((items, index) => {
      { console.log('++++items++++++++++', items) }
      const {
        // barcodeId,
        id,
        listPrice,
        storeId,
        storeName,
        createdDate,
        originalBarcodeCreatedAt,
        stockValue,
        value,
        domainType
      } = items;
      return (
        <tr key={index}>
          <td className="col-1 geeks">{index + 1}</td>
          {/* <td className="col-3 ">{barcodeId}</td> */}
          <td className="col-3 ">{id}</td>
          <td className="col-1">₹ {listPrice}</td>
          {/* <td className="col-2">{originalBarcodeCreatedAt}</td> */}
          <td className="col-1">{stockValue}</td>
          <td className="col-1">{value}</td>
          <td className="col-1">{domainType}</td>
          <td className="col-2 text-center">
            {/* <img src={edit} className="w-12 pb-2"  onClick={this.openEditBarcode}/> */}
            <img
              src={edit}
              className="w-12 pb-2"
              onClick={() => this.openEditBarcode(id)}
            />
            <i
              className="icon-delete m-l-2 fs-16"
              onClick={() => this.deleteBarcode(items?.id)}
            ></i>
          </td>
        </tr>
      );
    });
  }

  barcodesListTableTextile() {
    return (
      <>
        {this.state.barcodesList?.content?.map((items, index) => {
          const {
            barcode,
            itemMrp,
            originalBarcodeCreatedAt,
            qty,
            value,
            id,
            domainType
          } = items;
          let date = this.dateFormat(items.originalBarcodeCreatedAt);

          return (
            <tr key={index}>
              <td className="col-1 geeks">{index + 1}</td>
              <td className="col-3 ">{barcode}</td>
              <td className="col-1">₹ {itemMrp}</td>
              <td className="col-2">{date}</td>
              <td className="col-1">{qty}</td>
              <td className="col-1">{value}</td>
              <td className="col-1">{domainType}</td>
              <td className="col-2 text-center">
                {/* <img src={edit} className="w-12 pb-2"  onClick={this.openEditBarcode}/> */}
                  { <button
                className="btn-unic-redbdr mt-2"
                onClick={() => this.openEditBarcode(barcode,'REBAR')}
              >
                 REBARCODE
              </button> }
                <img
                  src={edit}
                  className="w-12 pb-2"
                  onClick={() => this.openEditBarcode(barcode,'EDIT')}
                />
                <i
                  className="icon-delete m-l-2 fs-16"
                  onClick={() => this.deleteBarcode(id)}
                ></i>
              </td>
            </tr>
          );
        })}
      </>
    );
  }

  statusDiv() {
    const { options, id } = this.state;
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>
            Status Type
            <span className="text-red font-bold">*</span>
          </label>
          <select
            className="form-control"
            placeholder="Select Store"
            onChange={this.handleStatusChange}
            value={this.state.status}
            disabled={this.state.isEdit}
          >
            <option value="" disabled>
              Select
            </option>
            {this.state.statusTypeList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </select>
          {this.retailFieldsErr && !this.state.status
            ? this.errorDiv("statusErr")
            : null}
        </div>
      </div>
    );
  }

  stockDate() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>
            Stock date
            <span className="text-red font-bold">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            placeholder=""
            value={this.state.productValidity}
            disabled={this.state.isEdit}
            onChange={(e) => this.setState({ productValidity: e.target.value })}
          />
          {this.retailFieldsErr && !this.state.productValidity
            ? this.errorDiv("dateErr")
            : null}
        </div>
      </div>
    );
  }

  stockDiv() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>
            QTY
            <span className="text-red font-bold">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder=""
            value={this.state.qty}
            onChange={(e) => this.setState({ qty: e.target.value })}
          />
          {this.retailFieldsErr && !this.state.qty
            ? this.errorDiv("qtyErr")
            : null}
        </div>
      </div>
    );
  }

  qtyDiv() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>
            QTY
            <span className="text-red font-bold">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            min="0"
            placeholder=""
            onKeyPress={this.preventMinus}
            value={this.state.qty}
            onChange={(e) => this.setState({ qty: e.target.value })}
          />
          {this.state.textileFieldsErr && !this.state.qty
            ? this.errorDiv("qtyErr")
            : null}
        </div>
      </div>
    );
  }

  errorDiv(err) {
    return (
      <div>
        <span style={{ color: "red" }}>{this.state.errors[err]}</span>
      </div>
    );
  }

  nameDiv() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>
            Name
            <span className="text-red font-bold">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={this.state.name}
            disabled={this.state.isEdit}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          {this.retailFieldsErr && !this.state.name
            ? this.errorDiv("nameErr")
            : null}
        </div>
      </div>
    );
  }

  categoriesDiv() {
    const { options, id, value } = this.state;
    return (
      <div className="row">
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>
              Division
              <span className="text-red font-bold">*</span>
            </label>

            <select
              className="form-control"
              placeholder="Select Division"
              onChange={this.handleDivisionChange}
              value={this.state.division}
              disabled={this.state.isEdit}
            >
              <option value="" disabled>
                Select
              </option>
              {this.state.divisionsList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
            {this.state.textileFieldsErr && !this.state.division
              ? this.errorDiv("divisionErr")
              : null}
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>
              Section
              <span className="text-red font-bold">*</span>
            </label>

            <select
              className="form-control"
              placeholder="Select Section"
              onChange={this.handleSectionChange}
              value={this.state.section}
              disabled={this.state.isEdit}
            >
              <option value="" disabled>
                Select
              </option>
              {this.state.sectionsList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>

            {this.state.textileFieldsErr && !this.state.section
              ? this.errorDiv("sectionErr")
              : null}
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>
              Sub Section
              <span className="text-red font-bold">*</span>
            </label>
            {/* <select className="form-control"> 
          <option>Select Sub Section</option>
        </select> */}

            <select
              className="form-control"
              placeholder="Select Sub Section"
              onChange={this.handleSubsectionChange}
              value={this.state.subSection}
              disabled={this.state.isEdit}
            >
              <option value="" disabled>
                Select
              </option>
              {this.state.subSectionsList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>

            {this.state.textileFieldsErr && !this.state.subSection
              ? this.errorDiv("subSectionnErr")
              : null}
          </div>
        </div>

        <div className="col-sm-4 col-12 mt-3">
          <div className="form-group">
            <label>
              Category
              <span className="text-red font-bold">*</span>
            </label>
            {/* <select className="form-control">
          <option>Select Category</option>
        </select> */}

            <select
              className="form-control"
              placeholder="Select Category"
              onChange={this.handleCategoryChange}
              value={this.state.category}
              disabled={this.state.isEdit}
            >
              <option value="" disabled>
                Select
              </option>
              {this.state.categoriesList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
            {this.state.textileFieldsErr && !this.state.category
              ? this.errorDiv("categoryErr")
              : null}
          </div>
        </div>

        <div className="col-sm-4 col-12 mt-3">
          <div className="form-group">
            <label>
              Name
              <span className="text-red font-bold">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={this.state.name}
              disabled={this.state.isEdit}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
            {this.state.textileFieldsErr && !this.state.name
              ? this.errorDiv("nameErr")
              : null}
            {/* {(this.state.textileFieldsErr && !this.state.productName) ? this.errorDiv('productName') : null} */}
          </div>
        </div>
      </div>
    );
  }

  loadErrorMsgs() {
    this.state.errors["nameErr"] = "Please enter the Name";
    this.state.errors["colourErr"] = "Please enter the Colour";
    this.state.errors["batchErr"] = "please enter the Batch";
    this.state.errors["mrpErr"] = "please enter the Mrp";
    this.state.errors["uomErr"] = "please select the Uom";
    this.state.errors["empErr"] = "please enter the Emp ID";
    this.state.errors["storeErr"] = "please select the Store";
    this.state.errors["qtyErr"] = "please enter the Qty";
    this.state.errors["stockDateErr"] = "please select the Date";
    this.state.errors["statusErr"] = "please select the Staus";
    this.state.errors["costErr"] = "please enter the Cost Price";
    this.state.errors["divisionErr"] = "please select the Division";
    this.state.errors["sectionErr"] = "please select the Section";
    this.state.errors["subSectionnErr"] = "please select the Sub Section";
    this.state.errors["categoryErr"] = "please select the Category";
    this.state.errors["hsnErr"] = "please select the Hsn Code";
    this.setState({ errors: this.state.errors });
  }

  fileUploadAction = () => {
    this.inputReference.current.click();
  };

  handleExcelChange = (event) => {
    let uploadFile = event.target.files[0];
    if (uploadFile !== null) {
      // let formData = new FormData();
      // formData.append('file', uploadFile);
      InventoryService.saveBulkData(uploadFile, this.state.selectedStoreId).then((response) => {
        if (response) {
          toast.success(response.data.result);
        }
      });
    }
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        // console.log("File", data);
        const workbook = xlsx.read(data);
        console.log(workbook);
        // const sheetName = workbook.SheetNames[0];
        // const productTextile = workbook.SheetNames[1];
        // const worksheet = workbook.Sheets[sheetName];
        // const product = workbook.Sheets[productTextile];
        // const productJson = xlsx.utils.sheet_to_json(product);
        // const inventoryjson = xlsx.utils.sheet_to_json(worksheet);
        // if (
        //   this.state.domainDetails &&
        //   this.state.domainDetails.label === "Retail"
        // ) {
        //   InventoryService.saveBulkData(
        //     inventoryjson,
        //     this.state.domainDetails,
        //     this.state.selectedStoreId
        //   ).then((response) => {
        //     if (response) {
        //       toast.success(response.data.message);
        //     }
        //   });
        // } else {
        //   InventoryService.saveBulkData(
        //     inventoryjson,
        //     this.state.domainDetails,
        //     this.state.selectedStoreId
        //   ).then((response) => {
        //     if (response) {
        //       toast.success(response.data.message);
        //     }
        //   });
        // }
      };
      reader.readAsArrayBuffer(event.target.files[0]);
    }
    // do something with event data
  };

  checkForMandatory() {
    if (
      this.state.domainDetailsObj &&
      this.state.domainDetailsObj === "Retail"
    ) {
      if (
        this.state.name &&
        this.state.colour &&
        this.state.batchNo &&
        this.state.listPrice &&
        this.state.uom &&
        this.state.empId &&
        this.state.storeId &&
        this.state.stockValue &&
        this.state.hsnCode &&
        this.state.productValidity &&
        this.state.status &&
        this.state.costPrice
      ) {
        this.state.commonFieldsErr = false;
        this.retailFieldsErr = false;
        this.setState({ commonFieldsErr: false, retailFieldsErr: false });
        if (this.state.isEdit) {
          this.editBarcode();
        } else {
          this.addBarcode();
        }
      } else {
        this.state.commonFieldsErr = true;
        this.retailFieldsErr = true;
        this.setState({ commonFieldsErr: true, retailFieldsErr: true });
        toast.info("please enter all the Mandatory fields");
      }
    } else {
      if (
        this.state.division &&
        this.state.section &&
        this.state.subSection &&
        this.state.category &&
        this.state.colour &&
        this.state.batchNo &&
        this.state.listPrice &&
        this.state.hsnCode &&
        this.state.uom &&
        // this.state.empId &&
        this.state.storeId &&
        this.state.costPrice &&
        this.state.qty
      ) {
        this.state.commonFieldsErr = false;
        this.state.textileFieldsErr = false;
        this.setState({ commonFieldsErr: false, textileFieldsErr: false });
        if (this.state.isEdit) {
          this.editBarcode();
        } else {
          this.addBarcode();
        }
      } else {
        this.state.commonFieldsErr = true;
        this.state.textileFieldsErr = true;
        this.setState({ commonFieldsErr: true, textileFieldsErr: true });
        toast.info("please enter all the Mandatory fields");
      }
    }
  }
  preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };
  render() {
    // const mdata = this.props.barcodesList;
    // const mcolumns = [
    //   {
    //     name: "barcode",
    //     selector: (row) => row.barcode,
    //   },
    //   {
    //     name: "itemMrp",
    //     selector: (row) => row.itemMrp,
    //   },
    //   {
    //     name: "originalBarcodeCreatedAt",
    //     selector: (row) => row.originalBarcodeCreatedAt,
    //   },
    //   {
    //     name: " qty",
    //     selector: (row) => row.qty,
    //   },
    //   {
    //     name: "value",
    //     selector: (row) => row.value,
    //   },
    // ];
    // if (mdata) {
    //   var products = this.props.companyslist.map((row, order) => ({
    //     ...row,

    //     // actions: (
    //     //   <Fragment>
    //     //     <EditIcon onClick={() => this.editRow(row)} />
    //     //     <DeleteIcon onClick={() => this.deleteRow(row)} />
    //     //   </Fragment>
    //     // ),
    //   }));
    // } else {
    //   var products = [];
    // }

    // const { SearchBar } = Search;
    // const headerSortingStyle = { backgroundColor: "#e3edf8" };
    // // const columns = [
    // //   {
    // //     dataField: "companyId",
    // //     text: "ID",
    // //     headerAlign: "left",
    // //     align: "left",
    // //   },
    // // ];
    // if (mcolumns) {
    //   for (let i = 0; i < mcolumns.length; i++) {
    //     var coldata = {
    //       dataField: mcolumns[i].accessor,
    //       text: mcolumns[i].Header,
    //       headerAlign: "left",
    //       align: "left",
    //     };
    //     this.state.columns.push(coldata);
    //   }
    //   var actions = {
    //     dataField: "actions",
    //     text: "Actions",
    //     headerAlign: "left",
    //     align: "left",
    //   };
    //   this.state.columns.push(actions);
    // } else {
    //   const columns = [];
    // }
    // const defaultSorted = [
    //   {
    //     dataField: "companyId",
    //     order: "asc",
    //   },
    // ];

    // const MyExportCSV = (props) => {
    //   const handleExportClick = () => {
    //     props.onExport();
    //   };
    //   return (
    //     <CustomButton
    //       label="Export"
    //       className="lightBlueButton"
    //       type="button"
    //       icon={ExportIcon}
    //       handleClick={handleExportClick}
    //     />
    //   );
    // };

    // const selectRow = {
    //   mode: "checkbox",
    // };

    const { options, id, value } = this.state;
    return (
      <div className="">
        <Modal isOpen={this.state.isAddBarcode} size="lg">
          <ModalHeader>
            <h5>{this.state.isEdit ? "Edit Barcode" : "Add Barcode"}</h5>
          </ModalHeader>
          <ModalBody>
            <div className="p-3">
              <div className="col-12 scaling-center scaling-mb">
                <h6 className="text-red mb-3">Barcode Details</h6>
              </div>
              <div className="row">
                <div className="col-sm-4 col-12">
                  <div className="form-group">
                    <label>
                      Domain
                      <span className="text-red font-bold">*</span>
                    </label>
                    <select
                      className="form-control"
                      placeholder="Select Store"
                      onChange={this.handleDomainChange}
                      value={this.state.selectedDomain}
                      disabled={this.state.isEdit}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {data1.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {/* {this.state.commonFieldsErr && !this.state.colour
                      ? this.errorDiv("colourErr")
                      : null} */}
                  </div>
                </div>
              </div>
              {this.state.domainDetailsObj === "Textile"
                ? this.categoriesDiv()
                : null}
              {this.state.domainDetailsObj === "Retail"
                ? this.nameDiv()
                : null}
              <div className="row">
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      Colour
                      <span className="text-red font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={this.state.colour}
                      disabled={this.state.isEdit}
                      onChange={(e) =>
                        this.setState({ colour: e.target.value })
                      }
                    />
                    {this.state.commonFieldsErr && !this.state.colour
                      ? this.errorDiv("colourErr")
                      : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      Batch No
                      <span className="text-red font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={this.state.batchNo}
                      disabled={this.state.isEdit}
                      onChange={(e) =>
                        this.setState({ batchNo: e.target.value })
                      }
                    />
                    {this.state.commonFieldsErr && !this.state.batchNo
                      ? this.errorDiv("batchErr")
                      : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      Cost Price
                      <span className="text-red font-bold">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      
                      min="0"
                      onKeyPress={this.preventMinus}
                      placeholder="₹ 00"
                      value={this.state.costPrice}
                      disabled={this.state.isEdit}
                      onChange={(e) =>
                        this.setState({ costPrice: e.target.value })
                      }
                    />
                    {this.state.commonFieldsErr && !this.state.costPrice
                      ? this.errorDiv("costErr")
                      : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      MRP
                      <span className="text-red font-bold">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      onKeyPress={this.preventMinus}
                      placeholder="₹ 00"
                      value={this.state.listPrice}
                      disabled={this.state.popupVlaue === "EDIT"}
                      onChange={(e) =>
                        this.setState({ listPrice: e.target.value })
                      }
                    />
                    {this.state.commonFieldsErr && !this.state.listPrice
                      ? this.errorDiv("listErr")
                      : null}
                  </div>
                </div>

                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      UOM
                      <span className="text-red font-bold">*</span>
                    </label>
                    <select
                      className="form-control"
                      placeholder="Select Store"
                      onChange={this.handleChange}
                      value={this.state.uom}
                      disabled={this.state.isEdit}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {this.state.uomsList.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    {this.state.commonFieldsErr && !this.state.uom
                      ? this.errorDiv("uomErr")
                      : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      HSN Code
                      <span className="text-red font-bold">*</span>
                    </label>
                    <select
                      className="form-control"
                      placeholder="Select Store"
                      onChange={this.handleHsnChange}
                      value={this.state.hsnCode}
                      disabled={this.state.isEdit}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {this.state.hsnList.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    {this.state.commonFieldsErr && !this.state.hsnCode
                      ? this.errorDiv("hsnErr")
                      : null}
                  </div>
                </div>

                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      EMP ID
                      <span className="text-red font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={this.state.empId}
                      disabled={this.state.isEdit}
                      onChange={(e) => this.setState({ empId: e.target.value })}
                    />
                    {this.state.commonFieldsErr && !this.state.empId
                      ? this.errorDiv("empErr")
                      : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>
                      Store
                      <span className="text-red font-bold">*</span>
                    </label>
                    <select
                      className="form-control"
                      placeholder="Select Store"
                      onChange={this.handleStoreChange}
                      value={this.state.storeId}
                      disabled={this.state.isEdit}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {this.state.storesList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    {this.state.commonFieldsErr && !this.state.storeId
                      ? this.errorDiv("storeErr")
                      : null}
                  </div>
                </div>
                {this.state.domainDetailsObj === "Retail"
                  ? this.stockDiv()
                  : this.qtyDiv()}
                {this.state.domainDetailsObj === "Retail"
                  ? this.statusDiv()
                  : null}
                {this.state.domainDetailsObj === "Retail"
                  ? this.stockDate()
                  : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeBarcode}>
              Cancel
            </button>
            <button className={this.state.selectedDomain ? "btn-unic active fs-12" : "btn-selection fs-12"}
              disabled={!this.state.selectedDomain}
              onClick={this.checkForMandatory || this.handleDomainChange}
            >
              Save
            </button>

          </ModalFooter>
        </Modal>
        <div className="maincontent">
          <div className="row">
            <div className="col-sm-2 col-12">
              <div className="form-group mt-2">
                <label>From Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="FROM DATE"
                  value={this.state.fromDate}
                  onChange={(e) => this.setState({ fromDate: e.target.value })}
                />
              </div>
            </div>
            <div className="col-sm-2 col-12">
              <div className="form-group mt-2">
                <label>To Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="TO DATE"
                  value={this.state.toDate}
                  // onChange={(e) => this.setState({ toDate: e.target.value })}
                  onChange={(e) => {
                    var startDate = new Date(this.state.fromDate);
                    var endDate = new Date(e.target.value);
                    console.log(">>>", startDate, endDate);
                    if (startDate <= endDate) {
                      this.setState({ toDate: e.target.value });
                      // console.log(">>>right");
                      // alert("right");
                    } else {
                      // alert("To date should be greater than From date ");
                      toast.error("Please select from date");
                      // console.log(">>>>wrong");
                    }
                  }}
                />
              </div>openBarcode
            </div>
            <div className="col-sm-2 col-12">
              <div className="form-group mt-2">
                <label>Barcode ID</label>
                <input
                  type="text"
                  className="form-control frm-pr"
                  placeholder="BARCODE ID"
                  value={this.state.barcodeSearchId}
                  onChange={(e) =>
                    this.setState({ barcodeSearchId: e.target.value })
                  }
                />

                {/* <button type="button" className="scan">
                <img src={scan} /> 
                SCAN
                </button> */}
              </div>
            </div>
            <div className="col-sm-6 col-12 mt-3 pt-2 scaling-center scaling-mb scaling-mtop">
              <button
                className="btn-unic-search active m-r-2 mt-1"
                onClick={() => {
                  this.getAllBarcodes(0);
                  this.setState({ pageNumber: 0 });
                }}
              >
                Search
              </button>
              <button className="btn-clear m-r-2 mt-2"
                onClick={this.clear}
              >
                Clear</button>
              <button
                className="btn-unic-redbdr mt-2 m-r-2"
                onClick={this.openBarcode}
              >
                <i className="icon-scan m-r-1"></i> Add Barcode
              </button>
              {/*          
              <input onChange={this.handleExcelChange}  type='file' accept='.xlsx'/> */}

              <input
                type="file"
                hidden
                accept=".xlsx"
                ref={this.inputReference}
                onChange={this.handleExcelChange}
              />
              <button
                className="btn-unic-redbdr mt-2"
                onClick={this.fileUploadAction}
              >
                <i className="icon-scan m-r-1"></i> Add Bulk
              </button>
            </div>
          </div>

          <div className="row m-0 p-0 scaling-center">
            <h5 className="mb-2 fs-18 p-l-0 mt-3">Barcode Details</h5>
            <div className="table-responsive p-0">
              <table className="table table-borderless mb-1">
                <thead>
                  {this.state.domainDetailsObj &&
                    this.state.domainDetailsObj === "Retail"
                    ? this.barcodesRetailHeader()
                    : this.barcodesTextileHeader()}
                </thead>
                <tbody>
                  {this.state.domainDetailsObj &&
                    this.state.domainDetailsObj === "Retail"
                    ? this.barcodesListTableTextile()
                    : this.barcodesListTableTextile()}
                </tbody>


              </table>
              <div className="row m-0 pb-3 mb-5 mt-3">
                {/* {this.state.barcodesList?.content?.length < 10 ? null : ( */}
                {console.log(
                  "++++++++++@@@++++++++",
                  this.state.barcodesList.totalPages
                )}
                {/* {this.state.barcodesList?.content?.length >= 10 ? (
                  <div className="d-flex justify-content-center">
                    <ReactPageNation
                      {...this.state.barcodesList}
                      changePage={(pageNumber) => {
                        this.changePage(pageNumber);
                      }}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <ReactPageNation
                      {...this.state.barcodesList}
                      changePage={(pageNumber) => {
                        this.changePage(pageNumber);
                      }}
                    />
                  </div>
                )
                } */}
                {/* {this.state.barcodesList?.content?.length < 10 && */}
                {this.state.totalPages > 1 ? (
                  <div className="d-flex justify-content-center">
                    <ReactPageNation
                      {...this.state.barcodesList}
                      changePage={(pageNumber) => {
                        this.changePage(pageNumber);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
