import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { foodTypeList } from "@/config/restaurant-option-config";
import { useFormContext } from "react-hook-form"
import FoodTypeCheckbox from "./FoodTypeCheckbox";

const FoodTypeSection = () => {
  const {control} = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold"> Food Categories</h2>
        <FormDescription>Select your restaurant's food types</FormDescription>
      </div>
      <FormField control={control} name="foodTypes" render={({field})=>(
        <FormItem>
          <div className="grid md:grid-cols-5 gap-1" >
          {foodTypeList.map((foodTypes, index)=><FoodTypeCheckbox key={foodTypes + index} foodTypes={foodTypes} field={field}/>)}
          </div>
          <FormMessage/>
        </FormItem>
      )}/>
    </div>
  )
}

export default FoodTypeSection