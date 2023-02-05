import { SalesStatusBadge } from '@/components/pages/unit/SalesStatusBadge';
import { validateStringLength, validateInteger } from '@/scripts/helpers/validationHelper'
import { InputText } from '@/components/atoms/InputText'
// ReactFunctionComponent
export const UnitTopForm =({
    unit,
    updateNewData,
}) =>{
    const updateNewData_Year = (newDataObj)=>{
        updateNewData({...newDataObj, value: validateInteger(newDataObj.value,1950,1950,2050)})
    }

    return (
    <div className="flex-wrap gap-2 ims-tx-faded  tx-md ">
        <div className="flex-center">
            <div className="tx-bold-6 pr-1">Status:</div>
            <SalesStatusBadge value={parseInt(unit.status)} reference={[""]} />
        </div>
        {/* <div className="flex"><div className="tx-bold-6 pr-1">Unit ID:</div>{unit.uid}</div> */}
        <div className="flex-center w-200px">
            <div className="tx-bold-6 pr-1">SLUG:</div>
            <InputText inputName={"slug"} reference={unit.slug || ""} updateNewData={updateNewData} 
                parseFunction={(newVal,prevVal)=>(validateStringLength(newVal,prevVal,12))}
            />
        </div>
        <div className="flex-center w-220px">
            <div className="tx-bold-6 pr-1">Date:</div>
            <InputText inputName={"date"} reference={unit.date || ""}
                updateNewData={updateNewData}
                parseFunction={(newVal,prevVal)=>(validateInteger(newVal,prevVal,0,9999999999999))}
            />
        </div>
        <div className="flex-center w-300px">
            <div className="tx-bold-6 pr-1">URL:</div>
            <InputText inputName={"url"} reference={unit.url || ""} updateNewData={updateNewData} 
                parseFunction={(newVal,prevVal)=>(validateStringLength(newVal,prevVal,200))}
            />     
        </div>
    </div>
    )
}