import {useState} from "react";
function useInputState(initVal) {
  const [value, setValue] = useState(initVal);
  const handleChange = (e) => {
    setValue(e.target.value)
  };
  const reset = () => {
    setValue("")
  };
  return [value, handleChange, reset]
}

export default useInputState;