import React from 'react'
import Select from 'react-select'

export default function Dropdown({selectedOption, setSelectedOption}) {

    const options = [
        { value: 'maharashtra', label: 'Maharashtra' },
        { value: 'assam', label: 'Assam' },
        { value: 'gujrat', label: 'Gujarath' },
        { value: 'tripura', label: 'Tripura' },
        { value: 'karnataka', label: 'Karnataka' },
        { value: 'manipur', label: 'Manipur' },
        { value: 'kerala', label: 'Kerala' },
        { value: 'odisha', label: 'Odisha' },
        { value: 'punjab', label: 'Punjab' },
        { value: 'telangana', label: 'Telangana' },
        { value: 'tamilnadu', label: 'Tamilnadu' }
    ]

    return (
        <div>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'black',
                    }),
                }}
            />
        </div>
    )
}
