import Repzo from "repzo";
import moment from "moment-timezone";

export const paginate_max_result: number = 1000;

export const set_error = (error_res: any): any => {
  try {
    if (error_res) {
      if (typeof error_res == "string") {
        return { message: error_res };
      } else if (error_res.message || error_res.response?.data) {
        return {
          code: error_res.response?.data?.code,
          message: error_res.response?.data.message || error_res.message,
          // responseData: error_res.response?.data,
        };
      } else {
        return error_res;
      }
    }
    return error_res;
  } catch (e) {
    throw e;
  }
};

export const update_bench_time = async (
  repzo: Repzo,
  app_id: string,
  key: string,
  value: string,
  format?: string
): Promise<void> => {
  try {
    if (format) {
      value = moment(value).format(format);
    }
    const res = await repzo.integrationApp.update(app_id, {
      [`options_formData.${key}`]: value,
    });
  } catch (e) {
    throw e;
  }
};
