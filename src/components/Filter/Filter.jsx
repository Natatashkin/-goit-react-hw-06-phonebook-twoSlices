import React from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "../IconButton";
import { FilterWrapper, Input } from "./Filter.styled";
import { FaTimes } from "react-icons/fa";
import { setFilterValue, resetFilter, getFilterValue } from "redux/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  const hendleChange = (e) => dispatch(setFilterValue(e.currentTarget.value));

  return (
    <>
      <label htmlFor="filter">Find contact by name:</label>
      <FilterWrapper>
        <Input
          type="text"
          name="filter"
          value={filterValue}
          onChange={hendleChange}
        />
        {filterValue && (
          <IconButton
            color="blue"
            type="button"
            aria-label="Clear filter"
            onClick={() => dispatch(resetFilter())}
          >
            <FaTimes />
          </IconButton>
        )}
      </FilterWrapper>
    </>
  );
};

export default Filter;
