import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Rooms } from "../../lib/constant";
import { useEffect, useState } from "react";
import { Booking, Details } from "./booking";

const List = () => {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState(Rooms);
  const [roomType, setRoomType] = useState("all");
  const [action, setAction] = useState("");
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    if (roomType !== "all") {
      const selectedRooms = Rooms.filter((r) => r.type === roomType);
      setRooms(selectedRooms);
    }
    return () => {
      setRooms(Rooms);
    };
  }, [roomType]);

  const actionHandler = (e, data) => {
    if (e === "cancel") {
      const updateRooms = rooms.map((room) => {
        if (data.id === room.id) {
          room.status = "available";
          room.guestInfo = null;
        }
        return room;
      });
      setRooms(updateRooms);
    } else {
      setRoomData(data);
      setAction(e);
      setOpen(true);
    }
  };

  return (
    <div>
      <h3>List of rooms</h3>
      <div className="filter">
        <span>Filter: </span>
        <Select onValueChange={(value) => setRoomType(value)} value={roomType}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="double">Double</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Type</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Price</TableHead>
            <TableHead className="text-left w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.name}>
              <TableCell className="text-left font-medium">
                {room.name}
              </TableCell>
              <TableCell className="text-left font-medium">
                {room.type}
              </TableCell>
              <TableCell className="text-left">
                {room.status ? "Available" : "Not available"}
              </TableCell>
              <TableCell className="text-left">{room.price}</TableCell>
              <TableCell className="text-left">
                <div className="flex gap-2">
                  <Button onClick={() => actionHandler("view", room)}>
                    View
                  </Button>
                  &nbsp;
                  <Button
                    onClick={() =>
                      actionHandler(room.status ? "book" : "cancel", room)
                    }
                  >
                    {room.status ? "Book" : "Cancel"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {action === "view" ? (
            <Details roomData={roomData} />
          ) : (
            <Booking
              roomData={roomData}
              rooms={rooms}
              setRooms={setRooms}
              setOpen={setOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default List;
