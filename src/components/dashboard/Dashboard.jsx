import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { Component } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import c_portal_white from '../../assets/images/c_portal_white.svg';
import last_month_sale from '../../assets/images/last_month_sale.svg';
import monthly_sale from '../../assets/images/monthly_sale.svg';
import colors from '../../colors.json';
import MainDashboardService from '../../services/MainDashboardService';

Chart.register(ChartDataLabels);
Chart.defaults.set('plugins.datalabels', {
    color: '#000000',
});
Chart.defaults.font.weight = 'italic';
Chart.defaults.font.size = 16;
Chart.defaults.plugins.legend = false;

export default class Dashboard extends Component {



    //  setNewNumber() {
    //     this.setState({data: this.state.data + 1})
    //  }


    //  componentWillMount() {
    //     console.log('Component WILL MOUNT!')
    //  }

    //  componentDidMount() {
    //     console.log('Component DID MOUNT!')
    //  }





    //  componentWillReceiveProps(newProps) {    
    //     console.log('Component WILL RECIEVE PROPS!')
    //  }
    //  shouldComponentUpdate(newProps, newState) {
    //     return true;
    //  }
    //  componentWillUpdate(nextProps, nextState) {
    //     console.log('Component WILL UPDATE!');
    //  }
    //  componentDidUpdate(prevProps, prevState) {
    //     console.log('Component DID UPDATE!')
    //  }
    //  componentWillUnmount() {
    //     console.log('Component WILL UNMOUNT!')
    //  }


    constructor(props) {
        super(props);
        this.state = {
            storeId: "",
            clientId: "",
            domainId: "",
            monthlySale: null,
            todaysSale: null,
            lastVsThisSales: null,
            topSales: [],
            salesCategory: [],
            topSalesChart: {},
            salesCategoryChart: {},
        };
    };

    componentWillMount() {

        const user = JSON.parse(sessionStorage.getItem('user'));
        const storeId = sessionStorage.getItem("storeId");
        const domainData = JSON.parse(sessionStorage.getItem("selectedDomain"));

        // if (domainData.label == "Textile") {
        //     this.setState({ domainId: 1 });
        // } else if (domainData.label == "Retail") {
        //     this.setState({ domainId: 2 });
        // }
        this.setState({ domainId: 1 });
        if (user) {
            this.setState({
                storeId: storeId
            }, () => {

                this.getTodaysSale();
                this.getMonthlySale();
                this.getLastVsPresent();
                this.getTopSalesRepresentative();
                this.getSalesByCategory();
            });
        }
    }

    getTodaysSale() {
        MainDashboardService.getTodaySale(this.state.storeId, this.state.domainId).then(response => {
            // console.log("Todays Sale", response.data.result.amount);
            if (response) {
                if (response.data.result !== null) {
                    this.setState({ todaysSale: response.data.result.amount });
                }
            }

        });
    }

    getMonthlySale() {
        MainDashboardService.getMonthlySale(this.state.storeId, this.state.domainId).then(response => {
            // console.log("Monthly Sale", response.data.result.amount);
            if (response) {
                if (response.data.result !== null) {
                    this.setState({ monthlySale: response.data.result.amount });
                }
            }
        });
    }

    getLastVsPresent() {
        MainDashboardService.getLastVsThisMonthSale(this.state.storeId, this.state.domainId).then(response => {
            console.log("Last VS this Month", response.data);
            if (response) {
                if (response.data.result !== null) {
                    this.setState({ lastVsThisSales: response.data.result.percentValue });
                }
            }
        });
    }

    getTopSalesRepresentative() {
        MainDashboardService.getTopFiveSalesRepresentatives(this.state.storeId, this.state.domainId).then(response => {
            if (response) {
                console.log("Top 5 Sales Representative", response.data.result);
                if (response.data.result !== null && response.data.result.length > 0) {
                    this.setState({ topSales: response.data.result },
                        () => {
                            let indexName = [];
                            let indexCount = [];
                            let indexColor = [];
                            let indexHoverColor = [];

                            this.state.topSales.forEach(data => {
                                indexName.push(data.name);
                                indexCount.push(data.amount);
                            });

                            colors.forEach(data => {
                                indexColor.push(data.normalColorCode);
                                indexHoverColor.push(data.hoverColorCode);
                            });

                            this.setState({
                                topSalesChart: {
                                    labels: indexName,
                                    datasets: [
                                        {
                                            label: "Top 5 Sales",
                                            data: indexCount,
                                            backgroundColor: indexColor,
                                            hoverBorderColor: "#282828",
                                            maxBarThickness: 40,
                                        }
                                    ]
                                }
                            });
                        });
                }
                console.log("Top Sales", this.state.topSalesChart);

            }
        });
    }

