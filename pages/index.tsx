import { useState, useContext } from "react";
import Link from 'next/link'


import { AppContext } from "@/scripts/contexts/AppContext"
// ReactFunctionPageComponent
export default function IndexPage()
{
    const app = useContext(AppContext)
    const [amIDev,s__amIDev] = useState()
    const [loadingNewPage, s__loadingNewPage] = useState(false)
    const apiDocsUrl = (
        "https://servicepadportal.atlassian.net/wiki/spaces/SP/pages/459538444/Inventory+API+V1"
    ) 
    return ( 
    <div className="ims-body flex-center h-100" >
        <main className="ims-body-inner ims-body-home ">
            <div className="mb-8 tx-xl tx-bold-3 flex-col" >
                {!loadingNewPage ? <div className="tx-mdl tx-ls-5 opaci-50">Abraham</div> : <div className="tx-sm tx-ls-5 opaci-50">Loading</div>}
                <span className="px-3 tx-bold-5 flex">
                    <div style={{color:"#74AA57"}}>D</div>
                    <div style={{color:"#F4BA07"}}>U</div>
                    <div style={{color:"#F44A37"}}>N</div>
                    <div style={{color:"#748AF7"}}>O</div>
                </span>
                {!!loadingNewPage ? ". . ." : ""}
            </div>
            {!loadingNewPage && <div className="flex-col-r mt-8 ">
                <div className="tx-gray ims-border-faded  opaci-chov--50 pa-2  bord-r-8 ma-2">
                    <Link href="/unit/add">
                        <a  className=" pa-2 tx-" onClick={()=>{s__loadingNewPage(true)}} >
                            <div className="tx-ls-1 tx-lgx">+ New Project </div>
                            <p className="mt-1 tx-">Request New Project Idea</p>
                        </a>
                    </Link>
                </div>
                <div className="flex-wrap  ">
                    <div className="flex-wrap flex-align-start ">
                        <Link href="/portfolio">
                            <a  className="ims-cardlink" onClick={()=>{s__loadingNewPage(true)}} >
                                <h2 className="">Portfolio &rarr;</h2><p className="">Latest Projects</p>
                            </a>
                        </Link>
                        {false && <Link href="/manufacturers">
                            <a  className="ims-cardlink" onClick={()=>{s__loadingNewPage(true)}} >
                                <h2 className="">Dealers &rarr;</h2><p className="">Order List</p>
                            </a>
                        </Link>}
                    </div>
                </div>
            </div>}
        </main>
    </div>
    )
}