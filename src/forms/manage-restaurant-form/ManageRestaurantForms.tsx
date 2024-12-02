import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from"zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import FoodTypeSection from "./FoodTypeSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),
    restaurantAddress: z.string({
        required_error: "restaurant address is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number"
    }),
    foodTypes: z.array(z.string()).nonempty({
        message: "please select at least one item",
      }),
    menuItems: z.array(z.object({
        name: z.string().min(1, " is required"),
        price: z.coerce.number().min(1, " is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message: "image is required"}).optional(),
})
.refine((data) => data.imageUrl || data.imageFile, {
  message: "Either image URL or image file must be provided",
  path: ["imageFile"],
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodTypes: restaurant?.foodTypes || [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  
    useEffect(() => {
      if (!restaurant)
        return;
    
      const deliveryPriceFormatted = parseInt(
        (restaurant.deliveryPrice / 100).toFixed(2)
      );
  
      const menuItemsFormatted = restaurant.menuItems.map((item) => ({
        ...item,
        price: parseInt((item.price / 100).toFixed(2)),
      }));

      const updatedRestaurant = {
        ...restaurant,
        deliveryPrice: deliveryPriceFormatted,
        menuItems: menuItemsFormatted,
        foodType: restaurant.foodTypes || []
      };

      form.reset(updatedRestaurant);
    }, [form, restaurant]);
    

    const onSubmit = (formDataJson: RestaurantFormData) => {
      const formData = new FormData();
  
      // Add form fields to FormData
      formData.append("restaurantName", formDataJson.restaurantName);
      formData.append("restaurantAddress", formDataJson.restaurantAddress);
      formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
      formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
  
      // Append food types
      formDataJson.foodTypes.forEach((foodTypes) => {
        formData.append("foodTypes[]", foodTypes);  // Ensure the correct field name
      });
  
      // Append menu items
      formDataJson.menuItems.forEach((menuItem, index) => {
        formData.append(`menuItems[${index}][name]`, menuItem.name);
        formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
      });
  
      // Append image file
      if (formDataJson.imageFile) {
        formData.append(`imageFile`, formDataJson.imageFile);
      }
    
  
      // Call onSave
      onSave(formData);
    };

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
            <DetailsSection />
            <Separator />
            <FoodTypeSection />
            <MenuSection />
            <Separator />
            <ImageSection />
            {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
          </form>
        </Form>
      );
};

export default ManageRestaurantForm;