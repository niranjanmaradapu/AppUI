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
      storePromoName: '',
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
        discountType: '',
        discountTypes: [
          { value: 'PercentageDiscountOn', label: '% Discount on' },
          { value: 'RupeesDiscountOn', label: 'Rs. Discount on' },
          { value: 'FixedAmountOn', label: 'Fixed Amount on' }
        ],
        item: '',
        itemLabels: [
          { value: 'ItemRSP', label: 'Item RSP' },
          { value: 'ItemMRP', label: 'Item MRP' }
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
        updatedBenfitVos: []
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
    this.promoSearchValidation = this.promoSearchValidation.bind(this);
    this.addBenefitsList = this.addBenefitsList.bind(this);
    this.getEditBenfitByIndex = this.getEditBenfitByIndex.bind(this);   
  }
  componentDidMount() {
    this.getPromoList();
    this.getPoolList();
    this.getDomainsList();  
  }
  promoSearchValidation() {
    const { searchStoreName,
      promotionName,
      startDate,
      endDate,
      promoStatus } = this.state;
    if(searchStoreName !== '' && promotionName !== '' && startDate !== '' && endDate !== '' && promoStatus !== '') {
        return false;
    } else {
      return true;
    }

  }
  getDomainsList() {    
     const user = JSON.parse(sessionStorage.getItem('user'));
     const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain'));   
      URMService.getDomainsList(user["custom:clientId1"]).then((res) => {
          if(res) {
            if(selectedDomain.label === 'Textile') {
              this.setState({ clientDomainaId: res.data.result[1].clientDomainaId, 
                              clientId:  res.data.result[1].domain[0].id
                            });
              this.getAllStoresList();
            } else {
              this.setState({ clientDomainaId: res.data.result[0].clientDomainaId, 
                              clientId:  res.data.result[0].domain[0].id 
                            });
              this.getAllStoresList();
            }            
          }       
      });
    }
    getAllStoresList() {
      URMService.getStoresByDomainId(this.state.clientDomainaId).then((res) =>{               
        const result = res.data.result.map((item) => {
          const obj = {};
            obj.value = item.id;
            obj.label = item.name;
            obj.location = item.address
          return obj;         
        });
          if(res) {
            this.setState({storesList: result});
          }
      }); 
  }
  addPromoToStore() {
    const { storeStartDate, storeEndDate, storePromoName, storePromoType, storeName} = this.state;
   const storeNames =  storeName.map((item) => {
      const obj = {};
      obj.id = item.value;
      obj.name = item.label;
      obj.location = item.location;
      return obj;
    });
    const requestObj = {
        promoType: storePromoType,
        promotionName: storePromoName,
        storeVo: storeNames,
        startDate: storeStartDate,
        endDate: storeEndDate
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
        });
        this.getPromoList();
      } else {
        toast.success(res.data.message);
      }
    });
  }
  cloneStoreName() {
    const { cloneStoreName,  checkedItem } = this.state;
    const obj = {
      promoId : checkedItem.promoId,
      storeName: cloneStoreName.label
    }
    PromotionsService.clonePromotionByStore(obj).then((res) => {
      if(res.data.isSuccess === 'true') {
        toast.success(res.data.message);
        this.setState({
          closeClone: false,
          cloneStoreName: '',
          checkedItem: ''
        });
      } else {
        toast.error(res.data.message);
      }
      this.getPromoList();
    });
  }
  savePriority() {
    const { checkedItem, priority } = this.state;
    const obj = {
        priority: priority,
        promoId: checkedItem.promoId
    }
    PromotionsService.updatePriority(obj).then((res) => {
      if(res.data.isSuccess === 'true') {
        toast.success(res.data.message);
        this.setState({
          isSavePriority: false,
          priority: '',
          checkedItem: ''
        });
      } else {
        toast.error(res.data.message);
      }
      this.getPromoList();
    });
  }
  getPoolList() {
    PromotionsService.getPoolList().then((res) => {
      if(res.data.isSuccess === 'true') {
        const result = res.data.result['poolvo'].map((item) => {
          const obj = {};
            obj.value = item.poolId;
            obj.label = item.poolName;
          return obj;         
        });
       this.setState({ 
         listOfPools: result
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
          benfitsPayload: []
    });
  }

  addStore() {
    this.setState({ isAddStore: true });
  }

  closeStore() {
    this.setState({ isAddStore: false });
  }

  addBenefits() {
    this.setState({ 
      isAddBenefits: true,
      benfitsPayload: []
    });
  }
  getEditBenfitByIndex(index) {
    const { benfitVoArray } = this.state;
    let obj = {};
    benfitVoArray.forEach((item, ind) => {
      if(index == ind) {
        obj = item;
      }      
    });
    const poolObj =    { value: obj.poolId, label: obj.poolName };
    const editedBenfit = {
      benfitId: obj.benfitId,
      benfitType: obj.benfitType,
      discountType: obj.discountType,
      discountOn: obj.discount,
      item: obj.percentageDiscountOn,
      getPoolValue: obj.itemValue,
      selectedPoolValue: poolObj,
      promoBenfitId: obj.benfitId,
      numOfItemsFromGetPool: obj.numOfItemsFromGetPool,
      numOfItemsFromBuyPool: obj.numOfItemsFromBuyPool
    };
    this.setState({
      isAddBenefits: true,
      benfitType: obj.benfitType,
      discountType: obj.discountType,
      discountOn: obj.discount,
      item: obj.percentageDiscountOn,
      getPoolValue: obj.itemValue,
      selectedPoolValue: poolObj,
      promoBenfitId: obj.benfitId,
      numOfItemsFromGetPool: obj.numOfItemsFromGetPool,
      numOfItemsFromBuyPool: obj.numOfItemsFromBuyPool,
      editedBenfit: editedBenfit  
    });
  }
  addBenefitsList(index) {
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

  closeBenefits() {
    this.setState({ isAddBenefits: false });
  }
  addBenfit() {
    let index = this.state.benfitIndex;
    let updatedBenfitObjs = [];  
    let promoSlabVo = {};
    const { benfitVoArray, editedBenfit, promoApplyType, benfitType, discountOn, discountType, item, benfitObj, buyPoolValue, getPoolValue, numOfItemsFromGetPool, numOfItemsFromBuyPool, selectedPoolValue, toSlabValue, fromSlabValue} = this.state;
    let obj = {
      benfitType: benfitType,
      discountType: discountType,
      discount: discountOn,
      percentageDiscountOn: item,
      promoSlabVo: {
        fromSlab: null,
        toSlab: null
    }
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
    if(toSlabValue && fromSlabValue) {
       obj = {...obj, toSlabValue, fromSlabValue}
    }
    if (promoApplyType === 'QuantitySlab' || promoApplyType === 'ValueSlab') {
        this.state.slabValues.map((item, ind) => {
          if(index == ind) {
            promoSlabVo = { toSlab: item.toSlab, fromSlab: item.fromSlab }
            obj = { ...obj,  promoSlabVo};
          }
        });
    }
    
    if(promoApplyType === 'FixedQuantity' || promoApplyType === 'AnyQuantity') {
        delete obj['toSlab'];
        delete obj['fromSlab'];
    }
   if(this.state.isPromoEdit) {
    obj = {...obj, benfitId: editedBenfit.benfitId };
    updatedBenfitObjs = benfitVoArray.map(b => b.benfitId !== obj.benfitId ? b : obj);
   }
    this.setState({
      benfitsPayload: [...this.state.benfitsPayload, obj],
      isAddBenefits: false,
      benfitIndex: '',
      updatedBenfitVos: updatedBenfitObjs
    });
    obj = {};
  }
  promotionUpdate() {
    this.setState({ promotionUpdate: true });
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
  getPromoList() {
    PromotionsService.getPromoList().then((res) => {
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
        this.setState({ 
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
      isActive: updatePromoStatus,
      promoId: checkedItem.promoId
    }
    PromotionsService.updatePromotionDates(obj).then((res) => {
      if(res.data.isSuccess === 'true') {
        toast.success(res.data.message);
        this.setState({
          promotionUpdate: false,
          updatePromoStartDate: '',
          updatePromoEndDate: '',
          updatePromoStatus: '', 
          checkedItem: ''
        });
        this.getPromoList();
      } else {
        toast.success(res.data.message);
      }
    });
  }
  closeUpdatePromotion = () => {
    this.setState({
      promotionUpdate: false,
      isPramotionChecked: false,
      checkedItem: ''
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
    const {promoStatus, searchStoreName, endDate, startDate, promotionName } = this.state;
    const obj = {
        startDate: startDate,
        endDate: endDate,
        promotionName: promotionName,
        isActive: promoStatus,
        storeName: searchStoreName.label
    }
    // Need to handle search promotion
    PromotionsService.searchPromotion(obj).then((res) => {     
      if(res.data.isSuccess === 'true') {
        this.setState({
         listOfPromos: res.data.result,
          promoStatus: '', 
          searchStoreName: '',
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
    this.setState({ applicability: e.target.value });
  }
  handelIsTaxExtra(e) {
    this.setState({ isTaxExtra: e.target.value });
  }
  handlePromoApplyType(e) {
    this.setState({ promoApplyType: e.target.value });
  }
  handlePrintNameOnBill(e) {
    this.setState({ printNameOnBill: e.target.value });
  }
  handleDescription(e) {
    this.setState({ description: e.target.value });
  }
  handlePromoName(e) {
    this.setState({ promoName: e.target.value });
  }
  handleStorePromoType(e) {
    this.setState({ storePromoType: e.target.value });
  }
  handleStorePromoName(e) {
    this.setState({ storePromoName: e.target.value });
  }
  handleStoreName(e) {
    this.setState({ storeName: e.target.value });
  }
  handleStoreStartDate(e) {
    this.setState({ storeStartDate: e.target.value });
  }
  handleStoreEndDate(e) {
    this.setState({ storeEndDate: e.target.value });
  }
  handleChange(e, item) {
    if(e.target.checked) {
      this.setState({
        isPramotionChecked: true,
        checkedItem: item
      });
    } else {
      this.setState({
        isPramotionChecked: false,
        checkedItem: ''
      });
    }
  }
  onChange = opt => {
    this.setState({
      selectedPools: opt
    });
  };
  onStoreNameChange = selectedstore => {
    this.setState({
      storeName: selectedstore
    });
  }
  onSearchStoreNameChange = selectedSore => {
    this.setState({
      searchStoreName: selectedSore
    });
  }
  oncloneStoreNameChange = selectedstore => {
    this.setState({
      cloneStoreName : selectedstore
    });
  }
  selectedPoolValueChange = selectedstore => {
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
    if(promo.benfitVo.length == 1) {
      benfitObj = promo.benfitVo[0];
      benfitVo = promo.benfitVo;        
      const poolObj =    { value: benfitObj.poolId, label: benfitObj.poolName };
      this.setState({
          benfitType: benfitObj.benfitType,
          discountType: benfitObj.discountType,
          discountOn: benfitObj.discount,
          item: benfitObj.percentageDiscountOn,
          getPoolValue: benfitObj.itemValue,
          buyPoolValue: benfitObj.itemValue,
          selectedPoolValue: poolObj,
          promoBenfitId: benfitObj.benfitId,
          numOfItemsFromGetPool: benfitObj.numOfItemsFromGetPool,
          numOfItemsFromBuyPool: benfitObj.numOfItemsFromBuyPool
      });
    } else {
      benfitVo = promo.benfitVo;
    }
    const slabValueRes = benfitVo.map((item) => {
      const obj = {};
      if(item.promoSlabVo) {
        obj.toSlab = item.promoSlabVo.toSlab;
        obj.fromSlab = item.promoSlabVo.fromSlab;
        return obj;
      }
    });
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
        promoType: promo.promoType,
        benfitVoArray: benfitVo,
        slabValues: slabValueRes
    });
  }
  savePromotion() {
    const user = JSON.parse(sessionStorage.getItem("user"));    
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
      updatedBenfitVos
     } = this.state;
      const result = selectedPools.map((item) => {
        const obj = {};
          obj.poolId = item.value;
          obj.poolName = item.label;
        return obj;         
      });

    const obj = {
        applicability: applicability,
        benfitVo: benfitObj,
        buyItemsFromPool: buyAny,
        description: description,
        createdBy: createdBy,
        isActive: true,
        isForEdit: false,
        isTaxExtra: isTaxExtra,
        poolVo: result,
        benfitVo: benfitsPayload,
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
        promoApplyType: promoApplyType,
        promotionName: promoName,
        promoType: promoType,
        benfitVo: updatedBenfitVos
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
            benfitsPayload: []
          });
          this.getPromoList();
        } else {
          toast.success(res.data.message);
        }
    });
    }
      
  }
  cloneStore() {
    this.setState({ closeClone: true });
  }

  closeClonePopup() {
    this.setState({ closeClone: false });
  }

  handleItemValue(e) {
    this.setState({ item: e.target.value });
  }
  handleDiscount(e) {
    this.setState({ discountOn: e.target.value });
  }
  handleDiscountType(e) {
    this.setState({ discountType: e.target.value });
  }
  handleBenfitType(e) {
    this.setState({ benfitType: e.target.value });
  }
  handleNumOfItemsFromBuyPool(e) {
    this.setState({ numOfItemsFromBuyPool: e.target.value });
  }
  handleBuyPoolValue(e) {
    this.setState({ buyPoolValue: e.target.value });
  }
  handleNumOfItemsFromGetPool(e) {
    this.setState({ numOfItemsFromGetPool: e.target.value });
  }
  handleGetPoolValue(e) {
    this.setState({ getPoolValue: e.target.value });
  }
  handleSelectedPoolValue(e) {
    this.setState({ selectedPoolValue: e.target.value });
  }
  handleToSlab(e) {
    this.setState({ toSlabValue: e.target.value });
  }
  handlefromSlab(e) {
    this.setState({ fromSlabValue: e.target.value });
  }
  handleBuyAny(e) {
    this.setState({ buyAny: e.target.value });
  }
  addSlab() {
    // const { toSlabValue, fromSlabValue } = this.state;
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
    // this.state.slabValues.push(obj);
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
                  <label>Benefit Type</label>
                  <select value={this.state.benfitType} onChange={(e) => this.handleBenfitType(e)} className="form-control">
                    <option>Select Types of Benefit</option>
                        {
                          this.state.benfitTypes &&
                          this.state.benfitTypes.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Discount Type</label>
                  <select value={this.state.discountType} onChange={(e) => this.handleDiscountType(e)} className="form-control">
                    <option>Select Types of Discount</option>
                        {   
                          this.state.discountTypes &&
                          this.state.discountTypes.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
              </div>
             { this.state.benfitType === 'XunitsFromBuyPool' &&  <React.Fragment> 
               <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Number of Items from Buy pool</label>
                  <input type="text" value={this.state.numOfItemsFromBuyPool} onChange={(e) => this.handleNumOfItemsFromBuyPool(e)} className="form-control" />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label></label>
                  <select value={this.state.buyPoolValue} onChange={(e) => this.handleBuyPoolValue(e)} className="form-control">
                    <option>Item Valued</option>
                        {   
                          this.state.buyPoolValues &&
                          this.state.buyPoolValues.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
              </div> 
              </React.Fragment>
              }

              { this.state.benfitType === 'XunitsFromGetPool' && <div className="col-12">
                <div className="form-group">
                  <label>Select Get Pool</label>
                     <Select
                        // isMulti
                        onChange={this.selectedPoolValueChange}
                        options={this.state.listOfPools}
                        value={this.state.selectedPoolValue}
                      />
                </div>
              </div> }
              
              { this.state.benfitType === 'XunitsFromGetPool' &&  <React.Fragment>
               <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Number of Items from Get pool</label>
                  <input type="text" value={this.state.numOfItemsFromGetPool} onChange={(e) => this.handleNumOfItemsFromGetPool(e)} className="form-control"/>
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label></label>
                  <select value={this.state.getPoolValue} onChange={(e) => this.handleGetPoolValue(e)} className="form-control">
                    <option>Item Valued</option>
                        {   
                          this.state.getPoolValues &&
                          this.state.getPoolValues.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
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
                  <label>Discount ON</label>
                  <input type="text" value={this.state.discountOn} onChange={(e) => this.handleDiscount(e)} className="form-control" placeholder="Enter Discount" />
                </div>
              </div> }
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label></label>
                  {(this.state.discountType === 'PercentageDiscountOn' || this.state.discountType === 'RupeesDiscountOn') ? <select value={this.state.item} onChange={(e) => this.handleItemValue(e)} className="form-control">
                    {/* <option>Each Item</option> */}
                        {   
                          this.state.itemLabels &&
                          this.state.itemLabels.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select> : 
                  <select value={this.state.item} onChange={(e) => this.handleItemValue(e)} className="form-control">
                  {/* <option>Each Item</option> */}
                      {   
                        this.state.fixedAmoutItemLabels &&
                        this.state.fixedAmoutItemLabels.map((item, i) => 
                        (<option key={i} value={item.value}>{item.label}</option>))
                      }
                </select>}
                </div>
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
             Map To Store
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
                  <label>Promotion Name</label>
                  <input type="text" value={this.state.promoName} onChange={(e) => this.handlePromoName(e)} className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" value={this.state.description} onChange={(e) => this.handleDescription(e)} className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Print Name On Sale Bill</label>
                  <input type="text" value={this.state.printNameOnBill} onChange={(e) => this.handlePrintNameOnBill(e)} className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>Applicability</label>
                    <select value={this.state.applicability} onChange={(e) => this.handelApplicability(e)} className="form-control">
                      <option>Select</option>
                        { 
                            this.state.applicabilies &&
                            this.state.applicabilies.map((item, i) => 
                            (<option key={i} value={item.value}>{item.label}</option>))
                          }
                    </select>
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label className="">Promotion Apply Type</label>
                  <select value={this.state.promoApplyType} onChange={(e) => this.handlePromoApplyType(e)} className="form-control">
                    <option>Select</option>
                        { 
                          this.state.promoApplyTypes &&
                          this.state.promoApplyTypes.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>
              </div>
              <div className="col-3 mt-3">
              <div className="form-group">
                 <label className="">Charge Tax Extra</label>
                  <select value={this.state.isTaxExtra} onChange={(e) => this.handelIsTaxExtra(e)} className="form-control">
                    <option>Select</option>
                        { 
                          this.state.isTaxesExtra &&
                          this.state.isTaxesExtra.map((item, i) => 
                          (<option key={i} value={item.value}>{item.label}</option>))
                        }
                  </select>
                </div>                
              </div>
              { (this.state.promoApplyType === '' || this.state.promoApplyType === 'FixedQuantity' || this.state.promoApplyType === 'AnyQuantity') ? <React.Fragment>
              <div className="col-12 mt-4">
                <h6 className="mb-2 fs-14 text-red">Buy pool definition</h6>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Buy Any</label>
                  <input type="text" value={this.state.buyAny} onChange={(e) => this.handleBuyAny(e)} className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
              <div className="form-group">
                 <label className="">Add Buy Pools</label> 
                    <Select
                      isMulti
                      onChange={this.onChange}
                      options={this.state.listOfPools}
                      value={this.state.selectedPools}
                    />                  
                </div>
                </div>
              </React.Fragment> : 
              <React.Fragment>
              <div className="col-3">
                <div className="form-group">
                </div>
              </div>
              <div className="col-3">
              <div className="form-group">
                 <label className="">Add Buy Pools</label> 
                    <Select
                      isMulti
                      onChange={this.onChange}
                      options={this.state.listOfPools}
                      value={this.state.selectedPools}
                    />                  
                </div>
                </div>
             </React.Fragment>}
              
              { (this.state.promoApplyType === '' || this.state.promoApplyType === 'FixedQuantity' || this.state.promoApplyType === 'AnyQuantity') && <React.Fragment>
                <div className="col-3 mt-3">                   
                  {this.state.isPromoEdit === true ? <button className="btn-nobdr text-green p-t-3" type="button" onClick={this.editBenefits}>+ Add Benefits</button> : 
                  <button className="btn-nobdr text-red p-t-3" type="button" onClick={this.addBenefits}>+ Add Benefits</button> }
                </div> </React.Fragment>}
             { (this.state.promoApplyType === 'ValueSlab' || this.state.promoApplyType === 'QuantitySlab') && <React.Fragment>
                <div className="col-12 mt-4">
                  <h6 className="mb-2 fs-14 text-red"></h6>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label>From</label>
                    <input type="text" className="form-control" value={this.state.fromSlabValue} onChange={(e) => this.handlefromSlab(e)} placeholder="" />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label className="">To</label> 
                      <input type="text" value={this.state.toSlabValue} onChange={(e) => this.handleToSlab(e)} className="form-control" placeholder="" />
                  </div>
                </div>
                <div className="col-3 mt-3">
                  <button className="btn-nobdr text-red p-t-3" type="button" onClick={this.addSlab}>+ Add Slab</button>
                </div>
                <div className="col-12">
                  <div className="table-responsive">
                    {this.state.slabValues.length > 0 && <table className="table table-borderless mb-1 mt-2">
                      <thead>
                        <tr className="m-0 p-0">
                          <th className="col-3">From</th>
                          <th className="col-3">To</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                           this.state.slabValues.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="col-3">{item.fromSlab}</td>
                                <td className="col-3">{item.toSlab}</td>
                                <td className="col-1">
                                {this.state.isPromoEdit === true ? <button className="btn-nobdr text-green p-t-3" type="button" onClick={() => this.getEditBenfitByIndex(index)}>BENFIT</button> : 
                                    <button className="btn-nobdr text-red p-t-3" type="button" onClick={() => this.addBenefitsList(index)}>BENFIT</button> }
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
          <ModalHeader>Add Promo To Store</ModalHeader>
            <ModalBody>
              <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Store</label>
                      <Select
                        // isMulti
                        onChange={this.oncloneStoreNameChange}
                        options={this.state.storesList}
                        value={this.state.cloneStoreName}
                      />
                    </div>
                  </div>
                  {/* <div className="col-6">
                    <div className="form-group">
                        <label>Promotion Name</label>
                        <input type="text" className="form-control" placeholder="" />
                      </div>
                    </div> */}
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
                  <label>Promotion Name</label>
                  {this.state.storePromoType === 'By_Promotion' &&  this.state.storePromoType !== '' ? 
                  <select value={this.state.storePromoName} onChange={(e) => this.handleStorePromoName(e)} className="form-control">
                  <option>Select Promotion</option>
                  { 
                    this.state.promotionNames &&
                    this.state.promotionNames.map((item, i) => 
                    (<option key={i} value={item.promotionName}>{item.promotionName}</option>))
                  }
                </select> : 
                <Select
                    isMulti
                    onChange={this.onSearchStoreNameChange}
                    options={this.state.listOfPromos}
                    value={this.state.searchStoreName}
                />
                  }
                  {/* <input type="text" value={this.state.storePromoName}  onChange={(e) => this.handleStorePromoName(e)} className="form-control" /> */}    
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" value={this.state.storeStartDate}  onChange={(e) => this.handleStoreStartDate(e)} className="form-control" />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" value={this.state.storeEndDate} onChange={(e) => this.handleStoreEndDate(e)} className="form-control" />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Store</label>
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
                  {/* <select value={this.state.storeName} onChange={(e) => this.handleStoreName(e)} className="form-control">
                    <option>Select</option>
                    { 
                      this.state.storesList &&
                      this.state.storesList.map((item, i) => 
                      (<option key={i} value={item}>{item.label}</option>))
                    }
                  </select> */}
                </div>
              </div>
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
          <ModalHeader>Update Promotions</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>Start Date</label>
                  <input value={this.state.updatePromoStartDate} onChange={(e) => this.updatePromoStartDate(e)} type="date" className="form-control" />
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>End Date</label>
                  <input value={this.state.updatePromoEndDate} onChange={(e) => this.updatePromoEndDate(e)} type="date" className="form-control" />
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
        <div className="row mb-2">
          <div className="col-sm-4 col-12 scaling-mb">
            <div className="promo-darkblue">
              <div className="row">
                <div className="col-3">
                  <i className="icon-sale"></i>
                </div>
                <div className="col-6">
                  <h5>Total Promotions</h5>
                </div>
                <div className="col-3">
                  <label className="">{this.state.totalPromos}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-12 scaling-mb">
            <div className="promo-darkgreen">
              <div className="row">
                <div className="col-3">
                  <i className="icon-return_slip"></i>
                </div>
                <div className="col-6">
                  <h5>Active Promotions</h5>
                </div>
                <div className="col-3">
                  <label className="">{this.state.activePromos}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-12 scaling-mb">
            <div className="promo-darkred">
              <div className="row">
                <div className="col-3">
                  <i className="icon-loyalty_promo"></i>
                </div>
                <div className="col-6">
                  <h5>Inactive Promotions</h5>
                </div>
                <div className="col-3">
                  <label className="">{this.state.inactivePromos}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div className="row">
          <div className="col-sm-2 col-6">
            <div className="form-group mt-2 mb-3">
            {/* <select value={this.state.store} onChange={this.handleStore}className="form-control">
              <option>Select Store</option>
              { 
                this.state.stores &&
                this.state.stores.map((item, i) => 
                (<option key={i} value={item.value}>{item.label}</option>))
              }                
              </select> */}
               <label>Store Name</label>
              <Select
                // isMulti
                onChange={this.onSearchStoreNameChange}
                options={this.state.storesList}
                value={this.state.searchStoreName}
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
              <input type="text" className="form-control"
                  value={this.state.startDate}
                  onChange={ (e) => this.haandleStartdate(e)}
                  placeholder="START DATE" />
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
            <label>End Date</label>
            <input type="text" className="form-control"  
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
         
            <button
              className="btn-unic-search active m-r-2 mt-1"
              onClick={this.addPromo}
            >
              <i className="icon-sale p-r-1"></i>Add Promo
            </button>
            <button
              className="btn-unic-search active mt-1"
              onClick={this.addStore}
            >
              <i className="icon-retail p-r-1"></i> Add Store
            </button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
  
          <div className="col-6 p-l-0">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Promotions</h5>
            <button disabled={!this.state.isPramotionChecked} className={ this.state.isPramotionChecked ? 'btn-selection m-r-2 active' : 'btn-selection m-r-2' } type="button" onClick={this.promotionUpdate}>Update Promotions</button>
            <button disabled={!this.state.isPramotionChecked} className={ this.state.isPramotionChecked ? 'btn-selection m-r-2 active' : 'btn-selection m-r-2' } type="button" onClick={this.cloneStore}>Clone Promotions</button>
            <button disabled={!this.state.isPramotionChecked} className={ this.state.isPramotionChecked ? 'btn-selection m-r-2 active' : 'btn-selection m-r-2' } type="button" onClick={this.savePriorityPopUp}>Save Priority</button>
          </div>
          <div className="col-6 text-right p-r-0 mt-4 align-self-center">
            <span className="mt-3 ">Show on page </span><span className="font-bold fs-14"> 1-10</span><span> out of 11</span><button className="btn-transparent" type="button"><img src={left} /></button><button className="btn-transparent" type="button"><img src={right} /></button>
          </div>
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1"># Promo-ID</th>
                  <th className="col-2">Promo Name</th>
                  <th className="col-2">DESCRIPTION</th>
                  <th className="col-2">Start Date</th>
                  <th className="col-2">End Date</th>
                  <th className="col-1">Status</th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              <tbody>
              {this.state.listOfPromos.length > 0 && this.state.listOfPromos.map((item, index) => {
                return( 
                <tr key={index}>
                  <td className="col-1 underline geeks"> <input type="checkbox" onChange={(e) => this.handleChange(e, item)}/> <span className="pt-0 mt-0">{item.promoId}</span> </td>
                  <td className="col-2">{item.promotionName}</td>
                  <td className="col-2">{item.description}</td>
                  <td className="col-2">{item.startDate}</td>
                  <td className="col-2">{item.endDate}</td>
                  <td className="col-1">
                    {item.isActive ? 
                      <button className="btn-active">Active</button> : 
                      <button className="btn-inactive">Inactive</button>}
                  </td>
                  <td className="col-1">
                    <img src={edit} onClick={this.editPramotion(item)} className="w-12 pb-2" />
                    <i onClick={this.handleRemovePromo(item)} className="icon-delete m-l-2 fs-16"></i></td>
                  </tr> 
                  )
                })}
                {this.state.listOfPromos.length == 0  && <tr>No records found!</tr>}              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}