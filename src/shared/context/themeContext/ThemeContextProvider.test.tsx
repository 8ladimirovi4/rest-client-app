import { describe, it, vi, afterEach, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { THEME } from 'shared/const/theme';
import ThemeContextProvider from './ThemeContextProvider';
import { useTheme } from 'shared/lib/hooks/useTheme';
import { value, setValue } from 'tests/moks/useLocalStorage'

describe('ThemeContextProvider', () => {

  beforeEach(() => {
    setValue(THEME.DARK);
    document.body.className = value
  })

    afterEach(() => {
        vi.clearAllMocks();
      });
   it('should provide default theme from localStorage and allow updating it', async() => {
    const TestComponent = () => {
        const { theme, toggleTheme } = useTheme();
        return (
          <div>
            <span data-testid="theme-value">{theme}</span>
            <button onClick={toggleTheme}>Switch theme</button>
          </div>
        );
      };

      const { getByTestId } = render(
    <ThemeContextProvider>
      <TestComponent />
    </ThemeContextProvider>
  );
   const themeText = getByTestId('theme-value');
   expect(themeText.textContent).toBe(THEME.DARK);

   const toggleThemebutton = screen.getByRole('button', {
    name: /Switch theme/i,
  });
   await userEvent.click(toggleThemebutton);
   setValue(THEME.LIGHT)
   expect(document.body.className).toBe(THEME.LIGHT);
})

})