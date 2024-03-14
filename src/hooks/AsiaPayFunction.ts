import { getAsiaPayChannel } from "../api/payment";
import { createAsianPayTransaction } from "../state/features/asiaPaySlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { MESSAGES, PAYMENT_METHOD, RETURN_URL } from "../utils/constants";
import { getCardType } from "../utils/helper";
import { toast } from "react-toastify";
import { checkStatusExpriedCampaign } from "../models/Transaction";

const AsiaPayCheckout = ({ userId }: { userId?: string }) => {
  const dispatch = useAppDispatch();
  const packageSelected = useAppSelector(
    (state) => state.payment.packageSelected
  );
  const { data } = useAppSelector((state) => state.campaign);
  const { promotion_code: promotionCode } = data || {};
  const handleFormParams = (data: any, dataAsiaPay: any, config: any) => {
    const { cardNumber, cardName, cardValidDate, cardCVVCVC } = data || {};
    const callbackLink = RETURN_URL + PAYMENT_METHOD.ASIAPAY;
    const cardExpired = (cardValidDate || "").split("/");
    const cardNo = cardNumber; // Số thẻ tín dụng
    const securityCode = cardCVVCVC; // Số CVV
    const cardHolder = cardName; // Tên chủ thẻ
    const epMonth = cardExpired?.[0]; // Tháng hết hạn thẻ
    const epYear =
      cardExpired?.[1]?.length === 2
        ? `20${cardExpired?.[1]}`
        : cardExpired?.[1]; // Năm hết hạn thẻ
    const orderRef = dataAsiaPay.orderID; // orderID đã lấy ở Bước 1
    const pMethod = getCardType(cardNumber); // Tên nhà cung cấp thẻ VISA/MASTER/JCB/...
    // băm SHA1(asiapayMerchantId + "|" + orderRef + "|704|1000|N| + asiapayKeyhash)
    const secureHash = dataAsiaPay.hashString3D;
    const paymentProfileId = userId || ""; // user_id của vieon
    const merchantId = config?.paymentData?.["3D"]?.merchantId; // config lấy ở bước 2
    const amount =
      packageSelected.price - (packageSelected.promotionPrice || 0); // số tiền cần charge kiểu int
    const currCode = 704; // hardcode
    const payType = "N"; // hardcode
    const successUrl = callbackLink; // callback link khi thành công
    const failUrl = callbackLink; // callback link khi thất bại (do thẻ hết tiền chẳng hạn)
    const errorUrl = callbackLink; // callback link khi hệ thống lỗi
    const memberPay_service = "T"; // hardcode
    const custIPAddress = "1.1.1.1"; // IP của khách đang thanh toán (nếu không biết có thể truyền bất kỳ)
    const lang = "V"; // hardcode
    const payUrl = dataAsiaPay?.payLink;
    return {
      cardNo,
      securityCode,
      cardHolder,
      epMonth,
      epYear,
      orderRef,
      pMethod,
      secureHash,
      paymentProfileId,
      merchantId,
      amount,
      currCode,
      payType,
      successUrl,
      failUrl,
      errorUrl,
      memberPay_service,
      custIPAddress,
      lang,
      payUrl,
    };
  };

  const handleCreatePostForm = ({ params }: any) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = params?.payUrl;
    Object.keys(params).forEach((key) => {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = String(params[key]);

      form.appendChild(hiddenField);
    });
    document.body.appendChild(form);
    // make iframe to submit post form
    form.submit();
  };

  const handleSubmitForm = async (data: any) => {
    if (await checkStatusExpriedCampaign(dispatch)) return;
    const transactionResult = await dispatch(
      createAsianPayTransaction({
        packageId: packageSelected?.id,
        promotionCode,
      })
    );

    if (transactionResult?.payload?.orderID) {
      getAsiaPayChannel().then((res) => {
        if (res?.success) {
          const dataConfig = res?.data?.[0];
          const config = JSON.parse(dataConfig?.Config || "{}");
          const params = handleFormParams(
            data,
            transactionResult.payload,
            config
          );
          handleCreatePostForm({ params });
        } else {
          toast.error(MESSAGES.OCURRED_ERROR);
        }
      });
    }
  };

  return { handleSubmitForm };
};

export default AsiaPayCheckout;
