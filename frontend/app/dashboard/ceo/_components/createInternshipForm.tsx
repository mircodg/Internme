import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateInternshipFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.union([z.literal("Intra Curricular"), z.literal("Extra Curricular")]),
  mode: z.union([z.literal("remote"), z.literal("In place")]),
  maxInterns: z.preprocess(
    (val) => parseInt(val as string),
    z.number().refine((val) => val > 0 && val < 6)
  ),
  cdl: z.string(),
  pay: z.number().optional(),
});

type Inputs = z.infer<typeof CreateInternshipFormSchema>;

const submitHandler: SubmitHandler<Inputs> = (data) => {
  console.log(data);
};

function CreateInternshipForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Intern Title"
              {...register("title", { required: true })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              placeholder="Intern Description"
              {...register("description", { required: true })}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input
              type="text"
              id="type"
              placeholder="Intra/Extra Curricular"
              {...register("type", { required: true })}
            />
            {errors.type && <span>{errors.type.message}</span>}
          </div>
          <div>
            <Label htmlFor="mode">Mode</Label>
            <Input
              type="text"
              id="mode"
              placeholder="Remote/In place"
              {...register("mode", { required: true })}
            />
            {errors.mode && <span>{errors.mode.message}</span>}
          </div>
          <div>
            <Label htmlFor="maxInterns">Max Interns</Label>
            <Input
              type="text"
              id="maxInterns"
              placeholder="Max Interns number"
              {...register("maxInterns", { required: true })}
            />
            {errors.maxInterns && <span>{errors.maxInterns.message}</span>}
          </div>
          <div>
            <Label htmlFor="cdl">Degree Course</Label>
            <Input
              type="text"
              id="cdl"
              placeholder="Computer Engineering"
              {...register("cdl", { required: true })}
            />
            {errors.cdl && <span>{errors.cdl.message}</span>}
          </div>
          <div>
            <Label htmlFor="pay">Pay</Label>
            <Input
              type="text"
              id="pay"
              placeholder="Pay"
              {...register("pay")}
            />
            {errors.pay && <span>{errors.pay.message}</span>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateInternshipForm;
