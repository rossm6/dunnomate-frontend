import fetchWrapper from "./baseFetch";

export const constructUrl = (url, params) => {
  return `${url}?${new URLSearchParams({ ...params })}`;
};

const query = (url, params, config) => {
  url = constructUrl(url, params);
  return fetchWrapper(url, { method: "GET" }, config.onError);
};

export default query;