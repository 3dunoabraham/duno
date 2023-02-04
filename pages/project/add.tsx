import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


import { FooterLayout } from '@/components/templates/FooterLayout'
import { fetchUnitOptsObj } from '@/scripts/helpers/fetchHelper';
import { DEFAULT_UNIT } from '@/scripts/constants/unit'
import { UnitAddComponent } from '@/components/pages/unit/Add'
import { BreadCrumbs } from '@/components/atoms/BreadCrumbs'
import { PagePlaceholder } from '@/components/atoms/PagePlaceholder'
// ReactFunctionPageComponent
export default function UnitAddPage({}) {
    const [q__orgsObj, sq__orgsObj] = useState();
    const router = useRouter()
    const [editMode, s__editMode] = useState(true);
    
    useEffect(()=>{
        fetchUnitOptsObj().then((res:any)=>{sq__orgsObj(res)})
    },[])

    /****** HTML ******/
    return (<>
    <Head> <title>{`New Project | Abraham Duno`}</title> </Head>

    <div className={`px-100 Q_xs_px-3 `}>
        <main className="">
            <BreadCrumbs pages={[["/portfolio","Portfolio"]]} current={`Add Project`} />
            <div className="Q_xs_sm my-2 invisible block">.</div>
            
            {!q__orgsObj &&
                <div className='pt-5'>
                    {JSON.stringify(q__orgsObj)}
                    <PagePlaceholder/>
                </div>
            }
            {q__orgsObj && <>
                <UnitAddComponent refetch={()=>{}} 
                    unit={DEFAULT_UNIT} optMapObj={q__orgsObj} docsArray={[]} 
                />
            </>}
        </main>
        <FooterLayout />
    </div>
    </>)
}