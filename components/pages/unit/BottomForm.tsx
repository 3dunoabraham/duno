import { useEffect, useMemo, useState } from 'react'


import { BottomSectionInputModule } from '@/components/pages/unit/BottomSectionInputModule'
import { BottomSectionOutputModule } from '@/components/pages/unit/BottomSectionOutputModule'
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper'
import { API_PEOPLE_BASE, API_UNIT_OPTS_BASE } from '@/scripts/constants/api'
import { DEFAULT_COLOR_OBJARRAY, DEFAULT_HITCH_TYPE_OBJARRAY } from '@/scripts/constants/unit'
// ReactFunctionComponent
export const UnitBottomForm =({
    unit, 
    values, optMapObj,
    editMode,
    updateNewData,
})=>{
    /****** CREATE ******/
    useEffect(()=>{
        // fetchJsonArray(API_UNIT_OPTS_BASE+"title_states").then((res)=>{s__title_statesArray(res)})
        // fetchJsonArray(API_PEOPLE_BASE+"customers", "Data").then((res)=>{s__customersArray(res)})
        // fetchJsonArray(API_PEOPLE_BASE+"investors", "Data").then((res)=>{s__investorsArray(res)})
    },[])



    /****** DATA ******/
    const [investorsArray, s__investorsArray] = useState([])
    const [customersArray, s__customersArray] = useState([])
    const [title_statesArray, s__title_statesArray] = useState([])
    // const parsed_investorsArray = useMemo(()=>(
    //     investorsArray.map((x)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`})
    // )),[investorsArray])
    const parsed_customersArray = useMemo(()=>(
        []
        // customersArray.map((x)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`}))
    ),[customersArray])
    const axlesObjArray = (
        Array.from(Array(4).keys()).map(i => ({label:`${i+1}`,id:`${i+1}`}))
    )
    const inputsMapObj = {
        "characteristics": {
            _: {label: "Characteristics"},
            color: {
                title:"Software", defaultValue: "",
                widget: "color", customFormat: "", limit: 24, inputName:"color",
            },
            axles: {
                title:"Version", defaultValue: "",
                widget: "select", customFormat: "intrange", inputName:"axles", limit:4, 
                config:["isReadOnly"],  optName:"label"
            },
            hitch_type: {
                title:"Scope", defaultValue: "", optName:"label", inputName:"hitch_type",
                widget: "enum", customFormat: "", config:["isReadOnly"], customWidth:250,
            },
            // sales_price: {
            //     title:"Sales Price", inputName:"retail_price", defaultValue: "",
            //     widget: "string", customFormat: "price", limit:999000,
            // },
            gvwr: {
                title:"Users (qty)", defaultValue: "",
                widget: "string", customFormat: "integer", inputName:"gvwr", limit: 99999
            },
        },
        "locations": {
            _: {label: "Location"},
            location: {
                title:"Hosting or Service", defaultValue: "",
                widget: "select", customFormat: "radio", path: true, inputName:"location",
                radioName:"location_related", titlesObj: {"1":"Hosting","2":"Service"},
                inputsObj:{
                    company: {
                        title:"Hosting", defaultValue: "", optName: "name",
                        widget: "select", customFormat: "entity", inputName:"company", 
                    },
                    customer: {
                        title:"Service", defaultValue: "", optName: "_name",
                        widget: "select", customFormat: "entity", inputName:"customer", 
                    },
                },
            },
            physical_as_of: {
                title:"Physical Location", defaultValue: "",
                widget: "date", customFormat: "", inputName:"physical_as_of"
            },
            county: {
                autogen: true, title:"County", defaultValue: "",
                widget: "", customFormat: "",
            },
            address: {
                autogen: true, title:"Address", defaultValue: "",
                widget: "", customFormat: "",
            },
        },
    }



    /****** HTML ******/
    return (
    <div className="flex flex-align-start Q_xs_md_flex-col" >
        <div className="flex-col flex-align-start flex-1 pt-0 pa-4 w-100">
            {/* <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} updateNewData={updateNewData} 
                        label={inputsMapObj["price"]._.label}
                        inputsMapObj={inputsMapObj["price"]} editMode={editMode} 
                        values={values["price"]}   inputName={"price"}
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["price"]._.label}
                        inputsMapObj={inputsMapObj["price"]} editMode={editMode} 
                        values={values["price"]}   
                    />
                </div>
            </div> */}
            <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["characteristics"]._.label}
                        inputsMapObj={inputsMapObj["characteristics"]} editMode={editMode} 
                        values={values["characteristics"]}  
                        inputName={"characteristics"} 
                        optsObj={{
                            axles:axlesObjArray,hitch_type:DEFAULT_HITCH_TYPE_OBJARRAY,
                            color: DEFAULT_COLOR_OBJARRAY
                        }} 
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["characteristics"]._.label}
                        inputsMapObj={inputsMapObj["characteristics"]} editMode={editMode} 
                        values={values["characteristics"]}  
                        optsObj={{
                            axles:axlesObjArray,hitch_type:DEFAULT_HITCH_TYPE_OBJARRAY,
                            color: DEFAULT_COLOR_OBJARRAY
                        }} 
                    />
                </div>
            </div>
            <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["locations"]._.label}
                        inputsMapObj={inputsMapObj["locations"]} editMode={editMode} 
                        values={values["locations"]}   inputName={"locations"}
                        flex={"col"}
                          optsObj={{company:[] ,customer:[]}} 
                        needsFullObjectAtAPI={false} 
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["locations"]._.label}
                        inputsMapObj={inputsMapObj["locations"]} editMode={editMode} 
                        values={values["locations"]}   
                        flex={"col"}
                        optsObj={{company:[] ,customer:[]}} 
                    />
                    {false && !editMode &&
                        <BottomSectionOutputModule uid={unit.uid} 
                            label={inputsMapObj["locations"]._.label}
                            inputsMapObj={inputsMapObj["locations"]} editMode={false} 
                            values={values["locations"]}   
                            optsObj={{company:[],customer:[]}} 
                        />
                    }
                </div>
            </div>






            
            {/* <div className="w-100">
                <hr className="mb-3 w-100  opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["registration_title"]._.label}
                        inputsMapObj={inputsMapObj["registration_title"]} editMode={editMode} 
                        values={values["registration_title"]} 
                        inputName={"registration_title"} 
                        optsObj={{
                            title_status:optMapObj.title_statuses,
                            title_state: title_statesArray,
                        }}
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["registration_title"]._.label}
                        inputsMapObj={inputsMapObj["registration_title"]} editMode={editMode} 
                        values={values["registration_title"]} 
                        optsObj={{
                            title_status:optMapObj.title_statuses,
                            title_state: title_statesArray,
                        }}
                    />
                </div>
            </div> */}
            {/* <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["gps"]._.label}
                        inputsMapObj={inputsMapObj["gps"]} editMode={editMode} 
                        values={values["gps"]}   inputName={"gps"}
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid}
                        label={inputsMapObj["gps"]._.label}
                        inputsMapObj={inputsMapObj["gps"]} editMode={editMode} 
                        values={values["gps"]}  
                    />
                </div>
            </div> */}
            {/* <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["investors"]._.label}
                        inputsMapObj={inputsMapObj["investors"]} editMode={editMode} 
                        values={values["investors"]}   inputName={"investors"}
                        optsObj={{
                            current_investor:parsed_investorsArray,
                            previous_investor:parsed_investorsArray
                        }} 
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["investors"]._.label}
                        inputsMapObj={inputsMapObj["investors"]} editMode={editMode} 
                        values={values["investors"]}   
                        optsObj={{
                            current_investor:parsed_investorsArray,
                            previous_investor:parsed_investorsArray
                        }} 
                    />
                </div>
            </div> */}
            <hr className="w-100"/>
        </div >
    </div> 
    )
}