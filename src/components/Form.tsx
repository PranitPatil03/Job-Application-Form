import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formSchema, items } from "@/lib/utils";
import InterviewDate from "./InterviewDate";
import InterviewTime from "./InterviewTime";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export const FormContainer = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      positionType: "Developer",
      relevantExperience: 0,
      portfolioURL: "",
      managementExperience: "",
      additionalSkills: ["CSS"],
      interviewDate: "",
      interviewTime: "",
    },
  });

  const error = form?.formState.errors;
  console.log("erros", error);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitting with values:", values);
    console.log("Form state:", form.formState); // Check form state for errors

    if (Object.keys(form.formState.errors).length > 0) {
      Object.values(form.formState.errors).forEach((error) => {
        toast({
          title: "Validation Error",
          description: error.message,
          variant: "destructive",
        });
        console.log("Validation error:", error);
      });
    } else {
      console.log("No errors, submitting form...");
      navigate("/registered");
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full max-w-3xl p-4 sm:p-6 md:p-8 lg:p-10 mx-auto">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full border shadow-sm rounded-md p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 mt-6">
            <FormField
              control={form.control}
              name="positionType"
              render={({ field }) => (
                <FormItem className="space-y-3 w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Applying for Position
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Developer" />
                        </FormControl>
                        <FormLabel className="font-normal">Developer</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Designer" />
                        </FormControl>
                        <FormLabel className="font-normal">Designer</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Manager" />
                        </FormControl>
                        <FormLabel className="font-normal">Manager</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full">
              {form.watch("positionType") === "Developer" && (
                <FormField
                  control={form.control}
                  name="relevantExperience"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="flex font-mono font-bold text-lg">
                        Relevant Experience
                      </FormLabel>
                      <FormControl>
                        <Input
                          min={0}
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="w-full flex flex-col gap-3">
                {form.watch("positionType") === "Designer" && (
                  <FormField
                    control={form.control}
                    name="relevantExperience"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex font-mono font-bold text-lg">
                          Relevant Experience
                        </FormLabel>
                        <FormControl>
                          <Input
                            min={0}
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {form.watch("positionType") === "Designer" && (
                  <FormField
                    control={form.control}
                    name="portfolioURL"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex font-mono font-bold text-lg">
                          Portfolio URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {form.watch("positionType") === "Manager" && (
                  <FormField
                    control={form.control}
                    name="managementExperience"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex font-mono font-bold text-lg">
                          Management Experience
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 mt-6 w-full justify-between">
            <FormField
              control={form.control}
              name="interviewDate"
              render={() => (
                <FormItem className="w-full space-y-3">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Select Interview Date
                  </FormLabel>
                  <FormControl>
                    <InterviewDate></InterviewDate>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interviewTime"
              render={() => (
                <FormItem className="space-y-3 w-full">
                  <FormLabel className="flex font-mono font-bold text-lg">
                    Select Interview Time
                  </FormLabel>
                  <FormControl>
                    <InterviewTime></InterviewTime>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 mt-6">
            <FormField
              control={form.control}
              name="additionalSkills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="flex font-mono font-bold text-lg">
                      Additional Skills
                    </FormLabel>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="additionalSkills"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-10 w-full font-mono font-bold text-lg"
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};
