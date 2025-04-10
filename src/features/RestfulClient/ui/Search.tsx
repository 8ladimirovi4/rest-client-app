//@ts-nocheck
'use client';
import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { Select, Input, Button } from 'shared/index';
import { METHODS } from 'shared/constants/http-methods';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { v4 } from 'uuid';
import { setUrl } from 'shared/utils/help';

const Search = () => {
  const dispatch = useDispatch();
  const { browserUrl, method } = useSelector(
    (state: RootState) => state.apiRequest
  );

  const { setBrowserUrl, setMethod, setApiId } = apiRequestActions;
  const currentUrl = new URL(window.location.href);

  const handleMethodSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    dispatch(setMethod({ method: value }));
  };

  const handleSetLink = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    dispatch(setBrowserUrl({ browserUrl: value }));
  };

  const handleSendRequest = () => {
    const currentMethod = method || 'GET';

    if (browserUrl != '') {
      setUrl(currentUrl, currentMethod, browserUrl);
      const id = v4();
      dispatch(setApiId({ id }));
    }
  };

  return (
    <div className={styles['restful-wrapper_search-container']}>
      <div className={styles['restful-wrapper_search-container_select']}>
        <Select
          id="1"
          options={METHODS}
          height={50}
          width={140}
          value={method}
          onChange={handleMethodSelect}
        />
      </div>
      <div className={styles['restful-wrapper_search-container_input']}>
        <Input id="1" type="text" value={browserUrl} onChange={handleSetLink} />
      </div>
      <div className={styles['restful-wrapper_search-container_button']}>
        <Button title={'SEND'} height={50} onClick={handleSendRequest} />
      </div>
    </div>
  );
};

export default Search;
