import { convertTimestamp, parseUTCString } from "@/scripts/helpers/type/dateHelper"

export const SalesStatusBadgePlus = ({
    value, reference, date = "",
})=>{
    switch (parseInt(value))
    {
        case 1: return <span className="ims-badge-success pa-1 tx-sm ">Available</span>
        case 2: return (
            <div className="nowrap flex">
                <span className="ims-badge-secondary pa-1 tx-sm ">
                    Temporal
                </span>
                {!date && <div  className="tx-sm pa-1 opaci-75">Jan 1 2023</div>}
                {!!date && <div  className="tx-sm pa-1 opaci-75">{convertTimestamp(parseInt(date)/1000)}</div>}
            </div>
        )
        case 3: return (
            <div className="nowrap flex">
                <span className="ims-badge-tertiary pa-1 tx-sm ">
                    Private
                </span>
                {!date && <div  className="tx-sm pa-1 opaci-75">Jan 1 2023</div>}
                {!!date && <div  className="tx-sm pa-1 opaci-75">{convertTimestamp(parseInt(date)/1000)}</div>}
            </div>
        )
        case 4: return <span className="ims-badge-error pa-1 tx-sm ">Not Available</span>
        default: return <span className="ims-bg-faded px-4 pa-1 tx-sm ">?</span>
    }
}