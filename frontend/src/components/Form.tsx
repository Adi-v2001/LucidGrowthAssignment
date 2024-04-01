import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DNS } from "@/DNSDATA/columns";
import LoadingButton from "./LoadingButton";
interface FormData {
    name: string;
    domainLink: string;
    recordType: string;
  }
const Form = ({onSubmit, isEdit, prevData, loading}: {onSubmit: SubmitHandler<FormData>, isEdit?: boolean, prevData?: DNS, loading: boolean}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>();
  return (
    <form className="space-y-5 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Input
                placeholder="Name"
                className="border-slate-500"
                {...register("name", { required: "Name is required" })}
                defaultValue={prevData && prevData.name}
              />
              <p className="font-semibold text-xs text-red-600">
                {errors.name?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Domain Link"
                className="border-slate-500"
                {...register("domainLink", {
                  required: "Domain link is required",
                  pattern: {value: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[\w.-]+(?:\.[\w.-]+)+(?:\/\S*)?$/, message: "Not a valid domain link"}
                })}
                defaultValue={prevData && prevData.domain}
              />
              <p className="font-semibold text-xs text-red-600">
                {errors.domainLink?.message}
              </p>
            </div>
            <div className="space-y-2">
              <select
                {...register("recordType", {
                  required: "Record type is required",
                })}
                className="p-1.5 border border-slate-500 w-full rounded-md"
                defaultValue={prevData && prevData.recordType}
              >
                <option value="" selected>
                  Select Record Type
                </option>
                <option value="A">A</option>
                <option value="AAAA">AAAA</option>
                <option value="CNAME">CNAME</option>
                <option value="MX">MX</option>
                <option value="NS">NS</option>
                <option value="PTR">PTR</option>
                <option value="SOA">SOA</option>
                <option value="SRV">SRV</option>
                <option value="TXT">TXT</option>
                <option value="DNSSEC">DNSSEC</option>
              </select>
              <p className="font-semibold text-xs text-red-600">
                {errors.recordType?.message}
              </p>
            </div>
            {loading ? (<LoadingButton text={isEdit ? "Editing":"Creating"}/>):(
              <Button
              className="bg-violet-600 hover:bg-violet-500 w-full"
              type="submit"
            >
              {isEdit ? 'Edit DNS':'Create DNS'}
            </Button>
            )}
          </form>
  )
}

export default Form