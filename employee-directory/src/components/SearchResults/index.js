import React, { useContext } from "react";
import "./style.css"
import DataAreaContext from "../../utils/DataAreaContext"

const SearchResults = () => {
    const context = useContext(DataAreaContext);

    function formatDate(date){
        let dateArray = date.split("-");
        let year = dateArray[0];
        let month = dateArray[1];
        let dayArray = dateArray[2].split("T");
        let day = dayArray[0];
        let formattedDate =[day, month, year].join("-");
        return formattedDate;
    }
    return (
        <tbody>
        {context.developerState.filteredEmployees[0] !== undefined && context.developerState.filteredEmployees[0].name !== undefined ? (
          context.developerState.filteredEmployees.map(({ login, name, picture, phone, email, dob, location }) => {
            return (
              <tr key={login.uuid}>
                <td data-th="Picture" className="align-middle">
                  <img
                    src={picture.large}
                    alt={"User profile Image " + name.first + " " + name.last}
                    className="img-responsive"
                  />
                </td>
                <td data-th="Name" className="name-block align-middle">
                  {name.first} {name.last}
                </td>
                <td data-th="Phone" className="phone-block align-middle">
                  {phone}
                </td>
                <td data-th="Email" className="email-block align-middle">
                  <a href={"mailto:" + email} target="__blank">
                    {email}
                  </a>
                </td>
                <td data-th="DOB" className="dob-block align-middle">
                  {formatDate(dob.date)}
                </td>
                <td data-th="City" className="city-block align-middle">
                  {location.city},<br></br> {location.state}
                </td>
              </tr>
            );
          })
        ) : (
          <></>
        )}
      </tbody>
    );
  }
  
  export default SearchResults;