import { RuleOfThreeScreen } from './features/rule-of-three/RuleOfThreeScreen';

export default function App() {
  const appVersion = import.meta.env.VITE_APP_VERSION ?? '0.0.0';

  return (
    <main className="app-shell">
      <span aria-label="Application version" className="app-version">
        v{appVersion}
      </span>
      <div className="app-frame">
        <RuleOfThreeScreen />
      </div>
    </main>
  );
}
