'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import styles from '../styles.module.css';
import { Button } from 'shared/ui/Button/Button.tsx';

export const BodyTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { body } = useSelector((state: RootState) => state.apiRequest);
  const [format, setFormat] = useState<'plaintext' | 'json'>('json');

  const { setBody } = apiRequestActions;

  const handleEditorChange = (value: string | undefined): void => {
    const val = value || '';
    dispatch(setBody({ body: val }));
  };

  return (
    <div className={styles['restful-wrapper_tabview-container_body']}>
      <h2>{t('EmptyState.ProvideJson')}</h2>
      <div
        className={styles['restful-wrapper_tabview-container_format-buttons']}
      >
        <Button
          color={`${format === 'json' ? 'primary' : 'secondary'}`}
          onClick={() => setFormat('json')}
          title={`🧩 ${t('Buttons.Json')}`}
        ></Button>
        <Button
          color={`${format === 'plaintext' ? 'primary' : 'secondary'}`}
          onClick={() => setFormat('plaintext')}
          title={`📝 ${t('Buttons.Text')}`}
        ></Button>
      </div>
      <Editor
        height="150px"
        language={format}
        defaultLanguage={'json'}
        defaultValue=""
        value={body}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          formatOnType: true,
          formatOnPaste: true,
          lineNumbers: 'on',
          renderLineHighlight: 'none',
          glyphMargin: false,
          folding: false,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

BodyTab.displayName = 'BodyTab';
