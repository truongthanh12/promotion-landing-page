import Cookie from "react-cookies";

const KEY = {
  REFRESH_TOKEN: "refresh_token",
  SIGNATURE: "signature",
  ACCESS_TOKEN: "access_token",
  ACCESS_TOKEN_PROFILE: "access_token_profile",
  ACCESS_TOKEN_TEST: "access_token_test",
  ACCESS_TOKEN_DEV: "access_token_dev",
  ANONYMOUS_TOKEN: "anonymous_token",
  AFF_NETWORK: "_aff_network",
  AFF_SID: "_aff_sid",
};
function load(key: string) {
  return Cookie.load(key);
}
function save(key: string, value: string) {
  const timeNow = new Date();
  timeNow.setFullYear(timeNow.getFullYear() + 1);
  const option = { expires: timeNow, path: "/" };
  const oldOption = { expires: timeNow, domain: ".vieon.vn", path: "/" };
  Cookie.save(key, value, option);
  Cookie.remove(key, oldOption);
}

function remove(key: string, removeOption: any) {
  const timeNow = new Date();
  timeNow.setFullYear(timeNow.getFullYear() + 1);
  const option = { expires: timeNow, path: "/" };
  const oldOption = { expires: timeNow, domain: ".vieon.vn", path: "/" };

  if (removeOption) {
    Cookie.remove(key, removeOption);
  } else {
    Cookie.remove(key, option);
    Cookie.remove(key, oldOption);
  }
}

export default {
  KEY,
  load,
  save,
  remove,
};
