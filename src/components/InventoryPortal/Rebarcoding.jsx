import React, { Component } from 'react';
import print from '../../assets/images/print.svg';
import view from '../../assets/images/view.svg';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import InventoryService from '../../services/InventoryService';
import URMService from '../../services/URM/URMService';
import { toast } from 'react-toastify';
import { number } from 'prop-types';
import { stringify } from 'querystring';

export default class Rebarcoding extends Component {

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
      qty: null,
      stockValue: "",
      productItemId: "",
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
    this.getAllBarcodes = this.getAllBarcodes.bind(this);
    this.openEditBarcode = this.openEditBarcode.bind(this);
    this.closeBarcode = this.closeBarcode.bind(this);
    this.getDomainsList = this.getDomainsList.bind(this);
    this.setDropdowns = this.setDropdowns.bind(this);
    this.setEmployeeNames = this.setEmployeeNames.bind(this);
    this.storeNameMap = this.storeNameMap.bind(this);
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
    if (user["custom:isSuperAdmin"] === "true") {
      this.setState({
        clientId: user["custom:clientId1"],
      }, () => {
        this.getAllBarcodes(); this.getDomainsList(); this.getAllUoms();
        this.getAllDivisions(); this.getHsnDetails(); this.getAllCategories();
      });
    } else {
      this.setState({
        clientId: user["custom:clientId1"],
        domainId: user["custom:domianId1"]
      }, () => { this.getAllStoresList(); this.getAllBarcodes(); this.getAllUoms();; this.getAllDivisions(); this.getHsnDetails(); this.getAllCategories(); });
    }
  }


  getAllBarcodes() {
    let saveJson = {};
    if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
      saveJson = {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        currentBarcodeId: this.state.barcodeSearchId
      }
    } else {
      saveJson = {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        currentBarcodeId: this.state.barcodeSearchId
      }
    }

    InventoryService.getReBarcodeDetails(saveJson, this.state.domainDetails).then((res) => {
      if (res.data && res.data.isSuccess === "true") {
        this.state.barcodesList = res.data.result;
        this.setState({ barcodesList: this.state.barcodesList });
        // this.setEmployeeNames();
      } else {
        this.setState({ barcodesList: [] });
      }
    }).catch(error => {
      if (error.response && error.response.data.isSuccess === "false") {
        this.setState({ barcodesList: [] });
      }
    });
  }

  setEmployeeNames() {
    this.state.barcodesList.forEach((ele, index) => {
      if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
        if (ele.createdBy) {
          this.state.sortedStoreIds.push(JSON.stringify(ele.createdBy));
        }
      } else {
        if (ele.createdBy) {
          this.state.sortedStoreIds.push(JSON.stringify(ele.createdBy));
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
    this.setState({ sortedStoreIds: [] })
    if (this.state.storeIds && this.state.storeIds.length > 0) {
      InventoryService.getEmpNamesByIds(this.state.storeIds).then((res) => {
        if (res && res.data && res.data.result && res.data.result.length > 0) {
          res.data.result.forEach((ele, index) => {
            obj = {
              id: ele.id,
              value: ele.name
            }
            this.state.sortedStoreIds.push(obj);
          });
          this.setState({ sortedStoreIds: this.state.sortedStoreIds })
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
    URMService.getStoresByDomainId(this.state.domainId).then((res) => {
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
    InventoryService.getBarcodeDetails(barcodeId, this.state.domainDetails).then((res) => {
      const barcode = res.data.result;
      if (res && res.data.isSuccess === "true") {
        if (this.state.domainDetails && this.state.domainDetails.label === "Retail") {
          this.setState({
            status: barcode.status, stockValue: barcode.stockValue ? barcode.stockValue : "",
            qty: barcode.qty ? barcode.qty : 0,
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
            qty: barcode.productTextile.qty ? barcode.productTextile.qty : 0,
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
    if (isEdit) {
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
        domainDataId: this.state.domainId,
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
      colour: "", qty: null, retailFieldsErr: false, textileFieldsErr: false, commonFieldsErr: false, sortedStoreIds: []
    });
  }

  barcodesRetailHeader() {
    return (
      <tr className="m-0 p-0">
        {/* <th className="col-1">S.NO</th>
        <th className="col-3">BARCODE</th>
        <th className="col-1">LIST PRICE</th>
        <th className="col-3">STORE</th>
        <th className="col-1">QTY</th>
        <th className="col-1">VALUE</th>
        <th className="col-2">View / Delete</th> */}
      </tr>

    )
  }


  barcodesListTable() {
    return this.state.barcodesList.map((items, index) => {
      const { barcodeId, listPrice, storeId, storeName, stockValue, value } = items
      return (
        <tr key={index}>
          {/* 
          <td className="col-3 underline">{barcodeId}</td>
          <td className="col-3 underline">{barcodeId}</td>
          <td className="col-2">₹ {listPrice}</td>
          <td className="col-3">{storeName}</td>
          <td className="col-1">{stockValue}</td>
          <td className="col-2 text-center">
            <img src={edit} className="w-12 pb-2" onClick={() => this.openEditBarcode(barcodeId)} />
            <i className="icon-delete m-l-2 fs-16" onClick={() => this.deleteBarcode(barcodeId)}></i>
          </td> */}
        </tr>
      )
    });
  }

  barcodesTextileHeader() {
    return (
      <tr className="m-0 p-0">
        {/* <th className="col-1">S.NO</th> */}
        <th className="col-2">PARENT BARCODE ID</th>
        <th className="col-2">CHILD BARCODE ID</th>
        <th className="col-2">EMPLOYEE ID</th>
        <th className="col-2">APPROVED BY</th>
        <th className="col-2">DATE</th>
        <th className="col-2 text-center">Actions</th>
      </tr>

    )
  }

  barcodesListTableTextile() {
    return this.state.barcodesList.map((items, index) => {
      const { currentBarcodeId, toBeBarcodeId, createdBy, fromDate } = items
      return (
        <tr key={index}>
          <td className="col-2 underline">{currentBarcodeId}</td>
          <td className="col-2 underline">{toBeBarcodeId}</td>
          <td className="col-2">{createdBy}</td>
          <td className="col-2">-</td>
          <td className="col-2">{fromDate}</td>
          <td className="col-2 text-center">
            <img src={print} className="w-12 pb-2 m-r-2" />
            <img src={view} className="w-12 pb-2" onClick={() => this.openEditBarcode(currentBarcodeId)} />
            {/* <i className="icon-edit m-l-2 fs-16" onClick={() => this.deleteBarcode(barcodeTextileId)}></i> */}
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
          <select className="form-control" placeholder="Select Store" value={this.state.status} disabled={true}>
            <option value='' disabled>Select</option>
            {this.state.statusTypeList.map(item => (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            ))}
          </select>
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
          <input type="date" className="form-control" placeholder="" value={this.state.productValidity} disabled={true}
          />
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
          <input type="number" className="form-control" placeholder="" value={this.state.stockValue} disabled={true}
          />
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
          <input type="number" className="form-control" placeholder="" value={this.state.qty} disabled={true}
          />
        </div>
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
          <input type="text" className="form-control" placeholder="" value={this.state.name} disabled={true}
          />
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
            <select className="form-control" placeholder="Select Division" value={this.state.division} disabled={true}>
              <option value='' disabled>Select</option>
              {this.state.divisionsList.map(item => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>Section
        <span className="text-red font-bold">*</span>
            </label>
            <select className="form-control" placeholder="Select Section" value={this.state.section} disabled={true}>
              <option value='' disabled>Select</option>
              {this.state.sectionsList.map(item => (

                <option key={item.id} value={item.id}>

                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <div className="form-group">
            <label>Sub Section
        <span className="text-red font-bold">*</span>
            </label>
            <select className="form-control" placeholder="Select Sub Section" value={this.state.subSection} disabled={true}>
              <option value='' disabled>Select</option>
              {this.state.subSectionsList.map(item => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-sm-4 col-12 mt-3">
          <div className="form-group">
            <label>Category
        <span className="text-red font-bold">*</span>
            </label>
            <select className="form-control" placeholder="Select Category" value={this.state.category} disabled={true}>
              <option value='' disabled>Select</option>
              {this.state.categoriesList.map(item => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { options, id, value } = this.state;
    return (
      <div className="">
        <Modal isOpen={this.state.isAddBarcode} size="lg">
          <ModalHeader><h5>Re-Barcode</h5></ModalHeader>
          <ModalBody>
            <div className="p-3">
              <div className="col-12 scaling-center scaling-mb">
                <h6 className="text-red mb-3">Re-Barcode Details</h6>
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
              <div class="row">
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>Colour
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="" value={this.state.colour} disabled={true}
                    />
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
                    <input type="text" className="form-control" placeholder="" value={this.state.batchNo} disabled={true}
                    />

                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>Cost Price
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="number" className="form-control" placeholder="₹ 00" value={this.state.costPrice} disabled={true}
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>List Price
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="number" className="form-control" placeholder="₹ 00" value={this.state.listPrice} disabled={true}
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>UOM
                  <span className="text-red font-bold">*</span>
                    </label>
                    <select className="form-control" placeholder="Select Store" value={this.state.uom} disabled={true}>
                      <option value='' disabled>Select</option>
                      {this.state.uomsList.map(item => (
                        <option key={item.value} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
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
                    <select className="form-control" placeholder="Select Store" value={this.state.hsnCode} disabled={true}>
                      <option value='' disabled>Select</option>
                      {this.state.hsnList.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>EMP ID
                  <span className="text-red font-bold">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="" value={this.state.empId} disabled={true}
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-12 mt-3">
                  <div className="form-group">
                    <label>Store
                  <span className="text-red font-bold">*</span>
                    </label>
                    <select className="form-control" placeholder="Select Store" value={this.state.storeId} disabled={true}>
                      <option value='' disabled>Select</option>
                      {this.state.storesList.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.value}
                        </option>
                      ))}
                    </select>
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
              Close
            </button>
            {/* <button
              className="btn-unic active fs-12"
              // onClick={this.state.isEdit ? this.editBarcode : this.addBarcode}
              onClick={this.checkForMandatory}
            >
              Save
            </button> */}
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
                  placeholder="RE-BARCODE ID" value={this.state.barcodeSearchId}
                  onChange={(e) =>
                    this.setState({ barcodeSearchId: e.target.value })} />

                {/* <button type="button" className="scan">
                <img src={scan} /> 
                SCAN
                </button> */}
              </div>
            </div>
            <div className="col-3 col-sm-3 col-12 scaling-center scaling-mb scaling-mtop">
              <button className="btn-unic-search active m-r-2 mt-2" onClick={this.getAllBarcodes}>SEARCH</button>
            </div>
          </div>
          <div className="row m-0 p-0 scaling-center">
            <h5 className="mb-2 fs-18 p-l-0 mt-3">List of Re-Barcodings</h5>
            <div className="table-responsive p-0">
              <table className="table table-borderless mb-1">
                <thead>
                  {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? null : this.barcodesTextileHeader()}
                </thead>
                <tbody>
                  {/* <tr> */}
                  {(this.state.domainDetails && this.state.domainDetails.label === "Retail") ? null : this.barcodesListTableTextile()}
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
