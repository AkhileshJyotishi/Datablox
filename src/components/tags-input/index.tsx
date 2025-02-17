import React from "react"
// import clsx from "clsx"
import { PiWarningCircleFill } from "react-icons/pi"
import { MultiValue } from "react-select"
import CreatableSelect from "react-select/creatable"

// import CloseIcon from "@/components/icons/closeIcon"
// import AddIcon from "@/components/icons/plus"
// import { SecondaryTag } from "../badges"
// import TextInput from "../textInput"

interface TagsInputProps {
  predefinedTags: string[]
  onTagsChange: (tags: readonly string[]) => void
  id?: string
  className?: string
  initialtags?: readonly string[]
  errorMessage?: string | null
  placeholder: string | undefined
  value?: readonly string[]
}

const TagsInput: React.FC<TagsInputProps> = ({
  predefinedTags,
  onTagsChange,
  id,
  // className,
  initialtags,
  errorMessage,
  placeholder,
  value,
}) => {
 
  const handleTagsChange = (
    val: MultiValue<{
      label: string
      value: string
    }>
  ) => {
    const arr: string[] = val.map((v) => v.value)
    onTagsChange(arr)
  }
  const init = (initialtags ?? [])?.map((init) => ({ label: init, value: init }))
  const predefinedInit = (predefinedTags ?? []).map((tag) => ({ label: tag, value: tag }))
  const val = value?.map((mp) => ({ label: mp, value: mp }))
  return (
      <div className="flex flex-row justify-between w-full gap-1 p-1">
      
        <CreatableSelect
          isMulti
          id={id}
          defaultValue={init}
          options={predefinedInit}
          placeholder={placeholder}
          onChange={(val) => {
            handleTagsChange(val)
          }}
          closeMenuOnSelect
          className="rounded-md w-full border  px-3 py-1  border-gray-600 outline-none ring-0 ring-offset-0 ring-transparent text-white   "
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              backgroundColor: "transparent",
              color: "white",
            }),
            option: (styles, { isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isDisabled
                  ? undefined
                  : isSelected
                    ? "red"
                    : isFocused
                      ? "#101014"
                      : "#464E55",
                color: isFocused ? "white" : "black",
                ":active": {
                  ...styles[":active"],
                  backgroundColor: !isDisabled ? (isSelected ? "#161A1F" : "#161A1F") : undefined,
                },
              }
            },
            multiValueLabel: (styles) => ({
              ...styles,
              color: "white",
              gap: "4px",
            }),
            multiValueRemove: (styles) => ({
              ...styles,
              color: "#101014",
              ":hover": {
                backgroundColor: "#00B87D",
                color: "white",
              },
            }),
            menuList: (styles) => ({
              ...styles,
              backgroundColor: "black",
              zIndex: 18,
            }),
          }}
          theme={(theme) => ({
            ...theme,
            border: "none",
            colors: {
              ...theme.colors,
              primary25: "#464E55",
              primary: "transparent",
              neutral10: "#292F34",
              neutral20: "white",
              neutral0: "white",
            },
          })}
          value={val}
        />
      </div>

  )
}

export default TagsInput
