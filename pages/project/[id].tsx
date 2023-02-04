// import { dd, dlog, isDevEnvironment } from '@/scripts/helpers/devHelper';
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'


import { FooterLayout } from '@/components/templates/FooterLayout'
import { API_UNIT_OPTS_BASE, API_ORGS, API_DOCS, API_NOTES, 
} from '@/scripts/constants/api';
import { fetchAndParseOrgTypes, fetchJsonArray, fetchParsedUnit, fetchUnitStatuses, parseNoteObj
} from '@/scripts/helpers/fetchHelper';
import { DEFAULT_UNIT, DEFAULT_UNIT_OPTS } from '@/scripts/constants/unit'
import { UnitPageComponent } from '@/components/pages/unit'
import { BreadCrumbs } from '@/components/atoms/BreadCrumbs'
import { ErrorBlock } from '@/components/atoms/ErrorBlock'
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder'
// ReactFunctionPageComponent
export default function UnitPage({
    online,
    optMapObj,
}) {
    /****** DATA ******/
    const router = useRouter()
    const { id } = router.query
    const [editMode, s__editMode] = useState(false);
    const q_unit = useQuery({
        queryKey: ['unitData'],
        queryFn: async () => online ? await fetchParsedUnit(id) : DEFAULT_UNIT,        
    })
    const q_docs = useQuery({
        queryKey: ['docsData'],
        refetchOnWindowFocus: false,
        queryFn: async () => online ? await fetchJsonArray(API_DOCS, "Data") : [],
    })
    const q_logs = useQuery({
        queryKey: ['logsData'],
        refetchOnWindowFocus: false,
        queryFn: async () => online ? await fetchJsonArray(API_NOTES+id+"/", "Notes") : [],
    })
    const q_notes2 = useQuery({
        queryKey: ['notesData2'],
        queryFn: async () => online ? await fetchJsonArray(API_NOTES, "Data") : [],
    })
    const q_notes = useQuery({
        queryKey: ['notesData'],
        queryFn: async ()=>{
            if (!online) return []
            let notesArray = await fetchJsonArray(API_NOTES+id+"/", "Notes")
            let notesReference = await fetchJsonArray(API_NOTES, "Data")
            return notesArray.map((aNote,index)=>{
                let theParsedNote = parseNoteObj(aNote,index+1)
                let theIdNote = notesReference.filter((aNoteObj,secindex)=> {
                    return aNoteObj.text == theParsedNote.text
                })
                return  {...theParsedNote, ...{
                    id:theIdNote[0] ? theIdNote[0].id : -1
                }}
            })
        },
    })
    /****** MEMO ******/
    const localOptsReady = useMemo(()=>{
        if (q_docs.isLoading || q_docs.isLoading || !q_docs.data) { return false }
        if (q_logs.isLoading || q_logs.isLoading || !q_logs.data) { return false }
        if (q_notes.isLoading || q_notes.isLoading || !q_notes.data) { return false }
        return true
    },[q_docs,q_logs, q_notes])
    const qReady_unit = useMemo(()=>{
        return !(q_unit.isLoading || q_unit.isLoading || !q_unit.data)
    },[q_unit])
    const q_obj:any = useMemo(()=>{
        if (!localOptsReady) return []
        if (!qReady_unit) return []
        
        return {
            docs:q_docs.data.filter((aDoc, index)=>q_unit.data.docs.includes(aDoc.id)),
            notes: q_notes.data,
            logs: q_logs.data,
        }
    },[q_docs,q_unit,q_notes,q_logs])
    
    

    /****** UPDATE ******/
    const refetchHandler = async (dependencies = [])=>{
        q_unit.refetch()
        if (dependencies.includes("docs")) { q_docs.refetch() }
        if (dependencies.includes("notes")) { q_notes.refetch() }
        if (dependencies.includes("logs")) { q_logs.refetch() }
    }



    /****** HTML ******/
    if (q_unit.isLoading) {
        return (
        <div className={``}>
            <main className="">
                <BreadCrumbs pages={[["/portfolio","Portfolio"]]} current={`Detail`} />
                
                <div className='py-6'>
                    <PagePlaceholder />
                </div>
            </main>
        </div>
        )
    }
    if (q_unit.error) return ErrorBlock({err:q_unit.error})

    return (<>
    <Head> <title>{`${id} | IMS`}</title> </Head>

    <div className={``}>
        <main className="">
            <BreadCrumbs pages={[["/portfolio","Portfolio"]]} current={`Detail`} />

            <div className="Q_xs_md my-2 invisible block">.</div>
            {!q_unit.data && ErrorBlock({err:q_unit.error}) }
            {q_unit.data &&
                <UnitPageComponent refetch={refetchHandler} 
                    {...{editMode, s__editMode}}
                    unit={q_unit.data} optMapObj={optMapObj} 
                    docsArray={q_obj.docs} notesArray={q_obj.notes} logsArray={q_obj.logs}
                />
            }
            {/* {JSON.stringify(optMapObj)} */}
        </main>
        <FooterLayout />
    </div>
    </>)
}



/****** SERVER ******/
async function fetchUnitPageData() {
    try {
        let model_styles = (
            await fetchJsonArray(API_UNIT_OPTS_BASE+"model_styles", "Model Styles")
        )
        let {inventory_statuses, sales_statuses, title_statuses, conditions} = (
            await fetchUnitStatuses()
        )
        let orgsList = await fetchJsonArray(API_ORGS,"Orgs")
        let {manufacturers, distributors, dealers, owners } = (
            await fetchAndParseOrgTypes(orgsList)
        )
            
        return {
            model_styles,
            inventory_statuses, sales_statuses, title_statuses, conditions,
            orgsList, distributors, manufacturers, dealers, owners,
        }
    } catch (err) {
        return DEFAULT_UNIT_OPTS
    }
}
export async function getServerSideProps({ params, query }) {
    let online = query.offline == undefined
    let optMapObj = online ? await fetchUnitPageData() : DEFAULT_UNIT_OPTS
    let {manufacturers, distributors, dealers, owners} = optMapObj
    // console.log(manufacturers, distributors, dealers)
    return {props: { online, optMapObj} }
}