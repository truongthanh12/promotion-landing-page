import { ICampaign } from "../../models/Compaign";
import { setTypeError } from "../../state/features/paymentSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { ERROR_TYPE } from "../../utils/constants";
import { parseISO, isBefore, isAfter } from "date-fns";
import React, { useEffect } from "react";

const CampaignStatus = ({ children }: { children: React.ReactNode }) => {
  const data: ICampaign = useAppSelector((state) => state.campaign?.data);
  const { start_at, end_at } = data || {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!start_at || !end_at) {
      return;
    }

    function checkEventStatus(startAt: string, endAt: string) {
      const now = new Date();
      const startDate = parseISO(startAt);
      const endDate = parseISO(endAt);
      if (isBefore(now, startDate) || isAfter(now, endDate)) {
        dispatch(setTypeError(ERROR_TYPE.ENDED));
      }
    }

    checkEventStatus(start_at, end_at);
  }, [start_at, end_at, dispatch]);

  return children;
};

export default React.memo(CampaignStatus);
