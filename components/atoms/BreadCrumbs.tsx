import Link from 'next/link'


export interface BreadCrumbsProps { pages: string[][]; current?: string; }
// ReactFunctionComponent
export const BreadCrumbs = ( { pages, current }: BreadCrumbsProps)=>{
    return (
    <div className="flex-center flex-justify-start pt-7 mt-1 tx-smd">
        <Link  href="/">
            <a className=" opaci-hov--50 py-2 pr-1">
                {/* <div className="ims-tx-primary tx-bold-6 ">Abraham Duno</div> */}
                <span className="tx-lgx tx-bold-5 flex ">
                    <div style={{color:"#74AA57"}}>D</div>
                    <div style={{color:"#F4BA07"}}>U</div>
                    <div style={{color:"#F44A37"}}>N</div>
                    <div style={{color:"#748AF7"}}>O</div>
                </span>
            </a>
        </Link>
        {pages.map(([pageUrl,pageTitle], index)=>(
            <div className="   clickble" key={index}>
                <span> <b className="opaci-10 tx-mdl py-2">/</b> </span>
                <a href={pageUrl} className=" opaci-hov--50 pa-2">
                    <span className="tx-bold-4 ims-tx-faded">{pageTitle}</span>
                </a>
            </div>
        ))}
        {!!current && <>
            <b className="opaci-10 tx-mdl py-2">/</b>
            <div className="ims-tx-primary ims-bg-faded tx-bold-5 ml-2 pa-2 bord-r-8">
                {current}
            </div>
        </>}
    </div>
    )
}