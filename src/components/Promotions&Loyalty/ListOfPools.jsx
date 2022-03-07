import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import '../../assets/nav.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import PromotionsService from "../../services/PromotionsService";
import URMService from '../../services/URM/URMService';
import { render } from "react-dom";
import DisplayPools from './DisplayPools'
import Pagination from './Pagination';
import Select from 'react-select';


export default class ListOfPools extends Component {
  constructor(props){
    super(props);
    this.state  = {
      isAddPool: false,
      deletePoolConformation: false,
      listOfPools: [],
      poolName: '',
      poolType: '',
      poolRule: '',
      addNewRule: [{ columnName: '', givenValue: '', operatorSymbol : '', valueList: []}],
      isUpdatable: false,
      updatedRuleVO: [],
      // addNewRule: [{ }],
      poolRuleList: [
        {
            Privilege: "Generate Estimation slip",
            description: "Generating estimation slip in Cash memo",
            path:"/createdeliveryslip",
            isCheck: false,
        },
        {
            Privilege: "Generate Invoice",
            description: "Generating Invoice in Cash memo",
            path:"/newsale",
            isCheck: false,
        },
        {
            Privilege: "Generate Return Slip",
            description: "Generating return slip in Cash memo",
            path:"/createdeliveryslip",
            isCheck: false,
        },
        {
            Privilege: "Add Customer",
            description: "Add customer in Cash memo",
            path:"/createcustomer",
            isCheck: false,
        },
        {
            Privilege: "Gift Vocher",
            description: "Gift Vocher in Cash memo",
            path:"/tagcustomer",
            isCheck: false,
        },
        {
            Privilege: "Day Close Activity",
            description: "Day Close Activity in Cash memo",
            path:"/posdayclose",
            isCheck: false,
        },
        {
            Privilege: "Admin",
            description: "Admin rights",
            path:"/createdeliveryslip",
            isCheck: false,
        },
        {
            Privilege: "Super Admin",
            description: "Super Admin Rights",
            path:"/createdeliveryslip",
            isCheck: false,
        }

    ],
    updatedColumns: [
      { value: 'CostPrice', label: 'Cost_Price' },
      { value: 'Section', label: 'Section' },
      { value: 'SubSection', label: 'Sub_Section' },
      { value: 'Dcode', label: 'Dcode' },
      { value: 'Mrp', label: 'Mrp' },      
      { value: 'BarcodeCreatedOn', label: 'Barcode_Created_On' },
      { value: 'Style Code', label: 'Style_Code' },
      { value: 'SubSectionId', label: 'SubSectionId' },
      { value: 'Uom', label: 'Uom' },
      { value: 'BatchNo', label: 'Batch_No' },
      { value: 'DiscountType', label: 'Discount Type' },
      { value: 'Division', label: 'Division' }
    ],
    options: [
      { value: 'Equals', label: 'Equals' },
      { value: 'NotEquals', label: 'Not Equals' },
      { value: 'GreaterThan', label: 'Greater Than' },
      { value: 'LessThan', label: 'Less Than' },
      { value: 'GreaterThanAndEquals', label: 'Greater Than And Equals' },      
      { value: 'LessThanAndEquals', label: 'Less Than And Equals' },
      { value: 'In', label: 'IN' }
    ],
    columns: [],
    poolTypes: [
      { value: 'Buy', label: 'BUY' },
      { value: 'Get', label: 'GET' },
      { value: 'Both', label: 'BOTH' },    
    ],
    poolStatuses: [
      { value: true, label: 'Active' },
      { value:  false, label: 'Inactive' },
    ],
    poolStatus: true,
    createdByList: [],
    createdBy: '',
    selectedItem: '',
    clientId: '',
    currentPage: 1,
    poolsPerPage: 10,
    currentPools: [],
    listOfPoolCount: '',
    columnType: '',
    columnValues: [],
    selectedPoolValues: [],
    activeTab: 'INCLUDED',
    isAddRule: false,
    addedIncludedPoolRules: [],
    addedExcludedPoolRules: [],
    ruleNumber: 0,
    isPoolRuleUpdated: false,
    editedRuleNumber: ''
    };

    this.addPool = this.addPool.bind(this);
    this.closePool = this.closePool.bind(this);
    this.addPoolRule = this.addPoolRule.bind(this);
    this.closePoolRule = this.closePoolRule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addPoolDetails = this.addPoolDetails.bind(this);
    this.handlePoolRule = this.handlePoolRule.bind(this);
    this.handlePoolType = this.handlePoolType.bind(this);
    this.handlePoolStatus = this.handlePoolStatus.bind(this);
    this.searchPool = this.searchPool.bind(this);
    this.handleCreatedBy = this.handleCreatedBy.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleDeleteConfirmation = this.handleDeleteConfirmation.bind(this);
    this.getPoolList = this.getPoolList.bind(this);
    this.getDomainsList = this.getDomainsList.bind(this);
    this.handleRemovePool = this.handleRemovePool.bind(this);
    this.modifyPool = this.modifyPool.bind(this);
    this.paginate = this.paginate.bind(this);
    this.getAllColumns = this.getAllColumns.bind(this);
    this.handlePoolRuleConfirmation = this.handlePoolRuleConfirmation.bind(this);
  }
  
