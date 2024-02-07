import styles from './Header.module.css'
import Image from "next/image";


export default function Header() {


    return (
        <>
        <div className={styles.header}>

        <Image 
         src='/logo.png'
         height={200}
         width={200}
         alt='logo'
        
         />

        </div>
        
        </>
    )
}