import fetchWrapper from "./baseFetch";

const mutate = (url, data, overrides = {}) => {
  const defaultConfig = {
    method: "POST",
    credentials: "include",
  };

  const _data = new URLSearchParams({ ...data });

  const config = {
    ...defaultConfig,
    body: _data,
    ...overrides,
  };

  return fetchWrapper(url, config);
};

export default mutate;