import React from "react"
import { MultiValue } from "react-select"
import CreatableSelect from "react-select/creatable"

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
    <div className="flex w-full flex-row justify-between gap-1 p-1">
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
        className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-1 text-white outline-none ring-0 ring-transparent ring-offset-0"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "0px solid #4A4A4A",
            backgroundColor: "transparent",
            color: "white",
          }),
          option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              backgroundColor: isDisabled ? undefined : isSelected ? "#9e2750" : isFocused ? "#b02d5b" : "#464E55",
              color: isFocused ? "white" : "#E5E5E5",
              ":active": {
                ...styles[":active"],
                backgroundColor: !isDisabled ? (isSelected ? "transparent" : "tranparent") : undefined,
              },
            }
          },
          multiValueLabel: (styles) => ({
            ...styles,
            color: "#E5E5E5",
            gap: "4px",
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: "#E5E5E5",
            ":hover": {
              backgroundColor: "#9e2750",
              color: "white",
            },
          }),
          menuList: (styles) => ({
            ...styles,
            backgroundColor: "#292F34",
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
