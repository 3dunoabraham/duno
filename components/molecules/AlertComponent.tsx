import { useEffect } from "react"
import { AlertNotification } from "@/components/molecules/AlertNotification"

export const AlertComponent = ({
    msg,
    delay = 4000,
    s__msg,
    badgeClass="ims-badge-faded",
})=>{
    useEffect(()=>{
        if (msg == "") return
        
    },[msg])
    const onHide = ()=>{
        s__msg("")
    }

    return (
        <div>
            {msg != "" && 
                <AlertNotification s__msg={s__msg} delay={delay} onHide={onHide} alertMsg={msg} badgeClass={badgeClass} />
            }
        </div>
    )
}