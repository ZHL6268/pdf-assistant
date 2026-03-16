import { useEffect, useState } from 'react';
import { getPathForScreen, getRouteForPath, getScreenForPath, type AppScreen } from '../config/routes';

function readCurrentScreen(): AppScreen {
  if (typeof window === 'undefined') {
    return 'landing';
  }

  return getScreenForPath(window.location.pathname);
}

export function useAppScreen() {
  const [screen, setScreenState] = useState<AppScreen>(() => readCurrentScreen());

  useEffect(() => {
    if (!getRouteForPath(window.location.pathname)) {
      window.history.replaceState({}, '', getPathForScreen('landing'));
      setScreenState('landing');
    }

    const handlePopState = () => {
      const matchedRoute = getRouteForPath(window.location.pathname);

      if (!matchedRoute) {
        window.history.replaceState({}, '', getPathForScreen('landing'));
        setScreenState('landing');
        return;
      }

      setScreenState(matchedRoute.screen);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setScreen = (nextScreen: AppScreen) => {
    const nextPath = getPathForScreen(nextScreen);

    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    setScreenState(nextScreen);
  };

  return { screen, setScreen };
}
