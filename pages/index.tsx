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
        "https://duno.vercel.app"
    ) 
    return ( 
    <div className=" flex-center h-100" style={{background:"linear-gradient(-45deg, #FFf9e6, #FFFFFF, #FFf9e6)"}} >
        <main className=" ">
            <div className="mb-8 tx-xl tx-bold-3 flex-col" >
                {!!loadingNewPage &&
                    <div className="mb-8" >
                        <div className="spin-4 flex ">
                            .
                            <div className="tx-lgtx-bold-8 spin-2 opaci-50 px-2">. . .</div>
                            {/* <div className="tx-lg spin-1 opaci-50">.</div> */}
                            .
                        </div>
                    </div>
                }
                {!loadingNewPage && <div className="mt-8 tx-mdl tx-ls-5 opaci-50 ">Abraham</div>}
                <span className="px-3 tx-bold-5 flex ">
                    <div style={{color:"#74AA57"}}>D</div>
                    <div style={{color:"#F4BA07"}}>U</div>
                    <div style={{color:"#F44A37"}}>N</div>
                    <div style={{color:"#748AF7"}}>O</div>
                </span>
                {!!loadingNewPage && <div className="tx-sm tx-ls-5 opaci-50 ">Loading</div>}
                {/* {!!loadingNewPage ? ". . ." : ""} */}
            </div>
            {<div className="flex-col-r mt-8 ">
                <div className="tx-gray px-4   opaci-chov--50 pa-2    bord-r-8 ma-2">
                    <a href="https://twitter.com/tresduno" target="_blank"  className=" pa-2  tx-" onClick={()=>{s__loadingNewPage(true)}} >
                        <div className="tx-ls-1 tx-lgx">Contact Me </div>
                        <p className="mt-1 tx-">on twitter @tresduno</p>
                    </a>
                </div>
                <div className="flex-wrap  ">
                    <div className="flex-wrap flex-align-start  ">
                        <Link href="/portfolio">
                            <a   className="px-4 tx-white tx-lg opaci-chov--75 py-2" onClick={()=>{s__loadingNewPage(true)}} 
                                style={{background:"linear-gradient(-45deg, #FF9F66, #FF9F66)"}}
                            >
                                <h2 className="">Portfolio &rarr;</h2><p className="">Latest Projects</p>
                            </a>
                        </Link>
                        {false && <Link href="/categories">
                            <a  className="ims-cardlink " onClick={()=>{s__loadingNewPage(true)}} >
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