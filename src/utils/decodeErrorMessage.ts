const decodeErrorMessage = (message: string[] | string) => {
  if (Array.isArray(message)) {
    return message.join(', ');
  }

  return message;
};

export default decodeErrorMessage;
