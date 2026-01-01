import { StoreProvider as UserStoreProvider } from "./User";



const getAllServices = (): React.FC<any>[] => {
  // return requireAllServices(
  //   require.context("api/services/", true, /index\.tsx$/)
  // );
  return [UserStoreProvider];
};

export default getAllServices();
