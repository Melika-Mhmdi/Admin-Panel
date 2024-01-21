import instance from "./http";
import { createAsyncThunk } from "@reduxjs/toolkit";
const controller = new AbortController();
export const createAsyncAction = (url, type, method, secondUrl) => {
  return createAsyncThunk(type, async ({ ...values }, thunkAPI) => {
    console.log("hii....")
    try {
      let response;

      const config = {
        signal: AbortSignal.timeout(5000) ,

        headers: {
          "Content-Type":
              values.file ||
              values?.res?.attach ||
              values?.attach ||
              values?.avatar
                  ? "multipart/form-data"
                  : "application/json",
          "Access-Control-Allow-Credentials": true,
          "X-Requested-With": "XMLHttpRequest",
          "Application-Name":"CRM",
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrcmJNbXE5b2tqN0pTVHB5MzJmTUV1dXFlazZfdUF4Y1pRMVNEZmRMa2I0In0.eyJleHAiOjE3MDU3NjUxNzEsImlhdCI6MTcwNTc1MDc3MSwiYXV0aF90aW1lIjoxNzA1NzUwNzcxLCJqdGkiOiI0NTFhMTA2Yi04NjEyLTRhNzUtYTU4YS1hMzVkNzIzZmRkOGQiLCJpc3MiOiJodHRwczovL3VhdC5uZXNoYW5pZC5jb20vYXV0aC9yZWFsbXMvS0lBTiIsImF1ZCI6WyJraWFuLWF1ZCIsIm9hdXRoMi1yZXNvdXJjZSIsImFkbWluLWNsaWVudC1hcGkiLCJhY2NvdW50IiwiY3JtIl0sInN1YiI6IjU1MGVjMGU5LTI1YjItNGUwNi04NjQ1LTVlZmY3ZmFmNjRiYSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNybS13ZWIiLCJzZXNzaW9uX3N0YXRlIjoiNzBlNjExZDUtMDY1NC00ZmMzLTg5NmEtZDc4NWI0MzgwMTE0IiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwiQ1JNX0lSQ1JfQURNSU4iLCJXSVRIX1BBU1NXT1JEIiwiQ1JNX0RPSElfVVNFUiIsIkNSTV9LRF9BRE1JTiIsIkNSTV9CVF9BRE1JTiIsIkNSTV9LQl9VU0VSIiwiQ1JNX0JUX1VTRVIiLCJST0xFX01BTkFHRU1FTlRfRlVMTCIsIkNSTV9LVF9VU0VSIiwiQ1JNX0tBX1VTRVIiLCJDUk1fS0RfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwiQ1JNX1VTRVIiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsIlNFUlZJQ0UiLCJtYW5hZ2UtY29uc2VudCIsInVtYV9hdXRob3JpemF0aW9uIiwidmlldy1wcm9maWxlIiwiQ1JNX0tBX0FETUlOIiwiQ1JNX0RPSElfQURNSU4iLCJDUk1fSVJDUl9VU0VSIiwidmlldy1hcHBsaWNhdGlvbnMiLCJ1bWFfcHJvdGVjdGlvbiIsIkNSTV9EUlNBX0FETUlOIiwiVVNFUiIsIkNSTV9EUlNBX1VTRVIiLCJDUk1fTlpES19BRE1JTiIsIkNSTV9OWkRLX1VTRVIiLCJQQVNTV09SRCIsIkNSTV9LVF9BRE1JTiIsInZpZXctY29uc2VudCIsIkNSTV9BRE1JTiIsIkNSTV9LQl9BRE1JTiIsIkZJTEVfQURNSU4iLCJLRF9DUk0iXX0sInNjb3BlIjoib3BlbmlkIExFVkFOVF9DUkVESVRfR1JBREVfRVFVQUxJWkFUSU9OX0RFRiBMRVZBTlRfQ1JFRElUX1NDT1JFX01BUFBJTkcgTEVWQU5UX0NSRURJVF9GSU5BTkNJQUxfU1RBVEVNRU5UIG9hdXRoMi1yZXNvdXJjZSByb2xlcyBMRVZBTlRfQ1JFRElUX0JVU0lORVNTX0lORk8gY3JtIExFVkFOVF9DUkVESVRfR1JBREVfRVFVQUxJWkFUSU9OIExFVkFOVF9DUkVESVRfRklOQU5DSUFMX1NUQVRFTUVOVF9XRUlHSFQgTEVWQU5UX0NSRURJVF9QQVJBTUVURVIiLCJzaWQiOiI3MGU2MTFkNS0wNjU0LTRmYzMtODk2YS1kNzg1YjQzODAxMTQiLCJ1c2VyX25hbWUiOiIwOTEyNTE0ODA1OCIsInV1aWQiOiJhYWFjYTEyNi1mOTBmLTRmZTMtYmMzYi0zZTRiNmYwMjUwZDEiLCJhdXRob3JpdGllcyI6WyJXSVRIX1BBU1NXT1JEIiwiUk9MRV9NQU5BR0VNRU5UX0ZVTEwiLCJXSVRIX1BBU1NXT1JEIiwiUEFTU1dPUkQiLCJvZmZsaW5lX2FjY2VzcyIsIlNFUlZJQ0UiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIlVTRVIiLCJGSUxFX0FETUlOIiwiS0RfQ1JNIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJtYW5hZ2UtY29uc2VudCIsInZpZXctcHJvZmlsZSIsIkNSTV9ET0hJX0FETUlOIiwiQ1JNX0lSQ1JfVVNFUiIsIkNSTV9JUkNSX0FETUlOIiwiQ1JNX0RPSElfVVNFUiIsIkNSTV9LRF9BRE1JTiIsIkNSTV9CVF9BRE1JTiIsIkNSTV9EUlNBX0FETUlOIiwiQ1JNX0tCX1VTRVIiLCJDUk1fQlRfVVNFUiIsIkNSTV9EUlNBX1VTRVIiLCJDUk1fTlpES19BRE1JTiIsIkNSTV9OWkRLX1VTRVIiLCJDUk1fS1RfVVNFUiIsIkNSTV9LQV9VU0VSIiwiQ1JNX0tEX1VTRVIiLCJDUk1fS1RfQURNSU4iLCJDUk1fQURNSU4iLCJDUk1fS0JfQURNSU4iLCJDUk1fVVNFUiIsIkNSTV9LQV9BRE1JTiJdLCJjbGllbnRfaWQiOiJjcm0iLCJjdXN0b21lck5hbWUiOiJhcGktY2xpZW50LWxldmFudCIsImxldmFudElkIjoiMzI2MDYifQ.JNQfuuv3h3hwENc1nxioZ_QTNosvNNuzzh50So8v3Fg6EE5ENe88AJa5lhtq6KF5Itb5JNnHTXTA7Jn5F-8gqtOlWz_MbqXUZFlEOD3R9cUOlGLvXOHYwWpaZg32KCTxGFXwIXtwY3Fa4mYJ-QfS-qY2uSYihk1J31yUeVFXcgI`,
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
      }

      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err) {
      // if (axios.isCancel(err)) {
      //   console.log("Request canceled", err.message);
      // } else {
      //   console.log(err);
      // }
      return thunkAPI.rejectWithValue(err);
    }
  });
};
controller.abort();
