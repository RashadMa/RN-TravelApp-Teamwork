import { createContext, useState } from "react";

interface SearchContextProps {

      data:any[]
      setdata(item:any):void;
}

export const SearchContext = createContext<SearchContextProps>({

      data:[],
      setdata: () =>{},
});



export const SearchCardProvider = ({ children }: any) => {
      const [data, setdata] = useState([])
      

      const values: SearchContextProps = {
            data,setdata
      }
      return (
            <SearchContext.Provider value={values} >
                  {children}
            </SearchContext.Provider >
      );
};