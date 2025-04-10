'use client';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useTranslation } from 'react-i18next';

export const BodyTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { body } = useSelector((state: RootState) => state.apiRequest);
  const { setBody } = apiRequestActions;

  const handleSetBody = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    dispatch(setBody({ body: value }));
  };

  return (
    <div
      style={{ maxWidth: '500px', margin: '20px auto', textAlign: 'center' }}
    >
      <h2>{t('EmptyState.ProvideJson')}</h2>
      <textarea
        rows={10}
        style={{ width: '100%', fontFamily: 'monospace' }}
        value={body}
        onChange={handleSetBody}
      />
    </div>
  );
};

BodyTab.displayName = 'BodyTab';