  componentDidMount() {
    this.getDomainsList();   
  }
  getAllColumns(clientId) {
    PromotionsService.getAllColumns(clientId).then((res) => {
      let columnsObj = {}
      const result =  res.data['result'].reduce((a, v) => ({ ...a, [v]: v}), {});
      columnsObj.cost_price = result.cost_price;
      columnsObj.item_mrp = result.item_mrp;
      columnsObj.batch_no = result.batch_no;
      columnsObj.colour = result.colour;
      columnsObj.uom = result.uom;
      columnsObj.division = result.division;
      columnsObj.section = result.section;
      columnsObj.sub_section = result.sub_section;
      columnsObj.category = result.category;
      columnsObj.original_barcode_created_at = result.original_barcode_created_at;
      columnsObj.promo_label = result.promo_label;
      const propertyNames = Object.keys(columnsObj);
      const columnNames = propertyNames.map((item) => {
        const obj = {};
          obj.label = item.toUpperCase();
          obj.value = item;
          return obj;
      });
      this.setState({
        columns: columnNames
      });
    });
  }
  getDomainsList() {    
    const user = JSON.parse(sessionStorage.getItem('user'));
    const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain'));   
     URMService.getDomainsList(user["custom:clientId1"]).then((res) => {
         if(res) {
           if(selectedDomain.label === 'Textile') {
             this.setState({ clientId:  res.data.result[1].domain[0].id }, () => this.getPoolList());
           } else {
             this.setState({ clientId:  res.data.result[0].domain[0].id }, () => this.getPoolList());
           }            
         }       
     });
   }
  getPoolList() {
    this.getAllColumns(this.state.clientId)
    PromotionsService.getPoolList().then((res) => {
      if(res.data.isSuccess === 'true') {   
            var elements = res.data.result['poolvo'].reduce( (previous, current) => {
            var object = previous.filter(object => object.createdBy === current.createdBy);
            if (object.length == 0) {
              previous.push(current);
            }
            return previous;
          }, []);
          const finalResult = elements.filter((item) => item.createdBy !== null);
          this.setState({ 
            listOfPools: res.data.result['poolvo'],
            createdByList: finalResult
            });    
       } else {
           toast.error(res.data.message);
       }    
    });
  }
  
  handleChange(e) {
   this.setState({poolName: e.target.value});
  }

  handlePoolRule(e) {
    this.setState({poolRule: e.target.value});
  }

  handlePoolType(e){
    this.setState({poolType: e.target.value});
  }

  handlePoolStatus(e){
    this.setState({poolStatus: e.target.value});
  }

