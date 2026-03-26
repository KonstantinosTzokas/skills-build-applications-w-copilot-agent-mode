const localApiBaseUrl = 'http://localhost:8000/api';

function getCodespacesApiBaseUrl() {
  if (typeof window === 'undefined') {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : localApiBaseUrl;
  }

  const { hostname } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return localApiBaseUrl;
  }

  if (hostname.endsWith('-3000.app.github.dev')) {
    return `https://${hostname.replace('-3000.app.github.dev', '-8000.app.github.dev')}/api`;
  }

  if (hostname.endsWith('-8000.app.github.dev')) {
    return `https://${hostname}/api`;
  }

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : localApiBaseUrl;
}

function createApiEndpoint(resourceName, explicitCodespaceEndpoint) {
  if (explicitCodespaceEndpoint && !explicitCodespaceEndpoint.includes('undefined')) {
    return explicitCodespaceEndpoint;
  }

  return `${getCodespacesApiBaseUrl()}/${resourceName}/`;
}

function normalizeApiCollection(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  return [];
}

const requestOptions = {
  credentials: 'include',
};

export { createApiEndpoint, normalizeApiCollection, requestOptions };