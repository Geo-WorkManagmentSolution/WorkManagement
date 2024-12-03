import Button from "@mui/material/Button";
import { Grid, TextField, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

const educationTypes = [
  "SSC",
  "HSC",
  "Diploma",
  "Degree",
  "Certification",
  "Master",
  "PHD",
  "Other",
];

export default function EducationTab({UserRole}) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employeeEducationDetail",
  });

  return (
    <div className="space-y-48">
      <div className="space-y-16">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{ mb: 4, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={`employeeEducationDetail.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Education Type"
                    >
                      {educationTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={`employeeEducationDetail.${index}.university`}
                  control={control}
                  rules={{ required: "university is required" }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="University" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={`employeeEducationDetail.${index}.passingYear`}
                  control={control}
                  rules={{ required: "Year is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Year of Completion"
                      type="number"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name={`employeeEducationDetail.${index}.grade`}
                  control={control}
                  rules={{ required: "Grade/Score is required" }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Grade/Score" />
                  )}
                />
              </Grid>
            </Grid>

            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                className={index > 0 ? "hideAddContextButton" : ""}
                variant="contained"
                color="secondary"
                size="small"
                onClick={() =>
                  append({
                    type: "",
                    university: "",
                    passingYear: "",
                    grade: "",
                  })
                }
              >
                <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                <span className="mx-4 sm:mx-8">Add Education</span>
              </Button>
              {index > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </Box>
          </Box>
        ))}

        {/* </form> */}
      </div>
    </div>
  );
}
