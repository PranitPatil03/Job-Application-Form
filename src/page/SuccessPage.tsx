import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  positionType: "Developer" | "Designer" | "Manager";
  relevantExperience?: number;
  portfolioURL?: string;
  managementExperience?: string;
  additionalSkills: (
    | "JavaScript"
    | "CSS"
    | "Python"
    | "React"
    | "Typescript"
  )[];
  interviewDate: string;
  interviewTime: string;
}

const SuccessPage = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const formDataString = localStorage.getItem("formData");
    if (formDataString) {
      const parsedFormData = JSON.parse(formDataString);
      setFormData(parsedFormData);
    } else {
      console.log("No formData found in localStorage");
    }
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center px-5">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-2xl font-semibold text-center">
            Job Application form submitted Successfully ✅✅
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData ? (
            <div className="space-y-4">
              <h3 className="font-mono text-lg">
                Dear{" "}
                <Badge variant="default" className="space-y-2">
                  {formData.firstName + " " + formData.lastName}
                </Badge>
              </h3>
              <p className="mt-2 font-mono text-md">
                Thank you for applying for the job. You will receive future
                updates at <Badge variant="default">{formData.email}</Badge>
              </p>
              <div className="mt-4">
                <h4 className="font-mono text-lg font-semibold">
                  Registration Details
                </h4>
                <ul className="mt-2 space-y-2 font-mono text-md">
                  <li>
                    <strong>Phone Number:</strong> {formData.number}
                  </li>
                  <li>
                    <strong>Position Type:</strong> {formData.positionType}
                  </li>
                  {formData.relevantExperience !== undefined && (
                    <li>
                      <strong>Relevant Experience:</strong>{" "}
                      {formData.relevantExperience} years
                    </li>
                  )}
                  {formData.portfolioURL && (
                    <li>
                      <strong>Portfolio URL:</strong>{" "}
                      <a
                        href={formData.portfolioURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black"
                      >
                        {formData.portfolioURL}
                      </a>
                    </li>
                  )}
                  {formData.managementExperience && (
                    <li>
                      <strong>Management Experience:</strong>{" "}
                      {formData.managementExperience}
                    </li>
                  )}
                  <li>
                    <strong>Additional Skills:</strong>{" "}
                    {formData.additionalSkills.join(", ")}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <p className="font-mono text-md">No registration data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
