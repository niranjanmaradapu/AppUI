import PropTypes from 'prop-types';
import edit from '../../assets/images/edit.svg';

function DisplayPools({ 
    listOfPools,
    modifyPool,
    handleRemovePool
}) {
    return (
        <div className="table-responsive m-0 p-0">
          <table className="table table-borderless mb-1 mt-2">
            <thead>
              <tr className="m-0 p-0">
                <th className="col-1"># Pool-ID</th>
                <th className="col-2">Pool Name</th>
                <th className="col-1">Type</th>
                <th className="col-2">Created By</th>
                <th className="col-2">Created On</th>
                <th className="col-1">Status</th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              {listOfPools.length > 0 && listOfPools.map((item, index) => {
               return( 
               <tr key={index}>
                <td className="col-1 underline geeks">{item.poolId}</td>
                <td className="col-2">{item.poolName}</td>
                <td className="col-1">{item.poolType}</td>
                <td className="col-2">{item.createdBy}</td>
                <td className="col-2">{item.createdDate}</td>
                <td className="col-1">
                  {item.isActive ? 
                     <button className="btn-active">Active</button> : 
                     <button className="btn-inactive">Inactive</button>}
                </td>
                <td className="col-1">
                  <img onClick={() => modifyPool(item)} src={edit} className="w-12 pb-2" />
                  <i onClick={() => handleRemovePool(item)} className="icon-delete m-l-2 fs-16"></i></td>
                </tr> 
                )
              })}
              {listOfPools.length == 0  && <tr>No records found!</tr>}
            </tbody>
          </table>
      </div> 
    );
}
export default DisplayPools;
DisplayPools.propTypes = {
    listOfPools: PropTypes.array,
    modifyPool: PropTypes.func,
    handleRemovePool: PropTypes.func
  };