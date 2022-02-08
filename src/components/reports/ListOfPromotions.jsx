import moment from "moment";
import React, { Component } from "react";
import edit from "../../assets/images/edit.svg";
import view from "../../assets/images/view.svg";
import ListOfPromotionsService from "../../services/Reports/ListOfPromotionsService";

export default class ListOfPromotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // startDate: moment(new Date()).format("YYYY-MM-DD").toString(),
      // endDate: moment(new Date()).format("YYYY-MM-DD").toString(),
      startDate: "",
      endDate: "",
      storeName: "",
      promoId: "",
      promoList: [],
      storeList: [],
    };
    this.getPromotions = this.getPromotions.bind(this);
  }

  getPromotions() {
    const obj = {
      startDate: this.state.startDate ? this.state.startDate : undefined,
      endDate: this.state.endDate ? this.state.endDate : undefined,
      promoId: parseInt(this.state.promoId)
        ? parseInt(this.state.promoId)
        : undefined,
      storeName: this.state.storeName ? this.state.storeName : undefined,
    };
    ListOfPromotionsService.getPromotions(obj).then((res) => {
      console.log(res.data.result);
      this.setState({
        promoList: res.data.result,
      });
    });
  }

  renderTableData() {
    return this.state.promoList.map((items, index) => {
      const {
        promoId,
        promotionName,
        description,
        storeName,
        startDate,
        endDate,
      } = items;
      return (
        <tr className="">
          <td className="col-1">{promoId}</td>
          <td className="col-2">{promotionName}</td>
          <td className="col-2">{description}</td>
          <td className="col-2">{storeName}</td>
          <td className="col-2">{startDate}</td>
          <td className="col-2">{endDate}</td>
          {/* <td className="col-2 text-center">
            <img src={edit} className="w-12 m-r-2 pb-2" />
            <i className="icon-delete fs-16"></i>
          </td> */}
        </tr>
      );
    });
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("user", user);
    if (user["custom:isSuperAdmin"] === "true") {
      this.state.domainDetails = JSON.parse(
        sessionStorage.getItem("selectedDomain")
      );

      console.log(
        ">>>>>>>domain",
        JSON.parse(sessionStorage.getItem("selectedDomain"))
      );
      let testData = [];
      testData.push(JSON.parse(sessionStorage.getItem("selectedDomain")));

      console.log(">>>>>>parsedata", testData);

      this.setState(
        {
          storeList: testData,
          clientId: user["custom:clientId1"],
          domainId1: testData[0].value,
          domainDetails: this.state.domainDetails,
        },
        () => {
          console.log(this.state);
          this.getStoreNames(this.state.domainId1);
        }
      );
    } else {
      this.setState(
        {
          userName: user["cognito:username"],
          isEdit: false,
          clientId: user["custom:clientId1"],
          domainId1: user["custom:domianId1"],
        },
        () => {
          console.log(this.state);
          this.getStoreNames(user["custom:domianId1"]);
        }
      );
    }
  }

  getStoreNames = (domainId) => {
    console.log("vgfgfhgfhgf", this.state.domainId1, domainId);
    ListOfPromotionsService.getStoreNames(domainId).then((res) => {
      console.log("........", res);
      var optionList = [];
      if (res.data.result) {
        var obj = { id: "0", name: "SELECT STORE" };
        optionList.push(obj);
        res.data.result.map((data) => {
          obj = {
            id: data.id,
            name: data.name,
          };
          optionList.push(obj);
        });
      }

      this.setState({
        storeList: optionList,
      });
    });
  };

  render() {
    console.log("startdate", moment(new Date()).format("YYYY-DD-MM"));
    return (
      <div className="maincontent">
        <div className="row">
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              {/* <input
                type="date"
                className="form-control"
                placeholder="START DATE"
                // defaultValue={this.state.startDate}
                //value="29-01-2021"
                value={this.state.startDate}
                onChange={(e) =>
                  this.setState({
                    startDate: e.target.value,
                  })
                }
              /> */}
              <input
                type="date"
                id="start"
                className="form-control"
                name="trip-start"
                value={this.state.startDate}
                onChange={(e) =>
                  this.setState({
                    startDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              <input
                type="date"
                name="trip-start"
                className="form-control"
                value={this.state.endDate}
                onChange={(e) => this.setState({ endDate: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                min={0}
                placeholder="PROMO ID"
                value={this.state.promoId}
                onChange={(e) => this.setState({ promoId: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.storeId}
                onChange={(e) => {
                  const selectedValue = this.state.storeList.filter((item) => {
                    return item.id == e.target.value;
                  });

                  this.setState({
                    storeId: e.target.value,
                    storeName: selectedValue[0].name,
                  });
                }}
              >
                {this.state.storeList.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
              {/* <input
                type="text"
                className="form-control"
                placeholder="STORE NAME"
                value={this.state.storeName}
                onChange={(e) => this.setState({ storeName: e.target.value })}
              /> */}
            </div>
          </div>
          <div className="col-6 col-sm-3 scaling-mb mt-2">
            <div className="form-group" onClick={this.getPromotions}>
              <button className="btn-unic-search active">SEARCH </button>
            </div>
          </div>
        </div>
        <h5 className="pl-4 mt-3 scaling-center scaling-mb">
          List Of Promotions
        </h5>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1">PROMO ID</th>
                  <th className="col-2">PROMO NAME</th>
                  <th className="col-2">DESCRIPTION</th>
                  <th className="col-2">Barcode Store</th>
                  <th className="col-2">START DATE</th>
                  <th className="col-2">END DATE</th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              {/* <tbody>
              <tr className="">
                <td className="col-1">PRO1101</td>
                <td className="col-2">Buy 1 Get 1</td>
                <td className="col-2">2L soft drinks</td>
                <td className="col-2">kphb</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-2">30 Oct 2021</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
             </tbody> */}
              <tbody>{this.renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}