    getSalesByCategory() {
        MainDashboardService.getSalesByCategory(this.state.storeId, this.state.domainId).then(response => {
            if (response) {
                if (response.data.result !== null && response.data.result.length > 0) {
                    console.log("sales by category", response.data);
                    this.setState({ salesCategory: response.data.result },
                        () => {
                            let indexName = [];
                            let indexCount = [];
                            let indexColor = [];
                            let indexHoverColor = [];

                            this.state.salesCategory.forEach(data => {
                                indexName.push(data.categeoryType);
                                indexCount.push(data.amount);
                            });

                            colors.forEach(data => {
                                indexColor.push(data.normalColorCode);
                                indexHoverColor.push(data.hoverColorCode);
                            });

                            this.setState({
                                salesCategoryChart: {
                                    labels: indexName,
                                    datasets: [
                                        {
                                            label: "Sales By Category",
                                            data: indexCount,
                                            backgroundColor: indexColor,
                                            hoverBorderColor: "#282828",
                                            maxBarThickness: 40,
                                        }
                                    ]
                                }
                            });

                        });
                }
            }
        });
    }

    render() {
        return (
            <div className="maincontent">

                {/* <div>
            <button onClick = {this.setNewNumber}>INCREMENT</button>
            <Content myNumber = {this.state.data}></Content>
         </div> */}


                <div className="row">
                    <div className="col-12 scaling-center">
                        <h5 className="fs-25">Dashboard</h5>
                    </div>
                    <div className="col-sm-2 col-12">
                        <div className="rect-gradient1">
                            <div className="rect-gradient1-left">
                                <img src={c_portal_white} />
                            </div>
                            <div className="rect-gradient1-right">
                                <label>Today's Sale</label>
                                <h5>₹ {this.state.todaysSale}</h5>
                            </div>
                        </div>
                        <div className="rect-gradient2 mt-2">
                            <div className="rect-gradient1-left">
                                <img src={monthly_sale} />
                            </div>
                            <div className="rect-gradient1-right">
                                <label>Monthly Sale</label>
                                <h5>₹ {this.state.monthlySale}</h5>
                            </div>
                        </div>
                        <div className="rect-gradient3 mt-2">
                            <div className="rect-gradient1-left">
                                <img src={last_month_sale} />
                            </div>
                            <div className="rect-gradient1-right">
                                <label>This month sales v/s Last month</label>
                                <h5>{this.state.lastVsThisSales} %</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 col-12">
                        <div className="rect">
                            <div className="row">
                                <div className="col-sm-9 col-12 scaling-center">
                                    <h5 className="fs-20">Sales by category</h5>
                                </div>
                                <div className="col-sm-3 col-12">
                                    <select className="form-control">
                                        <option>Today</option>
                                        <option>Last One Month</option>
                                        <option>Last 6 Months</option>
                                        <option>Last Year</option>
                                    </select>
                                </div>
                            </div>
                            <div className="rect-image">
                                {Object.keys(this.state.salesCategoryChart).length &&
                                    <Doughnut
                                        data={this.state.salesCategoryChart}
                                        height={400}
                                        width={400}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 col-12">
                        <div className="rect">
                            <div className="row">
                                <div className="col-sm-9 col-12 scaling-center">
                                    <h5 className="fs-20">Top 5 Sales by representative</h5>
                                </div>
                                <div className="col-sm-3 col-12">
                                    <select className="form-control">
                                        <option>Today</option>
                                        <option>Last One Month</option>
                                        <option>Last 6 Months</option>
                                        <option>Last Year</option>
                                    </select>
                                </div>
                            </div>
                            <div className="rect-image">
                                {Object.keys(this.state.topSalesChart).length &&
                                    <Bar
                                        data={this.state.topSalesChart}
                                        height={400}
                                        width={400}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


// export  class Content extends React.Component {
//     componentWillMount() {
//        console.log('Component child WILL MOUNT!')
//     }
//     componentDidMount() {
//        console.log('Component child DID MOUNT!')
//     }
//     componentWillReceiveProps(newProps) {
//        console.log('Component child WILL RECIEVE PROPS!')
//     }
//     shouldComponentUpdate(newProps, newState) {
//        return true;
//     }
//     componentWillUpdate(nextProps, nextState) {
//        console.log('Component child WILL UPDATE!');
//     }
//     componentDidUpdate(prevProps, prevState) {
//        console.log('Component child DID UPDATE!')
//     }
//     componentWillUnmount() {
//        console.log('Component child WILL UNMOUNT!')
//     }
//     shouldComponentUpdate() {
//         return true;
//       }
//     render() {
//        return (
//           <div>
//              <h3>{this.props.myNumber}</h3>
//           </div>
//        );
//     }
//}
