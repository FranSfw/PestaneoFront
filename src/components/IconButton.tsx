import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface dashBhutton{
    id:string;
    text?:string;
    icon?:IconProp;
    onClick:()=>void;
}


export function IconButton({id,text,icon,onClick}:dashBhutton){
    return(
        <button id={id} className="group flex absolute top-4 right-4 items-center transition-all hover:duration-500 focus:duration-0" onClick={onClick}>
        <div
        className=" bg-tertiaryYellow rounded-full flex w-12 h-12 items-center justify-center group-hover:bg-primaryBlack group-focus:bg-tertiaryYellow transition-all hover:duration-500 focus:duration-0"
        >
        <FontAwesomeIcon  icon={icon} className="text-primaryBlack group-hover:text-tertiaryYellow group-focus:text-tertiaryYellow transition-all hover:duration-500 focus:duration-0" />
        </div>

        <div>
        <p className="my-2 text-xl font-medium text-white group-hover:text-primaryBlack group-focus:text-primaryBlack transition-all hover:duration-500 focus:duration-0">
            {text}
        </p>
        </div>
        </button>
    );
}