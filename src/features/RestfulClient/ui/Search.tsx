//@ts-nocheck
'use client';
import React, { ChangeEvent, useEffect, useLayoutEffect } from 'react';
import styles from './styles.module.css';
import { Select, Input, Button } from 'shared/index';
import { METHODS } from 'shared/constants/http-methods';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';

const Search = ({ fetchData }) => {
  const router = useRouter();
  const [method, setMethod] = useLocalStorage({
    key: 'method',
    defaultValue: 'GET',
  });
  const [link, setLink] = useLocalStorage({
    key: 'link',
    defaultValue: '',
  });

  const handleMethodSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    setMethod(value);
    router.push(`/${value}?link=${encodeURIComponent(link)}`);
  };

  const handleSetLink = (evt: ChangeEvent<HTMLInputElement>) => {
    setLink(evt.target.value);
  };

  const handleSendRequest = () => {
    router.push(`/${method}?link=${encodeURIComponent(link)}`);
    fetchData();
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
        <Input id="1" type="text" value={link} onChange={handleSetLink} />
      </div>
      <div className={styles['restful-wrapper_search-container_button']}>
        <Button title={'SEND'} height={50} onClick={handleSendRequest} />
      </div>
    </div>
  );
};

export default Search;
