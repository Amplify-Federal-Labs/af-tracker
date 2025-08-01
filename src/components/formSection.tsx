import { Paper, Stack, Typography } from "@mui/material";

interface FormSectionProps {
  label?: string;
  children: React.JSX.Element;
}
const FormSection = ({ label, children }: FormSectionProps) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        { label && <Typography variant="h6">{label}</Typography> }
        {children}
      </Stack>
    </Paper>
  );
};

export default FormSection;
