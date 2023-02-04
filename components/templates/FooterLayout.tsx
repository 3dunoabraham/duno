// ReactFunctionComponent
export const FooterLayout = ()=>{
	return (
    <footer className=" pt-8 pb-4 flex-center Q_xs_lg_flex-col ">
        <div className="pb-4 px-5  flex-center Q_xs_sm_flex-col">
          	<span className="ims-tx-faded">Abraham Duno |</span>
          	<a href="mailto:support@servicepad.com">
				<span className="tx-deco ims-tx-primary tx-bold-5 tx-mdl pl-1 ">
					tresduno@gmail.com
				</span>
			</a>
        </div>
        <div className="pb-4 px-5 opaci-75 tx-md ims-tx-faded">
			<a className="px-2 ims-tx-link opaci-chov--50"
				href="https://localhost:3000/portfolio?cat=1">
				art
			</a>
			|	
			<a className="px-2 ims-tx-link opaci-chov--50"
				href="https://localhost:3000/portfolio?cat=2">
				code
			</a>
			|
			<a className="px-2 ims-tx-link opaci-chov--50"
				href="https://localhost:3000/portfolio?cat=3">
				games
			</a>
        </div>
    </footer>
	)
}