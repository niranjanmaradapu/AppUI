// import React, {useState} from "react";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import NewSaleService from "../../services/NewSaleService";

// export default function Popup({ isOpen, onClose, title, mobileData, text, actions }) {

//     const [mobileNumber, setMobileNumber] = useState(0);

//     const [customerData, setCustomerData] = useState({});

    
//   function getMobileDetails(e) {
//       if (e.key === 'Enter') { 
//           NewSaleService.getMobileData(mobileNumber).then((res) => {
//             // this.state.deliverySlipData = res.data.body;
//             console.log(res);
//             setCustomerData(res.data);
//             mobileData = res.data;
//             // console.log(this.state.deliverySlipData);
//         });
//       }

//   }  

//   return (
//     <div>
//       <Dialog
//         open={isOpen}
//         onClose={onClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//               <div className="row">
//                   <div className="col-4">
//                   <label>Phone Number</label>
//                   </div>
//                   <div className="col-8">
//                   <input type="text" name="mobile"
//                    onChange={(e) => setMobileNumber(e.target.value)}
//                    onKeyPress={getMobileDetails} />
//                   </div>           
//               </div>
//                 <br></br>
//               <div className="row">
//                   <div className="col-4">
//                   <label>Customer Name</label>
//                   </div>
//                   <div className="col-8">
//                   <input type="text" name="customer" />
//                   </div>           
//               </div>
//               <br></br>
//               <div className="row">
//                   <div className="col-4">
//                   <label>Gender</label>
//                   </div>
//                   <div className="col-8">
//                   <input type="text"  name="gender" />
//                   </div>           
//               </div>
//               <br></br>
//               <div className="row">
//                   <div className="col-4">
//                   <label>Customer Email </label>
//                   </div>
//                   <div className="col-8">
//                   <input type="text" name="email" />
//                   </div>           
//               </div>

//               <br></br>
//               <div className="row">
//                   <div className="col-4">
//                   <label>Date of Birth</label>
//                   </div>
//                   <div className="col-8">
//                   <input type="text" name="dob" />
//                   </div>           
//               </div>
              
//               <br></br>
//               <div className="row">
//                   <div className="col-4">
//                   <label>Customer GST Number</label>
//                   </div>
//                   <div className="col-8">
//                   <input type="text" name="gst" />
//                   </div>           
//               </div>

//               <br></br>
//               <div className="row">
//                   <div className="col-4">
//                   <label>Address</label>
//                   </div>
//                   <div className="col-8">
//                  <textarea rows="3" name="address" />
//                   </div>           
//               </div>
//               <br></br>
//               <div className="row">
//                   <input type="checkbox" name="check" />    
//               </div>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           {actions.map((a) => {
//             return (
//               <Button onClick={a.onClick} color="primary">
//                 {a.title}
//               </Button>
//             );
//           })}
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
