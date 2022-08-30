import { useEffect, useState, useMemo } from "react";
import { Keyboard } from "react-native";

const useKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardOpenListener = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardOpen(true)
    );
    const keyboardCloseListener = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardOpen(false)
    );

    return () => {
      if (keyboardOpenListener) keyboardOpenListener.remove();
      if (keyboardCloseListener) keyboardCloseListener.remove();
    };
  }, []);

  return isKeyboardOpen;
};

export default useKeyboardOpen;