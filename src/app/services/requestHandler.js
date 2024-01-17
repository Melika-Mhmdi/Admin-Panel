import instance from "./http";
const controller = new AbortController();
export const createAsyncAction = (url, type, method, secondUrl, dispatch) => {
  return dispatch(type, async ({ ...values }) => {
    try {
      let response;

      const config = {
        signal: AbortSignal.timeout(5000),

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          ...values.params,
        },
        //
      };

      if (method === "post") {
        delete config.params;
        if (values.id) {
          const ids = values.id;
          const urlvalue = `${url}/${ids}`;
          response = await instance[method](
            urlvalue,
            { ...values.res },
            config
          );
        } else {
          response = await instance[method](url, { ...values }, config);
          return Promise.resolve();
        }
      } else if (method === "delete") {
        delete config.params;
        const ids = values.id;
        const urlvalue = `${url}/${ids}`;

        response = await instance[method](urlvalue, config);
      } else if (method === "update" || method === "patch") {
        delete config.params;
        const ids = values.id;
        const urlvalue = `${url}/${ids}`;

        response = await instance[method](urlvalue, { ...values.res }, config);
        return Promise.resolve();
      } else {
        if (values?.id) {
          const ids = values.id;
          let urlvalue = `${url}/${ids}`;
          if (secondUrl) {
            urlvalue = `${url}/${ids}${secondUrl}`;
          }
          response = await instance[method](urlvalue, config);
        } else {
          response = await instance[method](url, config);
        }
        return Promise.resolve();
      }
      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err) {
      // if (axios.isCancel(err)) {
      //   console.log("Request canceled", err.message);
      // } else {
      //   console.log(err);
      // }
    }
  });
};
controller.abort();
