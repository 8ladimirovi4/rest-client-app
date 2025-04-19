import { render } from '@testing-library/react';
import i18n from './i18nForTests';
import { I18nextProvider } from 'react-i18next';


const renderWithProviders = (ui: React.ReactElement) => 
    render(<I18nextProvider  i18n={i18n}>{ui}</I18nextProvider >);

export default renderWithProviders;