const shift = (code, base, range, shiftValue) => {
    /**
     * Python and Javascript implement the modulus operator differently
     * The following ensures this behaves like the python modulus operator
     */
    const modulus_result = (code - base + shiftValue) % range;
    return (modulus_result < 0 ? modulus_result + range : modulus_result) + base;
  };
  
  const caesar = (text, shiftValue) => {
    return String.fromCharCode(
      ...text.split("").map((char) => {
        const code = char.charCodeAt();
        if (code >= 97 && code <= 122) {
          return shift(code, 97, 122 - 97 + 1, shiftValue);
        } else if (code >= 65 && code <= 90) {
          return shift(code, 65, 90 - 65 + 1, shiftValue);
        } else if (code >= 48 && code <= 57) {
          return shift(code, 48, 57 - 48 + 1, shiftValue);
        }
      })
    );
  };
  
  export default caesar;