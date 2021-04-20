import React, {useState, useEffect} from "react";
import Table from "../Table";
import Nav from "../Nav";
import API from "../../utils/API";
import "./style.css";
import DataAreaContext from "../../utils/DataAreaContext"

const DataContainer = () => {
      const [developerState, setDeveloperState] = useState({
        users: [],
        order: "ascend",
        filteredEmployees: [],
        titles: [
          { name: "Photo", width: "10%", },
          { name: " Full Name", width: "20%", },
          { name: "Phone", width: "20%", },
          { name: "Email", width: "15%", },
          { name: "D.O.B", width: "20%", },
          { name: "City", width: "20%",}
        ]
      });
    // so if one is dedcending that means the other is ascending
      const handleSort = title => {
        if (developerState.order === "descend") {
            setDeveloperState({
                order:"ascend"
            })
        } else{
            setDeveloperState({
                order:"descend"
            })
        }
    
        const compareName = (a, b) => {
          if (developerState.order === "ascend") {
            if (a[title] === undefined) {
              return 1;
            } else if (b[title] === undefined) {
              return -1;
            } else if (title === "name") {
              // String.prototype.localeCompare()
              return a[title].first.localeCompare(b[title].first);
            } else {
              return b[title] - a[title];
            } 
          } else {
        if (a[title] === undefined){
            return 1;
        } else if (b[title] === undefined){
            return -1;
        } else if (title ==="name"){
            return b[title].first.localeCompare(a[title].first);
        } else {
return b[title]-  a[title];
        }
    }
    }
        const sortedUsers = developerState.filteredEmployees.sort(compareName);

        setDeveloperState({
          ...developerState,
          filteredEmployees: sortedUsers
});

 };
   
      const handleSearchChange = event => {
        const filter = event.target.value;
        const filteredEmployeeList = developerState.users.filter(item => {
          let values = item.name.first.toLowerCase();
          return values.indexOf(filter.toLowerCase()) !== -1;
        });
    
        setDeveloperState({ 
        ...developerState, 
        filteredEmployees: filteredEmployeeList });
      };

      useEffect(() => {
        API.getUsers().then(results => {
          setDeveloperState({
            ...developerState,
            users: results.data.results,
            filteredEmployees: results.data.results
          });
        });
      }, []);
    
      return (
        <DataAreaContext.Provider
          value={{ developerState, handleSearchChange, handleSort }}
        >
          <Nav />
          <div className="data-section">
            {developerState.filteredEmployees.length > 0 
    ? <Table />
     : <div></div>
     }
          </div>
        </DataAreaContext.Provider>
      );
    }
    
    export default DataContainer;