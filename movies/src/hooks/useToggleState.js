import {useState} from "react";
function useToggleState(initVal=false) {
  const [value, setValue] = useState(initVal);
  const toggleChange = () => {
    setValue(!value)
  };
  return [value, toggleChange];
}
export default useToggleState;