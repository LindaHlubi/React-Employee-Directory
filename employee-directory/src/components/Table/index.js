import React, { useContext } from "react";
import SearchResults from "../SearchResults";
import "./style.css";
import DataAreaContext from "../../utils/DataAreaContext";

const Table = () => {
    const context = useContext(DataAreaContext);

    return (

        <div className="datatable mt-5">
            <table
                id="table"
                className="table table-striped table-hover table-condensed"
            >
                <thead>
                    <tr>
                        {context.developerState.titles.map(({ name, width }) => {
                            return (
                                <th
                                    className="col"
                                    key={name}
                                    style={{ width }}
                                    onClick={() => {
                                        context.handleSort(name.toLowerCase());
                                    }}
                                >
                                    {name}
                                    <span className="pointer"></span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <SearchResults />
            </table>
        </div>
    );
}

export default Table;