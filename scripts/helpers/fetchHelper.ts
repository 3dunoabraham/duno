import { API_ORGS, API_ORG_TYPES, API_UNIT_BASE, API_UNIT_OPTS_BASE } from '@/scripts/constants/api';
import { rejects } from 'assert';
import { DEFAULT_style_OBJARRAY, DEFAULT_UNIT_OPTS } from '@/scripts/constants/unit';
import { dd } from '@/scripts/helpers/devHelper';
import { isStrInteger, jstr2FullName } from '@/scripts/helpers/type/stringHelper';

export async function fetchUnitOptsObj() {
    console.log("fetchUnitOptsObj")
    try {
        // let styles = await fetchJsonArray(API_UNIT_OPTS_BASE+"styles", "Model Styles")
        let {owners, styles, statuses, sales_statuses, title_statuses, conditions, subcategories, categories} = (
            await fetchUnitStatuses()
        )
        let orgsList, distributors, dealers = []
        // let orgsList = await fetchJsonArray(API_ORGS,"Orgs")
        // let {distributors, dealers } = (
            // await fetchAndParseOrgTypes(orgsList)
        // )

        return {
            styles,
            statuses, sales_statuses, title_statuses, conditions,
            orgsList, distributors, dealers, owners,
            categories, subcategories,
        }
    } catch (err) {
        return {styles:null,
            statuses:null, sales_statuses:null, title_statuses:null, conditions:null,
            orgsList:null, distributors:null, dealers:null, owners:null,
            categories:null, subcategories:null,}
    }
}
export const fetchDelete = async (url,body)=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'DELETE',body:JSON.stringify(body)
        })
        return fetchRes
    } catch (err) {
        dd(err)
        return err
    }
}
export async function PostData(url = '', data = {}, method = "POST") {
    try {
        const response = await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method,
            body: JSON.stringify(data),
        });
        const ress = await response;
        return ress
    } catch (err) {
        dd(err)
        return err
    }
}
export const fetchPut = async (url,body)=>{
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'PUT',body:JSON.stringify(body)
        })
        return await fetchRes
    } catch (err) {
        dd(err)
        return err
    }
}
export const fetchPost = async (url,body)=>{
    return false
    try {
        let fetchRes = await fetch(url, {
            headers:{"Content-Type":"application/json"},
            method: 'POST',body:JSON.stringify(body)
        })
        return fetchRes
    } catch (err) {
        dd(err)
        return err
    }
}
export function returnError(_a,err,theUrl) {
    console.log("error fetching: "+theUrl,err)
    return _a
}
export async function fetchJsonArray(theUrl, propName = "") {
    try {
        let theRequest = await fetch(theUrl);
        let headerCType = theRequest.headers.get("content-type");
        if (!headerCType) return returnError([],{err:"contentType"},theUrl)
        let succesfullJsonResponse = headerCType.includes("application/json")
        if (!succesfullJsonResponse) return returnError([],{err:"json"},theUrl)
        let theJsonResult = await theRequest.json()
        // let invalidArrayObjOrArrayMsg = (
        //     "Ops..! there is no such thing called <style> please refer to </api/v1/units/opts/> for the list of available options related to Units"
        // )
        // if ("message" in theJsonResult && theJsonResult.message == invalidArrayObjOrArrayMsg ) return returnError([],{},theUrl)
        let theParsedResult = propName == "" ? theJsonResult : theJsonResult[propName]
        if (propName != "" && !(propName in theJsonResult)) { return returnError([],{},theUrl) }
        return theParsedResult
    } catch (err) {
        return returnError([],err,theUrl)
    }
}
export async function fetchMultipleJsonArray(requestsObj) {
    let reqKeys =  Object.keys(requestsObj)
    let requests =  Object.keys(requestsObj).map((reqKey)=>{
        return fetch(requestsObj[reqKey][0])
    })
    return Promise.all(requests).then((responsesArray)=>{
        return Promise.all(reqKeys.map((r,index) =>
            responsesArray[index].json()
        ))
    })
}



