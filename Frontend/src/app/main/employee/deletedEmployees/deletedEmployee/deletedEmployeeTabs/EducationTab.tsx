import React from 'react';
import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

export default function EducationTab() {
  const { control } = useFormContext();

  return (
    <div className="space-y-48">
      <div className="space-y-16">
        <div className="flex items-center border-b-1 space-x-8 pb-8">
          <FuseSvgIcon color="action" size={24}>
            heroicons-outline:academic-cap
          </FuseSvgIcon>
          <Typography className="text-2xl" color="text.secondary">
            Education Information
          </Typography>
        </div>

        <Controller
          name="employeeEducationDetail"
          control={control}
          render={({ field }) => (
            <>
              {field.value && field.value.map((education, index) => (
                <Box
                  key={index}
                  sx={{ mb: 4, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Education Type"
                        value={education.type || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="University"
                        value={education.university || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Year of Completion"
                        value={education.passingYear || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Grade/Score"
                        value={education.grade || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
}

