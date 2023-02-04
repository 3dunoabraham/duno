import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { useMap } from 'usehooks-ts'


import '@/styles/_reset.css'
import '@/styles/css.css'
import '@/styles/ims-theme.css'
import { AppContext } from '@/scripts/contexts/AppContext'
import { DEFAULT_ALERT_MAPARRAY, USERS_DB } from '@/scripts/constants'
import { AlertComponent } from '@/components/molecules/AlertComponent'
import { Layout } from '@/components/templates/Layout'
import { SidebarLayout } from '@/components/templates/SidebarLayout'
const queryClient = new QueryClient()
// ReactFunctionPageComponent
export default function({ Component, pageProps, ...appProps  }) {    
    const isLayoutNeeded = ['/manufacturers'].includes(appProps.router.pathname);
	let [user, s__user] = useState({name:"John Doe"})
	// const usersDB = {"John Doe":{name:"John Doe"},"Admin":{name:"Admin"}}
	// const usersGrantsDB = {"John Doe":{unit:{add:true,delete:false}},"Admin":{unit:{add:false,delete:true}}}
	const setUser = (newUser) => {
		s__user(USERS_DB[newUser])
	}

    const [msgMap,msgMap__do] = useMap<string,any>(DEFAULT_ALERT_MAPARRAY)
    const alertNotification = (category="neutral", msg="")=>{
		msgMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
		{
			setTimeout(()=>{msgMap__do.set(category, msg)},100)
		}
    }
	let appValue = useMemo(()=>{
		return {
			user,setUser,
            msgMap,msgMap__do,alertReset:()=>{msgMap__do.setAll(DEFAULT_ALERT_MAPARRAY)},
			alert:(category, msg)=>{alertNotification(category, msg)}
		}
	},[user])

    return (<>
    {typeof pageProps.online == "boolean" && !pageProps.online && (
        <div className='_ddr tx-white tx-center tx-xsm pt-1' >
        </div>
    )}
    <QueryClientProvider client={queryClient}>
        <div className="flex flex-justify-between h-min-100vh">
            <AppContext.Provider value={appValue}>
                <div className="z-999">
                    <AlertComponent {...{
                        s__msg: (val)=>(msgMap__do.set("neutral", val)), msg:msgMap.get("neutral")}} 
                    />
                    <AlertComponent {...{
                        s__msg: (val)=>(msgMap__do.set("success", val)), msg:msgMap.get("success")}}
                        badgeClass="ims-badge-success"
                    />
                    <AlertComponent {...{
                        s__msg: (val)=>(msgMap__do.set("warn", val)), msg:msgMap.get("warn")}}
                        badgeClass="ims-badge-secondary" 
                    />
                    <AlertComponent {...{
                        s__msg: (val)=>(msgMap__do.set("error", val)), msg:msgMap.get("error")}}
                        badgeClass="ims-badge-error" 
                    />
                </div>
                <SidebarLayout linksObj={pageProps.sidebarLinksObj} isVisible={isLayoutNeeded} /> 
                <div className="flex-col w-100">
                    <Layout> <Component {...pageProps} /> </Layout>
                </div>
            </AppContext.Provider>
        </div>
    </QueryClientProvider>
    </>)
}