export async function fetchAndParseOrgTypes(orgsArray) {
    let orgTypesList = await fetchJsonArray(API_ORG_TYPES)
    
    let categories = parseOrgTypeList("category", orgsArray,orgTypesList)
    let distributors = parseOrgTypeList("distributor", orgsArray,orgTypesList);
    let dealers = parseOrgTypeList("dealer", orgsArray,orgTypesList)
    let owners = parseOrgTypeList("owner", orgsArray,orgTypesList)
    // console.log(API_ORG_TYPES, orgTypesList, {categories, distributors, dealers })
    return {categories, distributors, dealers, owners }
}
export const parseArray = (_obj)=>{
    return _obj && Array.isArray(_obj) ? _obj : []
}
export async function fetchUnitStatuses() {
    return {
        // "styles": [],
        sales_statuses:[], title_statuses:[], conditions:[],
        "statuses": [
            {"id":"1","slug": "Available"},
            {"id":"2","slug": "Temporal"},
            {"id":"3","slug": "Private"},
            {"id":"4","slug": "Not Available"}
        ],
        "categories": [
            {"id":"1","slug": "3D Traditional"},
            {"id":"2","slug": "2D Traditional"},
            {"id":"3","slug": "3D Digital"},
            {"id":"4","slug": "2D Digital"},
            {"id":"5","slug": "Mixed"}
        ],
        "subcategories": [
            {"id":"1","slug": "Object"},
            {"id":"2","slug": "Picture"},
            {"id":"3","slug": "Animation"},
            {"id":"4","slug": "Mixed"}
        ],
        "owners": [
            {"id":"1","slug": "Own"},
            {"id":"2","slug": "Third Party"},
            {"id":"3","slug": "None"},
            {"id":"4","slug": "Mixed"}
        ],
        "styles": [
            {"id":"1","slug": "Classic"},
            {"id":"2","slug": "Modern"},
            {"id":"3","slug": "Futuristic"},
            {"id":"4","slug": "Mixed"}
        ]
    }
    try {
        let styles = (
            await fetchJsonArray(API_UNIT_OPTS_BASE+"styles", "Model Styles")
        )
        let reqObj = {
            // "inventoryStatuses": [API_UNIT_OPTS_BASE+"statuses",""],
            "saleStatuses": [API_UNIT_OPTS_BASE+"sales_statuses",""],
            "titleStatuses": [API_UNIT_OPTS_BASE+"title_statuses",""],
            "conditions": [API_UNIT_OPTS_BASE+"conditions",""],
        }
        let reqObjKeys = Object.keys(reqObj)
        let optsArray = await fetchMultipleJsonArray(reqObj)
        // let statuses = parseArray(optsArray[reqObjKeys.indexOf("inventoryStatuses")])
        let statuses = []
        let sales_statuses = parseArray(optsArray[reqObjKeys.indexOf("saleStatuses")])
        let title_statuses = parseArray(optsArray[reqObjKeys.indexOf("titleStatuses")])
        let conditions = parseArray(optsArray[reqObjKeys.indexOf("conditions")])

        return {
            statuses, sales_statuses, title_statuses, conditions,
        }
    } catch (err) {
        dd("fetchUnitStatuses", err)
        return {
            statuses:[],
            sales_statuses:[],
            title_statuses:[],
            conditions:[],
        }
    }
}
export function parseNoteObj(aNoteString,id) {
    let splittedString = aNoteString.split(" ")
    let [date,time,created_by,...rest] = splittedString
    return {
        created_at: date,
        created_by: created_by.split(":")[0],
        id: id,
        is_active: 'false',
        is_verified: 'false',
        text: rest.join(" "),
        units: '',
        updated_at: 'null',
        updated_by: 'null',
    }
}
export function parsedFetchedUnit(aUnit, orgsArray, customersArray) {
    let aParsedUnit = {...aUnit, ...{location: `-`}}
    if (aUnit.location_related == 0) return aParsedUnit 
    if (aUnit.location_related == 1)
    {
        let theFoundOrg = orgsArray.filter((aOrg, index)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundOrg.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundOrg[0].name}}
    }
    if (aUnit.location_related == 2)
    {
        let theFoundCustomer = customersArray.filter((aOrg, index)=>{
            return aOrg.id == aUnit.location
        })
        if (theFoundCustomer.length == 0) return aParsedUnit
        aParsedUnit = {...aUnit, ...{location: theFoundCustomer[0]._name}}
    }
    return aParsedUnit 
}

