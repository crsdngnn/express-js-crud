export const formatResponse = (data = null, message = '', statusCode = 200) => {
  return {
    status: statusCode,
    message: message || (statusCode >= 200 && statusCode < 300 ? 'Success' : 'Error'),
    data: data,
  };
};
