/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import * as Yup from "yup";
import { useFormik } from "formik";

const initialValue = {
  name: "",
  mobile: "",
};

const Validations = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile is required"),
});

const Booking = ({ roomData, rooms, setRooms, setOpen }) => {
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Validations,
    onSubmit: (values) => {
      const updatedRooms = rooms.map((room) => {
        if (room.id === roomData.id) {
          room.status = false;
          room.guestInfo = values;
        }
        return room;
      });
      setRooms(updatedRooms);
      setOpen(false);
    },
  });
  return (
    <Card className="w-[350px] card-style">
      <CardHeader>
        <CardTitle>Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mobile">Name</Label>
              <Input
                id="mobile"
                name="mobile"
                placeholder="Mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Price</Label>
              <Label>{roomData.price}</Label>
            </div>
            <Button type="submit">Book</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const Details = ({ roomData }) => {
  return (
    <Card className="w-[350px] card-style">
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Room Name</Label>
            <Label htmlFor="name">{roomData.name}</Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Room Type</Label>
            <Label htmlFor="name">{roomData.type}</Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Room Status</Label>
            <Label htmlFor="name">
              {roomData.status ? "Available" : "Not available"}
            </Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Room Price</Label>
            <Label htmlFor="name">{roomData.price}</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { Booking, Details };