export function parseChangedDataObj(changedData) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) return
            the_data[key] = the_data.investors[key] || null
        })
        delete the_data["investors"]
    }
    return the_data
}


export function parseChangedDataToAddObj(changedData) {
    let the_data = Object.fromEntries(changedData) 
    if (changedData.has("year"))
    {
        if (!the_data.year) the_data.year = null
    }
    if (changedData.has("locations"))
    {
        Object.keys(the_data.locations).map((key,index)=>{
            if (key in the_data.locations && the_data.locations[key] == "None") return
            the_data[key] = the_data.locations[key] || null
        })
        delete the_data["locations"]
    }

    if (changedData.has("investors"))
    {
        Object.keys(the_data.investors).map((key,index)=>{
            if (
                    key in the_data.investors &&
                    (
                        !the_data.investors[key] ||
                        the_data.investors[key] == "None" ||
                        (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                    )
                ) {
                return
            }
            the_data[key] = the_data.investors[key]
        })
        delete the_data["investors"]
    }
    return the_data
}
export async function fetchUnitUIDAvailability(uid) {
    let theRequest = await fetch(API_UNIT_BASE + uid)
    let headerCType = theRequest.headers.get("content-type");
    let isUIDTaken = headerCType.includes("application/json")
    return !isUIDTaken
}
export async function fetchParsedUnit(id) {
    console.log("tttehe request 1")
    let _theRequest = await fetchJsonArray("https://duno.vercel.app/projects.json")
    // let theJson =_theRequest.json()
    console.log("tttehe request 2",_theRequest)
    let theItem = _theRequest.filter((anItem)=>anItem.id == id)
    console.log("tttehe request 23",theItem[0])
    return {...{owner:"",images:"[]",docs:"[]",condition:"",style:"",category:"",subcategory:"",status:""},...theItem[0]}

    let theRequest = await fetch(API_UNIT_BASE + id);
    let headerCType = theRequest.headers.get("content-type");
    if (!headerCType || (headerCType && !headerCType.includes("application/json"))) return null
    let theUnitResult = await theRequest.json()
    if (!theUnitResult) return null
    let theParsedResult = theUnitResult.Data[0]
    let theExportResult = {...theParsedResult, ...{
        investors: {
            current_investor: jstr2FullName(theParsedResult.current_investor),
            previous_investor: jstr2FullName(theParsedResult.previous_investor),
        },
        locations: {
            location: theParsedResult.location,
            physical_as_of: theParsedResult.physical_as_of,
            location_related: theParsedResult.location_related,
        },
    }}
    return theExportResult
}
export function parseOrgTypeList(type, _orgsList, DEFAULT_ORG_TYPE_LIST) {
    if (type == "owner")
    {
        return _orgsList.filter((item,index)=> {return parseInt(item.type) <= 6 })
    }
    let orgTypeId  = DEFAULT_ORG_TYPE_LIST.filter(orgOptType=>orgOptType.label == type)
    if (!orgTypeId.length) return []
    let returnList = _orgsList.filter((item,index)=> {
        return item.type == orgTypeId[0].id
    })
    return returnList
}



export async function fetchDownload(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
}