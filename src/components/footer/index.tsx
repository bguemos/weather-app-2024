import styles from './Footer.module.css'
import Image from "next/image";





export default function Footer() {




    return (

        <>
        <div className={styles.footer}>

        <Image 
         src='/whitelogo.png'
         height={200}
         width={200}
         alt='logo'
        
         />

        </div>
        
        </>
    )
}