  addPool() {
    this.setState({
          isAddPool: true,
          addedExcludedPoolRules: [],
          addedIncludedPoolRules: []
       });
  }
  addPoolDetails() {
    const { addedIncludedPoolRules, addedExcludedPoolRules, activeTab, ruleNumber, isUpdatable} = this.state;
    let poolConditions = [];
    const user = JSON.parse(sessionStorage.getItem("user"));    
    const createdBy = user['custom:userId'];
    delete this.state.addNewRule['valueList']
    if(this.state.isUpdatable) {
      const { poolId, updatedRuleVO, addedExcludedPoolRules, addedIncludedPoolRules } = this.state;
      const updatedPoolRules = [...addedExcludedPoolRules, ...addedIncludedPoolRules];
      let updatedConditionArray = [];
      updatedPoolRules.forEach((rule) => {
        rule.rules.forEach((itm) => {
          if(itm.isForEdit) {
            itm.isForEdit = true;
          } else {
            itm.isForEdit = true;
          }
          updatedConditionArray.push(itm)
        }); 
      });
      const updateObj = {
                  isActive: true,
                  isForEdit: true,
                  poolName: this.state.poolName,
                  poolType: this.state.poolType,
                  createdBy: createdBy,
                  domainId: this.state.clientId,
                   pool_RuleVo: this.groupByMultiplePropertiesEdit(updatedConditionArray),
                  // ruleVo: updatedConditionArray.map(item => item.isForEdit = true),
                  isForEdit: true,
                  poolId: poolId
                };
        PromotionsService.modifyPool(updateObj).then((res) => {
          if (res.data.isSuccess === 'true') {
              toast.success(res.data.message);
              this.setState({ 
                isAddPool: false,
                isUpdatable: false,
                poolName: '',
                poolType: '',
                addNewRule: [],
                addedExcludedPoolRules: [],
                addedIncludedPoolRules: []
              });
              this.getPoolList();
          } else {
              toast.error(res.data.message);
          }
      });
    } else {
    const finalAddedRules = [addedIncludedPoolRules, addedExcludedPoolRules];
    this.groupByMultipleProperties(finalAddedRules);
    finalAddedRules.forEach(item => {
      item.forEach((itm) => {
        delete itm.valueList;
        delete itm.ruleNumber;
        poolConditions.push(itm.rules);
      }); 
    });
    let conditionArray = [];
    poolConditions.forEach((rule) => {
       rule.forEach((condition) => conditionArray.push(condition)) 
    });
    const obj = {
      isActive: true,
      isForEdit: false,
      poolName: this.state.poolName,
      poolType: this.state.poolType,
      createdBy: createdBy,
      domainId: this.state.clientId,
      pool_RuleVo: this.groupByMultipleProperties(conditionArray)
    }
      PromotionsService.addPool(obj).then((res) => {
          if (res.data.isSuccess === 'true') {
              toast.success(res.data.message);
              this.setState({ 
                isAddPool: false,
                isUpdatable: false,
                poolName: '',
                poolType: '',
                addNewRule: [],
                updatedRuleVO: []
              });
              this.getPoolList();
          } else {
            toast.error(res.data.message);
          }
      });
  }
  }
  handleAddRow = () => {
    const { ruleNumber, activeTab, addNewRule } = this.state;
      let ruleNum = '';
      if(activeTab === 'INCLUDED') {
        ruleNum = ruleNumber + 1;
      } else {
        ruleNum = ruleNumber
      }        
      this.setState({
        isPoolRuleUpdated: false,
        isAddRule: true,
        addNewRule: [],
        ruleNumber: ruleNum
      });
  };

  handleAddRuleRow = () => {
    const item = {
      columnName: '',
      givenValue: '',
      operatorSymbol: ''
    };
    this.setState({
      addNewRule: [...this.state.addNewRule, item]
    });
  };
  onColumnValueChange = opt => {
    this.setState({
      selectedPoolValues: opt
    });
  };
  handleTextChange = (idx, e) => {
    let addNewRule = this.state.addNewRule;
    addNewRule[idx][e.target.name] = e.target.value;
    this.setState({ addNewRule });
  };
 
  handleRoleChange = (idx, e) => {
    let addNewRule = this.state.addNewRule;
    addNewRule[idx][e.target.name] = e.target.value;
    this.setState({ addNewRule });
    // let columnType = addNewRule[idx][e.target.name];
    // this.setState({ addNewRule, columnType:  e.target.name}, () => {
  
    //  if(columnType  === 'uom') {
    //     PromotionsService.getValuesFromProductTextileColumns(columnType).then((res) => {
    //       if (res.data.isSuccess === 'true') {
    //         const columnNames = res.data['result'].map((item) => {
    //           const obj = {};
    //             obj.label = item;
    //             obj.value = item;
    //             return obj;
    //         });
    //         this.state.addNewRule[idx].valueList = columnNames;
    //         this.setState({
    //           addNewRule,
    //           columnValues: columnNames
    //         });
    //       } else {
    //         toast.error(res.data.message);
    //       }
    //     });
    //  } else if(columnType  === 'batch_no' || columnType  === 'category' || columnType  === 'colour' || columnType  === 'division' || columnType  === 'sub_section' ||  columnType  === 'section') {
    //   PromotionsService.getValuesFromBarcodeTextileColumns(columnType).then((res) => {
    //     if (res.data.isSuccess === 'true') {
    //       const columnNames = res.data['result'].map((item) => {
    //         const obj = {};
    //           obj.label = item;
    //           obj.value = item;
    //           return obj;
    //       });
    //       this.state.addNewRule[idx].valueList = columnNames;
    //       this.setState({
    //         addNewRule,
    //         columnValues: columnNames
    //       });
    //     } else {
    //       toast.error(res.data.message);
    //     }
    //   });
    //  }

    // });
  };
  // handleRemovePool = (item) => () => {
  //   this.setState({
  //     deletePoolConformation: true,
  //     selectedItem: item
  //   });
  // }
  paginate(e, number) {    
    const { poolsPerPage } = this.state;
    this.setState({
        currentPage: number,
        listOfPoolCount: number * poolsPerPage
    });
  }
  handleRemovePool(item) {
    this.setState({
      deletePoolConformation: true,
      selectedItem: item
    });
  }
  conditionsList = (ruleList) => {
    let conditionsList = [];
    ruleList.forEach((itm) => {
      return itm.conditionVos.map((item) => {
        const obj =  { columnName: item.columnName, operatorSymbol: item.operatorSymbol, givenValue: item.givenValues.toString(), id: item.id, ruleId: itm.id, ruleType: itm.ruleType, ruleNumber: itm.ruleNumber}
        return conditionsList.push(obj);
      });
    });
    return conditionsList;
  }
  modifyPool(item) {
    const { listOfPools } = this.state;
    const user = JSON.parse(sessionStorage.getItem("user"));
    const createdBy = user['cognito:groups'][0];
    const pool =  listOfPools.find(pool => pool.poolId === item.poolId);
    const conditionsList = this.conditionsList(pool.pool_RuleVo);
    this.setState({
        // getting max rule num
        // ruleNumber: Math.max(...ruleList.map(item => item.ruleNumber)),
         isUpdatable: true,
         isAddPool: true,
         poolId: pool.poolId,
         poolName: pool.poolName,
         poolType: pool.poolType,
         addNewRule: conditionsList,
         addedIncludedPoolRules: this.groupByRuleNumber(conditionsList.filter(item =>  item.ruleType === 'Include')),
         addedExcludedPoolRules: this.groupByRuleNumber(conditionsList.filter(item =>  item.ruleType === 'Exclude'))
      // updatedRuleVO: pool.ruleVo
    });
  }

