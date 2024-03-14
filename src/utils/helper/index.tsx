import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CARD_TYPE, TEXT } from "../constants";
import { format, parse } from "date-fns";

export const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (price = 0, fraction: number = 0) => {
  const formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  });

  return formatter.format(price).replace(/,/g, ".");
};

export const validatePhoneNumber = (number: string = "") => {
  const regex = /^0[35789][0-9]{8}$/;
  return regex.test(number);
};

const parsedDate = (dateString: string) => {
  return parse(dateString, "yyyy-MM-dd", new Date());
};
export const formattedDate = (date: string = "") => {
  return format(parsedDate(date), "dd/MM/yyyy");
};

// utils/debounce.js
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<F>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

// Credit Card
export const formatCardNumber = (value: string) => {
  const onlyNums = value.replace(/[^\d]/g, "");
  let formatted = "";
  for (let i = 0; i < onlyNums.length; i++) {
    if (i % 4 === 0 && i > 0) formatted += " ";
    formatted += onlyNums[i];
  }
  return formatted;
};

export const formatCardDate = (value: string) => {
  value = value.replace(/\D/g, "");

  let month = value.substring(0, 2);
  let year = value.substring(2);

  if (month.length === 2 && year.length > 0) {
    value = month + "/" + year;
  } else {
    value = month;
  }

  if (year.length > 4) {
    year = year.substring(0, 4);
    value = month + "/" + year;
  }

  return value;
};

export const getCardType = (cardNumber: string) => {
  let res = "";
  CARD_TYPE.forEach((item) => {
    const regex = item.pattern;
    if (regex.test(cardNumber)) res = item.name;
  });
  return res;
};

export const validateCardExpired = (date: string) => {
  const parts = date.split("/");
  if (parts.length !== 2) return false;

  let month = parseInt(parts[0], 10);
  let year = parseInt(parts[1], 10);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  if (parts[1].length === 2) {
    year += 2000;
  }

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return month > 0 && month <= 12;
};

export const validateCardNumber = (cardNumber: string) => {
  let validatedError = "";
  const cardType = getCardType(cardNumber);
  const isVisa = cardType === CARD_TYPE[2].name;
  const isMaster = cardType === CARD_TYPE[3].name;

  if (cardNumber?.length < 16 || !(isVisa || isMaster)) {
    validatedError = TEXT.VALIDATED_CARD_NUMBER;
  }
  return {
    validatedError,
    isVisa,
    isMaster,
  };
};

export const handleMaskedNumber = (value: string, count: number) => {
  if ((value || "").length < count) return value;

  const visibleDigits = 4;
  const maskedLength = value.length - visibleDigits;

  let maskedChars = "•".repeat(maskedLength);
  maskedChars = maskedChars.replace(/(.{4})/g, "$1 ").trim();

  if (value.length >= visibleDigits) {
    const visibleChars = value.slice(-visibleDigits);
    return maskedChars + visibleChars;
  } else {
    return maskedChars;
  }
};
// end credit card
export const mobileCheck = () => {
  if (typeof window === "undefined") return false;
  let check = false;
  (function mobileCheckFunction(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor);
  return check;
};

export const replaceKey = (str: string, key: string, value: string) => {
  let newStr = str;
  const myKey = `{${key}}`;
  if (str && key) newStr = newStr.replace(myKey, value || "");
  return newStr;
};

export const queryStringEncoding = (obj: Record<string, any>) =>
  Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

export const parseJwt = (token: string = "") => {
  if (token === "") return null;
  try {
    const base64Url = token.split(".")[1]; // Get the payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error parsing JWT", e);
    return null;
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const fullPath = window.location.pathname;
const splitPaths = fullPath.split("/");

export const pathname = "/" + splitPaths[1];
export const trimmedPathname = pathname.startsWith("/")
  ? pathname.substring(1)
  : pathname;
