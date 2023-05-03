// ReactFunctionComponent
export const FooterLayout = ()=>{
	return (
    <footer className="mt-100 pt-8 pb-4 flex-center Q_xs_lg_flex-col ">
        <div className="pb-4 px-5  flex-center Q_xs_sm_flex-col">
          	<span className="ims-tx-faded">Abraham Duno |</span>
          	<a href="https://twitter.com/tresduno" target="_blank">
				<span className="tx-deco ims-tx-primary tx-bold-5 tx-mdl pl-1 ">
					twitter: @tresduno
				</span>
			</a>
        </div>
        <div className="pb-4 px-5 opaci-75 tx-md ims-tx-faded flex-wrap">
			<a className="px-2 ims-tx-link opaci-chov--50 flex-col"
				href="https://instagram.com/3duno/" target="_blank" >
				<div className="tx-bold">instagram:</div> <div className="tx-sm">@3duno</div>
			</a>
			|	
			<a className="px-2 ims-tx-link opaci-chov--50 flex-col"
				href="https://github.com/3dunoabraham" target="_blank" >
				<div className="tx-bold">github:</div> <div className="tx-sm">@3dunoabraham</div>
			</a>
			|
			<a className="px-2 ims-tx-link opaci-chov--50 flex-col"
				href="https://3duno.itch.io/" target="_blank" >
				<div className="tx-bold">itch.io:</div> <div className="tx-sm">@3duno</div>
			</a>
        </div>
    </footer>
	)
}