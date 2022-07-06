import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import edit from '../../assets/images/edit.svg';
import view from "../../assets/images/view.svg";
import scan from '../../assets/images/scan.svg';
import InventoryService from '../../services/InventoryService';
import { toast } from "react-toastify";
// import { error } from  "error";

export default class ProductsCombo extends Component {
  constructor(props){
    super(props);
    this.state={
      isAddCombo:false,
      comboName: '',
      comboQuantity: '',
      id:'',
      qunatity:1,
      dsNumber: '',
      domainDetails: {},
      selectedStoreId: '',
      error:{},
      barList:[],
      listOfProducts: [],
      comboDescription: '',
      selectedDomainId: '',
      listOfProductBundle: [],
      commonFieldsErr:false,
      isEdit:false,
      deletFlag : true,
      fromDate: '',
      toDate: '',
      comboPrice: '',
      selectedProductCombo: ''
    }
  this.addCombo = this.addCombo.bind(this);
  this.closeCombo = this.closeCombo.bind(this);
  this.getBarcodeDetails = this.getBarcodeDetails.bind(this);
  this.saveProductBundle  = this.saveProductBundle.bind(this);
  this.preventMinus = this.preventMinus.bind(this);
  this.handleValidation = this.handleValidation.bind(this);
  this.getProductBundleList = this.getProductBundleList.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain'));
    if(this.state.isEdit){
      this.setState({deletFlag:false})
    }
    let domainId;
    // if(selectedDomain.label === 'Textile') {
    //   domainId = 1;
    // } else {
    //   domainId = 2;
    // }
    this.setState({ 
      domainDetails:  JSON.parse(sessionStorage.getItem('selectedDomain')),
      selectedStoreId: JSON.parse(sessionStorage.getItem('storeId')),
      selectedDomainId: domainId

    }, () => this.getProductBundleList(this.state.selectedStoreId));
    // this.loadErrorMsgs();
    
  }
  addCombo() {
    this.setState({isAddCombo : true,isEdit: false});
    this.setState({comboQuantity:"",
    comboName:"" , comboPrice:"" , dsNumber :"" ,
  })
    
  } 
  closeCombo() {
    this.setState({ isAddCombo : false,isEdit: false, listOfProducts: [] , barList :[]});
    this.setState({comboQuantity:"",
    comboName:"" , comboPrice:"" , dsNumber :""
  })
  
  }
  clear = () => {
    this.setState({ 
      ProductsCombo: [],
      fromDate: '',
      toDate: '' ,
     }, () => this.searchCombo());
  }

  getBarcodeDetails() {
    // let j = 0
    const { selectedStoreId, domainDetails, dsNumber } = this.state;
    InventoryService.getBarcodeDetails(dsNumber, domainDetails, selectedStoreId).then((res) => {
      
      if (res) {
          const { barcode, name, itemMrp, id } = res.data;
          const obj = { barcode, name, itemMrp, id, qty:1};
          if (res.data) {
            res.data.quantity=1
          let count = false;
          if(this.state.listOfProducts.length === 0){
            this.state.listOfProducts.push(res.data);
            //  this.state.listOfProducts[0].quantity=1;
          } else {
          for (let i = 0; i < this.state.listOfProducts.length; i++) {
            if (this.state.listOfProducts[i].barcode === res.data.barcode) {
              count = true
              var items =[...this.state.listOfProducts];
              if(items[i].quantity < items[i].qty){
                items[i].quantity= items[i].quantity + 1;
                break;
              }
            else{
            toast.info("Insufficient quntity");
            break
          }
          
       }
      }
      if(count === false){
        this.state.listOfProducts.push(res.data);
      }
    
         //   console.log("++++++++++++++++++"+"sucess")
         //   // this.setState({
         //   //   listOfProducts: [...this.state.listOfProducts, obj ]
         //   // });
         //   this.state.listOfProducts.push(res.data);
         
       
        
        //if(!count){
       //this.state.listOfProducts.push(res.data);
        //   console.log("++++++++++++++++++"+"sucess")
        //   // this.setState({
        //   //   listOfProducts: [...this.state.listOfProducts, obj ]
        //   // });
        //   this.state.listOfProducts.push(res.data);
       // 
        
      } this.setState({ listOfProducts: this.state.listOfProducts, dsNumber: '' }, () => {
        this.state.listOfProducts.forEach((element) => {
          if (element.quantity > 1) {
          } else {
            element.quantity = parseInt("1");
          }

        });
      });
      
    }
  }



    });
  }
   
    
  
