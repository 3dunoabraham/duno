import Head from 'next/head'
import { useState, useMemo, useEffect, useContext } from 'react'
import { useMap } from 'usehooks-ts'
import { BsBoxSeam, BsStack, BsBox, BsCircle, BsChevronDown, BsChevronUp } from 'react-icons/bs'


// import { isDevEnvironment } from '@/scripts/helpers/devHelper';
import { SidebarFilterContainer } from '@/components/pages/inventory/SidebarFilterContainer'
import { API_UNITS, API_PEOPLE_BASE, API_ORGS, API_UNIT_OPTS_BASE } from '@/scripts/constants/api';
import { fetchAndParseOrgTypes, fetchJsonArray, parsedFetchedUnit } from '@/scripts/helpers/fetchHelper';
import { BreadCrumbs } from '@/components/atoms/BreadCrumbs'
import { SidebarFilterToolbar } from '@/components/organisms/SidebarFilterToolbar'
import { LoadingInventory } from '@/components/pages/inventory/LoadingInventory';
import { AppContext } from '@/scripts/contexts/AppContext';
import { sortIDDesc } from '@/scripts/helpers/type/arrayHelper';
import { obj2MapArray } from '@/scripts/helpers/type/objectHelper';
import { DEFAULT_UNITS_ARRAY } from '@/scripts/constants/unit';
import { InventoryPageComponent } from '@/components/pages/inventory';
// ReactFunctionPageComponent
export default function InventoryPage({
    unitsArray, optsArrayObj, filtersObj, filtersRefObj, online,
}) {
    /****** CREATE ******/
    const app = useContext(AppContext)
    const [zzz, s__zzz] = useState<boolean>(true);
    const [q__unitsArray, sq__unitsArray] = useState([]);
    useEffect(()=>{
        if (!online) {sq__unitsArray(DEFAULT_UNITS_ARRAY);s__zzz(false); return}
        fetchJsonArray(API_UNITS, "Units").then((res:any)=>{sq__unitsArray(res);s__zzz(false)})
    },[])


    
    /****** DATA ******/
    const [filtersMap,filtersMap_do] = useMap(obj2MapArray(filtersObj))
    const optMapObj_customerArray = useMemo(()=>{
        return optsArrayObj.customersArray.map((x)=>(
            {...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`})
        )
    },[optsArrayObj.customersArray])
    const parsedUnitsArray = useMemo(()=>{
        if (!q__unitsArray || !q__unitsArray.length) return []
        return q__unitsArray.map((aUnit, index)=> (
            parsedFetchedUnit(aUnit, optsArrayObj.orgsArray, optMapObj_customerArray) 
        ))
    },[q__unitsArray, optsArrayObj.orgsArray, optMapObj_customerArray])
    const filteredUnits = useMemo(()=>{
        let theFilteredList = parsedUnitsArray.filter((aUnit,index) =>{
            let { isOn } = filtersMap.get("sales_status")
            if (isOn && aUnit.sales_status != filtersMap.get("sales_status").id){return false}
            isOn = filtersMap.get("dealer").isOn
            if (isOn && aUnit.dealer != filtersMap.get("dealer").value){return false}
            return true
        })
        return theFilteredList.sort(sortIDDesc)
    },[parsedUnitsArray, filtersMap, ])
 


    /****** UPDATE ******/
    const onFiltersUpdate = (theData)=>{
        let configKey = theData.optName
        let theConfig = filtersMap.get(configKey)
        
        filtersMap_do.set(
            configKey, {...theConfig, ...{isOn: true, value: theData.label, display: theData.label, id:theData.id}}
        )
        // s__currentPage(0)
    }



    /****** HTML ******/
    return (<>
    <Head> <title>Inventory | SMP</title> </Head>

    <div className="flex w-100 h-100 noverflow-y">
        <SidebarFilterContainer onFiltersUpdate={onFiltersUpdate} filtersRefObj={filtersRefObj} />

        <main className="ims-body-inner w-100 mx-4">
            <BreadCrumbs pages={[["/inventory","Inventory"]]} />
            <div className="flex">
                <h1 className="pt-6 tx-bold-5 flex-1 "> Inventory </h1>
                <div className="flex-center ">
                    <a  href="/unit/add" className="ims-button-primary clickble">+ New Unit</a>
                </div>
            </div>
            <hr className="my-2"/>
            <SidebarFilterToolbar {...{
                filtersMap, filtersMap_do, configObj:filtersObj,
            }}/>
            <div className="mt-4 mb-150 h-100 " >
                {zzz && <LoadingInventory /> }
                {(!q__unitsArray || !q__unitsArray.length) && !zzz && <>
                    <div className='tx-xl opaci-10 tx-ls-5 pt-100 pb-8 tx-center '>No Units Found</div>
                </>}
                {!!q__unitsArray && !!q__unitsArray.length && !zzz &&<>
                    <InventoryPageComponent filteredUnits={filteredUnits} />
                </>}
            </div>
        </main>
    </div>
    </>)
}



/****** SERVER ******/
const DEFAULT_RESPONSE:any = {
    unitsArray: [], filtersRefObj: {}, filtersObj: {}, online: false,
    optsArrayObj: { sales_statuses: [], customersArray: [], orgsArray: [] }, 
}
async function fetchPageData() {
    try {
        let unitsArray = []
        let customersArray = await fetchJsonArray(API_PEOPLE_BASE+"customers", "Data")
        let orgsArray = await fetchJsonArray(API_ORGS, "Orgs")
        let {manufacturers, distributors, dealers, owners } = (
            await fetchAndParseOrgTypes(orgsArray)
        )
            
        let sales_statuses = await fetchJsonArray(API_UNIT_OPTS_BASE+"sales_statuses")
        return {
            online: true,
            unitsArray, optsArrayObj: {
                customersArray, orgsArray,
                sales_statuses,
                dealers,
            },
            filtersObj: {}, filtersRefObj: {},
        }
    } catch (err) {
        return DEFAULT_RESPONSE
    }
}
const DEFAULT_INVENTORY_FILTERSCONFIG_ARRAY = {
    sales_statuses: {name:"Status",title: "Sales Status",icon: "BsCircle", optName: "sales_status", optField:"label",query: "stts"},
    dealers: {name:"Dealer",title: "Dealer",icon: "BsCircle", optName: "dealer", optField:"name",query: "d"},
}
export const DEFAULT_FILTER_OBJ = {
    isOn: false, id: -1, value: "", title: "filter name"
}
export async function getServerSideProps({ params, query }) {
    let online = query.offline == undefined
    let props = online ? await fetchPageData() : DEFAULT_RESPONSE
    for (const aFilterName in DEFAULT_INVENTORY_FILTERSCONFIG_ARRAY)
    {
        let filter = DEFAULT_INVENTORY_FILTERSCONFIG_ARRAY[aFilterName]
        // let theArray = props.optsArrayObj[aFilterName].map(
        //     (aProp, index)=>(aProp[filter.optField])
        // )
        // console.log(filter)
        let optsArray = props.optsArrayObj[aFilterName]
        let isFilterOn = !!query[filter.query]
        let _value = !isFilterOn ? "" : (
            optsArray.filter((anOpt)=>{
                return `${anOpt.id}` == query[filter.query]
            })
        )
        // console.log(optsArray.filter((anOpt)=>{
        //     return `${anOpt.id}` == query[filter.query]
        // }))
        let value = _value.length > 0 ? _value[0][filter.optField] : ""
        // console.log("optsArray,_value,value")
        // console.log(optsArray,query,filter.query,"_value",_value,value,query[filter.query],"|")

        // props.filtersObj[filter.optName] = {isOn: false, id: -1, value: "", display:"", title: filter.name}
        props.filtersObj[filter.optName] = !!query[filter.query]
            ? {
                title: filter.name,
                isOn: true,
                id: query[filter.query],
                value:value,
                // value: theArray[query[filter.query]]
            }
            : {isOn: false, id: -1, value: "", display:"", title: filter.name}
            
        props.filtersRefObj[filter.optName] = {
            optsArray,
            filter,
        }
    }

    return { props: props }
}