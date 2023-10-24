import styles from '@/styles/Loading.module.css';

export default function Loading() {
    return <div className='fixed top-0 left-0 w-full h-screen z-[100] flex justify-center items-center bg-black'>
        <div className={styles["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
}