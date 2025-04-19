import { describe, it, beforeEach, vi, expect } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { GenerateCodeTab } from './GenerateCodeTab';
import * as codegen from 'postman-code-generators';
import * as sdk from 'postman-collection';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

vi.mock('@monaco-editor/react', () => ({
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (str: string) => void;
  }) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      readOnly
    />
  ),
}));

vi.mock('postman-code-generators', () => {
  return {
    default: {
      convert: vi.fn(),
    },
    convert: vi.fn(),
  };
});

vi.mock('postman-collection', () => ({
  default: {
    Request: vi.fn(),
  },
}));

describe('CodeGeneratorTab feature', () => {
  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('renders select and editor with default values', () => {
    const { getByDisplayValue, getByTestId } = renderWithProviders(
      <GenerateCodeTab />
    );
    const select = getByDisplayValue(/cUrl/i);
    const editor = getByTestId('monaco-editor');

    expect(select).toBeInTheDocument();
    expect(editor).toBeInTheDocument();
  });
  it('handles successful code generation', async () => {
    vi.mocked(codegen.default.convert).mockImplementation(
      (_lang, _fw, _req, _opts, cb) => {
        cb(null, 'generated snippet');
      }
    );

    const { getByDisplayValue } = renderWithProviders(<GenerateCodeTab />);

    await waitFor(() => {
      expect(getByDisplayValue('generated snippet')).toBeInTheDocument();
    });
  });
  it('handles exception inside useEffect (sdk.Request)', async () => {
    const mockRequest = vi
      .spyOn(sdk.default, 'Request')
      .mockImplementation(() => {
        throw new Error('sdk error');
      });

    const { getByText } = renderWithProviders(<GenerateCodeTab />);

    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
    expect(mockRequest).toHaveBeenCalled();
  });
  it('handles language change', async () => {
    renderWithProviders(<GenerateCodeTab />);

    const select = screen.getByRole('combobox');

    const newOptionValue = JSON.stringify({
      language: 'python',
      framework: 'requests',
      label: 'Python (Requests)',
    });

    fireEvent.change(select, { target: { value: newOptionValue } });

    expect(select).toHaveDisplayValue(/python \(requests\)/i);
  });
});
