import query from "../utilities/query";
import { useEffect, useState } from "react";
import isEqual from "lodash.isequal";
import usePrevious from "./usePrevious";

const useDataLoader = (url, params) => {

  const [data, setData] = useState();
  const [error, setError] = useState();

  const previousParams = usePrevious(params);

  useEffect(() => {

    if(!isEqual(previousParams, params)){
      query(url, params, { onError: (e) => { setError(e) } })
      .then((_data) => {
        setData(_data);
        setError();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, params, setData, setError]);

  return [data, error];

};
export default useDataLoader;