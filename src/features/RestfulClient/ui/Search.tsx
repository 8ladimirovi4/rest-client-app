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

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { browserUrl, method } = useSelector(
    (state: RootState) => state.apiRequest
  );

  const { setBrowserUrl, setMethod, setTriggerFetch } = apiRequestActions;

  const handleMethodSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    dispatch(setMethod({ method: value }));

    const currentUrl = new URL(window.location.href);
    currentUrl.pathname = `/${value}`; 
    currentUrl.searchParams.set('link', browserUrl); 
    window.history.pushState({}, '', currentUrl.toString());
  };

  const handleSetLink = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    dispatch(setBrowserUrl({ browserUrl: value }));
  };

  const handleSendRequest = () => {
    const defaultMethod = method || 'GET';
    if (browserUrl != '') {
      router.push(`/${defaultMethod}?link=${encodeURIComponent(browserUrl)}`);
      dispatch(setTriggerFetch());
    }
  };

  return (
    <div className={styles['restful-wrapper_search-container']}>
      <div className={styles['restful-wrapper_search-container_select']}>
        <Select
          id="1"
          options={METHODS}
          height={50}
          width={130}
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
