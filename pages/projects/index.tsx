// ReactFunctionPageComponent
export default function UnitsPage() {return <></> }

export const getServerSideProps = async (context)=>({
    redirect: { permanent: false, destination: '/portfolio' }
})
