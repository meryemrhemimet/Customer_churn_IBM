import { useEffect, useState } from "react";

const LIGHT_VARS = {
  "--background": "0 0% 100%",
  "--foreground": "220 20% 10%",
  "--card": "0 0% 100%",
  "--card-foreground": "220 20% 10%",
  "--popover": "0 0% 100%",
  "--popover-foreground": "220 20% 10%",
  "--primary": "185 80% 55%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "220 15% 96%",
  "--secondary-foreground": "220 20% 10%",
  "--muted": "220 15% 94%",
  "--muted-foreground": "215 12% 50%",
  "--accent": "280 70% 60%",
  "--accent-foreground": "220 20% 10%",
  "--destructive": "0 72% 58%",
  "--destructive-foreground": "0 0% 100%",
  "--success": "155 70% 45%",
  "--success-foreground": "0 0% 100%",
  "--warning": "38 92% 55%",
  "--warning-foreground": "0 0% 100%",
  "--border": "220 15% 90%",
  "--input": "220 15% 90%",
  "--ring": "185 80% 55%",
  "--sidebar-background": "0 0% 98%",
  "--sidebar-foreground": "220 20% 10%",
  "--sidebar-primary": "185 80% 55%",
  "--sidebar-primary-foreground": "0 0% 100%",
  "--sidebar-accent": "220 15% 94%",
  "--sidebar-accent-foreground": "220 20% 10%",
  "--sidebar-border": "220 15% 90%",
  "--sidebar-ring": "185 80% 55%",
};

const DARK_VARS = {
  "--background": "220 20% 7%",
  "--foreground": "210 20% 92%",
  "--card": "220 18% 10%",
  "--card-foreground": "210 20% 92%",
  "--popover": "220 18% 10%",
  "--popover-foreground": "210 20% 92%",
  "--primary": "185 80% 55%",
  "--primary-foreground": "220 20% 7%",
  "--secondary": "220 15% 16%",
  "--secondary-foreground": "210 20% 85%",
  "--muted": "220 15% 14%",
  "--muted-foreground": "215 12% 50%",
  "--accent": "280 70% 60%",
  "--accent-foreground": "210 20% 95%",
  "--destructive": "0 72% 58%",
  "--destructive-foreground": "210 40% 98%",
  "--success": "155 70% 45%",
  "--success-foreground": "220 20% 7%",
  "--warning": "38 92% 55%",
  "--warning-foreground": "220 20% 7%",
  "--border": "220 15% 18%",
  "--input": "220 15% 18%",
  "--ring": "185 80% 55%",
  "--sidebar-background": "220 20% 5%",
  "--sidebar-foreground": "210 20% 85%",
  "--sidebar-primary": "185 80% 55%",
  "--sidebar-primary-foreground": "220 20% 7%",
  "--sidebar-accent": "220 15% 14%",
  "--sidebar-accent-foreground": "210 20% 92%",
  "--sidebar-border": "220 15% 15%",
  "--sidebar-ring": "185 80% 55%",
};

function setThemeVars(vars) {
  for (const key in vars) {
    document.documentElement.style.setProperty(key, vars[key]);
  }
}

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setThemeVars(light ? LIGHT_VARS : DARK_VARS);
  }, [light]);

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <span className="mr-2">
        {light ? (
          <span role="img" aria-label="Light">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="6" fill="#FFD600"/><g stroke="#FFD600" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></g></svg>
          </span>
        ) : (
          <span role="img" aria-label="Dark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 0112.79 3 7 7 0 0012 17a7 7 0 009-4.21z" fill="#6366F1"/></svg>
          </span>
        )}
      </span>
      {/* Only show icons, no text */}
      <input
        type="checkbox"
        checked={light}
        onChange={() => setLight((v) => !v)}
        className="sr-only"
        aria-label="Toggle theme"
      />
      <span className="ml-2 w-10 h-6 flex items-center bg-muted rounded-full p-1 transition">
        <span
          className={`w-4 h-4 rounded-full bg-card shadow-md transform transition-transform ${light ? "translate-x-4" : "translate-x-0"}`}
        />
      </span>
    </label>
  );
}
