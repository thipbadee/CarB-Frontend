import Image from 'next/image'
import InteractiveCard from './InteractiveCard';

export default function ProductCard( { carName, imgSrc, onCompare }
     : { carName:string, imgSrc:string, onCompare?:Function }){
    const cn = carName.toUpperCase();
    return(
        <InteractiveCard contentName={ cn}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[15%] p-[20px] text-center font-bold text-red-400 text-3xl drop-shadow-xl '>{cn}</div>
            {
                onCompare? <button className='block h-[10%] text-sm rounded-md bg-sky-600
                hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm'
                onClick={ (e)=>{ e.stopPropagation(); e.preventDefault() ; onCompare(carName) }}
                >Compare</button> : ''
            }
        </InteractiveCard>
    );
}