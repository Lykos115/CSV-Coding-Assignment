import React, { useState } from 'react';
import "tailwindcss/tailwind.css"
import ResultsTable from '../Components/ResultsTable/ResultsTable'
 
export default function Home() {
  
  //hook to chceck if textfield is empty
  const [textfieldValue, setValue] = useState('');

  //hook to submit textfiled form value and use for table.
  const [submitValue, onSubmitForm] = useState('');

  // gets all rows including header
  const rows = submitValue.split("\n")
  // Header and the rest of the rows are seperated
  const headerRows = rows.splice(0,1)



  const handleCSVInput = (event) => {
      setValue(event.target.value)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitForm(e.target[0].value)
    setValue('')
  }

  return (
    <div>
      <div className='m-4'>CSV Parse and Filter Project</div>

      <div className='m-4'>
        {/* form area */}
        <form onSubmit={handleSubmit}>
          <div>
            <textarea className='border-solid border-black border w-9/12 h-96' name="csv-textarea" value={textfieldValue} onChange={handleCSVInput} />
          </div>
          <div>
            <button className='bg-blue-500 disabled:opacity-50 text-white font-bold py-2 px-4 rounded' disabled={textfieldValue === ''}>Parse</button>
          </div>
        </form>
        {/* form area */}
        <div>
          <div>Response Area: </div>
          {submitValue === '' ? null : <ResultsTable tableData={rows} tableKeys={headerRows}/> }
        </div>
      </div>

    </div>

    )
}
