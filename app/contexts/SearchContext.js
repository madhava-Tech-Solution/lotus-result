// const { useState, Children } = require('react');
import { createContext } from 'react';
export const TextContext = createContext();

// export default function SearchContext({ children }) {
//   const [serachData, setSearchData] = useState('hii');
//   return (
//     <TextContext.Provider value={{ serachData, setSearchData }}>
//       {children}
//     </TextContext.Provider>
//   );
// }
