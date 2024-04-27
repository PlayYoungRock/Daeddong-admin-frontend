import { useState, useEffect } from 'react';

const scripts = {};

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const getScriptFromDom = (src) => {
  const element = document.querySelector(`script[src="${src}"]`);
  if (!element) return;

  return (scripts[src] = {
    loading: false,
    error: null,
    scriptEl: element,
  });
};

export const useScript = ({ src, checkForExisting = false, ...attributes }) => {
  let status = src ? scripts[src] : undefined;
  if (isBrowser && src && checkForExisting && !status) {
    status = getScriptFromDom(src);
  }

  const [loading, setLoading] = useState(status ? status.loading : Boolean(src));
  const [error, setError] = useState(status ? status.error : null);

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isBrowser || !src || !loading || error || scriptLoaded) return;

    status = scripts[src];
    if (!status && checkForExisting) {
      status = getScriptFromDom(src);
    }

    let scriptEl;
    if (status) {
      scriptEl = status.scriptEl;
    } else {
      scriptEl = document.createElement('script');
      scriptEl.src = src;

      Object.keys(attributes).forEach((key) => {
        if (scriptEl[key] === undefined) {
          scriptEl.setAttribute(key, attributes[key]);
        } else {
          scriptEl[key] = attributes[key];
        }
      });

      status = scripts[src] = {
        loading: true,
        error: null,
        scriptEl: scriptEl,
      };
    }

    const handleLoad = () => {
      if (status) status.loading = false;
      setLoading(false);
      setScriptLoaded(true);
    };
    const handleError = (error) => {
      if (status) status.error = error;
      setError(error);
    };

    scriptEl.addEventListener('load', handleLoad);
    scriptEl.addEventListener('error', handleError);

    document.body.appendChild(scriptEl);

    return () => {
      scriptEl.removeEventListener('load', handleLoad);
      scriptEl.removeEventListener('error', handleError);
    };
  }, [src]);

  return [loading, error];
};
