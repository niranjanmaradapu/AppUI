import React, { Component } from 'react';
import scan from '../../assets/images/scan.svg';
import edit from '../../assets/images/edit.svg';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import InventoryService from '../../services/InventoryService';
import URMService from '../../services/URM/URMService';
import { toast } from 'react-toastify';
import { number } from 'prop-types';
import { stringify } from 'querystring';

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
      productValidity: '',
      fromDate: "",
      toDate: "",
      barcodeSearchId: "",
      barcodesList: [],
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
      colour: "",
      hsnCode: "",
      commonFieldsErr: false,
      retailFieldsErr: false,
      textileFieldsErr: false,
      errors: {},
      statusTypeList: [
        { "id": 1, "label": "YES", "value": "YES" },
        { "id": 0, "label": "NO", "value": "NO" }],
    }
    this.addBarcode = this.addBarcode.bind(this);
    this.openBarcode = this.openBarcode.bind(this);
    this.getAllBarcodes = this.getAllBarcodes.bind(this);
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
    this.setStoreNames = this.setStoreNames.bind(this);
    this.storeNameMap = this.storeNameMap.bind(this);
  }

  openBarcode() {
    this.setState({ isAddBarcode: true });
    this.setState({ isEdit: false })
    this.setDropdowns(false);
  }


  closeBarcode() {
    this.setState({ isAddBarcode: false });
    this.stateReset();
  }

  openEditBarcode(barcodeId) {
    this.setState({ isAddBarcode: true });
    this.setState({ isEdit: true });
    this.getbarcodeDetails(barcodeId);

  }

  componentWillMount() {
    this.state.domainDetails = JSON.parse(sessionStorage.getItem('selectedDomain'));
    this.setState({ domainDetails: this.state.domainDetails })
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({selectedStoreId:JSON.parse(sessionStorage.getItem('storeId'))});
    if (user["custom:isSuperAdmin"] === "true") {
      this.setState({
        clientId: user["custom:clientId1"],
     
      }, () => { this.getAllBarcodes(); this.getAllStoresList(); this.getAllUoms();
         this.getAllDivisions(); this.getHsnDetails(); this.getAllCategories(); this.loadErrorMsgs(); });
    } else {
      this.setState({
        clientId: user["custom:clientId1"],
        // domainId: user["custom:domianId1"]
      }, () => { this.getAllStoresList(); this.getAllBarcodes(); this.getAllUoms();; this.getAllDivisions(); this.getHsnDetails(); this.getAllCategories();; this.loadErrorMsgs(); });
    }
    
  }

  handleChange = (e) => {
    this.setState({ uom: e.target.value });
  }
  handleStoreChange = (e) => {
    this.setState({ storeId: e.target.value });
  }

  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  }

  handleDivisionChange = (e) => {
    this.setState({ division: e.target.value });
    this.getAllSections(e.target.value);
  }
  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
    this.getAllSubsections(e.target.value);
  }
  handleSubsectionChange = (e) => {
    this.setState({ subSection: e.target.value });
  }
  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  }

  handleHsnChange = (e) => {
    this.setState({ hsnCode: e.target.value });
  }

  getAllBarcodes() {
    let saveJson = {};
    this.setState({ sortedStoreIds: [] });
    if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
      saveJson = {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        barcodeId: this.state.barcodeSearchId
      }
    } else {
      saveJson = {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        barcode: this.state.barcodeSearchId,
        storeId: this.state.selectedStoreId
      }
    }

    InventoryService.getAllBarcodes(saveJson, this.state.domainDetails).then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        this.state.barcodesList = res.data.result;
        this.setState({ barcodesList: this.state.barcodesList });
        this.setStoreNames();
      } else {
        this.setState({ barcodesList: [] });
      }
    }).catch(error => {
      if (error.response && error.response.data.isSuccess === "false") {
        this.setState({ barcodesList: [] });
      }
    });
  }

  setStoreNames() {
    this.state.barcodesList.forEach((ele, index) => {
      if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
        if (ele.storeId) {
          this.state.sortedStoreIds.push(JSON.stringify(ele.storeId));
        }
      } else {
        if (ele.productTextile && ele.productTextile.storeId) {
          this.state.sortedStoreIds.push(JSON.stringify(ele.productTextile.storeId));
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
    this.setState({ sortedStoreIds: this.state.sortedStoreIds })
    if (this.state.storeIds && this.state.storeIds.length > 0) {
      InventoryService.getStoreNamesByIds(this.state.storeIds).then((res) => {
        if (res && res.data && res.data.result && res.data.result.length > 0) {
          res.data.result.forEach((ele, index) => {
            obj = {
              id: ele.id,
              value: ele.name
            }
            this.state.sortedStoreIds.push(obj);
          });
          this.setState({ sortedStoreIds: this.state.sortedStoreIds});
          this.storeNameMap();
        }
      });
    }
  }

  storeNameMap() {
    if (this.state.barcodesList && this.state.barcodesList.length > 0) {
      this.state.barcodesList.forEach((ele, index) => {
        this.state.sortedStoreIds.forEach((ele1, index1) => {
          if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
            if (ele.storeId === ele1.id) {
              this.state.barcodesList[index].storeName = ele1.value;
              // this.setState({ barcodesList: this.state.barcodesList });
            }
          } else if (ele.productTextile.storeId === ele1.id) {
            this.state.barcodesList[index].productTextile.storeName = ele1.value;
            // this.setState({ barcodesList: this.state.barcodesList });
          }
        });
        this.setState({ barcodesList: this.state.barcodesList });
      });
    }
  }


  getAllUoms() {
    InventoryService.getUOMs().then((res) => {
      res.data.result.forEach((ele, index) => {
        const obj = {
          id: ele.id,
          value: ele.uomName,
          label: ele.uomName
        }
        this.state.uomsList.push(obj)
      });
    });
  }


  getHsnDetails() {
    InventoryService.getAllHsnList().then((res) => {
      res.data.result.forEach((ele, index) => {
        const obj = {
          id: ele.id,
          value: ele.hsnCode,
          label: ele.hsnCode
        }
        this.state.hsnList.push(obj)
      });
    });
  }

  getAllDivisions() {
    InventoryService.getAllDivisions().then((res) => {
      res.data.result.forEach((ele, index) => {
        const obj = {
          id: ele.id,
          value: ele.name,
          label: ele.name
        }
        this.state.divisionsList.push(obj)
      });
      this.setState({ divisionsList: this.state.divisionsList });
    });
  }

  getAllSections(id) {
    this.setState({ sectionsList: [] });
    InventoryService.getAllSections(id).then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        res.data.result.forEach((ele, index) => {
          const obj = {
            id: ele.id,
            value: ele.name,
            label: ele.name
          }
          this.state.sectionsList.push(obj)

        });
        this.setState({ sectionsList: this.state.sectionsList });
      } else {
        this.setState({ sectionsList: [] });
      }
    });

  }

  getAllSubsections(id) {
    this.setState({ subSectionsList: [] });
    InventoryService.getAllSections(id).then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        res.data.result.forEach((ele, index) => {
          const obj = {
            id: ele.id,
            value: ele.name,
            label: ele.name
          }
          this.state.subSectionsList.push(obj);

        });
        this.setState({ subSectionsList: this.state.subSectionsList });
      } else {
        this.setState({ subSectionsList: [] });
      }
    });
  }

  getAllCategories() {
    this.setState({ categoriesList: [] });
    InventoryService.getAllCategories().then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        res.data.result.forEach((ele, index) => {
          const obj = {
            id: ele.id,
            value: ele.name,
            label: ele.name
          }
          this.state.categoriesList.push(obj);

        });
        this.setState({ categoriesList: this.state.categoriesList });
      } else {
        this.setState({ categoriesList: [] });
      }
    });
  }

  getAllStoresList() {
    URMService.getStoresByDomainId(this.state.domainDetails.value).then((res) => {
      if (res) {
        res.data.result.forEach((ele, index) => {
          const obj = {
            id: ele.id,
            value: ele.name,
            label: ele.name
          }
          this.state.storesList.push(obj)
        });
      }
      this.setState({ storesList: this.state.storesList });
    });
  }

  getDomainsList() {
    URMService.getDomainsList(this.state.clientId).then((res) => {
      if (res) {
        this.setState({ domainsList: res.data.result, domainId: res.data.result[0].clientDomainaId });
        this.getAllStoresList();
      }
    });
  }

  getbarcodeDetails(barcodeId) {
    InventoryService.getBarcodeDetails(barcodeId, this.state.domainDetails,this.state.selectedStoreId).then((res) => {
      const barcode = res.data.result;
      if (res && res.data.isSuccess === "true") {
        if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
          this.setState({
            status: barcode.status, stockValue: barcode.stockValue ? barcode.stockValue : "",
            qty: barcode.qty ? barcode.qty : "",
            barcodeId: barcode.barcodeId,
            name: barcode.name,
            colour: barcode.colour,
            costPrice: barcode.costPrice, listPrice: barcode.listPrice, productValidity: barcode.productValidity,
            storeId: barcode.storeId, empId: barcode.empId, uom: barcode.uom,
            productItemId: barcode.productItemId,
            hsnCode: barcode.hsnCode,
            batchNo: barcode.batchNo

          })
        } else {
          this.setState({
            status: barcode.status, stockValue: barcode.stockValue ? barcode.stockValue : "",
            qty: barcode.productTextile.qty ? barcode.productTextile.qty : "",
            barcodeId: barcode.barcodeId,
            productTextileId: barcode.productTextile.productTextileId,
            barcodeTextileId: barcode.barcodeTextileId,
            costPrice: barcode.productTextile.costPrice,
            storeId: barcode.productTextile.storeId, empId: barcode.productTextile.empId, uom: barcode.productTextile.uom,
            division: barcode.division,
            section: barcode.section,
            listPrice: barcode.productTextile.itemMrp,
            subSection: barcode.subSection,
            category: barcode.category,
            batchNo: barcode.batchNo,
            colour: barcode.colour,
            hsnCode: barcode.productTextile.hsnMasterId
          })
        }
        this.setDropdowns(true);
      } else {
        toast.error(res.data.message)
      }
    });
  }

  setDropdowns(isEdit) {
    // if (!isEdit) {
    //   if (this.state.uomsList && this.state.uomsList.length > 0) {
    //     this.setState({ uom: this.state.uomsList[0].value })
    //   } if (this.state.storesList && this.state.storesList.length > 0) {
    //     this.setState({ storeId: this.state.storesList[0].id })
    //   } if ((this.state.domainDetails && this.state.domainDetails.label === "Retail") && (this.state.statusTypeList && this.state.statusTypeList.length > 0)) {
    //     this.setState({ status: this.state.statusTypeList[0].id })
    //   }
    // }

    if(isEdit && this.state.domainDetails.label === "Textile" ){
      this.getAllSections(this.state.division);
      this.getAllSubsections(this.state.section);  
    }
  }



  addBarcode() {
    let domainInfo = this.state.domainDetails;
    let saveJson = {};
    if (domainInfo && domainInfo.label === "Retail") {
      saveJson = {
        status: this.state.status,
        stockValue: this.state.stockValue,
        costPrice: this.state.costPrice,
        listPrice: this.state.listPrice,
        productValidity: this.state.productValidity,
        storeId: this.state.storeId,
        empId: this.state.empId,
        uom: this.state.uom,
        isBarcode: false,
        domainDataId: this.state.domainDetails.value,
        name: this.state.name,
        hsnCode: this.state.hsnCode,
        batchNo: this.state.batchNo,
        colour: this.state.colour

      }
    } else {
      saveJson = {
        division: parseInt(this.state.division),
        section: parseInt(this.state.section),
        subSection: parseInt(this.state.subSection),
        category: parseInt(this.state.category),
        batchNo: this.state.batchNo,
        colour: this.state.colour,
        productTextile: {
          qty: this.state.qty,
          costPrice: this.state.costPrice,
          itemMrp: this.state.listPrice,
          storeId: this.state.storeId,
          empId: this.state.empId,
          uom: this.state.uom,
          hsnMasterId: parseInt(this.state.hsnCode)
        }
      }
    }

    InventoryService.addBarcode(saveJson, this.state.domainDetails, this.state.isEdit).then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        toast.success(res.data.result);
        this.setState({ isAddBarcode: false });
        this.props.history.push('/barcodeList');
        this.getAllBarcodes();
        this.stateReset();
      } else {
        toast.error(res.data.message);
      }
    });
  }

  stateReset() {
    this.setState({
      status: "", stockValue: "", costPrice: "", productValidity: "",
      storeId: "", empId: "", uom: "", domainId: "", name: "", listPrice: "",
      division: "", section: "", subSection: "", category: "", batchNo: "", hsnCode: "",
      colour: "", qty: "", retailFieldsErr: false, textileFieldsErr: false, commonFieldsErr: false, sortedStoreIds: []
    });
  }


  editBarcode() {
    let domainInfo = this.state.domainDetails;
    let saveJson = {};
    if (domainInfo && domainInfo.label === "Retail") {
      saveJson = {
        status: this.state.status,
        stockValue: this.state.stockValue,
        costPrice: this.state.costPrice,
        listPrice: this.state.listPrice,
        domainDataId: this.state.stockValue,
        productValidity: this.state.productValidity,
        storeId: this.state.storeId,
        empId: this.state.empId,
        uom: this.state.uom,
        barcodeId: this.state.barcodeId,
        domainDataId: this.state.domainDetails.value,
        productItemId: this.state.productItemId,
        name: this.state.name,
        hsnCode: this.state.hsnCode,
        batchNo: this.state.batchNo,
        colour: this.state.colour

      }
    } else {
      saveJson = {
        barcodeTextileId: this.state.barcodeTextileId,
        division: parseInt(this.state.division),
        section: parseInt(this.state.section),
        subSection: parseInt(this.state.subSection),
        category: parseInt(this.state.category),
        batchNo: this.state.batchNo,
        colour: this.state.colour,
        productTextile: {
          qty: this.state.qty,
          costPrice: this.state.costPrice,
          itemMrp: this.state.listPrice,
          storeId: this.state.storeId,
          empId: this.state.empId,
          uom: this.state.uom,
          productTextileId: this.state.productTextileId,

          hsnMasterId: parseInt(this.state.hsnCode)
        }
      }
    }
    InventoryService.addBarcode(saveJson, this.state.domainDetails, this.state.isEdit).then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        toast.success(res.data.result);
        this.setState({ isAddBarcode: false });
        this.stateReset();
        this.props.history.push('/barcodeList');
        this.getAllBarcodes();
      } else {
        toast.error(res.data.message);
      }
    });
  }

  deleteBarcode(barcodeId) {
    InventoryService.deleteBarcode(barcodeId, this.state.domainDetails).then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        toast.success(res.data.result);
        this.setState({ isAddBarcode: false });
        this.props.history.push('/barcodeList');
        this.stateReset();
        this.getAllBarcodes();
      } else {
        toast.error(res.data.message);
      }
    });
  }


  barcodesRetailHeader() {
    return (
      <tr className="m-0 p-0">
        <th className="col-1">S.NO</th>
        <th className="col-3">BARCODE</th>
        <th className="col-1">LIST PRICE</th>
        <th className="col-3">STORE</th>
        <th className="col-1">QTY</th>
        <th className="col-1">VALUE</th>
        <th className="col-2">View / Delete</th>
      </tr>

    )
  }

  barcodesTextileHeader() {
    return (
      <tr className="m-0 p-0">
        <th className="col-1">S.NO</th>
        <th className="col-3">BARCODE</th>
        <th className="col-1">LIST PRICE</th>
        <th className="col-3">STORE</th>
        <th className="col-1">QTY</th>
        <th className="col-1">VALUE</th>
        <th className="col-2">View / Delete</th>
      </tr>

    )
  }

  barcodesListTable() {
    return this.state.barcodesList.map((items, index) => {
      const { barcodeId, listPrice, storeId, storeName, stockValue, value } = items
      return (
        <tr key={index}>
          <td className="col-1 geeks">{index + 1}</td>
          <td className="col-3 underline">{barcodeId}</td>
          <td className="col-2">₹ {listPrice}</td>
          <td className="col-3">{storeName}</td>
          <td className="col-1">{stockValue}</td>
          <td className="col-1">{value}</td>
          <td className="col-2 text-center">
            {/* <img src={edit} className="w-12 pb-2"  onClick={this.openEditBarcode}/> */}
            <img src={edit} className="w-12 pb-2" onClick={() => this.openEditBarcode(barcodeId)} />
            <i className="icon-delete m-l-2 fs-16" onClick={() => this.deleteBarcode(barcodeId)}></i>
          </td>
        </tr>
      )
    });
  }

  barcodesListTableTextile() {
    return this.state.barcodesList.map((items, index) => {
      const { barcode, productTextile, barcodeTextileId } = items
      return (
        <tr key={index}>
          <td className="col-1 geeks">{index + 1}</td>
          <td className="col-3 underline">{barcode}</td>
          <td className="col-2">₹ {productTextile.itemMrp}</td>
          <td className="col-3">{productTextile.storeName}</td>
          <td className="col-1">{productTextile.qty}</td>
          <td className="col-1">{productTextile.value}</td>
          <td className="col-2 text-center">
            {/* <img src={edit} className="w-12 pb-2"  onClick={this.openEditBarcode}/> */}
            <img src={edit} className="w-12 pb-2" onClick={() => this.openEditBarcode(barcode)} />
            <i className="icon-delete m-l-2 fs-16" onClick={() => this.deleteBarcode(barcodeTextileId)}></i>
          </td>
        </tr>
      )
    });
  }

  statusDiv() {
    const { options, id } = this.state;
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>Status Type
          <span className="text-red font-bold">*</span>
          </label>
          <select className="form-control" placeholder="Select Store" onChange={this.handleStatusChange} value={this.state.status} disabled={this.state.isEdit}>
            <option value='' disabled>Select</option>
            {this.state.statusTypeList.map(item => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </select>
          {(this.retailFieldsErr && !this.state.status) ? this.errorDiv('statusErr') : null}
        </div>
      </div>
    )
  }



  stockDate() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>Stock date
          <span className="text-red font-bold">*</span>
          </label>
          <input type="date" className="form-control" placeholder="" value={this.state.productValidity} disabled={this.state.isEdit}
            onChange={(e) => this.setState({ productValidity: e.target.value })} />
          {(this.retailFieldsErr && !this.state.productValidity) ? this.errorDiv('dateErr') : null}
        </div>
      </div>
    )
  }


  stockDiv() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>QTY
          <span className="text-red font-bold">*</span>
          </label>
          <input type="number" className="form-control" placeholder="" value={this.state.stockValue} 
            onChange={(e) =>
              this.setState({ stockValue: e.target.value })
            } />
          {(this.retailFieldsErr && !this.state.stockValue) ? this.errorDiv('qtyErr') : null}
        </div>
      </div>
    )
  }

  qtyDiv() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>QTY
          <span className="text-red font-bold">*</span>
          </label>
          <input type="number" className="form-control" placeholder="" value={this.state.qty}
            onChange={(e) =>
              this.setState({ qty: e.target.value })
            } />
          {(this.textileFieldsErr && !this.state.qty) ? this.errorDiv('qtyErr') : null}
        </div>
      </div>
    )
  }

  errorDiv(err) {
    return (
      <div>
        <span style={{ color: "red" }}>{this.state.errors[err]}</span>
      </div>
    )
  }

  nameDiv() {
    return (
      <div className="col-sm-4 col-12 mt-3">
        <div className="form-group">
          <label>Name
          <span className="text-red font-bold">*</span>
          </label>
          <input type="text" className="form-control" placeholder="" value={this.state.name} disabled={this.state.isEdit}
            onChange={(e) =>
              this.setState({ name: e.target.value })} />
          {(this.retailFieldsErr && !this.state.name) ? this.errorDiv('nameErr') : null}
        </div>

      </div>
    )
  }




  categoriesDiv() {
    const { options, id, value } = this.state;
    return (
      <div className="row">
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>Division
        <span className="text-red font-bold">*</span>
            </label>
            {/* <select className="form-control">
          <option>Select Division</option>
        </select> */}

            <select className="form-control" placeholder="Select Division" onChange={this.handleDivisionChange} value={this.state.division} disabled={this.state.isEdit}>
              <option value='' disabled>Select</option>
              {this.state.divisionsList.map(item => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
            {(this.textileFieldsErr && !this.state.division) ? this.errorDiv('divisionErr') : null}
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>Section
        <span className="text-red font-bold">*</span>
            </label>

            <select className="form-control" placeholder="Select Section" onChange={this.handleSectionChange} value={this.state.section} disabled={this.state.isEdit}>
              <option value='' disabled>Select</option>
              {this.state.sectionsList.map(item => (

                <option key={item.id} value={item.id}>

                  {item.value}
                </option>
              ))}
            </select>
            {(this.textileFieldsErr && !this.state.section) ? this.errorDiv('sectionErr') : null}
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>Sub Section
        <span className="text-red font-bold">*</span>
            </label>
            {/* <select className="form-control"> 
          <option>Select Sub Section</option>
        </select> */}


            <select className="form-control" placeholder="Select Sub Section" onChange={this.handleSubsectionChange} value={this.state.subSection} disabled={this.state.isEdit}>
              <option value='' disabled>Select</option>
              {this.state.subSectionsList.map(item => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>

            {(this.textileFieldsErr && !this.state.subSection) ? this.errorDiv('subSectionErr') : null}
          </div>
        </div>

        <div className="col-sm-4 col-12 mt-3">
          <div className="form-group">
            <label>Category
        <span className="text-red font-bold">*</span>
            </label>
            {/* <select className="form-control">
          <option>Select Category</option>
        </select> */}

            <select className="form-control" placeholder="Select Category" onChange={this.handleCategoryChange} value={this.state.category} disabled={this.state.isEdit}>
              <option value='' disabled>Select</option>
              {this.state.categoriesList.map(item => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
            {(this.textileFieldsErr && !this.state.category) ? this.errorDiv('categoryErr') : null}
          </div>
        </div>


      </div>
    )
  }

  loadErrorMsgs() {
    this.state.errors['nameErr'] = "Please enter the Name";
    this.state.errors['colourErr'] = "Please enter the Colour";
    this.state.errors['batchErr'] = "please enter the Batch";
    this.state.errors['listErr'] = "please enter the List Price";
    this.state.errors['uomErr'] = "please select the Uom";
    this.state.errors['empErr'] = "please enter the Emp ID";
    this.state.errors['storeErr'] = "please select the Store";
    this.state.errors['qtyErr'] = "please enter the Qty";
    this.state.errors['stockDateErr'] = "please select the Date";
    this.state.errors['statusErr'] = "please select the Staus";
    this.state.errors['costErr'] = "please enter the Cost Price";
    this.state.errors['divisionErr'] = "please select the Division";
    this.state.errors['sectionErr'] = "please select the Section";
    this.state.errors['subSectionnErr'] = "please select the Sub Section";
    this.state.errors['categoryErr'] = "please select the Category";
    this.state.errors['hsnErr'] = "please enter the Hsn Code";
    this.setState({ errors: this.state.errors });
  }


  checkForMandatory() {
    if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
      if (this.state.name && this.state.colour && this.state.batchNo && this.state.listPrice && this.state.uom && this.state.empId &&
        this.state.storeId && this.state.stockValue && this.state.hsnCode && this.state.productValidity && this.state.status && this.state.costPrice) {
        this.commonFieldsErr = false;
        this.retailFieldsErr = false;
        this.setState({ commonFieldsErr: false, retailFieldsErr: false });
        if (this.state.isEdit) {
          this.editBarcode();
        } else {
          this.addBarcode();
        }
      } else {
        this.commonFieldsErr = true;
        this.retailFieldsErr = true;
        this.setState({ commonFieldsErr: true, retailFieldsErr: true });
        toast.info("please enter all the Mandatory fields");
      }
    } else {
      if (this.state.division && this.state.section && this.state.subSection && this.state.category && this.state.colour && this.state.batchNo
        && this.state.listPrice && this.state.hsnCode && this.state.uom && this.state.empId && this.state.storeId && this.state.costPrice && this.state.qty) {
        this.commonFieldsErr = false;
        this.textileFieldsErr = false;
        this.setState({ commonFieldsErr: false, textileFieldsErr: false });
        if (this.state.isEdit) {
          this.editBarcode();
        } else {
          this.addBarcode();
        }
      } else {
        this.commonFieldsErr = true;
        this.textileFieldsErr = true;
        this.setState({ commonFieldsErr: true, textileFieldsErr: true });
        toast.info("please enter all the Mandatory fields");
      }
    }
  }

  render() {
    const { options, id, value } = this.state;
    return (
      <div className="">
        <Modal isOpen={this.state.isAddBarcode} size="lg">
          <ModalHeader><h5>
            {this.state.isEdit ? 'Edit Barcode' : 'Add Barcode'}
            </h5></ModalHeader>
          <ModalBody>
            <div className="p-3">
              <div className="col-12 scaling-center scaling-mb">
                <h6 className="text-red mb-3">Barcode Details</h6>
              </div>
              {/* <div className="col-4">
                <div className="form-group">
                  <label>Barcode</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div> 
               <div className="col-4">
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div> */}

              {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? null : this.categoriesDiv()}
              {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? this.nameDiv() : null}
              <div className="row">
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>Colour
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="" value={this.state.colour} disabled={this.state.isEdit}
                      onChange={(e) =>
                        this.setState({ colour: e.target.value })} />
                    {(this.commonFieldsErr && !this.state.colour) ? this.errorDiv('colourErr') : null}
                  </div>
                </div>
                {/* <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="" value={this.state.name}
                    onChange={(e) =>
                      this.setState({ name: e.target.value })} />
                </div>
              </div> */}

                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>Batch No
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="" value={this.state.batchNo} disabled={this.state.isEdit}
                      onChange={(e) =>
                        this.setState({ batchNo: e.target.value })} />
                    {(this.commonFieldsErr && !this.state.batchNo) ? this.errorDiv('batchErr') : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>Cost Price
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="number" className="form-control" placeholder="₹ 00" value={this.state.costPrice} disabled={this.state.isEdit}
                      onChange={(e) =>
                        this.setState({ costPrice: e.target.value })} />
                    {(this.commonFieldsErr && !this.state.costPrice) ? this.errorDiv('costErr') : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>List Price
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="number" className="form-control" placeholder="₹ 00" value={this.state.listPrice} 
                      onChange={(e) =>
                        this.setState({ listPrice: e.target.value })} />
                    {(this.commonFieldsErr && !this.state.listPrice) ? this.errorDiv('listErr') : null}
                  </div>
                </div>




                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>UOM
                  <span className="text-red font-bold">*</span>
                    </label>
                    <select className="form-control" placeholder="Select Store" onChange={this.handleChange} value={this.state.uom} disabled={this.state.isEdit}>
                      <option value='' disabled>Select</option>
                      {this.state.uomsList.map(item => (
                        <option key={item.value} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    {(this.commonFieldsErr && !this.state.uom) ? this.errorDiv('uomErr') : null}
                    {/* 
                  <div className="form-group sele">
                    <Select className="upper-case" placeholder="Select Store"
                      value={this.state.selectedOption} // set selected value
                      options={this.state.uomsList} // set list of the data
                      onChange={this.handleChange} // assign onChange function
                    />
                  </div> */}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>HSN Code
                  <span className="text-red font-bold">*</span>
                    </label>
                    <select className="form-control" placeholder="Select Store" onChange={this.handleHsnChange} value={this.state.hsnCode} disabled={this.state.isEdit}>
                      <option value='' disabled>Select</option>
                      {this.state.hsnList.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    {(this.commonFieldsErr && !this.state.hsnCode) ? this.errorDiv('hsnErr') : null}
                  </div>
                </div>

                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>EMP ID
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="" value={this.state.empId} disabled={this.state.isEdit}
                      onChange={(e) => this.setState({ empId: e.target.value })} />
                    {(this.commonFieldsErr && !this.state.empId) ? this.errorDiv('empErr') : null}
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>Store
                  <span className="text-red font-bold">*</span>
                    </label>
                    <select className="form-control" placeholder="Select Store" onChange={this.handleStoreChange} value={this.state.storeId} disabled={this.state.isEdit}>
                      <option value='' disabled>Select</option>
                      {this.state.storesList.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    {(this.commonFieldsErr && !this.state.storeId) ? this.errorDiv('storeErr') : null}
                  </div>
                </div>
                {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? this.stockDiv() : this.qtyDiv()}
                {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? this.statusDiv() : null}
                {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? this.stockDate() : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeBarcode}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              // onClick={this.state.isEdit ? this.editBarcode : this.addBarcode}
              onClick={this.checkForMandatory}

            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="maincontent">
        <div className="row">
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2">
              <input type="date" className="form-control"
                placeholder="FROM DATE" value={this.state.fromDate}
                onChange={(e) =>
                  this.setState({ fromDate: e.target.value })} />
            </div>
          </div>
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2">
              <input type="date" className="form-control"
                placeholder="TO DATE" value={this.state.toDate}
                onChange={(e) =>
                  this.setState({ toDate: e.target.value })} />
            </div>
          </div>
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2">
              <input type="text" className="form-control frm-pr"
                placeholder="BARCODE ID" value={this.state.barcodeSearchId}
                onChange={(e) =>
                  this.setState({ barcodeSearchId: e.target.value })} />

              {/* <button type="button" className="scan">
                <img src={scan} /> 
                SCAN
                </button> */}
            </div>
          </div>
          <div className="col-3 col-sm-3 col-12 scaling-center scaling-mb scaling-mtop">
            <button className="btn-unic-search active m-r-2 mt-1" onClick={this.getAllBarcodes}>SEARCH</button>
            <button className="btn-unic-redbdr mt-2" onClick={this.openBarcode}>Add Barcode</button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
          <h5 className="mb-2 fs-18 p-l-0 mt-3">Barcode Details</h5>
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1">
              <thead>


                {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? this.barcodesRetailHeader() : this.barcodesTextileHeader()}

              </thead>
              <tbody>
                {/* <tr> */}
                {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? this.barcodesListTable() : this.barcodesListTableTextile()}
                {/* </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    )
  }
}
