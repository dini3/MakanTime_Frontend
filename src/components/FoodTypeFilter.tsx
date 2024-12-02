import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { foodTypeList } from "@/config/restaurant-option-config";

type Props = {
  onChange: (foodTypes: string[]) => void;
  selectedFoodTypes: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const FoodTypeFilter = ({
  onChange,
  selectedFoodTypes,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleFoodTypesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedFoodType = event.target.value;
    const isChecked = event.target.checked;

    const newFoodTypeList = isChecked
      ? [...selectedFoodTypes, clickedFoodType]
      : selectedFoodTypes.filter((foodTypes) => foodTypes !== clickedFoodType);

    onChange(newFoodTypeList);
  };

  const handleFoodTypesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Food Type</div>
        <div
          onClick={handleFoodTypesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {foodTypeList
          .slice(0, isExpanded ? foodTypeList.length : 7)
          .map((foodTypes) => {
            const isSelected = selectedFoodTypes.includes(foodTypes);
            return (
              <div className="flex">
                <input
                  id={`foodType_${foodTypes}`}
                  type="checkbox"
                  className="hidden"
                  value={foodTypes}
                  checked={isSelected}
                  onChange={handleFoodTypesChange}
                />
                <Label
                  htmlFor={`foodType_${foodTypes}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {foodTypes}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default FoodTypeFilter;