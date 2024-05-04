/** @format */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Formrow from "../../ui/Formrow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, closeform }) {
  const { id: editId, ...editvalues } = cabinToEdit;

  const iseditSesiion = Boolean(editId);

  const { iscreating, Createcabin } = useCreateCabin();

  const { isediting, EditCabin } = useEditCabin();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: iseditSesiion ? editvalues : {},
  });

  const { errors } = formState;

  const isWorking = iscreating || isediting;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (iseditSesiion)
      EditCabin(
        { newcabindata: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            closeform();
          },
        }
      );
    else
      Createcabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            closeform();
          },
        }
      );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* // type={closeform ? "modal" : "regular"}> */}
      <Formrow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "שדה חובה",
          })}
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
        />
      </Formrow>

      <Formrow
        label="Cabin photo"
        error={errors?.image?.message}
        disabled={isWorking}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: iseditSesiion ? false : "שדה חובה",
          })}
        />
      </Formrow>

      <Formrow disabled={isWorking}>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => closeform()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {iseditSesiion ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </Formrow>
    </Form>
  );
}

export default CreateCabinForm;
