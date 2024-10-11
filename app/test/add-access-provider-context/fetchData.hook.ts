import { useEffect, useState } from 'react';
import api from '../service/axios';
import { AddAccessDataContextType, initialContext } from './context';
import { URL } from 'packages/util';

export function useFetchAddAccessData(): AddAccessDataContextType {
  const [configData, setConfigData] = useState<AddAccessDataContextType>(initialContext);

  useEffect(() => {
    Promise.all([
      api.get(URL.configDetails),
      api.post(URL.labelDetails, { key: 'addMyAccess,homePage' }),
      api.get(URL.loginUserDetails)
    ]).then((values) => {
      setConfigData({
        config: values[0]?.data,
        labels: values[1]?.data?.labels,
        loginUserDetails: values[2]?.data
      });
    });
  }, []);

  return configData;
}