  handleRemoveSpecificRow = (idx) => () => {
    const addNewRule = [...this.state.addNewRule]
    addNewRule.splice(idx, 1)
    this.setState({ addNewRule })
  }
  handleRemoveSpecificRule = (idx) => {
    if(this.state.activeTab === 'INCLUDED') {
      const addedIncludedPoolRules = [...this.state.addedIncludedPoolRules]
      addedIncludedPoolRules.splice(idx, 1)
      this.setState({ addedIncludedPoolRules })
    } else {
      const addedExcludedPoolRules = [...this.state.addedExcludedPoolRules]
      addedExcludedPoolRules.splice(idx, 1)
      this.setState({ addedExcludedPoolRules })
    }
    
  }
  closePool() {
    this.setState({ 
      isAddPool: false,
      isUpdatable: false,
      poolName: '',
      poolType: '',
      ruleNumber: '',
      addNewRule: [],
      updatedRuleVO: [],
      // addedExcludedPoolRules: [],
      // addedIncludedPoolRules: [],
      addNewRule: [{ columnName: '', givenValue: '', operatorSymbol : '' }]
    });
  }

  addPoolRule() {
    this.setState({isAddPoolRule : true});
  } 

  closePoolRule() {
    this.setState({ isAddPoolRule : false });
  }
  handleCreatedBy(e) {
    this.setState({ createdBy: e.target.value });
  }
  searchPool() {
    const { createdBy, poolType, poolStatus, createdByList} = this.state;
    const obj = {       
        createdBy: createdBy,
        poolType: poolType,
        isActive: poolStatus
    }   
    this.setState({ 
      listOfPools: []
      // createdByList: []
     });
    PromotionsService.searchPool(obj).then((res) => {
      if(res.data.isSuccess === 'true') {
       this.setState({ 
         listOfPools: res.data.result,
         addNewRule: [{ columnName: '', givenValue: '', operatorSymbol : '' }]
        });     
      } else {
        toast.error(res.data.message);
      }  
     });
  }

  handleDeleteConfirmation() {
    this.setState({ deletePoolConformation: false });
  }
  handleConfirmation() {
    const { selectedItem } = this.state;
    PromotionsService.deletePool(selectedItem.poolId).then((res) => {
      if(res.data.isSuccess === 'true') {
        this.setState({ deletePoolConformation: false });
        toast.success(res.data.message);
        this.getPoolList();
      } else {
        toast.error(res.data.message);
      }    
    });
  }

