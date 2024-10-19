interface Button{
    id:string;
    onClick:()=>void;
}


export function Button({id, onClick}:Button){

    
    return(
        <button id={id} onClick={onClick} className="flex justify-center py-3 w-full bg-[#0F172A] text-[#EEEEEE] rounded-lg shadow-xs font-sans font-normal hover:bg-[#FCDE70] focus:bg-[#FCDE70] hover:text-[#0F172A] focus:text-[#0F172A] transition-all hover:duration-500 focus:duration-0 manrope-400">
        {id}
        </button>
    );
}