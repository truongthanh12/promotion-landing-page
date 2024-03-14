import { getPackages } from "../../api";
import {
  PackageItem,
  PackageList,
  PurePackageList,
} from "../../models/package";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PACKAGE_TYPE } from "../constant";

interface PackageSlice {
  packages: PackageItem[];
  isLoading: boolean;
  purePackageList: PurePackageList[];
}

const initialState: PackageSlice = {
  packages: [],
  isLoading: false,
  purePackageList: [],
};

export const getPackagesCampaign = createAsyncThunk(
  PACKAGE_TYPE.GET_PACKAGES,
  async ({ packageList }: { packageList: number[] }) => {
    const response = await getPackages();
    const data = response.data;
    return {
      packages: data.flatMap((item: PackageList) =>
        item.items.filter((it) => packageList.some((id) => id === +it.id))
      ),
      purePackageList: data,
    };
  }
);

const packageSlice = createSlice({
  name: PACKAGE_TYPE.NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPackagesCampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPackagesCampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = action.payload.packages;
        state.purePackageList = action.payload.purePackageList;
      })
      .addCase(getPackagesCampaign.rejected, (state, _action) => {
        state.isLoading = false;
      });
  },
});

export default packageSlice.reducer;
