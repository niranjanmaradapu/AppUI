import React, { Component } from "react";
import edit from "../../assets/images/edit.svg";
import left from "../../assets/images/table_arrow_left.svg";
import right from "../../assets/images/table_arrow_right.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import PromotionsService from "../../services/PromotionsService";
import URMService from '../../services/URM/URMService';
import Select from "react-select";

export default class ManagePromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddPromo: false,
      isAddStore: false,
      isAddBenefits: false,
      listOfPromos: [],
      deletePromoConformation: false,
      selectedItem: '',
      isItemChecked: '',
      stores: [
        { value: 'Kukatpally', label: 'Kukatpally' },
        { value: 'KPHB-9thPhase', label: 'KPHB-9th Phase' },
        { value: 'Ameerpet', label: 'Ameerpet' },    
      ],
      promoStatuses: [
        { value: true, label: 'Active' },
        { value:  false, label: 'Inactive' },
      ],
      promoStatus: '',
      store: '',
      startDate: '',
      endDate: '',
      promotionName: '',
      promoType: '',
      // storePromoName: '',
      storeStartDate: '',
      storeEndDate: '',
      isPramotionChecked: false,
      checkedItem: '',
      promotionUpdate: false,
      updatePromoStartDate: '',
      updatePromoEndDate: '',
      updatePromoStatus: '',
      // add promo
      listOfPools: [],
      listOfGetPools: [],
      selectedPools: [],
      applicability: '',
      description: '',
      printNameOnBill: '',
      promoName: '',
      promoApplyType: '',
      isTaxExtra: '',
      promoType: '',
      clientId: '',
      isPromoEdit: false,
      editedPromo: '',
      isTaxesExtra: [
        { value: true, label: 'Yes' },
        { value:  false, label: 'No' },
      ],
      applicabilies: [
        { value: 'promotionForEachBarcode', label: 'Promotion For Each Barcode' },
        { value: 'promotionForWholeBill', label: 'Promotion For Whole Bill' }
      ],
      promotypes: [
        { value: 'By_Store', label: 'By Store' },
        { value: 'By_Promotion', label: 'By Promotion' }
      ],
      // map to Store Related
        storePromoType: '',
        storePromoName: '',
        storeStartDate: '',
        storeEndDate: '',
        storeVo: {},
        promoApplyTypesForWholeBill: [
          { value: 'QuantitySlab', label: 'Quantity Slab' },
          { value: 'ValueSlab', label: 'Value Slab' }
        ],
        promoApplyTypes: [
          { value: 'FixedQuantity', label: 'Fixed Quantity' },
          { value: 'AnyQuantity', label: 'Any Quantity' },
          { value: 'QuantitySlab', label: 'Quantity Slab' },
          { value: 'ValueSlab', label: 'Value Slab' }
        ],
        storePromotypes: [
          { value: 'By_Store', label: 'By Store' },
          { value: 'By_Promotion', label: 'By Promotion' }
        ],
        storePromoNames: [],
        // clonning 
        closeClone: false,
        promoId: '',
        isSavePriority: false,
        clientDomainaId: '',
        storesList: [],
        cloneStoreName: '',
        promotionNames: [],
        searchStoreName: '',
        activePromos: '',
        inactivePromos: '',
        totalPromos: '',
        // benfits
        benfitType: '',
        benfitTypes: [
          { value: 'FlatDiscount', label: 'Flat Discount' },
          { value: 'XunitsFromBuyPool', label: 'X Uints from Buy Pool' },
          { value: 'XunitsFromGetPool', label: 'X Uints from Get Pool' }
        ],
        benfitTypesForEachBarcode: [
          { value: 'FlatDiscount', label: 'Flat Discount' }
        ],
        discountType: '',
        discountTypes: [
          { value: 'PercentageDiscountOn', label: '% Discount on' },
          { value: 'RupeesDiscountOn', label: 'Rs. Discount on' },
          { value: 'FixedAmountOn', label: 'Fixed Amount on' }
        ],
        item: '',
        itemLabels: [
          { value: 'ItemMRP', label: 'Item MRP' },
          // { value: 'ItemRSP', label: 'Item RSP' }
        ],
        fixedAmoutItemLabels: [
          { value: 'EachItem', label: 'Each Item' },
          { value: 'AllItems', label: 'All Items' }
        ],
        discountOn: '',
        buyPoolValue: '',
        numOfItemsFromBuyPool: '',
        buyPoolValues: [
          { value: 'MinValue', label: 'Min Valued' },
          { value: 'MaxValue', label: 'Max Valued' }
        ],
        getPoolValue: '',
        numOfItemsFromGetPool: '',
        getPoolValues: [
          { value: 'MinValue', label: 'Min Valued' },
          { value: 'MaxValue', label: 'Max Valued' }
        ],
        toSlabValue: '',
        fromSlabValue: '',
        slabValues: [],
        slabValuesArray: [],
        benfitObj: {},
        buyAny: '',
        promoBenfitId: '',
        benfitIndex: '',
        benfitsPayload: [],
        benfitVoArray: [],
        editedBenfit: {},
        updatedBenfitVos: [],
        storePromoList: [],
        selectedPromolist: [],
        displayPromotions: false,
        allStorePromos: [],
        promotionTypes: [
          { value: 'promotionForEachBarcode', label: 'On Barcode' },
          { value: 'promotionForWholeBill', label: 'On Bill Value' },
          { value: 'All', label: 'All' }
        ],
        searchPromotionType: '',
        // searchPromoStatus: '',
        searchByStoreName: '',
        selectedOption: '',
        errors: {},
        benfitErrors: {},
        slabErrors: {},
        storeErrors: {}
    };

    this.addPromo = this.addPromo.bind(this);
    this.closePromo = this.closePromo.bind(this);
    this.addStore = this.addStore.bind(this);
    this.closeStore = this.closeStore.bind(this);
    this.addBenefits = this.addBenefits.bind(this);
    this.editBenefits = this.editBenefits.bind(this);
    this.closeBenefits = this.closeBenefits.bind(this);
    this.closePromotionPopup = this.closePromotionPopup.bind(this);
    this.handleDeletPromo = this.handleDeletPromo.bind(this);
    this.handleStore = this.handleStore.bind(this);
    this.searchPromo = this.searchPromo.bind(this);
    this.promotionUpdate = this.promotionUpdate.bind(this);
    this.getPoolList = this.getPoolList.bind(this);
    this.savePromotion = this.savePromotion.bind(this);
    this.cloneStore = this.cloneStore.bind(this);
    this.closeClonePopup = this.closeClonePopup.bind(this);
    this.addPromoToStore = this.addPromoToStore.bind(this);
    this.cloneStoreName = this.cloneStoreName.bind(this);
    this.savePriority = this.savePriority.bind(this);
    this.addSlab = this.addSlab.bind(this);
    this.addBenfit = this.addBenfit.bind(this);
    this.addBenefitsList = this.addBenefitsList.bind(this);
    this.getEditBenfitByIndex = this.getEditBenfitByIndex.bind(this);
    this.getAllStorePromos = this.getAllStorePromos.bind(this);
    this.showPramotionStoreMapping = this.showPramotionStoreMapping.bind(this);
    this.showPromotionsList  = this.showPromotionsList.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleBenefitFormData = this.handleBenefitFormData.bind(this);
    this.slabData = this.slabData.bind(this);
    this.handleStoreData = this.handleStoreData.bind(this);
    this.updatePromotionStatus = this.updatePromotionStatus.bind(this); 
  }
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const clientDomainId = user["custom:clientDomians"].split(",")[0];
      URMService.getDomainName(clientDomainId).then(res => {
        if(res) {
          const obj  = {
            value: clientDomainId,
            label: res.data.result.domaiName
          }
          this.setState({ selectedOption: obj }, () => {this.getDomainsList()});
        }
      });
    this.getAllStorePromos();
  }

   dateCompare = (endDate) => {
    let currentDate = new Date();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    currentDate = yyyy+'-'+ mm + '-' + dd ;
    if(endDate < currentDate) {
       return true;
    }
    //  else if(endDate === currentDate) {
    //    return false;
    // } else 
    // if( endDate > currentDate) {
    //   return false;
    // }
}
  getDomainsList() {
    const { selectedOption } = this.state;    
     const user = JSON.parse(sessionStorage.getItem('user'));
     const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain'));  
     if(selectedOption.label === 'Textile') {
      this.setState({ clientDomainaId: user["custom:clientId1"], 
                      clientId: 1 // res.data.result[1].domain[0].id
                    }, () =>  {this.getPromoList(); this.getAllStoresList();});
    } else {
      this.setState({ clientDomainaId: user["custom:clientId1"], 
                      clientId: 2 // res.data.result[0].domain[0].id 
                    }, () =>  { this.getPromoList(); this.getAllStoresList();});
       }      
    }
    getAllStoresList() {
      const { selectedOption } = this.state;
      const user = JSON.parse(sessionStorage.getItem('user'));
      // const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain')); 
      // URMService.getStoresByDomainId(user["custom:domianId1"]).then((res) => { 
        URMService.getStoresByDomainId(selectedOption.value).then((res) => { 
          if(res) {
            const result = res.data.result.map((item) => {
              const obj = {};
                obj.value = item.id;
                obj.label = item.name;
                obj.location = item.address
              return obj;         
            });
            this.setState({storesList: result}, () => this.getPoolList());
          }
      }); 
  }
  addPromoToStore() {
    const { storeStartDate, storeEndDate, storePromoName, storePromoType, storeName, searchStoreName} = this.state;
    let promoIds = []; 
    let storeIds = [];
    const user = JSON.parse(sessionStorage.getItem("user"));    
    const createdBy = user['custom:userId'];
    const formDate = this.handleStoreData();
    if(formDate) {
    if(searchStoreName.length > 0) {
      promoIds = searchStoreName.map(item => {
        const obj = {};
        obj.promoId = item.value;
        obj.promotionName = item.label;
         return obj;
      });
    } else {
      let obj = {};
      obj.promoId = searchStoreName.value;
      obj.promotionName = searchStoreName.label;
      promoIds.push(obj);
    }
    
    if(storeName.length > 1) {
      storeIds =  storeName.map((item) => {
        const obj = {};
        obj.id = item.value;
        obj.name = item.label;
        return obj;
      });
     } else {
      const obj = {};
      obj.id = storeName.value;
      obj.name = storeName.label;
      storeIds.push(obj);
     }
    const requestObj = {
        promotions: promoIds,
        stores: storeIds,
        endDate: storeEndDate,
        startDate: storeStartDate,
        priority: null,
        createdBy: createdBy,
        promotionStatus: true
    }
    PromotionsService.addPromoToStore(requestObj).then((res) => {
      if(res.data.isSuccess === 'true') {
        toast.success(res.data.message);
        this.setState({
          isAddStore: false,
          storeStartDate: '',
          storeEndDate: '',
          storePromoName: '', 
          storePromoType: '', 
          storeName: ''
        }, () => this.getAllStorePromos());
      } else {
        toast.success(res.data.message);
      }
    });
  } else {
    toast.info('Select All Mandatary Fields');
  }
  }
  cloneStoreName() {
    const { cloneStoreName, checkedItem } = this.state;
    const obj = {
      // promoToStoreId : checkedItem.id,
      id: checkedItem.id,
      storeName: cloneStoreName.label,
      storeId: cloneStoreName.value,
    }
    
    if(cloneStoreName !== '') {
      PromotionsService.clonePromotionByStore(obj).then((res) => {
        if(res.data.isSuccess === 'true') {
          toast.success(res.data.message);
          this.setState({
            isPramotionChecked: false,
            closeClone: false,
            cloneStoreName: '',
            checkedItem: ''
          }, () => this.getAllStorePromos());
        } else {
          toast.error(res.data.message);
        }
        // this.getPromoList();
      });
    } else {
      toast.info("Select Store Name");
    }    
  }
  savePriority() {
    const { checkedItem, priority } = this.state;
    const obj = {
        priority: priority,
        // promoToStoreId: checkedItem.id
        id: checkedItem.id
    }
    PromotionsService.updatePriority(obj).then((res) => {
      if(res.data.isSuccess === 'true') {
        toast.success(res.data.message);
        this.setState({
          isSavePriority: false,
          isPramotionChecked: false,
          priority: '',
          checkedItem: ''
        }, () => this.getAllStorePromos());
      } else {
        toast.error(res.data.message);
      }
    });
  }
  getPoolList() {
    const { clientId } = this.state;
    const user = JSON.parse(sessionStorage.getItem("user"));
    const selectedstoreData = JSON.parse(sessionStorage.getItem("selectedstoreData"));
    const storeId = selectedstoreData.storeId;
    const customClientId = user['custom:clientId1'];
    const domainId = clientId;
    PromotionsService.getPoolList(domainId, customClientId).then((res) => {
      if(res.data.isSuccess === 'true') {
        const result = res.data.result['poolvo'].filter((item) => item.poolType === 'Buy').map((item) => {
          const obj = {};
            obj.value = item.poolId;
            obj.label = item.poolName;
          return obj;         
        });
        const listOfGetPools = res.data.result['poolvo'].filter((item) => item.poolType === 'Get').map((item) => {
          const obj = {};
            obj.value = item.poolId;
            obj.label = item.poolName;
          return obj;         
        });
       this.setState({ 
         listOfPools: result,
         listOfGetPools: listOfGetPools
        });    
      }     
     });
     
  }

  addPromo() {
    this.setState({ isAddPromo: true });
  }

  closePromo() {
    this.setState({ 
          isAddPromo: false,
          isPromoEdit: false,
          promoId: '',
          applicability: '',
          buyAny: '',
          description: '',
          createdBy: '',
          isActive: '',
          isForEdit: false,
          isTaxExtra: '',
          selectedPools: '',
          printNameOnBill: '',
          priority: null,
          domainId: '',
          promoApplyType: '',
          promoName: '',
          promoType: '',
          benfitType: '',
          discountType: '',
          discountOn: '',
          item: '',
          benfitsPayload: [],
          slabValues: []
    });
  }

  addStore() {
    this.setState({ isAddStore: true });
  }
  showPramotionStoreMapping() {
    this.setState({ displayPromotions: true }, () => this.getAllStorePromos());
  }
  showPromotionsList() {
    this.setState({ displayPromotions: false }, () => this.getPromoList());
  }

  closeStore() {
    this.setState({ isAddStore: false });
  }

  addBenefits() {
    const formData = this.handleValidation();
    if(formData) {
      this.setState({ 
        isAddBenefits: true,
        benfitsPayload: []
      });
    }    
  }
  getEditBenfitByIndex(index) {
    const { benfitVoArray } = this.state;
    let obj = {};
    benfitVoArray.forEach((item, ind) => {
      if(index == ind) {
        obj = item;
      }      
    });
    const poolObj =    { value: obj.benfitVo.poolId, label: obj.benfitVo.poolName };
    const editedBenfit = {
      benfitId: obj.benfitVo.benfitId,
      benfitType: obj.benfitVo.benfitType,
      discountType: obj.benfitVo.discountType,
      discountOn: obj.benfitVo.discount,
      item: obj.benfitVo.discountSubType,
      getPoolValue: obj.itemValue,
      selectedPoolValue: poolObj,
      promoBenfitId: obj.benfitVo.benfitId,
      numOfItemsFromGetPool: obj.benfitVo.numOfItemsFromGetPool,
      numOfItemsFromBuyPool: obj.benfitVo.numOfItemsFromBuyPool
    };
    this.setState({
      isAddBenefits: true,
      benfitType: obj.benfitVo.benfitType,
      discountType: obj.benfitVo.discountType,
      discountOn: obj.benfitVo.discount,
      item: obj.benfitVo.discountSubType,
      getPoolValue: obj.benfitVo.itemValue,
      selectedPoolValue: poolObj,
      promoBenfitId: obj.benfitVo.benfitId,
      numOfItemsFromGetPool: obj.benfitVo.numOfItemsFromGetPool,
      numOfItemsFromBuyPool: obj.benfitVo.numOfItemsFromBuyPool,
      editedBenfit: obj,
      benfitIndex: index
    });
  }
  addBenefitsList(index) {
    const { benfitsPayload } = this.state;
    const benfitObj = benfitsPayload[index];
    if(benfitObj) {
    const poolObj =    { value: benfitObj.benfitVo.poolId ? benfitObj.benfitVo.poolId :  '' , label: benfitObj.benfitVo.poolName ? benfitObj.benfitVo.poolName : '' };
    this.setState({
      isAddBenefits: true,
      benfitType: benfitObj.benfitVo.benfitType,
      discountType: benfitObj.benfitVo.discountType,
      discountOn: benfitObj.benfitVo.discount,
      item: benfitObj.benfitVo.discountSubType,
      getPoolValue: benfitObj.benfitVo.itemValue,
      selectedPoolValue: poolObj,
      promoBenfitId: benfitObj.benfitVo.benfitId,
      numOfItemsFromGetPool: benfitObj.benfitVo.numOfItemsFromGetPool,
      numOfItemsFromBuyPool: benfitObj.benfitVo.numOfItemsFromBuyPool,
      toSlabValue: '',
      fromSlabValue: '',
    });
   } else {
    this.setState({ 
      isAddBenefits: true,
      benfitIndex: index,
      benfitType: '',
      discountType: '',
      discountOn: '',
      item: '',
      getPoolValue: '',
      selectedPoolValue: '',
      promoBenfitId: '',
      numOfItemsFromGetPool: '',
      numOfItemsFromBuyPool: ''
    });
   }
  }

  closeBenefits() {
    this.setState({ isAddBenefits: false });
  }
  addBenfit() {
    const formData = this.handleBenefitFormData();
    if(formData) {
        let index = this.state.benfitIndex;
        let updatedBenfitObjs = [];  
        const { benfitVoArray, editedBenfit, promoApplyType, benfitType, discountOn, discountType, item, benfitObj, buyPoolValue, getPoolValue, numOfItemsFromGetPool, numOfItemsFromBuyPool, selectedPoolValue, toSlabValue, fromSlabValue} = this.state;
        let obj = {
          benfitType: benfitType,
          discountType: discountType,
          discount: discountOn,
          discountSubType: item
        }
        if(benfitType === 'XunitsFromBuyPool') {
          obj = {...obj, numOfItemsFromBuyPool, itemValue: buyPoolValue}
        }
        if(benfitType === 'XunitsFromGetPool') {
          let resultObj = {
            poolId : selectedPoolValue.value,
            poolName: selectedPoolValue.label
          }
          obj = {...obj, numOfItemsFromGetPool, itemValue: getPoolValue,poolId: resultObj.poolId, poolName: resultObj.poolName}
        }
        if (promoApplyType === 'QuantitySlab' || promoApplyType === 'ValueSlab') {
            this.state.slabValues.map((item, ind) => {
              if(index == ind) {
                if(this.state.isPromoEdit) {
                  obj.benfitId = editedBenfit.benfitVo.benfitId;
                  obj = { benfitVo: obj, toSlab: item.toSlab, fromSlab: item.fromSlab, id: editedBenfit.id, updatedat: null  }
                } else {
                  delete obj['benfitId'];
                  obj = { benfitVo: obj, toSlab: item.toSlab, fromSlab: item.fromSlab }
                }
              }
            });
        }else if(promoApplyType === 'FixedQuantity' || promoApplyType === 'AnyQuantity') {
            delete obj['toSlab'];
            delete obj['fromSlab'];
            if(!this.state.isPromoEdit) {
              delete obj['benfitId'];
            } else {
              obj.benfitId = editedBenfit.benfitId;
            }
        }
        if(this.state.isPromoEdit) {     
          obj = {...obj, /* benfitId: editedBenfit.benfitId */};
          if(benfitVoArray.length > 0) {
              updatedBenfitObjs = benfitVoArray.map(b => b.id !== obj.id ? b : obj);
          } else {
            updatedBenfitObjs = [obj];
          }
        }
        this.setState({
          benfitsPayload: [...this.state.benfitsPayload, obj],
          isAddBenefits: false,
          benfitIndex: '',
          updatedBenfitVos: updatedBenfitObjs
        });
  } else {
    toast.warning("Enter All Mandatary fields");
  }
    // obj = {};
}
  promotionUpdate() {
    const {checkedItem } = this.state;
    this.setState({
      updatePromoStartDate: checkedItem.startDate,
      updatePromoEndDate: checkedItem.endDate,
      updatePromoStatus: checkedItem.promotionStatus, 
      promotionUpdate: true 
    });
  }
  savePriorityPopUp = () =>  {
    this.setState({ isSavePriority: true });
  }
  savePriorityPopUpClose = () => {
    this.setState({ isSavePriority: false });
  }
  handlePriority = (e) => {
    this.setState({ priority: e.target.value });
  }
  getAllStorePromos() {
    PromotionsService.getAllStorePromos().then((res) => {
      if(res.data.isSuccess === 'true') {   
        res.data.result.forEach((item) => {
          if(this.dateCompare(item.endDate)){
           item.promotionStatus = false;
          }    
         });     
        this.setState({
          allStorePromos: res.data.result
        });
      }
    });
  }
  getPromoList() {
    const { clientId } = this.state;
    const user = JSON.parse(sessionStorage.getItem("user"));
    const selectedstoreData = JSON.parse(sessionStorage.getItem("selectedstoreData"));
    const storeId = selectedstoreData.storeId;
    const customClientId = user['custom:clientId1'];
   //  const domainId = clientId;
    PromotionsService.getPromoList(clientId, customClientId).then((res) => {
      if(res.data.isSuccess === 'true') {
        var elements = res.data.result['promovo'].reduce( (previous, current) => {
          var object = previous.filter(object => object.promotionName === current.promotionName);
          if (object.length == 0) {
            previous.push(current);
          }
          return previous;
        }, []);
        const totalPromos = res.data.result['promovo'].length;        
        const active = res.data.result['promovo'].filter(item => item.isActive == true).length;
        const inactive = res.data.result['promovo'].filter(item => item.isActive == false).length;
        const finalResult = elements.filter((item) => item.promotionName !== null);
        const promoNamesList = res.data.result['promovo'].map((item) => {
          const obj = {};
          obj.value = item.promoId;
          obj.label = item.promotionName;
          return obj;
        });
        this.setState({
          storePromoList: promoNamesList,
          listOfPromos: res.data.result['promovo'],
          promotionNames: finalResult,
          totalPromos: totalPromos,
          activePromos: active,
          inactivePromos: inactive
        });
      }     
     });
  }
  handleRemovePromo = (item) => () => {
    this.setState({
      deletePromoConformation: true,
      selectedItem: item
    });
  }
  
  updatePromoDates = () => {
    const { updatePromoStartDate, updatePromoEndDate, updatePromoStatus, checkedItem } = this.state;   
    const obj = {
      startDate: updatePromoStartDate,
      endDate: updatePromoEndDate,
      promotionStatus: updatePromoStatus,
      id: checkedItem.id
    }
      console.log(">>>", updatePromoStartDate, updatePromoEndDate);
      if (updatePromoStartDate <= updatePromoEndDate) {
      //  this.setState({ updatePromoEndDate: this.target.value });
      
      PromotionsService.updatePromotionDates(obj).then((res) => {
        if(res.data.isSuccess === 'true') {
          toast.success(res.data.message);
          this.setState({
            promotionUpdate: false,
            isPramotionChecked: false,
            updatePromoStartDate: '',
            updatePromoEndDate: '',
            updatePromoStatus: '', 
            checkedItem: ''
          });
          this.getAllStorePromos();
        } else {
          toast.success(res.data.message);
        }
      });
    // }
  }else {
    toast.error("To date should be greater than From date ");
    
  }

}
  closeUpdatePromotion = () => {
    const { checkedItem, allStorePromos } = this.state;
    allStorePromos.forEach((item) => {
      if(item.id === checkedItem.id) {
          item.isCheckBoxChecked = false;
      }
    });
    this.setState({
      promotionUpdate: false,
      isPramotionChecked: false,
      checkedItem: ''
    });
  }
  haandleSearchPromotionType = (e) => {
    this.setState({searchPromotionType: e.target.value});
  }
  handleSearchPromotionStatus = (e) => {
    this.setState({searchPromoStatus: e.target.value});
  }
  searchPromotion = () => {
    const { searchPromotionType, searchPromoStatus} = this.state;
    const requestObj = {
      // isActive: searchPromoStatus,
      applicability : searchPromotionType 
    }
    PromotionsService.promotionsSearching(requestObj).then((res) => {
      if(res.data.isSuccess === 'true') {
        toast.success(res.data.message);
        this.setState({
          listOfPromos: res.data.result,
          searchPromotionType: '',
          // searchPromoStatus: ''
        });
      } else {
        toast.success(res.data.message);
      }
    });
  }
  handlePromoStatus(e){
    this.setState({promoStatus: e.target.value});
  }
  handleStore(e){
    this.setState({store: e.target.value});
  }
  haandlePromoname(e) {
    this.setState({
      promotionName: e.target.value,
    });
  }
  haandleEnddate(e) {
    this.setState({
      endDate: e.target.value
    });
  }
  haandleStartdate(e) {
    this.setState({
      startDate: e.target.value
    });
  }

  closePromotionPopup() {
    this.setState({ deletePromoConformation: false });
  }
  handleDeletPromo() {
    const { selectedItem } = this.state;
    PromotionsService.deletePromo(selectedItem.promoId).then((res) => {
      if(res.data.isSuccess === 'true') {
        this.setState({ deletePromoConformation: false });
        toast.success(res.data.message);
        this.getPromoList();
      } else {
        toast.success(res.data.message);
      }    
    });
  }
  searchPromo() {
    const {promoStatus, searchByStoreName, endDate, startDate, promotionName } = this.state;
    const obj = {
        promotionStartDate: startDate ? startDate : null,
        promotionEndDate: endDate ? endDate : null,
        promotionName: promotionName ? promotionName : null,
        isActive: promoStatus ? promoStatus : null,
        storeName: searchByStoreName ? searchByStoreName.label : null
    }
    // Need to handle search promotion
    PromotionsService.searchPromotion(obj).then((res) => {     
      if(res.data.isSuccess === 'true') {
        this.setState({
          allStorePromos: res.data.result,
          promoStatus: '', 
          searchByStoreName: '',
          endDate: '', 
          startDate: '', 
          promotionName: ''
        });        
      }     
    });
  }
  addPromo() {
    this.setState({ isAddPromo: true });
  }
  
  addStore() {
    this.setState({ isAddStore: true });
  }

  // addBenefits() {
  //   this.setState({ isAddBenefits: true });
  // }

  // closeBenefits() {
  //   this.setState({ isAddBenefits: false });
  // }
  updatePromoStartDate(e) {
    this.setState({ updatePromoStartDate: e.target.value });
  }
  updatePromoEndDate(e) {
    this.setState({ updatePromoEndDate: e.target.value });
  }
  updatePromoStatus(e) {
    this.setState({ updatePromoStatus: e.target.value });
  }

  handelPromoType(e) {
    this.setState({ promoType: e.target.value });
  }
  handelApplicability(e) {
    this.state.errors["applicability"] = '';
    this.setState({ applicability: e.target.value });
  }
  handelIsTaxExtra(e) {
    this.state.errors["isTaxExtra"] = '';
    this.setState({ isTaxExtra: e.target.value });
  }
  handlePromoApplyType(e) {
    this.state.errors["promoApplyType"] = '';
    this.setState({ promoApplyType: e.target.value });
  }
  handlePrintNameOnBill(e) {
    this.state.errors["printNameOnBill"] = '';
    this.setState({ printNameOnBill: e.target.value });
  }
  handleDescription(e) {
    this.setState({ description: e.target.value });
  }
  handlePromoName(e) {
    this.state.errors["promoName"] = '';
    this.setState({ promoName: e.target.value });
  }
  handleStorePromoType(e) {
    this.setState({ storePromoType: e.target.value });
  }
  handleStorePromoName(e) {
    this.state.storeErrors["storePromoName"] = '';
    this.setState({ storePromoName: e.target.value });
  }
  handleStoreName(e) {
    this.state.storeErrors["storeName"] = '';
    this.setState({ storeName: e.target.value });
  }
  handleStoreStartDate(e) {
    this.state.storeErrors["storeStartDate"] = '';
    this.setState({ storeStartDate: e.target.value });
  }
  handleStoreEndDate(e) {
    this.state.storeErrors["storeEndDate"] = '';
    this.setState({ storeEndDate: e.target.value });
  }
  handleChange(e, index, item) {
    if(e.target.checked) {
      this.state.allStorePromos.forEach((itm, ind) => {
        if(index === ind){
          itm.isCheckBoxChecked = true;
        } else {
          itm.isCheckBoxChecked = false;
        }
      });
      this.setState({
        isPramotionChecked: true,
        checkedItem: item
      });
    } else {
      this.state.allStorePromos.forEach((itm, ind) => {
        if(index === ind){
          itm.isCheckBoxChecked = false;
        }
      });
      this.setState({
        isPramotionChecked: false,
        checkedItem: ''
      });
    }
  }
  onChange = opt => {
    this.state.errors["selectedPools"] = '';
    this.setState({
      selectedPools: opt
    });
  };
  onStoreNameChange = selectedstore => {
    this.state.storeErrors["storeName"] = '';
    this.setState({
      storeName: selectedstore
    });
  }
  onSearchStoreNameChange = selectedSore => {
    this.setState({
      searchByStoreName: selectedSore
    });
  }
  onSearchStorePromoNameChange = selectedPromotions =>{
    this.state.storeErrors["searchStoreName"] = '';
    this.setState({
      searchStoreName: selectedPromotions
    });
  }
  oncloneStoreNameChange = selectedstore => {
    this.setState({
      cloneStoreName : selectedstore
    });
  }
  selectedPoolValueChange = selectedstore => {
    this.state.benfitErrors["selectedPoolValue"] = '';
    this.setState({
      selectedPoolValue : selectedstore
    });
  }
  editBenefits() {
    this.setState({
      isAddBenefits: true
    });
  }
  getBenfitByIndex(index) {
    const { benfitVoArray } = this.state;
    const benfitObj = benfitVoArray[index]; 
    const poolObj =    { value: benfitObj.poolId, label: benfitObj.poolName };
    this.setState({
      isAddBenefits: true,
      benfitType: benfitObj.benfitType,
      discountType: benfitObj.discountType,
      discountOn: benfitObj.discount,
      item: benfitObj.percentageDiscountOn,
      getPoolValue: benfitObj.itemValue,
      selectedPoolValue: poolObj,
      promoBenfitId: benfitObj.benfitId,
      numOfItemsFromGetPool: benfitObj.numOfItemsFromGetPool,
      numOfItemsFromBuyPool: benfitObj.numOfItemsFromBuyPool
    }); 
  }

  editPramotion = (item) => () => {
    const { listOfPromos } = this.state;
    const promo =  listOfPromos.find(promo => promo.promoId === item.promoId);
    const data = promo.poolVo;
    let benfitVo = [];
    let benfitObj = '';
    if(promo.promotionSlabVo.length > 0) {
     // benfitObj = promo.benfitVo[0];
      benfitVo = promo.promotionSlabVo;        
      const slabValueRes = benfitVo.map((item) => {
        const obj = {};
          obj.toSlab = item.toSlab;
          obj.fromSlab = item.fromSlab;
          return obj;
      });
      this.setState({
        slabValues: slabValueRes,
        benfitVoArray: benfitVo
        //   benfitType: benfitObj.benfitType,
        //   discountType: benfitObj.discountType,
        //   discountOn: benfitObj.discount,
        //   item: benfitObj.percentageDiscountOn,
        //   getPoolValue: benfitObj.itemValue,
        //   buyPoolValue: benfitObj.itemValue,
        //   promoApplyType: benfitObj.promoApplyType,
        //  // selectedPoolValue: poolObj,
        //   promoBenfitId: benfitObj.benfitId,
        //   numOfItemsFromGetPool: benfitObj.numOfItemsFromGetPool,
        //   numOfItemsFromBuyPool: benfitObj.numOfItemsFromBuyPool
      });
    } else if(promo.benfitVo.length > 0){
      benfitVo = promo.benfitVo[0];
      const poolObj =    { value: benfitVo.poolId, label: benfitVo.poolName };
      this.setState({
          editedBenfit: benfitVo,
          benfitType: benfitVo.benfitType,
         // item: benfitVo.discountSubType,
          discountType: benfitVo.discountType,
          discountOn: benfitVo.discount,
          item: benfitVo.discountSubType,
          getPoolValue: benfitVo.itemValue,
          buyPoolValue: benfitVo.itemValue,
          promoApplyType: benfitVo.promoApplyType,
          selectedPoolValue: poolObj,
          promoBenfitId: benfitVo.benfitId,
          numOfItemsFromGetPool: benfitVo.numOfItemsFromGetPool,
          numOfItemsFromBuyPool: benfitVo.numOfItemsFromBuyPool
      });
    }    
    const result = data.map((item) => {
      const obj = {};
        obj.value = item.poolId;
        obj.label = item.poolName;
      return obj;         
    });

    this.setState({
      promoId: promo.promoId,
      isAddPromo: true,
      isPromoEdit: true,
      // editedPromo: promo
        applicability: promo.applicability,
        buyAny: promo.buyItemsFromPool,
        description: promo.description,
        createdBy: promo.createdBy,
        isActive: true,
        isForEdit: false,
        isTaxExtra: promo.isTaxExtra,
        selectedPools: result,
        printNameOnBill: promo.printNameOnBill,
        priority: null,
        domainId: promo.clientId,
        promoApplyType: promo.promoApplyType,
        promoName: promo.promotionName,
        promoType: promo.promoType
    });
  }
  // checkObjectProperties = () => {
  //   return obj.promotionSlabVo.map((obj) => {
  //     return !Object.values(obj.benfitVo).every(o => o === null || o === '');       
  //    });
  // }
  handleValidation() {
    const { selectedPools,
      applicability,
      printNameOnBill,
      promoName,
      promoApplyType,
      isTaxExtra,      
      buyAny
      } = this.state;
    let errors = {};
    let formIsValid = true;

    // promoName
    if (!promoName) {
        formIsValid = false;
        errors["promoName"] = "Enter Promotion Name";
    }
    // printNameOnBill
    if (!printNameOnBill) {
      formIsValid = false;
      errors["printNameOnBill"] = "Enter Name On Bill";
    }
    // printNameOnBill
    if (!applicability) {
      formIsValid = false;
      errors["applicability"] = "Select Applicability";
    }
    // promoApplyType
    if (!promoApplyType) {
      formIsValid = false;
      errors["promoApplyType"] = "Select Promotion Apply Type";
    }
    // isTaxExtra
    if (!isTaxExtra) {
      formIsValid = false;
      errors["isTaxExtra"] = "Select Charge Tax Extra";
    }
    // selectedPools
    if (selectedPools.length === 0) {
      formIsValid = false;
      errors["selectedPools"] = "Select At Least One Buy Pool";
    }

    // buyAny
    if (!buyAny && promoApplyType === 'FixedQuantity') {
      formIsValid = false;
      errors["buyAny"] = "Enter Any Quantity";
    }
    this.setState({ errors: errors });               
    return formIsValid;

}
handleBenefitFormData() {
  const { benfitType,
    discountType,
    discountOn,
    item,
    getPoolValue,
    buyPoolValue,
    numOfItemsFromBuyPool,
    numOfItemsFromGetPool,
    selectedPoolValue
    } = this.state;
    
  let errors = {};
  let formIsValid = true;
  if (!benfitType) {
    formIsValid = false;
    errors["benfitType"] = "Select Benefit Type";
  }
  if (!discountType) {
    formIsValid = false;
    errors["discountType"] = "Select Discount Type";
  }
  if (!discountOn) {
    formIsValid = false;
    errors["discountOn"] = "Enter Discount";
  }
  if (!item) {
    formIsValid = false;
    errors["item"] = "Discount Sub Type";
  }
  if (!buyPoolValue && benfitType === 'XunitsFromBuyPool') {
    formIsValid = false;
    errors["buyPoolValue"] = "Select Item Value";
  }
  if (!numOfItemsFromBuyPool && benfitType === 'XunitsFromBuyPool') {
    formIsValid = false;
    errors["numOfItemsFromBuyPool"] = "Enter No Of Items From BuyPool";
  }
  if (!numOfItemsFromGetPool && benfitType === 'XunitsFromGetPool') {
    formIsValid = false;
    errors["numOfItemsFromGetPool"] = "Enter No Of Items From GetPool";
  }
  if (!getPoolValue && benfitType === 'XunitsFromGetPool') {
    formIsValid = false;
    errors["getPoolValue"] = "Select Item Value";
  }
  if (!selectedPoolValue && benfitType === 'XunitsFromGetPool') {
    formIsValid = false;
    errors["selectedPoolValue"] = "Select Get Pool";
  }  
  this.setState({ benfitErrors: errors });               
  return formIsValid;
}
  savePromotion() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const selectedstoreData = JSON.parse(sessionStorage.getItem("selectedstoreData"));    
    const createdBy = user['custom:userId'];
    const { selectedPools,
      applicability,
      description,
      printNameOnBill,
      promoName,
      promoApplyType,
      isTaxExtra,
      promoType,
      clientId,
      benfitObj,
      buyAny,
      benfitsPayload,
      editedBenfit,
      updatedBenfitVos,
      benfitIndex
     } = this.state;
      const result = selectedPools.map((item) => {
        const obj = {};
          obj.poolId = item.value;
          obj.poolName = item.label;
        return obj;         
      });
    const obj = {
        applicability: applicability,
        benfitVo: (promoApplyType === 'QuantitySlab' || promoApplyType === 'ValueSlab') ? [] : benfitsPayload,
        buyItemsFromPool: buyAny,
        description: description,
        createdBy: createdBy,
        isActive: true,
        isForEdit: false,
        storeId: selectedstoreData.storeId,
        clientId: user['custom:clientId1'],
        isTaxExtra: isTaxExtra,
        poolVo: result,
        promotionSlabVo:( promoApplyType === 'FixedQuantity' || promoApplyType === 'AnyQuantity') ? [] : benfitsPayload,
        printNameOnBill: printNameOnBill,
        priority: null,
        domainId: clientId,
        promoApplyType: promoApplyType,
        promotionName: promoName
      //  promoType: promoType
    }
    if(this.state.isPromoEdit) {
      const { promoId, selectedPools} = this.state;
      const result = selectedPools.map((item) => {
        const obj = {};
          obj.poolId = item.value;
          obj.poolName = item.label;
        return obj;         
      });
      const obj = {
        promoId: promoId,
        applicability: applicability,
        buyItemsFromPool: buyAny,
        description: description,
        createdBy: createdBy,
        isActive: true,
        isForEdit: true,
        isTaxExtra: isTaxExtra,
        poolVo: result,
        printNameOnBill: printNameOnBill,
        // priority: null,
        domainId: clientId,
        storeId: selectedstoreData.storeId,
        clientId: user['custom:clientId1'],
        promoApplyType: promoApplyType,
        promotionName: promoName,
        promoType: promoType,
        benfitVo: (promoApplyType === 'QuantitySlab' || promoApplyType === 'ValueSlab') ? [] : updatedBenfitVos,
        promotionSlabVo:( promoApplyType === 'FixedQuantity' || promoApplyType === 'AnyQuantity') ? [] : updatedBenfitVos,
        // benfitVo: updatedBenfitVos
    }
      PromotionsService.updatePromotion(obj).then((res) => {
        if(res.data.isSuccess === 'true') {
          toast.success(res.data.message);
          this.setState({
            selectedPools: [],
            applicability: '',
            description: '',
            printNameOnBill: '',
            promoName: '',
            promoApplyType: '',
            isTaxExtra: '',
            promoType: '',
            clientId: '',
            isAddPromo: false,
            isForEdit: false,
            benfitsPayload: [], 
          });
          this.getPromoList();
        } else {
          toast.success(res.data.message);
        }
    });
    } else {
      const formData = this.handleValidation();
      if(obj.benfitVo.length > 0 && formData|| formData && obj.promotionSlabVo.length > 0) {
        PromotionsService.addPromo(obj).then((res) => {
          if(res.data.isSuccess === 'true') {
            toast.success(res.data.message);
            this.setState({
              selectedPools: [],
              applicability: '',
              description: '',
              printNameOnBill: '',
              promoName: '',
              promoApplyType: '',
              isTaxExtra: '',
              promoType: '',
              clientId: '',
              isAddPromo: false,
              buyAny: '',
              benfitsPayload: [],
              slabValues: []
            });
            this.getPromoList();
          } else {
            toast.success(res.data.message);
          }
        });
      } else {
        toast.info('Add atleast one benefit');
      }
    }
      
  }
  cloneStore() {
    this.setState({ closeClone: true });
  }

  closeClonePopup() {
    const { checkedItem, allStorePromos } = this.state;
    allStorePromos.forEach((item) => {
       if(item.id === checkedItem.id) {
          item.isCheckBoxChecked = false;
       }
    });
    this.setState({ closeClone: false, cloneStoreName: '', isPramotionChecked: false,  checkedItem: ''});
  }

  handleItemValue(e) {
    this.state.benfitErrors["item"] = '';
    this.setState({ item: e.target.value });
  }
  handleDiscount(e) {
    this.state.benfitErrors["discountOn"] = '';
    this.setState({ discountOn: e.target.value });
  }
  handleDiscountType(e) {
    this.state.benfitErrors["discountType"] = '';
    this.setState({ discountType: e.target.value });
  }
  handleBenfitType(e) {
    this.state.benfitErrors["benfitType"] = '';
    this.setState({ benfitType: e.target.value });
  }
  handleNumOfItemsFromBuyPool(e) {
    this.state.benfitErrors["numOfItemsFromBuyPool"] = '';
    this.setState({ numOfItemsFromBuyPool: e.target.value });
  }
  handleBuyPoolValue(e) {
    this.state.benfitErrors["buyPoolValue"] = '';
    this.setState({ buyPoolValue: e.target.value });
  }
  handleNumOfItemsFromGetPool(e) {
    this.state.benfitErrors["numOfItemsFromGetPool"] = '';
    this.setState({ numOfItemsFromGetPool: e.target.value });
  }
  handleGetPoolValue(e) {
    this.state.benfitErrors["getPoolValue"] = '';
    this.setState({ getPoolValue: e.target.value });
  }
  handleSelectedPoolValue(e) {
    this.setState({ selectedPoolValue: e.target.value });
  }
  handleToSlab(e) {
    this.state.slabErrors["toSlabValue"] = '';
    this.setState({ toSlabValue: e.target.value });
  }
  handlefromSlab(e) {
    this.state.slabErrors["fromSlabValue"] = '';
    this.setState({ fromSlabValue: e.target.value });
  }
  handleBuyAny(e) {
    this.state.errors["buyAny"] = '';
    this.setState({ buyAny: e.target.value });
  }
  addSlab() {
    // const { toSlabValue, fromSlabValue } = this.state;
    const slabData = this.slabData();
    if(slabData) {
      const toSlab = this.state.toSlabValue;
      const fromSlab = this.state.fromSlabValue;
      const obj = {
        toSlab,
        fromSlab
      };
      this.setState({
        slabValues: [...this.state.slabValues, obj],
        toSlabValue: '',
        fromSlabValue: ''
      });
    }
    // this.state.slabValues.push(obj);
  }
  handleRemoveSlab = (idx) => {
      const slabValues = [...this.state.slabValues]
      slabValues.splice(idx, 1)
      this.setState({ slabValues })    
  }
  slabData() {
    const { toSlabValue, fromSlabValue } = this.state;
    let errors = {};
    let formIsValid = true;
    if (!toSlabValue) {
      formIsValid = false;
      errors["toSlabValue"] = "Enter To Slab";
    }
    if (!fromSlabValue) {
      formIsValid = false;
      errors["fromSlabValue"] = "Enter From Slab";
    }
    this.setState({ slabErrors: errors });               
    return formIsValid;
  }
  handleStoreData() {
    const {storeName, storeEndDate, storeStartDate, searchStoreName} = this.state;
    let errors = {};
    let formIsValid = true;
    if (!storeName || storeName.length === 0) {
      formIsValid = false;
      errors["storeName"] = "Select Store Name ";
    }
    if (!storeEndDate) {
      formIsValid = false;
      errors["storeEndDate"] = "Select End Date";
    }
    if (!storeStartDate) {
      formIsValid = false;
      errors["storeStartDate"] = "Select Start Date";
    }
    if (!searchStoreName || searchStoreName.length === 0) {
      formIsValid = false;
      errors["searchStoreName"] = "Select Start Date";
    }
    this.setState({ storeErrors: errors });               
    return formIsValid;
  }
  updatePromotionStatus(item) {
    const { allStorePromos } = this.state;
    allStorePromos.forEach((itm) => {
      if(item.id === itm.id) {
         itm.promotionStatus = false;
      }
    });
    this.setState({
      allStorePromos
    });
  }

  render() {
    return (
      <div className="maincontent">
         <Modal isOpen={this.state.isAddBenefits} size="md">
           <ModalHeader>
             Add Benefits
           </ModalHeader>
           <ModalBody>
           <div className="row">
              <div className="col-12">
                <h6 className="mb-2 fs-14">Please add benefits & discount types</h6>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Benefit Type <span className="text-red font-bold" name="bold">*</span></label>
                  <select value={this.state.benfitType} onChange={(e) => this.handleBenfitType(e)} className="form-control">
                    <option>Select Types of Benefit</option>
                        {this.state.applicability === 'promotionForEachBarcode' ? 
                          this.state.benfitTypesForEachBarcode &&
                          this.state.benfitTypesForEachBarcode.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        : 
                          this.state.benfitTypes &&
                          this.state.benfitTypes.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["benfitType"]}</span>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Discount Type <span className="text-red font-bold" name="bold">*</span></label>
                  <select value={this.state.discountType} onChange={(e) => this.handleDiscountType(e)} className="form-control">
                    <option>Select Types of Discount</option>
                        {   
                          this.state.discountTypes &&
                          this.state.discountTypes.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["discountType"]}</span>
              </div>
             { this.state.benfitType === 'XunitsFromBuyPool' &&  <React.Fragment> 
               <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Number of Items from Buy pool <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" value={this.state.numOfItemsFromBuyPool} onChange={(e) => this.handleNumOfItemsFromBuyPool(e)} className="form-control" />
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["numOfItemsFromBuyPool"]}</span>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label></label>
                  <select value={this.state.buyPoolValue} onChange={(e) => this.handleBuyPoolValue(e)} className="form-control">
                    <option>Item Value</option>
                        {   
                          this.state.buyPoolValues &&
                          this.state.buyPoolValues.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["buyPoolValue"]}</span>
              </div> 
              </React.Fragment>
              }

              { this.state.benfitType === 'XunitsFromGetPool' && <div className="col-12">
                <div className="form-group">
                  <label>Select Get Pool <span className="text-red font-bold" name="bold">*</span></label>
                     <Select
                        // isMulti
                        onChange={this.selectedPoolValueChange}
                        options={this.state.listOfGetPools}
                        value={this.state.selectedPoolValue}
                      />
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["selectedPoolValue"]}</span>
              </div> }
              
              { this.state.benfitType === 'XunitsFromGetPool' &&  <React.Fragment>
               <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Number of Items from Get pool <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" value={this.state.numOfItemsFromGetPool} onChange={(e) => this.handleNumOfItemsFromGetPool(e)} className="form-control"/>
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["numOfItemsFromGetPool"]}</span>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label></label>
                  <select value={this.state.getPoolValue} onChange={(e) => this.handleGetPoolValue(e)} className="form-control">
                    <option>Item Value</option>
                        {   
                          this.state.getPoolValues &&
                          this.state.getPoolValues.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["getPoolValue"]}</span>
              </div> 
              </React.Fragment>
              }              
              { this.state.discountType === 'PercentageDiscountOn' ? <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Discount ON</label>
                   <input type="text" value={this.state.discountOn} onChange={(e) => this.handleDiscount(e)} className="form-control" placeholder="Enter % Discount On" />
                </div>
              </div> : <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Discount ON <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" value={this.state.discountOn} onChange={(e) => this.handleDiscount(e)} className="form-control" placeholder="Enter Discount" />
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["discountOn"]}</span>
              </div> }
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Discount Sub Type <span className="text-red font-bold" name="bold">*</span></label>
                  {(this.state.discountType === 'PercentageDiscountOn' || this.state.discountType === 'RupeesDiscountOn') ? <select value={this.state.item} onChange={(e) => this.handleItemValue(e)} className="form-control">
                    <option>Select Discount Subtype</option>
                        {   
                          this.state.itemLabels &&
                          this.state.itemLabels.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select> : 
                  <select value={this.state.item} onChange={(e) => this.handleItemValue(e)} className="form-control">
                  <option>Select Discount Subtype <span className="text-red font-bold" name="bold">*</span></option>
                      {   
                        this.state.fixedAmoutItemLabels &&
                        this.state.fixedAmoutItemLabels.map((item, i) => 
                        (<option key={i} value={item.value}>{item.label}</option>))
                      }
                </select>}
                </div>
                <span style={{ color: "red" }}>{this.state.benfitErrors["item"]}</span>
              </div>
             </div> 
           </ModalBody>
           <ModalFooter>
           <button className="btn-unic" onClick={this.closeBenefits}>
              Cancel
            </button>
            <button className="btn-unic active fs-12" onClick={this.addBenfit}>
              Save
            </button>
           </ModalFooter>
           </Modal>
           <Modal isOpen={this.state.isSavePriority} size="md">
           <ModalHeader>
             Change Promo Priority
           </ModalHeader>
           <ModalBody>
           <div className="row">
              <div className="col-6">
              <div className="form-group">
                  <label>Priority</label>
                  <input type="text" value={this.state.priority} onChange={(e) => this.handlePriority(e)} className="form-control" placeholder="" />
                </div>
              </div>
             </div> 
           </ModalBody>
           <ModalFooter>
           <button className="btn-unic" onClick={this.savePriorityPopUpClose}>
              Cancel
            </button>
            <button className="btn-unic active fs-12" onClick={this.savePriority}>
              Save
            </button>
           </ModalFooter>
           </Modal>
        <Modal isOpen={this.state.isAddPromo} size="xl">
          <ModalHeader>Add Promo</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h6 className="mb-2 fs-14 text-red">Please add promo code Details</h6>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Promotion Name <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" value={this.state.promoName} onChange={(e) => this.handlePromoName(e)} className="form-control" placeholder="" />
                </div>
                <span style={{ color: "red" }}>{this.state.errors["promoName"]}</span>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" value={this.state.description} onChange={(e) => this.handleDescription(e)} className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Print Name On Sale Bill <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" value={this.state.printNameOnBill} onChange={(e) => this.handlePrintNameOnBill(e)} className="form-control" placeholder="" />
                </div>
                <span style={{ color: "red" }}>{this.state.errors["printNameOnBill"]}</span>
              </div>
              <div className="col-3">
                <div className="form-group">
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>Applicability <span className="text-red font-bold" name="bold">*</span></label>
                    <select value={this.state.applicability} onChange={(e) => this.handelApplicability(e)} className="form-control">
                      <option>Select</option>
                        { 
                            this.state.applicabilies &&
                            this.state.applicabilies.map((item, i) => 
                            (<option key={i} value={item.value}>{item.label}</option>))
                          }
                    </select>
                </div>
                <span style={{ color: "red" }}>{this.state.errors["applicability"]}</span>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label className="">Promotion Apply Type <span className="text-red font-bold" name="bold">*</span></label>
                  {this.state.applicability === 'promotionForWholeBill' ?  
                  <select value={this.state.promoApplyType} onChange={(e) => this.handlePromoApplyType(e)} className="form-control">
                    <option>Select</option>
                        { 
                          this.state.promoApplyTypesForWholeBill &&
                          this.state.promoApplyTypesForWholeBill.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                  : 
                  <select value={this.state.promoApplyType} onChange={(e) => this.handlePromoApplyType(e)} className="form-control">
                    <option>Select</option>
                        { 
                          this.state.promoApplyTypes &&
                          this.state.promoApplyTypes.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>}
                </div>
                <span style={{ color: "red" }}>{this.state.errors["promoApplyType"]}</span>
              </div>
              <div className="col-3 mt-3">
              <div className="form-group">
                 <label className="">Charge Tax Extra <span className="text-red font-bold" name="bold">*</span></label>
                  <select value={this.state.isTaxExtra} onChange={(e) => this.handelIsTaxExtra(e)} className="form-control">
                    <option>Select</option>
                        { 
                          this.state.isTaxesExtra &&
                          this.state.isTaxesExtra.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>                
                <span style={{ color: "red" }}>{this.state.errors["isTaxExtra"]}</span>
              </div>
              { this.state.promoApplyType === 'FixedQuantity' ? <React.Fragment>
              <div className="col-12 mt-4">
                <h6 className="mb-2 fs-14 text-red">Buy pool definition</h6>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>Buy Any <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="text" value={this.state.buyAny} onChange={(e) => this.handleBuyAny(e)} className="form-control" placeholder="" />
                </div>
                <span style={{ color: "red" }}>{this.state.errors["buyAny"]}</span>
              </div>
              <div className="col-3 mt-3">
              <div className="form-group">
                 <label className="">Add Buy Pools <span className="text-red font-bold" name="bold">*</span></label> 
                    <Select
                      isMulti
                      onChange={this.onChange}
                      options={this.state.listOfPools}
                      value={this.state.selectedPools}
                    />                  
                </div>
                <span style={{ color: "red" }}>{this.state.errors["selectedPools"]}</span>
                </div>
              </React.Fragment> : 
              <React.Fragment>
              <div className="col-3 mt-3">
                <div className="form-group">
                </div>
              </div>
              <div className="col-3 mt-3">
              <div className="form-group">
                 <label className="">Add Buy Pools <span className="text-red font-bold" name="bold">*</span></label> 
                    <Select
                      isMulti
                      onChange={this.onChange}
                      options={this.state.listOfPools}
                      value={this.state.selectedPools}
                    />                  
                </div>
                <span style={{ color: "red" }}>{this.state.errors["selectedPools"]}</span>
                </div>
             </React.Fragment>}
              
              { (this.state.promoApplyType === '' || this.state.promoApplyType === 'FixedQuantity' || this.state.promoApplyType === 'AnyQuantity') && <React.Fragment>
                <div className="col-3 mt-4 pt-2">                   
                  {this.state.isPromoEdit === true ? <button className="btn-nobdr text-green p-t-3" type="button" onClick={this.editBenefits}>+ Add Benefits</button> : 
                  <button className="btn-nobdr text-red p-t-3" type="button" onClick={this.addBenefits}>+ Add Benefits</button> }
                </div> </React.Fragment>}
             { (this.state.promoApplyType === 'ValueSlab' || this.state.promoApplyType === 'QuantitySlab') && <React.Fragment>
                <div className="col-12 mt-4">
                  <h6 className="mb-2 fs-14 text-red"></h6>
                </div>
                <div className="col-3 mt-3">
                  <div className="form-group">
                    <label>From <span className="text-red font-bold" name="bold">*</span></label>
                    <input type="text" className="form-control" value={this.state.fromSlabValue} onChange={(e) => this.handlefromSlab(e)} placeholder="" />
                  </div>
                  <span style={{ color: "red" }}>{this.state.slabErrors["fromSlabValue"]}</span>
                </div>
                <div className="col-3 mt-3">
                  <div className="form-group">
                    <label className="">To <span className="text-red font-bold" name="bold">*</span></label> 
                      <input type="text" value={this.state.toSlabValue} onChange={(e) => this.handleToSlab(e)} className="form-control" placeholder="" />
                  </div>
                  <span style={{ color: "red" }}>{this.state.slabErrors["toSlabValue"]}</span>
                </div>
                <div className="col-3 mt-3 pt-2">
                  <button className="btn-nobdr text-red p-t-3" type="button" onClick={this.addSlab}>+ Add Slab</button>
                </div>
                <div className="col-12">
                  <div className="table-responsive">
                    {this.state.slabValues.length > 0 && <table className="table table-borderless  justify-content-center mb-1 mt-2">
                      <thead>
                        <tr className="m-0 p-0">
                          <th className="col-3">From</th>
                          <th className="col-3">To</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                           this.state.slabValues && this.state.slabValues.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="col-3">{item.fromSlab}</td>
                                <td className="col-3">{item.toSlab}</td>
                                <td>
                                  {this.state.isPromoEdit === true ? <button className="btn-nobdr text-green p-t-2 p-b-3" type="button" onClick={() => this.getEditBenfitByIndex(index)}>+ Add Benefits</button> : 
                                      <a style={{  textDecoration: 'none' }} className="btn-nobdr text-red p-t-2 p-b-3" type="button" onClick={() => this.addBenefitsList(index)}>+ Add Benefits</a> }
                                      <i onClick={() => this.handleRemoveSlab(index)} className="icon-delete m-l-2 fs-16"></i>
                                </td>
                                {/* <td className="col-1"><button onClick={() => this.addBenefitsList(index)} className="btn-unic active fs-12">BENFIT</button></td> */}
                                
                              </tr>
                            )
                          })
                        }              
                      </tbody>
                    </table> }
                  </div>
              </div> 
            </React.Fragment>}
           </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closePromo}>
              Cancel
            </button>
            <button className="btn-unic active fs-12" onClick={this.savePromotion}>
              Save
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.closeClone} size="md">
          <ModalHeader>Clone Promo To Store</ModalHeader>
            <ModalBody>
              <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Store <span className="text-red font-bold" name="bold">*</span></label>
                      <Select
                        // isMulti
                        onChange={this.oncloneStoreNameChange}
                        options={this.state.storesList}
                        value={this.state.cloneStoreName}
                      />
                    </div>
                  </div>
                </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn-unic" onClick={this.closeClonePopup}>
                Cancel
              </button>
              <button className="btn-unic active fs-12" onClick={this.cloneStoreName}>
                Save
              </button>
            </ModalFooter>
          </Modal>
        <Modal isOpen={this.state.isAddStore} size="md">
          <ModalHeader>Add Promo To Store</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h6 className="mb-2 fs-14">Please add promo codes to store</h6>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Promotion Type</label>
                  <select value={this.state.storePromoType} onChange={(e) => this.handleStorePromoType(e)}className="form-control">
                    <option>Select Type</option>
                    { 
                      this.state.storePromotypes &&
                      this.state.storePromotypes.map((item, i) => 
                      (<option key={i} value={item.value}>{item.label}</option>))
                    }
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Promotion Name <span className="text-red font-bold" name="bold">*</span></label>
                  {this.state.storePromoType === 'By_Promotion' &&  this.state.storePromoType !== '' ? 
                    <Select
                        // isMulti
                        onChange={this.onSearchStorePromoNameChange}
                        options={this.state.storePromoList}
                        value={this.state.searchStoreName}
                    /> 
                    : 
                    <Select
                        isMulti
                        onChange={this.onSearchStorePromoNameChange}
                        options={this.state.storePromoList}
                        value={this.state.searchStoreName}
                    />}    
                </div>
                <span style={{ color: "red" }}>{this.state.storeErrors["searchStoreName"]}</span>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Start Date <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="date" value={this.state.storeStartDate}  onChange={(e) => this.handleStoreStartDate(e)} className="form-control" />
                </div>
                <span style={{ color: "red" }}>{this.state.storeErrors["storeStartDate"]}</span>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>End Date <span className="text-red font-bold" name="bold">*</span></label>
                  <input type="date" value={this.state.storeEndDate} onChange={(e) => this.handleStoreEndDate(e)} className="form-control" />
                </div>
                <span style={{ color: "red" }}>{this.state.storeErrors["storeEndDate"]}</span>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Store <span className="text-red font-bold" name="bold">*</span></label>
                  {this.state.storePromoType === 'By_Promotion' && this.state.storePromoType !== '' ?
                    <Select
                      isMulti
                      onChange={this.onStoreNameChange}
                      options={this.state.storesList}
                      value={this.state.storeName}
                   /> 
                  :  
                    <Select
                      // isMulti
                      onChange={this.onStoreNameChange}
                      options={this.state.storesList}
                      value={this.state.storeName}
                    />                    
                  }
                </div>
              </div>
              <span style={{ color: "red" }}>{this.state.storeErrors["storeName"]}</span>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeStore}>
              Cancel
            </button>
            <button className="btn-unic active fs-12" onClick={this.addPromoToStore}>
              Save
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.deletePromoConformation} size="md">
          <ModalHeader>Delete Promo</ModalHeader>
          <ModalBody>
            <div className="maincontent p-0">
              <h6>Are you sure want to delete promotion?</h6>        
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closePromotionPopup}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.handleDeletPromo}
            >
              Delete
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.promotionUpdate} size="xl">
          <ModalHeader>Modify Promo Validity</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>Start Date <span className="text-red font-bold" name="bold">*</span></label>
                  <input value={this.state.updatePromoStartDate} onChange={(e) => this.updatePromoStartDate(e)} type="date" className="form-control" />
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>End Date <span className="text-red font-bold" name="bold">*</span></label>
                  <input value={this.state.updatePromoEndDate}   onChange={(e) => this.updatePromoEndDate(e)} type="date" className="form-control"/>
                  <div></div>
                  
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>Status</label>
                  <select value={this.state.updatePromoStatus} onChange={(e) => this.updatePromoStatus(e)} className="form-control">
                    <option>Select Status</option>
                    { 
                      this.state.promoStatuses &&
                      this.state.promoStatuses.map((item, i) => 
                      (<option key={i} value={item.value}>{item.label}</option>))
                    }
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeUpdatePromotion}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.updatePromoDates}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row m-0 p-0 scaling-center">  
          <div className="col-6 p-l-0">
            <button
              // className="btn-unic-search active m-1 mt-1"
              className={!this.state.displayPromotions ? 'btn-unic-search active m-1 mt-1' : 'btn-unic-search m-1 mt-1' }
              onClick={this.showPromotionsList}
            >
              <i className="icon-retail p-r-1"></i> List Of Promotions
            </button>

            <button
              // className="btn-unic-search  m-1 mt-1"
              className={this.state.displayPromotions ? 'btn-unic-search active m-1 mt-1' : 'btn-unic-search m-1 mt-1' }
              onClick={this.showPramotionStoreMapping}
            >
              <i className="icon-retail p-r-1"></i> Manage Promotions
            </button>

            {!this.state.displayPromotions && <button
              className="btn-unic-search active m-r-2 mt-1"
              onClick={this.addPromo}
            >
              <i className="icon-sale p-r-1"></i>Add Promo
            </button> }
            {this.state.displayPromotions && <button
              className="btn-unic-search active mt-1"
              onClick={this.addStore}
            >
              <i className="icon-retail p-r-1"></i> Add Store
            </button>}
          </div>
       </div>
        {this.state.displayPromotions && <div className="row">
          <div className="col-sm-2 col-6">
            <div className="form-group mt-2 mb-3">
               <label>Store Name</label>
              <Select
                // isMulti
                onChange={this.onSearchStoreNameChange}
                options={this.state.storesList}
                value={this.state.searchByStoreName}
              />
            </div>
          </div>

          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
            <label>Promotion Name</label>
              <select value={this.state.promotionName} onChange={ (e) => this.haandlePromoname(e)} className="form-control">
                <option>Select Promotion</option>
                { 
                  this.state.promotionNames &&
                  this.state.promotionNames.map((item, i) => 
                  (<option key={i} value={item.promotionName}>{item.promotionName}</option>))
                }                
                </select>
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
                <label>Start Date</label>
              <input type="date" className="form-control"
                  value={this.state.startDate}
                  onChange={ (e) => this.haandleStartdate(e)}
                  placeholder="START DATE" />
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
            <label>End Date</label>
            <input type="date" className="form-control"  
                value={this.state.endDate}
                onChange={(e) => this.haandleEnddate(e)}
                placeholder="END DATE" />
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
            <label>Status</label>
            <select value={this.state.promoStatus} onChange={(e) =>  this.handlePromoStatus(e)} className="form-control">
                <option>Select Status</option>
                { 
                  this.state.promoStatuses &&
                  this.state.promoStatuses.map((item, i) => 
                  (<option key={i} value={item.value}>{item.label}</option>))
              }
              </select>
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2 pt-4">
          <button className="btn-unic-redbdr" onClick={this.searchPromo}>SEARCH</button>
          </div>
          <div className="col-sm-4 col-12 pl-0 mb-3 scaling-center scaling-mb">
          </div> 
        </div>}

        {!this.state.displayPromotions && <div className="row">
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
            <label>Promo Type</label>
              <select value={this.state.searchPromotionType} onChange={ (e) => this.haandleSearchPromotionType(e)} className="form-control">
                <option>Select Promo Type</option>
                { 
                  this.state.promotionTypes &&
                  this.state.promotionTypes.map((item, i) => 
                  (<option key={i} value={item.value}>{item.label}</option>))
                }                
                </select>
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2 pt-4">
          <button className="btn-unic-redbdr" onClick={this.searchPromotion}>SEARCH</button>
          </div>
        </div>}


        <div className="row m-0 p-0 scaling-center">  
          <div className="col-6 p-l-0">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Promotions</h5>
            {this.state.displayPromotions && <button disabled={!this.state.isPramotionChecked} className={ this.state.isPramotionChecked ? 'btn-selection m-r-2 active' : 'btn-selection m-r-2' } type="button" onClick={this.promotionUpdate}>Modify Validity</button>}
            {this.state.displayPromotions && <button disabled={!this.state.isPramotionChecked} className={ this.state.isPramotionChecked ? 'btn-selection m-r-2 active' : 'btn-selection m-r-2' } type="button" onClick={this.cloneStore}>Clone</button>}
            {this.state.displayPromotions &&  <button disabled={!this.state.isPramotionChecked} className={ this.state.isPramotionChecked ? 'btn-selection m-r-2 active' : 'btn-selection m-r-2' } type="button" onClick={this.savePriorityPopUp}>Change Promo Priority</button>}
          </div>
          <div className="col-6 text-right p-r-0 mt-4 align-self-center">
            <span className="mt-3 ">Show on page </span><span className="font-bold fs-14"> 1-10</span><span> out of 11</span><button className="btn-transparent" type="button"><img src={left} /></button><button className="btn-transparent" type="button"><img src={right} /></button>
          </div>
          <div className="table-responsive p-0">
            {!this.state.displayPromotions ? <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1"># Promo-ID</th>
                  <th className="col-2">Promo Name</th>
                  <th className="col-2">DESCRIPTION</th>
                  <th className="col-2">Type</th>
                  <th className="col-2">Apply On	</th>
                  <th className="col-2">Promo Print Name</th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              <tbody>
              {this.state.listOfPromos.length > 0 && this.state.listOfPromos.map((item, index) => {
                return( 
                <tr key={index}>
                  <td className="col-1 underline geeks"> {/* <input type="checkbox" onChange={(e) => this.handleChange(e, item)}/> */}<span className="pt-0 mt-0">{item.promoId}</span> </td>
                  <td className="col-2">{item.promotionName}</td>
                  <td className="col-2">{item.description}</td>
                  <td className="col-2">{item.applicability}</td>
                  <td className="col-2">{item.promoApplyType}</td>
                  <td className="col-2">{item.printNameOnBill}</td>
                  {/* <td className="col-1">
                    {item.isActive ? 
                      <button className="btn-active">Active</button> : 
                      <button className="btn-inactive">Inactive</button>}
                  </td> */}
                  <td className="col-1">
                    <img src={edit} onClick={this.editPramotion(item)} className="w-12 pb-2" />
                    {/* <i onClick={this.handleRemovePromo(item)} className="icon-delete m-l-2 fs-16"></i> */}
                  </td>
                  </tr> 
                  )
                })}
                {this.state.listOfPromos.length == 0  && <tr>No records found!</tr>}              
              </tbody>
            </table> : 
            <table className="table table-borderless mb-1 mt-2">
            <thead>
              <tr className="m-0 p-0">
                <th className="col-1"># Mapping Id</th>
                <th className="col-2">Promotion</th>
                <th className="col-2">Store</th>
                <th className="col-2">Priority</th>
                <th className="col-2">Start Date</th>
                <th className="col-2">End Date</th>
                <th className="col-1">Status</th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
            {this.state.allStorePromos.length > 0 && this.state.allStorePromos.map((item, index) => {
              return( 
              <tr key={index}>
                <td className="col-1 underline geeks"> <input type="checkbox" checked={item.isCheckBoxChecked}  onChange={(e) => this.handleChange(e,index, item)}/> <span className="pt-0 mt-0">{item.id}</span> </td>
                <td className="col-2">{item.promotionName}</td>
                <td className="col-2">{item.storeName}</td>
                <td className="col-2">{item.priority}</td>
                <td className="col-2">{item.startDate}</td>
                <td className="col-2">{item.endDate}</td>
                <td className="col-1">
                  {item.promotionStatus ? 
                    <button onClick={() => this.updatePromotionStatus(item)} className="btn-active">Active</button> : 
                    <button className="btn-inactive">Inactive</button>}
                </td>
                {/* <td className="col-1">
                  <img src={edit} onClick={this.editPramotion(item)} className="w-12 pb-2" />
                  <i onClick={this.handleRemovePromo(item)} className="icon-delete m-l-2 fs-16"></i></td> */}
                </tr> 
                )
              })}
              {this.state.allStorePromos.length == 0  && <tr>No records found!</tr>}              
            </tbody>
          </table>}
          </div>
        </div>
      </div>
    );
  }
}