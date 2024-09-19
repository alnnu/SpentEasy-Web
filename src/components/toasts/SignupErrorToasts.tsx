import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { FiAlertCircle } from "react-icons/fi";


function SignUpErrorToasts
(props: { count: number | undefined; errors: string[] | undefined;}) {
  const { errors, count } = props;
  return (
    <>    
      <Toast.Provider swipeDirection="right">
      {Array.from({ length: count? count : 0 }).map((_, index) => (
        <Toast.Root 
            className="bg-red-500 text-white text-xl rounded-xl  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            key={index} open={true}>
          <Toast.Description className='flex items-center gap-5'>
            <div className='w-4'>
              <FiAlertCircle  className='text-2xl'/>
            </div>
            {errors? errors[index]: ""}
          </Toast.Description>
        </Toast.Root>
        ))}
        
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
   
    </>
  );
}

export default SignUpErrorToasts