import { Limiter } from '@/components/common/Limiter';

export const ProfileBody = () => {
    return (
        <div className='bg-black w-full flex justify-center px-4'>
            <Limiter>
                <span>a</span>
            </Limiter>
        </div>
    );
};
