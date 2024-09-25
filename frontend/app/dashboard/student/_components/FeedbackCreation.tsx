import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

interface FeedbackCreationProps {
  callBack(): void;
  idTirocinio: number;
}

function FeedbackCreation({ callBack, idTirocinio }: FeedbackCreationProps) {
  const [open, setIsOpen] = useState(true);
  const [rating, setRating] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    if (open) return;
  }, []);

  const handleSubmit = async (idTirocinio: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/student/feedback",
        { idTirocinio: idTirocinio, Descrizione: description, Stelle: rating },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast({
          description: response.data.message,
        });
        setIsOpen(false);
        // send email to the company
        axios.post("/api/feedback", {
          idTirocinio: idTirocinio,
        });
        callBack();
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            leave a feedback on your past internship
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1 items-center">
          <p className="text-sm font-semibold">Rating: </p>
          {[...Array(5)].map((star, index) => {
            return (
              <Star
                key={index}
                className={
                  index <= currentValue
                    ? "fill-current cursor-pointer"
                    : "cursor-pointer"
                }
                onMouseEnter={() => setCurrentValue(index)}
                onMouseLeave={() => setRating(index + 1)}
                onClick={() => setRating(index + 1)}
              />
            );
          })}
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
              callBack();
            }}
            variant={"secondary"}
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(idTirocinio)}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FeedbackCreation;
