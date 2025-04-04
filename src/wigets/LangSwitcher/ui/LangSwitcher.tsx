import { useTranslation } from 'react-i18next';
import React, { memo, useEffect } from 'react';
import { Select } from 'shared/ui/Select/Select.tsx';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage.ts';

const langs = [
  { id: '1', value: 'en', label: 'en' },
  { id: '2', value: 'ru', label: 'ru' },
];

export const LangSwitcher = memo(() => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useLocalStorage({
    key: 'bug-busters-rest-lang',
    defaultValue: 'en',
  });

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, []);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    setCurrentLang(e.currentTarget.value);
  };

  return (
    <Select
      id={'lang-select'}
      value={currentLang}
      options={langs}
      onChange={changeLanguage}
    />
  );
});

LangSwitcher.displayName = 'LangSwitcher';
