export const appendParamsSearchParams = (currentParams: string, params: { [key: string]: string }) => {
  const searchParams = new URLSearchParams(currentParams)
  for (let param in params) {
    if (searchParams.get(param)) {
      searchParams.set(param, params[param])
    } else {
      searchParams.append(param, params[param])
    }
  }
  return searchParams.toString()
}