  handlePoolRuleConfirmation() {
    this.setState({
      isAddRule: false,
      addedNewRules: []
    });
  }
  editPoolRule(item, index) {
    const { activeTab, addedExcludedPoolRules, addedIncludedPoolRules, isUpdatable } = this.state;
    if(isUpdatable) {
      if(activeTab === 'INCLUDED') {
        let includeConditions = [];
        addedIncludedPoolRules.forEach(item => {
          delete item.ruleNumber;
          item.rules.forEach(itm => {
            includeConditions.push(itm);
          });
        });
        this.setState({
          editedRuleNumber: item,
          isAddRule: true,
          isPoolRuleUpdated: true,
          addedIncludedPoolRules: this.groupByRuleNumber(includeConditions.filter(item =>  item.ruleType === 'Include')),
          addNewRule: includeConditions.filter(itm => itm.ruleType === 'Include' && itm.ruleNumber == item)
        });
      } else {
        let excludeConditions = [];
        addedExcludedPoolRules.forEach(item => {
          delete item.ruleNumber;
          item.rules.forEach(itm => {
            excludeConditions.push(itm);
          });
        })
        this.setState({
          isAddRule: true,
          isPoolRuleUpdated: true,
          addedExcludedPoolRules: this.groupByRuleNumber(excludeConditions.filter(item =>  item.ruleType === 'Exclude')),
          addNewRule: excludeConditions.filter(itm => itm.ruleType === 'Exclude' && itm.ruleNumber == item)
        });
      }      
    }
  }
  groupByRuleNumber = (conditions) => {
    let obj = {};
    obj.columnName = '';
    obj.createdBy = '';
    obj.givenValue = '';
    obj.id = '';
    obj.isForEdit = '';
    obj.lastModified = '';
    obj.modifiedBy = '';
    obj.operatorSymbol = '';
    obj.ruleNumber = '';
    obj.ruleType = '';
    const  group_to_values = conditions.reduce((obj, item) => {
      obj[item.ruleNumber] = obj[item.ruleNumber] || [];
      obj[item.ruleNumber].push(item);
      return obj;
    }, {});
    const groups = Object.keys(group_to_values).map(function (key) {
      return {ruleNumber: key, rules: group_to_values[key]};
    });
    return groups;
  }
  groupByMultipleProperties = (array) => {
    let hash = Object.create(null);
    let grouped = [];
    array.forEach(function (o) {
    var key = ['ruleNumber', 'ruleType', 'isForEdit'].map(function (k) { return o[k]; });//.join('|');

    if (!hash[key]) {
    hash[key] = { ruleNumber: o.ruleNumber, ruleType: o.ruleType, isForEdit: o.isForEdit, conditionVos : [] };
    grouped.push(hash[key]);
    }
    ['used'].forEach(function (k) { hash[key]['conditionVos'].push({ columnName : o['columnName'], givenValues : [o['givenValue']], operatorSymbol: o['operatorSymbol']}) });
    });
    return grouped;
  }
  groupByMultiplePropertiesEdit = (array) => {
    let hash = Object.create(null);
    let grouped = [];
    array.forEach(function (o) {
    var key = ['ruleNumber', 'ruleType', 'isForEdit'].map(function (k) { return o[k]; });//.join('|');

    if (!hash[key]) {
    hash[key] = { ruleNumber: o.ruleNumber, ruleType: o.ruleType, isForEdit: o.isForEdit, id: o.ruleId, conditionVos : [] };
    grouped.push(hash[key]);
    }
    ['used'].forEach(function (k) { hash[key]['conditionVos'].push({ columnName : o['columnName'], givenValues : [o['givenValue']], operatorSymbol: o['operatorSymbol'], id: o['id']}) });
    });
    return grouped;
  }
  addRule = () => {
    const { addNewRule, editedRuleNumber, activeTab, addedExcludedPoolRules, addedIncludedPoolRules, isUpdatable, isPoolRuleUpdated } = this.state;
    if(isUpdatable) {
          // if pool condition edit
          const addedNewRules = addNewRule.map((item) => {
            // item.ruleNumber = this.state.ruleNumber;
            if(isUpdatable) {
              item.isForEdit = true;
            } else {
              item.isForEdit = false;
            }
            return item;
          });
        if(activeTab === 'INCLUDED') {
          let includeConditions = [];
          let arr = [];
          addedIncludedPoolRules.forEach(item => {
            delete item.ruleNumber;
            item.rules.forEach(itm => {
              includeConditions.push(itm);
            });
          });
          this.setState({
            isAddRule: false,
            addedIncludedPoolRules: this.groupByRuleNumber(includeConditions),
            addNewRule: []
          });
        } else {
            let updateExConditions = [];
            addedExcludedPoolRules.forEach(item => {
              item.rules.forEach(itm => {
                updateExConditions.push(itm);
              });
            });
            this.setState({
              isAddRule: false,
              addedIncludedPoolRules: this.groupByRuleNumber(updateExConditions),
              // addedExcludedPoolRules: this.groupByRuleNumber(updateExConditions.map(obj => addedNewRules.find(o => o.id === obj.id) || obj)),
              addNewRule: []
            });
        }
    } else {
        const addedNewRules = addNewRule.map((item) => {
          item.ruleNumber = this.state.ruleNumber;
          if(isUpdatable) {
            item.isForEdit = true;
          } else {
             item.isForEdit = false;
          }
          return item;
        });
      if(activeTab === 'INCLUDED') {      
        // const includeRules = [...addedIncludedPoolRules, ...addedNewRules];
        const finalIncludedRules = addedNewRules.map((item) => { 
          item.ruleType = 'Include';
          return item; 
        });
        const groupedRules = this.groupByRuleNumber(finalIncludedRules);
        const includeRules = [...addedIncludedPoolRules, ...groupedRules];
        this.setState({
          isAddRule: false,
         // addedIncludedPoolRules: finalIncludedRules,
          addedIncludedPoolRules: includeRules,
          addNewRule: []
        });
      } else {
        // const excludeRules = [...addedExcludedPoolRules, ...addedNewRules];
        const finalExcludedRules = addedNewRules.map((item) => { 
          item.ruleType = 'Exclude';
          return item; 
        });
        const groupedRules = this.groupByRuleNumber(finalExcludedRules);
        const excludeRules = [...addedExcludedPoolRules, ...groupedRules];
        this.setState({
          isAddRule: false,
          addedExcludedPoolRules: excludeRules,
          addNewRule: []
        });
      }
    }      
  }

