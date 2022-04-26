import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Pagination from "react-js-pagination";
import DataTable from 'react-data-table-component';
import Pagination from 'react-bootstrap/Pagination'


class ReactPageNation extends React.Component {
    constructor(props) {
      super(props);
      console.log(">>>>",this.props)
      this.state = {
        pageLimit: 10,
        items:[],
        totalRows:0,
        perPage:10
        };
    }
   
    render() {

console.log("....",this.props, this.props.totalPages);

if(!this.props || !this.props.totalPages) return null;

return(


  <Pagination>
  <Pagination.First onClick={()=>this.props.changePage(0)}/>
  <Pagination.Prev onClick={()=>this.props.changePage(this.props.number-1)}/>
   {Array.from({length:this.props.totalPages}).map((item,index)=>(
  <Pagination.Item key={item} active={this.props.number==index} onClick={()=>this.props.changePage(index)}>{index+1}</Pagination.Item>
))}

 
  <Pagination.Next onClick={()=>this.props.changePage(this.props.number+1)}/>
  <Pagination.Last onClick={()=>this.props.changePage(this.props.totalPages-1)}/>
</Pagination>
);
        }
  }
  export default ReactPageNation;