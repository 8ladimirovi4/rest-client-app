'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import styles from '../styles.module.css';

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
        <button
          className={`${styles['restful-wrapper_tabview-container_button']} ${format === 'json' ? styles['restful-wrapper_tabview-container_active'] : ''}`}
          onClick={() => setFormat('json')}
        >
          {`🧩 ${t('Buttons.Json')}`}
        </button>
        <button
          className={`${styles['restful-wrapper_tabview-container_button']} ${format === 'plaintext' ? styles['restful-wrapper_tabview-container_active'] : ''}`}
          onClick={() => setFormat('plaintext')}
        >
          {`📝 ${t('Buttons.Text')}`}
        </button>
      </div>
      <Editor
        data-testid="qatype-monaco-editor"
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
