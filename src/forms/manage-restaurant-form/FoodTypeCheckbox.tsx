import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  foodTypes: string;
  field: ControllerRenderProps<FieldValues, "foodTypes">;
};

const FoodTypeCheckbox = ({ foodTypes: foodTypes, field }: Props) => {
  const fieldValue = field.value || []; // Fallback to empty array if field.value is undefined

  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={fieldValue.includes(foodTypes)} // Use fallback value
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...fieldValue, foodTypes]); // Use fallback value
            } else {
              field.onChange(
                fieldValue.filter((value: string) => value !== foodTypes) // Use fallback value
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{foodTypes}</FormLabel>
    </FormItem>
  );
};

export default FoodTypeCheckbox;
