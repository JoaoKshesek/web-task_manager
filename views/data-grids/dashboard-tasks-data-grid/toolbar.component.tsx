import React, { ChangeEvent, useEffect, useState } from "react";

import { Grid } from "@mui/material";

import { setListOptions } from "@/store/reducers/modules/dashboard-module";
import { useAppDispatch, useAppSelector } from "@/_libs";
import { SearchInput, ToolbarContainer } from "@/components";

export function Toolbar() {
  const dispatch = useAppDispatch();

  const listOptions = useAppSelector((state) => state.dashboardModule.listOptions);

  const [searchTerm, setSearchTerm] = useState(listOptions.searchValue);

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function onClearSearchInput() {
    setSearchTerm("");
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setListOptions({ searchValue: searchTerm, page: 1 }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <ToolbarContainer>
      <Grid container spacing={4} sx={{ width: "100%", margin: 0 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <SearchInput size="small" fullWidth value={searchTerm} onChange={onSearch} onClear={onClearSearchInput} />
        </Grid>
      </Grid>
    </ToolbarContainer>
  );
}
