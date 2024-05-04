/** @format */
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createcabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import Formrow from "../../ui/Formrow";

function CreateCabinForm() {
  const queryclient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const { mutate, isLoading: iscreating } = useMutation({
    mutationFn: createcabin,
    onSuccess: () => {
      toast.success("New cabin succesfully creates");

      queryclient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Formrow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "שדה חובה",
          })}
          disabled={iscreating}
        />
      </Formrow>

      <Formrow label="Maximum capacity" error={errors?.max_capcity?.message}>
        <Input
          type="number"
          id="max_capcity"
          {...register("max_capcity", {
            required: "שדה חובה",
            min: { value: 1, message: "התפוסה המינימלית היא 1" },
          })}
          disabled={iscreating}
        />
      </Formrow>

      <Formrow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "שדה חובה",
            min: { value: 1, message: "הגודל הנדרש הוא 1 לפחות" },
          })}
          disabled={iscreating}
        />
      </Formrow>

      <Formrow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "שדה חובה",
            validate: (value) =>
              +value <= +getValues().regular_price ||
              "מחיר ההנחה צריך להיות נמוך יותר",
          })}
          disabled={iscreating}
        />
      </Formrow>

      <Formrow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "שדה חובה" })}
          disabled={iscreating}
        />
      </Formrow>

      <Formrow
        label="Cabin photo"
        error={errors?.image?.message}
        disabled={iscreating}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "שדה חובה" })}
        />
      </Formrow>

      <Formrow disabled={iscreating}>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={iscreating}>Edit cabin</Button>
      </Formrow>
    </Form>
  );
}

export default CreateCabinForm;
