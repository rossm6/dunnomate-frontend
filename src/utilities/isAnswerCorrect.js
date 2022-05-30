import caesar from "./caesarCipher";

const isAnswerCorrect = (CAESAR_CIPHER_SHIFT, text, ciphered_text) => {
  const answer = caesar(ciphered_text, -1 * CAESAR_CIPHER_SHIFT);
  if (answer === text) {
    return true;
  }
  return false;
};

export default isAnswerCorrect;