  getPrivilegesList() {
    return this.state.poolRuleList.map((items, index) => {
        const { Privilege, description, isCheck } = items;
        return (
            <tr className="row m-0 p-0" key={index}>
                <td className="col-1">{index + 1}</td>
                <td className="col-4">{Privilege}</td>
                <td className="col-6">{description}</td>
                <td className="col-1">
                    <div className="form-check checkbox-rounded checkbox-living-coral-filled pointer fs-15">
                      <input type="checkbox" className="form-check-input filled-in mt-1" id="remember{{index}}"  
                        name="barcodes{{index}}" checked={isCheck}
                        onChange={(e) => this.setPrivileges(e, index, Privilege)}/>
                      <label className="form-check-label" htmlFor="remember"></label>
                    </div>
                </td>
            </tr>
        );
    });
}
FirstTab = () => {
  return (
    <div className="FirstTab">
      <div className="table-responsive p-0">
          <table className="table table-borderless mb-1 mt-2">
            <tbody>
              {this.state.addedIncludedPoolRules.length > 0 && this.state.addedIncludedPoolRules.map((item, index) => {
                return (
                    <div>
                        <tr key={index}> 
                          <td className="col-6"><h6>Condition - {item.ruleNumber}</h6></td>
                          <td><img onClick={() => this.editPoolRule(item.ruleNumber, index)} src={edit} className="w-12 pb-2" /> </td>
                          <td> <i onClick= {() => this.handleRemoveSpecificRule(index)} className="icon-delete m-l-2 fs-16"></i></td>
                        </tr>
                        <thead>
                        <tr className="m-0 p-0">
                          <th className="col-3">COLUMN NAME</th>
                          <th className="col-3">OPERATOR</th>
                          <th className="col-3">VALUES</th>
                        </tr>
                        </thead>
                          {item.rules.map((itm, ind) => {
                              return (
                                <tr key={ind}>
                                  <td className="col-3">{itm.columnName}</td>
                                  <td className="col-3">{itm.operatorSymbol}</td>
                                  <td className="col-3">{itm.givenValue}</td>
                                </tr>
                                )
                          })}
                    </div>
                  )
              })}
            </tbody>
          </table>
      </div>
    </div>
  );
};

SecondTab = () => {
  return (
    <div className="SecondTab">
      <div className="table-responsive">
          <table className="table table-borderless mb-1 mt-2">
            <tbody>
              {this.state.addedExcludedPoolRules.length > 0 && this.state.addedExcludedPoolRules.map((item, index) => {
                return (
                  <div>
                    <tr key={index}> 
                      <td className="col-6"><h6>Condition - {item.ruleNumber}</h6></td>
                      <td><img onClick={() => this.editPoolRule(item.ruleNumber, index)} src={edit} className="w-12 pb-2" /> </td>
                      <td> <i onClick= {() => this.handleRemoveSpecificRule(index)} className="icon-delete m-l-2 fs-16"></i></td>
                    </tr>
                    <thead>
                    <tr className="m-0 p-0">
                      <th className="col-3">COLUMN NAME</th>
                      <th className="col-3">OPERATOR</th>
                      <th className="col-3">VALUES</th>
                    </tr>
                    </thead>
                    {item.rules.map((itm, ind) => {
                        return (
                          <tr key={ind}>
                            <td className="col-3">{itm.columnName}</td>
                            <td className="col-3">{itm.operatorSymbol}</td>
                            <td className="col-3">{itm.givenValue}</td>
                          </tr>
                          )
                    })}
                  </div>
                )
              })}
            </tbody>
          </table>
      </div>
    </div>
  );
};

handleInclude = () => {
  this.setState({
    activeTab: 'INCLUDED',
    ruleNumber: this.state.ruleNumber,
    addNewRule: []
  });
};
handleExclude = () => {
  this.setState({
    activeTab: 'EXCLUDED',
    ruleNumber: this.state.ruleNumber,
    addNewRule: []
  });
};

Tabs = () => {
  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li
        className={this.state.activeTab === "INCLUDED" ? "active" : ""}
        onClick={this.handleInclude}
        >INCLUDED</li>
        <li
        className={this.state.activeTab === "EXCLUDED" ? "active" : ""}
        onClick={this.handleExclude}
         >EXCLUDED</li>
      </ul>
      <div>
        {this.state.activeTab === "INCLUDED" ? this.FirstTab() : this.SecondTab()}
      </div>
    </div>
  );
};

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.poolsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.poolsPerPage;
    this.state. currentPools = this.state.listOfPools.slice(indexOfFirstPost, indexOfLastPost);  
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isAddPoolRule} size="lg">
        <ModalHeader>Add Pool Rule</ModalHeader>
          <ModalBody>
          <div className="maincontent p-0">
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="row m-0 p-0">
                                        <th className="col-1 pt-1">S.No</th>
                                        <th className="col-4 pt-1">Pool Rules</th>
                                        <th className="col-6 pt-1">Description</th>
                                        <th className="col-1 pt-1"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                   
                                    {this.getPrivilegesList()}
                                </tbody>
                            </table>
                        </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn-unic" onClick={this.closePoolRule}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closePoolRule}
            >
              Save
            </button>
          </ModalFooter>
          </Modal>
        <Modal isOpen={this.state.deletePoolConformation} size="lg">
        <ModalHeader>Delete Pool Rule</ModalHeader>
          <ModalBody>
                <div className="maincontent p-0">
                    <h6>Are you sure want to delete pool?</h6>        
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn-unic" onClick={this.handleDeleteConfirmation}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.handleConfirmation}
            >
              Delete
            </button>
          </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.isAddRule} size="lg">
              <ModalHeader>Add Pool Rule</ModalHeader>
                <ModalBody>
                <div className="col-12">
                  <table className="table table-borderless mb-1 mt-2">
                    <thead>
                      <tr className="m-0 p-0">
                        <th className="col-4">Column Name</th>
                        <th className="col-4">Operator</th>
                        <th className="col-3">Values</th>
                        <th className="col-1"></th>
                      </tr>
                    </thead>
                </table>
                <table className="table table-borderless gfg mb-0">
                  <tbody>
                      {this.state.addNewRule.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>
                          <select 
                              value={this.state.addNewRule[idx].columnName} 
                              onChange={e => this.handleRoleChange(idx, e)} 
                              name="columnName"
                              className="form-control">
                              <option>Select Name</option>
                              {
                                  this.state.updatedColumns &&
                                  this.state.updatedColumns.map((item, i) => 
                                  (<option key={i} value={item.value}>{item.label.toUpperCase()}</option>))
                                }
                            </select>
                          </td>
                          <td>
                            <select 
                              value={this.state.addNewRule[idx].operatorSymbol} 
                              onChange={ e => this.handleRoleChange(idx, e)}                          
                              name="operatorSymbol"
                              className="form-control">
                                <option>Select Operator</option>
                                {
                                  this.state.options &&
                                  this.state.options.map((item, i) => 
                                  (<option key={i} value={item.value}>{item.label}</option>))
                                }
                            </select>
                          </td>
                          
                          {(this.state.addNewRule[idx].columnName === 'cost_price'  || this.state.addNewRule[idx].columnName === 'item_mrp' || this.state.addNewRule[idx].columnName === 'original_barcode_created_at') ? <td> <input
                              type="text"
                              name="givenValue"
                              value={this.state.addNewRule[idx].givenValue}
                              onChange={e => this.handleTextChange(idx, e)}
                              className="form-control"
                            /> </td> :  
                            <td> {(this.state.addNewRule[idx].operatorSymbol === 'In' ) ? <Select
                                isMulti
                                onChange={this.onColumnValueChange}
                                options={this.state.columnValues}
                                value={this.state.givenValue}
                          />
                          //   : <select 
                          //   value={this.state.addNewRule[idx].givenValue} 
                          //   onChange={ e => this.handleTextChange(idx, e)}                          
                          //   name="givenValue"
                          //   className="form-control">
                          //     <option>Select Column Values</option>
                          //     {
                          //       this.state.addNewRule[idx].valueList &&
                          //       this.state.addNewRule[idx].valueList.map((item, i) => 
                          //       (<option key={i} value={item.value}>{item.label}</option>))
                          //     }
                          // </select>
                          : <input
                              type="text"
                              name="givenValue"
                              value={this.state.addNewRule[idx].givenValue}
                              onChange={e => this.handleTextChange(idx, e)}
                              className="form-control"
                            />
                            } </td> }
                          {
                            this.state.addNewRule.length > 1 && 
                            <td className="col-1 text-center">
                              <i onClick={this.handleRemoveSpecificRow(idx)} className="icon-delete m-l-2 fs-16"></i>
                            </td>
                          }
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>  
                </div>
                {!this.state.isPoolRuleUpdated && <div className="col-12 text-right mt-3">
                    <button type="button" className="btn-unic-redbdr" onClick={this.handleAddRuleRow}>Add New Condition</button>
                </div>}
                </ModalBody>
              <ModalFooter>
              <button className="btn-unic" onClick={this.handlePoolRuleConfirmation}>
                Cancel
              </button>
              <button
                className="btn-unic active fs-12"
                onClick={this.addRule}
              >
                Add Rule
              </button>
            </ModalFooter>
          </Modal>

        <Modal isOpen={this.state.isAddPool} size="lg">
          <ModalHeader>Add Pool</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-12">
              <h6 className="text-red mb-2">Pool Details</h6>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Pool Name</label>
                  <input type="text" value={this.state.poolName}  onChange={this.handleChange} className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Pool Type</label>
                  <select value={this.state.poolType} onChange={this.handlePoolType} className="form-control">
                    <option>Select Pool Type</option>
                       { 
                          this.state.poolTypes &&
                          this.state.poolTypes.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
                </div>
                <div className="col-4 outlet">
                
                    <button type="button" className="btn-unic-redbdr" onClick={this.handleAddRow}>Add Pool Rule</button>
                
                </div>
                <div className="App">
                  {this.Tabs()}
                </div>
           </div>     
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closePool}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.addPoolDetails}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row">
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2 mb-3">
            <label>Created By</label>
              <select value={this.state.createdBy}  onChange={this.handleCreatedBy} className="form-control">
                <option>Select Created By</option>
                { 
                  this.state.createdByList &&
                  this.state.createdByList.map((item, i) => 
                  (<option key={i} value={item.createdBy}>{item.createdBy}</option>))
                }
                
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2 mb-3">
            <label>Pool Type</label>
              <select value={this.state.poolType} onChange={this.handlePoolType} className="form-control">
                <option>Select Pool Type</option>
                { 
                  this.state.poolTypes &&
                  this.state.poolTypes.map((item, i) => 
                  (<option key={i} value={item.value}>{item.label}</option>))
                }
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-12">
            <div className="form-group mt-2 mb-3">
            <label>Status</label>
              <select  value={this.state.poolStatus} onChange={this.handlePoolStatus} className="form-control">
                <option>Select Status</option>
                { 
                  this.state.poolStatuses &&
                  this.state.poolStatuses.map((item, i) => 
                  (<option key={i} value={item.value}>{item.label}</option>))
                }
              </select>
            </div>
          </div>
          <div className="col-sm-3 col-12 text-right pt-4 scaling-center scaling-mb">
            <button className="btn-unic-search active m-r-2 mt-2" onClick={this.searchPool}>SEARCH</button>
            <button className="btn-unic-redbdr mt-2" onClick={this.addPool}>Add Pool</button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Pools</h5>
          {this.state.listOfPools.length > 10 && <div className="col-11 text-right p-r-0 mt-2 align-self-center">
            <span style={{float: 'right'}}>
              <Pagination 
                poolsPerPage={this.state.poolsPerPage}
                totalPools={this.state.listOfPools.length}
                paginate={this.paginate}          
              />
            </span>
            <span className="mt-3 ">Show on page </span><span className="font-bold fs-14"> {this.state.currentPage}-{ this.state.poolsPerPage * this.state.currentPage}</span><span> Out of </span><span className="font-bold fs-14">{this.state.listOfPools.length}</span>
          </div>}
          <DisplayPools 
              listOfPools={this.state.currentPools}
              handleRemovePool={this.handleRemovePool}
              modifyPool={this.modifyPool}
          />
    </div>
  </div>
    )
  }
}