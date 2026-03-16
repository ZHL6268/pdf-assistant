import { useEffect } from 'react';
import { appRoutes, type AppScreen } from '../config/routes';

export function useDocumentTitle(screen: AppScreen) {
  useEffect(() => {
    document.title = appRoutes[screen].title;
  }, [screen]);
}
