const tableRows = (props) => {
    // arr used to hold the final filtered product
    const filterArr = []
    // array that contains what the user wants to filter
    const arrFilter = props.arrFilter

    // creates the each block for the rows
    const populatedRows = props.cells.map(
        (item, i) => 
            <td className='px-4 pt-4 border border-black' key={i + 'cellData'}>{item}</td>
        )

    // itererates through arrFilter and only adds does to the filterArr
    for(const i in arrFilter){
        filterArr.push(populatedRows[arrFilter[i]])
    }

    // if filterArr is empty returns populatedRows otherwise returns filtered

    return filterArr.length ?  filterArr : populatedRows

}

export default tableRows;