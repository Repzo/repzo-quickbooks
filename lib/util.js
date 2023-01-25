import moment from "moment-timezone";
export const set_error = (error_res) => {
  var _a, _b, _c, _d;
  try {
    if (error_res) {
      if (typeof error_res == "string") {
        return { message: error_res };
      } else if (
        error_res.message ||
        ((_a = error_res.response) === null || _a === void 0 ? void 0 : _a.data)
      ) {
        return {
          code:
            (_c =
              (_b = error_res.response) === null || _b === void 0
                ? void 0
                : _b.data) === null || _c === void 0
              ? void 0
              : _c.code,
          message:
            ((_d = error_res.response) === null || _d === void 0
              ? void 0
              : _d.data.message) || error_res.message,
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
export const update_bench_time = async (repzo, app_id, key, value, format) => {
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
