/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkError = (response: any, message = "") => {
  if (!response.success) {
    const msg =
      "reason" in response.data ? response.data.reason : message || "Error";
    throw new Error(`${response.status} - ${msg}`);
  }
};
