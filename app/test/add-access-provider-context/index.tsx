import { ReactNode, useContext } from 'react';
import AddAccessDataContext, { AddAccessDataContextType } from './context';
import { ConfigurationsType } from 'mocks/data/configurations';

const AddAccessDataProvider = ({
  values,
  children
}: {
  values: AddAccessDataContextType;
  children: ReactNode;
}) => {
  return <AddAccessDataContext.Provider value={values}>{children}</AddAccessDataContext.Provider>;
};

const useGetAddAccessData = () => {
  const data = useContext(AddAccessDataContext);
  return data as ConfigurationsType;
};

export { AddAccessDataProvider, useGetAddAccessData };
