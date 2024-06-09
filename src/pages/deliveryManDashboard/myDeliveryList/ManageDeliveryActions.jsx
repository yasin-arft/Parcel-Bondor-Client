import { Button } from "@/components/ui/button";

const ManageDeliveryActions = () => {
  return (
    <div className="flex flex-col gap-3 justify-center">
      <Button variant="outline">View Location</Button>
      <Button variant="outline">Deliver</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
};

export default ManageDeliveryActions;