import React from 'react'
import styles from './styles.module.css'
import { Select, Input, Button} from 'shared/index'

const Search = () => {
  return (
    <div className={styles["restful-wrapper_search-container"]}>
        <div className={styles["restful-wrapper_search-container_select"]}>
    <Select height={50}/>
      </div>
      <div className={styles["restful-wrapper_search-container_input"]}>
    <Input/>
    </div>
    <div className={styles["restful-wrapper_search-container_button"]}>
    <Button title={'SEND'} height={50}/>
    </div>
    </div>
  )
}

export default Search
