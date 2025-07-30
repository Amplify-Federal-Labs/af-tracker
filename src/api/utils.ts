const getFunctionUrl = (fnName: string) => {
  const backendUrlTemplate: string = import.meta.env.VITE_BACKEND_BASE_URL_TEMPLATE 
    || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/<<>>';
  return backendUrlTemplate.replace("<<>>", fnName)
}

export { getFunctionUrl }