  getProductBundleList(selectedStoreId) {
    InventoryService.getAllProductBundleList('', '', selectedStoreId).then((res) => {
    if(res) {
      this.setState({
        listOfProductBundle: res.data.result.content,
      });
    }
    });
  }
  
  saveProductBundle() {
    const { listOfProducts,barList, isEdit, comboName, comboQuantity, comboDescription, selectedDomainId, selectedStoreId,comboPrice, selectedProductCombo} = this.state;
    if (isEdit) {
       console.log('++++++++selectedProductCombo++++++++', selectedProductCombo);
       const updatedProductTextiles = selectedProductCombo.productTextiles.map((itm) => {
        const obj = {};
        obj.id = itm.id;
        obj.barcode = itm.barcode;
        obj.qty = itm.qty;
        obj.itemMrp = itm.itemMrp;
        return obj;
      });
      const updatedObjReq = {
        id: selectedProductCombo.id,
        bundleQuantity: selectedProductCombo.bundleQuantity,
        storeId: selectedProductCombo.storeId,
        description: selectedProductCombo.description,
        // domainId: selectedDomainId,
        name: selectedProductCombo.name,
        isEdit: true,
        productTextiles: updatedProductTextiles,
        itemMrp: selectedProductCombo.itemMrp
      }
      InventoryService.getProductBundleUpdate(updatedObjReq).then((res) => {
        if (res && res.data.isSuccess === "true") {
          toast.success(res.data.message);
          this.setState({ 
            isAddCombo: false,
            listOfProducts: [],
            comboName: '',
            comboQuantity: '',
            comboDescription: '',
            isEdit: false,
            comboPrice: '',
            selectedStoreId: selectedStoreId
          }, () => this.getProductBundleList(selectedStoreId));
        } 
        
      });
    
    } else {
      const comboProductList = listOfProducts.map((itm) => {
        const obj = {};
        obj.id = itm.id;
        obj.barcode = itm.barcode;
        obj.qty = itm.quantity;
        obj.itemMrp = itm.itemMrp;
        return obj;
      });
   
      const requestObj = {
        bundleQuantity: comboQuantity,
        storeId: selectedStoreId,
        description: comboDescription,
        domainId: selectedDomainId,
        name: comboName,
        isEdit: false,
        productTextiles: comboProductList,
        itemMrp: comboPrice
      }   



      if(this.handleValidation()){  
        if(listOfProducts.length > 0) {
          InventoryService.addProductDundle(requestObj).then((res) => {
            if (res && res.data.isSuccess === "true") {
              toast.success(res.data.message);
              this.setState({ 
                isAddCombo: false,
                listOfProducts: [],
                comboName: '',
                comboQuantity: '',
                comboDescription: '',
                isEdit: false,
                comboPrice: '',
                selectedStoreId: selectedStoreId
              }, () => this.getProductBundleList(selectedStoreId));
            } else {
              toast.success(res.data.message);
            }
          });
        } else {
          toast.info("Please Add Atleast One Product");
        }
      }
    }    
}

handleChange (){
  const comboQuantity = (Event.target.validity.valid) ? 
  Event.target.value : this.state.comboQuantity;
}

  
  // loadErrorMsgs() {
  //   this.state.error["comboName"] = "Please Enter Combo Name";
  //   this.state.error["ComboQuantity"] = "Please Enter Quantity";
  
