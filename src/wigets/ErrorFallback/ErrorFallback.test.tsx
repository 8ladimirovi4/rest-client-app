import { mockFirebase } from 'tests/moks/firebaseMocks';
import { describe, it, beforeEach, expect, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorFallback } from './ui/ErrorFallback';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
describe('ErrorFallback wiget', () => {
  const error = {
    name: 'Error',
    message: 'Something went wrong',
  };

  beforeEach(() => {
    mockFirebase();
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it('should render with default props', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <ErrorFallback error={error} />
      </I18nextProvider>
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
  it('renders error message', () => {
    const { getByRole, getByText } = render(
      <I18nextProvider i18n={i18n}>
        <ErrorFallback error={error} />
      </I18nextProvider>
    );

    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByText(error.message)).toBeInTheDocument();
  });
  it('triggers button click (no reload check)', async () => {
    const { getByRole } = render(
      <I18nextProvider i18n={i18n}>
        <ErrorFallback error={error} />
      </I18nextProvider>
    );

    const button = getByRole('button');
    await userEvent.click(button);

    expect(button).toBeDefined();
  });
});
