import { Outlet } from 'react-router';
import { AppFooter } from '../components/AppFooter';
import { AppHeader } from '../components/AppHeader';
import { AppNavigation } from '../components/AppNavigation';

export function AppLayout() {
  return (
    <div className="app-shell">
      <AppHeader />
      <AppNavigation />
      <main className="app-main">
        <Outlet />
      </main>
      <AppFooter courseName="Frontend EC3" />
    </div>
  );
}
