import { OptionsObject, enqueueSnackbar as notistackEnqueueSnackbar } from "notistack";

type HandleApiMessageProps = {
  statusCode: string;
  message: string;
  name: string;
};

export const handleApiMessages = (error: any): HandleApiMessageProps => {
  const statusCode = error?.response?.data?.statusCode;
  const message = error?.response?.data?.message;
  const name = error?.name;
  return {
    statusCode,
    message,
    name,
  };
};

const handleVariantSnack = (statusCode: number) => {
  switch (true) {
    case statusCode < 400:
      return "success";
    case statusCode < 500:
      return "warning";
    default:
      return "error";
  }
};

export const handleEnqueueSnackToast = (error: any) => {
  const axiosError = ["Network Error"];
  const { message, statusCode, name } = handleApiMessages(error);
  if (Number(statusCode) === 401) {
    console.log("401")
  } else if (axiosError.find((f) => f == name))
    enqueueSnackbar("Erro ao tentar se conectar no servidor!", { variant: "error" });
  else
    return notistackEnqueueSnackbar(message, {
      variant: handleVariantSnack(Number(statusCode ?? 0)),
    });
};

export const enqueueSnackbar = (
  message: string,
  options?: OptionsObject<"success" | "warning" | "error"> | undefined
) => {
  return notistackEnqueueSnackbar(message, options);
};
