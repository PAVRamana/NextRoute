import { createContext } from 'react';
import { ConfigurationsType } from 'mocks/data/configurations';
import { LoginUserDetailsType } from 'mocks/data/loginUserDetails';

type DataType = {
  config: ConfigurationsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  loginUserDetails: LoginUserDetailsType;
};

export type AddAccessDataContextType = DataType | undefined;

export const initialContext: AddAccessDataContextType = undefined;

const AddAccessDataContext = createContext<AddAccessDataContextType>(initialContext);

export default AddAccessDataContext;
