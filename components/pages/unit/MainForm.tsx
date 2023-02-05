import { useContext, useMemo } from 'react'


// import { dlog, dd, isDevEnvironment } from '@/scripts/helpers/devHelper';
import { AppContext } from '@/scripts/contexts/AppContext'
import { useArrayMapPlus } from '@/scripts/helpers/useHooksHelper'
import { IUnit, IUnitBaseOpts } from '@/scripts/constants/unit'
import { MainFormInputSelect } from '@/components/pages/unit/MainFormInputSelect'
import { OInputNImages } from '@/components/molecules/OInputNImages'
import { OInputNMeasure } from '@/components/molecules/OInputNMeasure'
import CSS from '@/styles/modules/UnitMainForm.module.css'
export interface UnitMainFormProps {
    updateNewData?: any;
    unit?: IUnit;
    isAddPage?: boolean;
    optMapObj?: any,
    editMode?: boolean;
    refetch?: () => void;
}
// ReactFunctionComponent
export const UnitMainForm = ({
    updateNewData,
    unit,
    optMapObj,
    isAddPage,
    editMode,
    refetch=()=>{},
}: UnitMainFormProps)=>{
    const app = useContext(AppContext);

    /****** DATA ******/
    const DEFAULT_INPUT_KEYMAP_OBJECT = {
        "size": {
            width: {
                title:"Width", value: "11", floatField: "9", 
                format_title:"ft/in", format_titles:["feet","inches"],
            },
            length: {
                title:"Length", value: "11", floatField: "9", 
                format_title:"ft/in", format_titles:["feet","inches"],
            },
            height: {
                title:"Height", value: "11", floatField: "9", 
                format_title:"ft/in", format_titles:["feet","inches"],
            },
        },
    }
    const [styles, styles_do, styles_obj] = (
        useArrayMapPlus(optMapObj.styles,"id", unit.style,"label")
    );
    // const [sales_statuses, sales_statuses_do, sales_statuses_obj] = (
    //     useArrayMapPlus(optMapObj.sales_statuses,"id", unit.sales_status,"id")
    // );
    const [conditions, conditions_do, conditions_obj] = (
        useArrayMapPlus(optMapObj.conditions,"id", unit.condition,"id")
    );
    const [statuses, statuses_do, statuses_obj] = (
        useArrayMapPlus(optMapObj.statuses,"id", unit.status,"id")
    );
    const [distributors, distributors_do, distributors_obj] = (
        useArrayMapPlus(optMapObj.distributors,"id", unit.distributor,"name")
    );
    const [categories, categories_do, categories_obj] = (
        useArrayMapPlus(optMapObj.categories,"id", unit.category,"name")
    );
    const [subcategories, subcategories_do, subcategories_obj] = (
        useArrayMapPlus(optMapObj.subcategories,"id", unit.category,"name")
    );
    // const [states, states_do, states_obj] = (
    //     useArrayMapPlus(optMapObj.states,"id", unit.state,"name")
    // );
    const [owners, owners_do, owners_obj] = (
        useArrayMapPlus(optMapObj.owners,"id", unit.owner,"name")
    );
    const unit_subcategory = useMemo(() =>
        !optMapObj ? -1 : optMapObj.categories.filter(object => {return object.name == unit.subcategory; })[0]
    , [optMapObj,unit]);



    /****** UPDATE ******/
    const updateGallery = (newDataObj)=>{
    }
    const updateField = (newDataObj)=>{
        updateNewData(newDataObj)
    }
    const updateEntityField = (newDataObj)=>{
        updateNewData(newDataObj)
    }



    /****** HTML ******/
    return (
    <div className="flex flex-align-start  Q_xs_md_flex-col"> 
        <div className={`flex-col flex-align-start  pt-0 pa-4 flex-1 ${CSS["unit-mainform_inputs"]} `}>
            <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="Category"
                    // sublabel="Category or Medium"
                    display={unit.category}
                    value={categories_obj ? categories_obj.id : 0 }
                    optMap={categories} optName={"slug"}
                    editMode={editMode}     inputName="category"
                    boolConfig={["isReadOnly", "isErasable"]}
                    updateNewData={updateEntityField} 
                />}
            </div> 
            <div className={`    flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                {<MainFormInputSelect  label="Subcategory" 
                    defaultDisplay={unit.subcategory == "None" ? unit.category : unit.subcategory}
                    display={unit.subcategory == "None" ? "" : unit.subcategory}
                    optMap={subcategories} optName={"slug"} value={unit_subcategory ? unit_subcategory.id : 0}
                    editMode={editMode}   updateNewData={updateEntityField}   inputName="subcategory"
                    boolConfig={["isReadOnly", "isErasable"]}
                />}
            </div>
            <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <MainFormInputSelect  label="Style"   inputName="style"
                    display={unit.style} optName={"slug"}
                    value={styles_obj ? styles_obj.id : 0 }
                    optMap={styles} 
                    editMode={editMode}  boolConfig={["isErasable"]}
                    updateNewData={updateField}
                /> 
            </div>
            {/* <div className={`     flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <OInputNMeasure  label={"Size"}   inputName="size"
                    value={unit.size}
                    inputkeyobj={DEFAULT_INPUT_KEYMAP_OBJECT.size} editMode={editMode}
                    updateNewData={updateField} 
                />
            </div> */}
            
            {/* <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <MainFormInputSelect  label="Condition"   inputName="condition"
                    display={conditions_obj ? conditions_obj.label : ""}
                    value={unit.condition}
                    optMap={conditions} 
                    editMode={editMode}  boolConfig={[]}
                    updateNewData={updateField}
                /> 
            </div> */}
            <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <MainFormInputSelect  label="Status"   inputName="status"
                    sublabel='Is it publicly available to see / use?'
                    display={statuses_obj ? statuses_obj.label : ""}
                    value={unit.condition} optName={"slug"}
                    optMap={statuses} 
                    editMode={editMode}  boolConfig={[]}
                    updateNewData={updateField}
                /> 
            </div>
            {/* <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="State" 
                    display={unit.state} value={states_obj ? states_obj.id : 0}
                    optMap={states} optName={"slug"}
                    editMode={editMode}    inputName="state"
                    boolConfig={["isReadOnly",  "isErasable"]}
                    updateNewData={updateEntityField} 
                />}
            </div> */}
            {/* <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="Distributor"
                    sublabel="The company providing unit to Dealer"
                    display={unit.distributor} value={distributors_obj ? distributors_obj.id : 0 }
                    optMap={distributors} optName={"slug"}
                    editMode={editMode} inputName="distributor"
                    boolConfig={["isReadOnly", "isErasable"]}
                    updateNewData={updateEntityField}   
                />}
            </div>*/}
            <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="Owner"  
                    sublabel='The agent that owns the final product'
                    display={unit.owner} value={owners_obj ? owners_obj.id : unit.owner } 
                    optMap={owners} optName={"slug"}
                    editMode={editMode}    inputName="owner" 
                    updateNewData={updateEntityField} 
                    boolConfig={["isReadOnly","isErasable"]}
                />}
            </div>
        </div>

        <div className={`flex-col  flex-align-center ${CSS["unit-mainform_gallery"]} `}>
            {isAddPage &&  <><div className="ims-bg-faded h-400px bord-r-8 w-400px"></div></>}
            {!isAddPage && 
                <div className="flex-col flex-align-center pb-4   ">
                    <OInputNImages uid={unit.uid} filelistString={unit.images} 
                        
                        updateNewData={updateGallery} refetch={refetch} 
                    />
                </div>
            }
        </div>
    </div>
    )
}