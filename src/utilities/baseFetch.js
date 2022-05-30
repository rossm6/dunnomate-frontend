const fetchWrapper = (url, config, onError) => {
    config = {
      credentials: "include",
      ...config,
    };
    return fetch(url, config)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`An error occured: ${error}`);
        }
        onError && onError(error);
      });
};
  
export default fetchWrapper;