  //   this.setState({ error: this.state.error});
  // }
  handleValidation () {
    let error= {};
    let formIsValid= true;

   // combo name
    if(!this.state.comboName){
      formIsValid = false;
      error["comboName"] = 'Enter Combo Name';
      }
      if(!this.state.comboPrice){
        formIsValid = false;
        error["comboPrice"] = 'Enter Combo Price';
        }
     //combo quantity
      if(!this.state.comboQuantity){
        formIsValid = false;
        error["comboQuantity"] = 'Please Enter Quantity';
        }
        if(!this.state.listOfProducts){
          formIsValid = false;
          error["listOfProducts"] = 'Please Add Atleast One Product';
          }
    this.setState({ error: error });               
    return formIsValid;  
  }
  handleRemoveSpecificRow = (idx) => {
    const listOfProducts = [...this.state.listOfProducts]
    listOfProducts.splice(idx, 1)
    this.setState({ listOfProducts })
  }
  editProductCombo = (item) => {
    console.log('++++++item+++++++++', item);
  this.setState({
    isEdit: true,
    isAddCombo : true,
    comboName: item.name, 
    comboQuantity: item.bundleQuantity, 
    listOfProducts: item.productTextiles,
    comboPrice: item.itemMrp,
    selectedProductCombo: item
    
  });
  }
  searchCombo = () => {
    const {toDate, fromDate, selectedStoreId } = this.state;
    InventoryService.getAllProductBundleList(fromDate, toDate, selectedStoreId).then((res) => {
      if(res) {
        this.setState({
          listOfProductBundle: res.data.result.content
        
        });
      }
    });
  }
  handleQtyChange = (idx, e) => {
    let listOfProducts = this.state.listOfProducts;
    listOfProducts[idx][e.target.name] = e.target.value;
    this.setState({ listOfProducts });
  }
 
  preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  render() {
    {/* {this.state.barList.map((items, index) => { */}
    
    return (
      
      
      <div className="maincontent">
      {/* {this.state.barList.map((items, index) => { */}
        <Modal isOpen={this.state.isAddCombo} size="lg" style={{maxWidth: '1000px', width: '100%'}}>
        <ModalHeader>Add Combo</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label>Combo Name <span className="text-red font-bold" name="bold">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.comboName}
                    disabled={this.state.isEdit}
                    placeholder="Name Of The Combo"
                    onChange={(e) => this.setState({ comboName: e.target.value })}
                  />
                </div>
                <span style={{ color: "red" }}>{this.state.error["comboName"]}</span>
              </div>
              <div className="col-2">
                <div className="form-group">
                  <label>Combo Quantity <span className="text-red font-bold" name="bold">*</span></label>
                  <input 
                    className="form-control"
                      type="number" id="quantity"  min="0" max="unlimit"
                   placeholder="Quantity"
                     disabled={this.state.isEdit}
                    value={this.state.comboQuantity}
                    onChange={(e) => this.setState({ comboQuantity: e.target.value })}
                   /> 
                </div>
                <span style={{ color: "red" }}>{this.state.error["comboQuantity"]}</span>
              </div>
              <div className="col-2">
                <div className="form-group">
                  <label>Combo Price <span className="text-red font-bold" name="bold">*</span></label>
                  <input 
                    className="form-control"
                      type="number" id="quantity"  min="0" max="unlimit"
                      placeholder="Combo Price"
                      disabled={this.state.isEdit}
                      value={this.state.comboPrice}
                      onChange={(e) => this.setState({ comboPrice: e.target.value })}
                   /> 
                </div>
                <span style={{ color: "red" }}>{this.state.error["comboPrice"]}</span>
              {/* })} */}
              </div>
      
        
              <div className="col-4">
                <div className="form-group">
                  <label> Add Products By</label>
                  <input
                    type="text"
                    className="form-control"
                     disabled={this.state.isEdit}
                    value={this.state.dsNumber}
                    placeholder="ENTER BARCODE"
                    onChange={(e) => this.setState({ dsNumber: e.target.value })}
                    />
                    
                  <button type="button" className="scan" onClick={this.getBarcodeDetails}>
                            <img src={scan} /> SCAN
                  </button>
                
                </div>
              </div>
            </div>
          <div className="maincontent m-t-2 p-0">
          <h3 className="mt-1 mb-2 fs-18 p-l-0">List Of Products</h3>
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="m-0 p-0">
                                        <th className="col-1">S.No</th>
                                        <th className="col-2">BARCODE</th>
                                        <th className="col-2">PRODUCT NAME</th>
                                        <th className="col-1">UNIT PRICE</th>
                                        <th className="col-1">QTY</th>
                                        <th className="col-1"></th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                  {this.state.listOfProducts.length > 0 && this.state.listOfProducts.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                      <td className="col-1"> { index + 1 }</td>
                                      <td className="col-2">{item.barcode}</td>
                                      <td className="col-2">{item.name}</td>
                                      <td className="col-1">{item.itemMrp}</td>
                                      <th className="col-1">
                                        <div className="form-group">
                                          <input
                                            type="number"
                                            className="form-control"
                                            name="qty"
                                            min="1"
                                            max={item.qty}
                                            disabled={this.state.isEdit}
                                            placeholder=""
                                            value={!this.state.isEdit ? item.quantity : item.qty}
                                            onChange={e => this.handleQtyChange(index, e)}
                                          />
                   
                                        </div>
                                        {/* <span style={{ color: "red" }}>{this.state.error["listOfProducts"]}</span> */}
                                        
                                      </th>
           
                                      {this.state.listOfProducts.length > 1 && <td className="col-1 text-center">
                                       
                                       <i onClick={() => this.handleRemoveSpecificRow(index)}  className="icon-delete m-l-2 fs-16" ></i>
                                       
                                      </td>}
                                      </tr> 
                                    )
                                  })}
                                </tbody>
                            </table>
                           
                        </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn-unic" onClick={this.closeCombo}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12 + btn-disable"
              
              disabled={this.state.isEdit}
              onClick={this.saveProductBundle}
            >
              Save
            </button>
          
          </ModalFooter>
          </Modal>
      <div className="row">
        <div className="col-sm-3 col-12">
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
        <div className="col-sm-3 col-12">
          <div className="form-group mt-2">
            <label>To Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="TO DATE"
              value={this.state.toDate}
              onChange={(e) => this.setState({ toDate: e.target.value })}
            />
          </div>
        </div>
        {/* <div className="col-sm-3 col-12">
          <div className="form-group mt-2">
            <label>Inventory ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter ID"
            />
          </div>
        </div> */}
        <div className='col-sm-6 col-12 mt-3 pt-2 scaling-center scaling-mb scaling-mtop'>
        <button 
                 onClick={this.searchCombo}
                className="btn-unic-search active m-r-2 mt-1"
              >
                Search
              </button>
              <button className="btn-clear m-r-2 mt-2"
              onClick={this.clear}
               >
                 Clear
                 </button>


              <button
                className="btn-unic-redbdr mt-2 m-r-2"
                onClick={this.addCombo}
              >
               <i className="icon-product_combo fs-16"></i> Add Combo
              </button>
        </div>
        </div>
        <h5 className="mb-2 fs-18 p-l-0 mt-3">List of product  bundles</h5>
        <div className="table-responsive m-0 p-0">
              <table className="table table-borderless mb-1 mt-2">
                <thead>
                <tr className="m-0 p-0">
                  <th className="col-2"># Inventory-ID</th>
                  <th className="col-2">BARCODE</th>
                  <th className="col-2">STORE ID</th>
                  <th className="col-2">Combo Name</th>
                  <th className="col-2">No.of Items</th>
                  <th className="col-2">Unit Price</th>
                  <th className="col-2"></th>                 
               </tr>
                </thead>
                <tbody>
                  {this.state.listOfProductBundle && this.state.listOfProductBundle.map((itm, ind) => {
                      return (
                        <tr key={ind}>
                          <td className="col-2">{itm.id}</td>
                          <td className="col-2">{itm.barcode}</td>
                          <td className="col-2">{itm.storeId}</td>
                          <td className="col-2">{itm.name}</td>
                          <td className="col-2">{itm.bundleQuantity}</td>
                          <td className="col-2">{itm.itemMrp}</td>
                          <td className="col-1">
                          <img
                              src={view}
                              className="w-12 pb-2"
                              onClick={() => this.editProductCombo(itm)}
                            />
                          </td>                          
                        </tr>
                        )
                  })}
                  {this.state.listOfProductBundle.length === 0 && <tr>No records found!</tr>}
                  </tbody>
              </table>
          </div>        
        </div>
    )
  }
}
