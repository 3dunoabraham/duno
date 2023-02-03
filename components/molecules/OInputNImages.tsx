import { useState, useMemo, useRef, useEffect, useContext } from 'react'
import { useOnClickOutside, useMap, useEffectOnce } from 'usehooks-ts'
import {
    BsThreeDots, BsTrash, BsPlus,
    BsChevronLeft, BsChevronRight, BsUpload, BsExclamationCircle, BsArrowDown, BsArrowUp,
} from 'react-icons/bs'


import { useDeviceXS_LG, useDeviceXS_MD, useDeviceXS_SM, useDeviceXS_XL
} from '@/scripts/helpers/useHooksHelper';
import { dd } from '@/scripts/helpers/devHelper';
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper';
import { API_IMAGE_UPLOAD_BASE, STATIC_IMAGE_BASE, API_IMAGES,API_INVALID_IMAGE_MAXSIZE,
    API_INVALID_IMAGE_ALREADY_LOADING,API_INVALID_IMAGE_FILETYPE, API_INVALID_IMAGE_CORRUPT,
    API_INVALID_IMAGE_DUPLICATE
} from '@/scripts/constants/api'
import { filename2Extension, filename2Type, isValidImgExt} from '@/scripts/helpers/type/stringHelper'
import { StandardModal } from '@/components/molecules/StandardModal'
import { OInputNImagesJustUploaded } from '@/components/molecules/OInputNImagesJustUploaded'
import { AppContext } from '@/scripts/contexts/AppContext';
import { parseReadableSize } from '@/scripts/helpers/type/numberHelper';
import { SliderCarousel } from '@/components/organisms/SliderCarousel';
import CSS from '@/styles/modules/Slider.module.css'
type I_OInputNImages = {
    uid: string; filelistString: string;
    config?: any; 
    updateNewData: (newObj:any)=>void; refetch: ()=>void;
}
// ReactFunctionComponent
export const OInputNImages = ({
    uid, filelistString,
    config = {}, 
    updateNewData, refetch=()=>{},
}: I_OInputNImages)=>{
    useEffect(()=>{
        refetchImagesArray()
    },[])
    /****** DATA ******/
    /*
        GW,filteredFileList:parsedImagesArray,
        loadedImages,loadedImages_do,
        isClicking,s__isClicking,
        pageOffset, s__pageOffset
    */
    const app = useContext(AppContext)
    const MAX_IMAGE_SIZE:number = 2097152
    const duplicateMessage = (
        "an image with the same name is already exist for another Unit, "+
        "change the name or delete the existing one first"
    )
    const $childRef =           useRef<any>()
    const $theInput =           useRef<HTMLInputElement>()
    const $divObj =          useRef<HTMLDivElement>()
    const [isOpen, s__isOpen] =                     useState(false);
    const [isGalleryModal, s__isGalleryModal] =     useState(false);
    const _useDeviceXS_SM = useDeviceXS_SM()
    const _useDeviceXS_MD = useDeviceXS_MD()
    const _useDeviceXS_LG = useDeviceXS_LG()
    const _useDeviceXS_XL = useDeviceXS_XL()
    const [isUploading, s__isUploading] =           useState<boolean>(false)
    const [isClicking, s__isClicking] =             useState(false)
    const [pageOffset, s__pageOffset] =             useState(0);
    const [liveImagesArray, s__liveImagesArray] =   useState([]);
    const [percentComplete, s__percentComplete] =   useState<number>(0);
    const [firstFile, s__firstFile] =               useState<{name:string,type:string,size:number}>()
    const [autoincrementID, s__autoincrementID] =   useState<number>(0)
    const [loadedImages, loadedImages_do] =    useMap<string, any>(new Map())
    const [imgMap, imgMap_do] =                useMap(new Map())
    const [failedUpload, s__failedUpload] = useState(false)
    /****** MEMO ******/
    const GW = useMemo(()=>{
        if (_useDeviceXS_SM) return 320
        if (_useDeviceXS_MD) return 420
        if (_useDeviceXS_LG) return 600
        if (_useDeviceXS_XL) return 480
        return 600
    }, [_useDeviceXS_SM,_useDeviceXS_MD,_useDeviceXS_LG, _useDeviceXS_XL])
    const parsedImagesArray = useMemo(()=>(filelistString == "[]" || !liveImagesArray.length)
        ? []
        : JSON.parse(filelistString).map((aImg, index)=>{
            let theReferenceArray = liveImagesArray || []
            let theFoundExt = theReferenceArray.filter((theRefImg, index)=>{
                return theRefImg.id == aImg
            })

            let staticURL = STATIC_IMAGE_BASE+"000000"

            if (theFoundExt.length == 0) return aImg
            return aImg+theFoundExt[0].img_ext
        })
    , [filelistString,liveImagesArray])
    const foundFileType = useMemo(() => firstFile?.type ? filename2Type(firstFile.type) : ""
    , [firstFile])
    const foundSize = useMemo(() => !!firstFile && parseReadableSize(firstFile?.size.toString())
    , [firstFile])
    const foundExtInFilename = useMemo(()=>(
        firstFile?.name ? filename2Extension(firstFile.name.replace(" ","_")) : ""
    ),[firstFile])
    const validatedFileType = useMemo(()=>(
        isValidImgExt(foundFileType, foundExtInFilename) ? foundFileType : null
    ),[foundFileType,foundExtInFilename] )
    const foundFilename = useMemo(() => firstFile?.name.replace(" ","_"), [firstFile])



    /****** UPDATE ******/
    useOnClickOutside($divObj, ()=>{s__isOpen(false) })
    const handleDrop = (e)=>{}
    const removeCurrentImage = async ()=>{
        let _currentPage = $childRef.current.getCurrentPage()
        // console.log("forward ref $childRef.current.getCurrentPage",_currentPage)
        // return
        let theExt = filename2Extension(parsedImagesArray[_currentPage])
        let theFileName = parsedImagesArray[_currentPage].replace(theExt, "")
        // console.log(_currentPage, parsedImagesArray[_currentPage], parsedImagesArray, theExt)
        sendDeleteRequest(theFileName)
    }
    const refetchImagesArray = async ()=>{
        let theImgObjArray = await fetchJsonArray(API_IMAGES,"Data")        
        s__liveImagesArray(theImgObjArray)
    }
    const sendDeleteRequest = async (theImageName)=>{
        let theImageId = theImageName
        try {
            let theResult = await fetch(API_IMAGES, {
                headers:{"Content-Type":"application/json"},
                method: 'DELETE',body:`{"imgs_ids":[${theImageId}]}`
            })
            await refetch()
            $childRef.current.setPrevPage()
            app.alert("success", "Image deleted successfully!")
        } catch (err) { dd('Error:', err); }
    }
    const handleChange = ()=>{
        if (isUploading) return alert(API_INVALID_IMAGE_ALREADY_LOADING)
        const firstCurrentFile = $theInput.current.files[0]
        let totalBytes = firstCurrentFile.size
        if (totalBytes > MAX_IMAGE_SIZE) return alert(API_INVALID_IMAGE_MAXSIZE)

        if (firstCurrentFile.type == "") return alert(API_INVALID_IMAGE_CORRUPT)
        let theParsedFileType = filename2Type(firstCurrentFile.type)
        let theParsedFileExt = filename2Extension(firstCurrentFile.name.replace(" ","_"))
        if (!isValidImgExt(theParsedFileType,theParsedFileExt))
        {
            return alert(API_INVALID_IMAGE_FILETYPE)
        }

        s__firstFile(firstCurrentFile)
        s__isUploading(true)
        sendImage(firstCurrentFile)
    }
    const sendImage = (firstCurrentFile)=>{
        let theUrl = API_IMAGE_UPLOAD_BASE+`${uid}/`
        const payload = new FormData();
        payload.append("img", firstCurrentFile, firstCurrentFile.name.replace(" ","_"));

        const options = { method: 'POST', body: payload,
          headers: {
            'Accept': (
                'text/html,application/xhtml+xml,application/xml;q=0.9,'
                +'image/avif,image/webp,*/*;q=0.8'
            )
          },
        };

        const req = new XMLHttpRequest();
        s__failedUpload(false)
        req.open('POST', theUrl);

        
        req.onreadystatechange = function (oEvent) {
            if (req.readyState === 4) {
                if (req.status === 200) {
                } else {
                   dd("Error", req.statusText);
                   s__isUploading(false)
                   s__failedUpload(true)
                }
            }
        };


        req.upload.addEventListener('progress', (e)=>{
            s__percentComplete(parseInt(`${(e.loaded / e.total)*100}`))
        })
        req.addEventListener('load', async (e)=>{
            s__isUploading(false)
            if (req.status >= 400)
            {
                if (req.statusText == "Request Entity Too Large")
                {
                    s__firstFile(null)
                    return alert("File Exceeds the Size Limit")
                }
            }
            if (    req.response.trim()[0] == "{" &&
                    JSON.parse(req.response) && JSON.parse(req.response).Message == duplicateMessage)
            {
                s__firstFile(null)
                return alert(API_INVALID_IMAGE_DUPLICATE)
            }
            let newSavedImage = {
                size:firstCurrentFile.size,  name:firstCurrentFile.name.replace(" ","_"),
                lastModified:firstCurrentFile.lastModified,  type:firstCurrentFile.type,
            }
            await refetchImagesArray()
            s__isOpen(false);s__isGalleryModal(false)
            s__percentComplete(0)
            s__autoincrementID(autoincrementID+1)
            s__firstFile(null)
            app.alert("success", "Image uploaded successfully!")
            await refetch()
        })
         req.send(payload);

    }



    /****** HTML ******/
    return (
    <div className="flex-col bord-r-8  ims-bg-faded w-100 pos-rel" >
        <SliderCarousel ref={$childRef} {...{GW,filteredFileList:parsedImagesArray,pageOffset, s__pageOffset}} />

        <div className="pos-abs  top-0 right-0" >
            <div className={` bord-r-100p clickble   tx-lg ${CSS["dots-button"]} pa-5`}
                onClick={()=>(isOpen ? s__isOpen(!isOpen) : s__isOpen(true))}
            >
                <span className={`pa-2 pb-1 ${CSS["dots-dots"]}`}><BsThreeDots /></span>
            </div>
            {isOpen && <div className="w-min-200px  pos-abs right-0 top-0 "  ref={$divObj}>
                <div className='tx-mdl z-100 bg-white ims-border-faded bord-r-8  w-100 autoverflow-y' >
                    <div className="flex-col flex-align-start flex-justify-start " >
                        {!!parsedImagesArray.length && <>
                            <div className={`
                                    flex-center flex-justify-start pa-2
                                    ims-tx-error clickble w-100 opaci-hov--50
                                `}
                                onClick={()=>{s__isOpen(!isOpen);removeCurrentImage()}
                            }>
                                <span className="px-2 "><BsTrash /></span>
                                <span className="pb-1">Remove</span>
                            </div>
                            <hr className="w-100"/>
                        </>}
                        <div className={`
                                flex-center flex-justify-start pa-2 ims-tx-faded
                                clickble w-100 opaci-hov--50
                            `}
                            onClick={()=>{s__isOpen(!isOpen);s__isGalleryModal(!isGalleryModal)}}
                        >
                            <span className="px-2 "><BsPlus /></span>
                            <span className="pb-1">Add</span>
                        </div>
                    </div>
                </div>
            </div>}
        </div>

        {parsedImagesArray.length == 0 &&
            <div className={`   flex-center pos-abs clickble ${CSS["emphasis"]}`} >
                <div className={`flex-col bord-r-8 clickble bg-white px-4 py-6 pb-1 mr-4 ma-2 ${CSS["emphasis-card"]}`}
                    onClick={()=>{s__isGalleryModal(!isGalleryModal) }}
                >
                    <span className="tx-sm">Add Image</span>
                    <span className="tx-xxl"><BsPlus /></span>
                </div>
            </div>
        }


        {isGalleryModal &&
            <StandardModal  title="Images"
                subtitle="Upload or remove images associated with this trailer"
                handleClose={()=>{
                    if (!isUploading) { s__isGalleryModal(!isGalleryModal) }
                    imgMap_do.reset()
                }}
            >


                {!!$theInput.current && !!firstFile && !failedUpload && (<>
                    <OInputNImagesJustUploaded {...{
                        theKey:0,
                        validatedFileType,foundFilename,foundSize,
                        percentComplete:percentComplete == 100 ? 99 : percentComplete}}
                    />
                </>)}
                        

                <div className={`pos-rel flex-center flex-col  bord-r-8 ims-border-faded   `}>
                    <span className="clickble block w-100">
                        <label htmlFor="theImage" className=" block w-100" onDrop={()=>{}}>
                            <span className=" w-100 py-4 flex-col flex-center">
                                <div className='flex'>
                                    <div className={"ims-circ-button-primary-desat tx-lg w-50px h-50px"}> 
                                        <BsUpload />
                                    </div>
                                </div>
                                
                                <div className="ims-tx-primary py-2">
                                    <span className="tx-bold-6">Click to upload</span>
                                    <span className="px-1">or</span>
                                    <span>drag and drop</span>
                                </div>
                                <span className="tx-bold-2 ims-tx-primary">JPG or PNG</span>
                                    <input type="file" ref={$theInput}
                                        role="button" accept="image/*" id="theImage"
                                        className={
                                            " clickble scale-110 pb-100 pt-8  "+
                                            " w-100 opaci-0 pos-abs z-700 "
                                        }
                                        style={{height:"0"}} 
                                        onDrop={handleDrop} onChange={handleChange} 
                                    />
                            </span>
                        </label>
                    </span>
                </div>
                {failedUpload && (<div className='flex-center mt-4'>
                    <div className='tx-red pt-2 pb-1 mr-3 px-2 bord-r-100 tx-lgx bg-red-25'><BsExclamationCircle/></div>
                    <div>
                        <div className='py-1 tx-red'>Upload failed, please try again</div>
                        <span className='ims-tx-lightdark'>{firstFile?.name}</span>
                        <span className='tx-start flex py-1 tx-red opaci-chov--50' onClick={()=>{sendImage(firstFile)}}>
                            <div  style={{borderBottom: "1px solid red"}}>Try Again</div>
                        </span>
                    </div>
                </div>)}
            </StandardModal>
        }
    </div>
    )
}