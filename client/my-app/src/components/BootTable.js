import React, {useEffect, useState} from "react";
import axios from "axios";

import DataTable from 'react-data-table-component';
import * as ReactBootstrap from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination'



function BootTable(){
const [users,setUsers] = useState();


    const url = "http://localhost:8000/getData";

   useEffect(() => {
    getData1();
   },[]);

    const getData1 = () => {
        axios.get(url)
        .then((response) => {
        //    const Users = response.data.users.Users;
           
        //    users=response.data;
        setUsers(response.data)
           console.log(users);
        })
        
        .catch(error => console.log(error));
       
    }
  
 const columns = [
  {
    name: <h4>Name</h4>,
    selector: 'firstName',
    sortable: true,
  },
  
  {
    name: <h4>Email</h4>,
    selector: 'emailName',
    sortable: true,
  },
  {
    name: <h4>Phone Number</h4>,
    selector: 'phoneName',
    sortable: true,
  },
];
// const searchData = React.useRef(
//   throttle((val) => {
//     const query = val.toLowerCase();
//     setCurrentPage(1);
//     const data = cloneDeep(
//       allData
        
//     );
//     setCollection(users);
//   }, 400)
// );

    return(
    <div>
    <div class="search">
        <input
          placeholder="Search Heare"
         
        />
      </div>
    
<ReactBootstrap.Table striped bordered hover>

  
  
  <thead>
    {/* <tr>
      
      <th>Name</th>
      <th>Email</th>
      <th>Phone Number</th>
    </tr> */}

<DataTable

        columns={columns}

        data={users}

        highlightOnHover
        pagination
        paginationPerPage={25}
        paginationRowsPerPageOptions={[5, 15, 25, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Records per page:',
          rangeSeparatorText: 'out of',
        }}
      />
      </thead>
      
  <tbody >
  {
      users && users.map((item) => (

      <tr key={item.id}> 
      
      {/* <td>{item.firstName}</td>
      <td>{item.emailName}</td>
      <td>{item.phoneName}</td> */}
    </tr>
      ))
  }
   
  </tbody>
    </ReactBootstrap.Table>
    </div>
    
    )
    }        
export default BootTable;