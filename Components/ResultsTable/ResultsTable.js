import TableRows from '../TableRows/TableRows'
import React, { useState } from 'react';


import Select from 'react-select';


const resultsTable = (props) => {
    
    const [selectedOption, setSelectedOption] = useState(null);
    const [filterValue, setFilterValue] = useState();


    // array used for filtering and for table header label
    const filterArr = props.tableKeys[0].split(',')
    const emailCheck = filterArr.indexOf('email')
    const employedCheck = filterArr.indexOf('employed')

    // used for Select component
    const options = {... filterArr}
    const listOptions = Object.keys(options).map(key => {
        return {label: options[key], value: key}
    });

    // returns an array of what the user want to filter by
    const filter = selectedOption?.map(items => Number(items['value']))

    // split row data
    const splitRowData = props.tableData.map((items, i) => items.split(','))

    // regex for validating email
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

    // filter rows with only valid rows
    const filteredEmails = splitRowData.filter(items => emailRegex.test(items[emailCheck]))
    const filteredEmployed =  filteredEmails.filter(items => (items[employedCheck] === 'true' || items[employedCheck] === 'false'))


    // used to prevent list changing onChange for Select drop down
    const handleFilter = () => {
        setFilterValue(filter)
    }

    // creates the rows for the table
    const tableRows = filteredEmployed.map(
        (item, i) => 
            <tr key={i + 'dataRow'}>
                <TableRows key={i + 'dataRowCell'} cells={item} arrFilter={filterValue}/>
            </tr>
        )
    
    return (
        <div>
            <div>
                <div>
                    <Select
                        defaultValue={selectedOption}
                        isMulti
                        options={listOptions}
                        onChange={setSelectedOption}
                        className='mb-2'
                    />
                </div>
                {/* button used for filtering */}
                <div>
                    <button 
                        className='px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:opacity-50' 
                        disabled={(typeof filter === 'undefined' || !filter.length)} 
                        onClick={handleFilter}>
                        Filter
                    </button>
                </div>
            </div>
            <table className='my-4'>
                <thead>
                    {/* creates header for the table */}
                    <tr><TableRows cells={filterArr} arrFilter={filterValue}/></tr>
                </thead>

                <tbody>
                    {/* displays the rest of the valid table rows */}
                    {tableRows}
                </tbody>
            </table>
        </div>
    )
}

export default resultsTable;