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
            <div className="mb-8 tx-xl tx-bold-3">
                {!loadingNewPage ? "" : "Loading"}
                <span className="px-3 tx-bold-5">SP-IMS</span>
                {!!loadingNewPage ? ". . ." : ""}
            </div>
            {!loadingNewPage && <div className="flex-center flex-wrap mt-8 flex-align-start ">
                <div className="ims-button-primary   ma-1">
                    <Link href="/unit/add">
                        <a  className=" pa-2 tx-" onClick={()=>{s__loadingNewPage(true)}} >
                            <div className="tx-ls-1 tx-lgx">+ New Unit </div>
                            <p className="mt-1 tx-">Add Unit to Inventory</p>
                        </a>
                    </Link>
                </div>
                <div className="flex-wrap  ">
                    <div className="flex-wrap flex-align-start ">
                        <Link href="/inventory">
                            <a  className="ims-cardlink" onClick={()=>{s__loadingNewPage(true)}} >
                                <h2 className="">Inventory &uarr;</h2><p className="">Unit List</p>
                            </a>
                        </Link>
                        <Link href="/inventory?stts=1">
                            <a  className="ims-cardlink" onClick={()=>{s__loadingNewPage(true)}} >
                                <h2 className="">Store &rarr;</h2><p className="">Available Units</p>
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