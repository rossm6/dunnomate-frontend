import query from "../utilities/query";
import { useEffect, useState } from "react";

const useDataLoader = (url, params) => {

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    query(url, params, { onError: (e) => { setError(e) } })
    .then((_data) => {
      setData(_data);
      setError();
    });
  }, [url, params]);

  return [data, error];

};
export default useDataLoader;