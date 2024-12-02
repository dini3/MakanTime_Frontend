import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    // Check if order.restaurant is null or undefined
    if (!order.restaurant) {
      return "N/A"; // Or provide a fallback value like "Unknown"
    }
  
    const created = new Date(order.createdAt);
    
    // Only add estimatedDeliveryTime if restaurant is available
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    
    const hours = created.getHours();
    const minutes = created.getMinutes();
    
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };
  
    return (
      <>
        <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
          <span> Order Status: {getOrderStatusInfo().label}</span>
          <span> Expected by: {getExpectedDelivery()}</span>
        </h1>
        <Progress
          className="animate-pulse"
          value={getOrderStatusInfo().progressValue}
        />
      </>
    );
  };
  
  export default OrderStatusHeader;